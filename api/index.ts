import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

// Message service
class MessagesService {
    async create(message: any) {
        const { data, error } = await supabase
            .from('messages')
            .insert([message])
            .select()
            .single();

        if (error) {
            console.error('Error creating message:', error);
            throw new Error(`Failed to create message: ${error.message}`);
        }

        return data;
    }
}

const messagesService = new MessagesService();

// Message schema
const insertMessageSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(1, 'Message is required'),
});

// Express app setup (cached across invocations)
let app: express.Application | null = null;

function setupApp() {
    if (app) return app;

    const newApp = express();
    newApp.use(express.json());
    newApp.use(express.urlencoded({ extended: false }));

    // Contact form endpoint
    newApp.post('/api/contact', async (req, res) => {
        try {
            const input = insertMessageSchema.parse(req.body);
            const message = await messagesService.create(input);
            res.status(201).json(message);
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    message: err.errors[0].message,
                    field: err.errors[0].path.join('.'),
                });
            }
            console.error('Error in contact endpoint:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Error handler
    newApp.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        console.error('Internal Server Error:', err);
        if (!res.headersSent) {
            return res.status(status).json({ message });
        }
    });

    app = newApp;
    return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const app = setupApp();

    // @ts-ignore - Express types don't perfectly match Vercel types
    return app(req, res);
}
