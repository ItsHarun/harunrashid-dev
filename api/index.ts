import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { z } from 'zod';
import { postsService, beliefsService, nowService, messagesService } from '../shared/services/index';

// API route definitions
const api = {
    posts: {
        list: { path: '/api/posts' },
        get: { path: '/api/posts/:slug' }
    },
    beliefs: {
        list: { path: '/api/beliefs' }
    },
    now: {
        list: { path: '/api/now' }
    },
    contact: {
        create: {
            path: '/api/contact',
            input: z.object({
                name: z.string().min(1),
                email: z.string().email(),
                message: z.string().min(1)
            })
        }
    }
};

// Cache the app instance across serverless invocations
let app: express.Express | null = null;

async function getApp() {
    if (!app) {
        app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        // Posts
        app.get(api.posts.list.path, async (req, res) => {
            try {
                const type = req.query.type as string | undefined;
                const posts = await postsService.getAll(type);
                res.json(posts);
            } catch (error: any) {
                console.error('Error in GET /api/posts:', error);
                res.status(500).json({ message: error.message || 'Internal server error' });
            }
        });

        app.get(api.posts.get.path, async (req, res) => {
            try {
                const post = await postsService.getBySlug(req.params.slug);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                res.json(post);
            } catch (error: any) {
                console.error('Error in GET /api/posts/:slug:', error);
                res.status(500).json({ message: error.message || 'Internal server error' });
            }
        });

        // Beliefs
        app.get(api.beliefs.list.path, async (req, res) => {
            try {
                const beliefs = await beliefsService.getAll();
                res.json(beliefs);
            } catch (error: any) {
                console.error('Error in GET /api/beliefs:', error);
                res.status(500).json({ message: error.message || 'Internal server error' });
            }
        });

        // Now
        app.get(api.now.list.path, async (req, res) => {
            try {
                const updates = await nowService.getUpdates();
                res.json(updates);
            } catch (error: any) {
                console.error('Error in GET /api/now:', error);
                res.status(500).json({ message: error.message || 'Internal server error' });
            }
        });

        // Contact
        app.post(api.contact.create.path, async (req, res) => {
            try {
                const input = api.contact.create.input.parse(req.body);
                const message = await messagesService.create(input);
                res.status(201).json(message);
            } catch (err: any) {
                if (err instanceof z.ZodError) {
                    return res.status(400).json({
                        message: err.errors[0].message,
                        field: err.errors[0].path.join('.'),
                    });
                }
                console.error('Error in POST /api/contact:', err);
                res.status(500).json({ message: err.message || 'Internal server error' });
            }
        });

        // Global error handler
        app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.error('Unhandled error:', err);
            if (!res.headersSent) {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const app = await getApp();
        return app(req as any, res as any);
    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
