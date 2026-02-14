import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DMGenerator from "./pages/DMGenerator";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";

import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path={"/"} component={() => (
          <PageTransition>
            <Home />
          </PageTransition>
        )} />
        <Route path={"/dashboard"} component={() => (
          <PageTransition>
            <Dashboard />
          </PageTransition>
        )} />
        <Route path={"/generate"} component={() => (
          <PageTransition>
            <DMGenerator />
          </PageTransition>
        )} />
        <Route path={"/history"} component={() => (
          <PageTransition>
            <History />
          </PageTransition>
        )} />
        <Route path={"/analytics"} component={() => (
          <PageTransition>
            <Analytics />
          </PageTransition>
        )} />
        <Route path={"/billing"} component={() => (
          <PageTransition>
            <Billing />
          </PageTransition>
        )} />
        <Route path={"/settings"} component={() => (
          <PageTransition>
            <Settings />
          </PageTransition>
        )} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
};

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
