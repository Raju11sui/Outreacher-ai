import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: {
            node_env: process.env.NODE_ENV,
            github_token_configured: !!process.env.GITHUB_TOKEN,
            google_key_configured: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        }
    });
}
