import path from "path";
import { pathToFileURL } from "url";
import dotenv from "dotenv";

// Load .env explicitly from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log("Loading .env from:", path.resolve(process.cwd(), ".env"));
console.log("Google API Key loaded:", !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);
console.log("Google API Key length:", process.env.GOOGLE_GENERATIVE_AI_API_KEY?.length || 0);
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerChatRoutes } from "./chat";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

const app = express();
let server: any;

try {
  server = createServer(app);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Chat API with streaming and tool calling
  registerChatRoutes(app);

  const trpcMiddleware = createExpressMiddleware({
    router: appRouter,
    createContext,
  });

  // tRPC API - Handle both paths to be safe with Vercel rewrites
  app.use("/api/trpc", trpcMiddleware);
  app.use("/trpc", trpcMiddleware);

} catch (error: any) {
  console.error('[Fatal] Server initialization failed:', error);
  // Create a minimal fallback app to report the error
  app.use((req, res) => {
    res.status(500).json({
      error: 'Server Initialization Failed',
      details: error.message,
      stack: error.stack
    });
  });
}

// We need to await setupVite in dev, so we wrap the startup logic
async function startServer() {
  if (!server) return; // Skip if initialization failed

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

// Only start the server if this file is the main entry point (not imported)
// In Vercel, this file is imported by api/index.ts, so we don't want to listen.
// We use a check for VERCEL env var or if strictly running as script
if (!process.env.VERCEL) {
  const isMainModule = import.meta.url === pathToFileURL(process.argv[1]).href;
  if (isMainModule) {
    startServer().catch(console.error);
  }
}

export { app };
