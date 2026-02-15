import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

// Cache the app instance across serverless invocations
let app: express.Express | null = null;

async function getApp() {
    if (!app) {
        app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        // Register routes without HTTP server (not needed for serverless)
        await registerRoutes(null as any, app);
    }
    return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const app = await getApp();
    return app(req as any, res as any);
}
