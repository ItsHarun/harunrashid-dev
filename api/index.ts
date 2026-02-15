import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// ==================== SUPABASE CLIENT ====================
if (!process.env.SUPABASE_URL) {
    throw new Error('SUPABASE_URL is required');
}

if (!process.env.SUPABASE_ANON_KEY) {
    throw new Error('SUPABASE_ANON_KEY is required');
}

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// ==================== TYPES ====================
interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    type: string;
    publishedAt: string;
}

interface Belief {
    id: number;
    content: string;
    order: number;
}

interface NowUpdate {
    id: number;
    content: string;
    createdAt: string;
}

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

// ==================== VALIDATION SCHEMAS ====================
const messageSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().min(1)
});

// ==================== DATABASE FUNCTIONS ====================
async function getPosts(type?: string): Promise<Post[]> {
    let query = supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false });

    if (type) {
        query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching posts:', error);
        throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return (data || []) as Post[];
}

async function getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Not found
        }
        console.error('Error fetching post by slug:', error);
        throw new Error(`Failed to fetch post: ${error.message}`);
    }

    return data as Post;
}

async function getBeliefs(): Promise<Belief[]> {
    const { data, error } = await supabase
        .from('beliefs')
        .select('*')
        .order('order', { ascending: true });

    if (error) {
        console.error('Error fetching beliefs:', error);
        throw new Error(`Failed to fetch beliefs: ${error.message}`);
    }

    return (data || []) as Belief[];
}

async function getNowUpdates(): Promise<NowUpdate[]> {
    const { data, error } = await supabase
        .from('now_updates')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching now updates:', error);
        throw new Error(`Failed to fetch now updates: ${error.message}`);
    }

    return (data || []) as NowUpdate[];
}

async function createMessage(input: { name: string; email: string; message: string }): Promise<Message> {
    const { data, error } = await supabase
        .from('messages')
        .insert([input])
        .select()
        .single();

    if (error) {
        console.error('Error creating message:', error);
        throw new Error(`Failed to create message: ${error.message}`);
    }

    return data as Message;
}

// ==================== EXPRESS APP ====================
let app: express.Express | null = null;

async function getApp() {
    if (!app) {
        app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        // GET /api/posts
        app.get('/api/posts', async (req, res) => {
            try {
                const type = req.query.type as string | undefined;
                const posts = await getPosts(type);
                res.json(posts);
            } catch (error: any) {
                console.error('Error in GET /api/posts:', error);
                res.status(500).json({ message: error.message || 'Internal server error' });
            }
        });

        // GET /api/posts/:slug
        app.get('/api/posts/:slug', async (req, res) => {
            try {
                const post = await getPostBySlug(req.params.slug);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                res.json(post);
            } catch (error: any) {
                console.error('Error in GET /api/posts/:slug:', error);
                res.status(500).json({ message: error.message || 'Internal server error' });
            }
        });

        // GET /api/beliefs
        app.get('/api/beliefs', async (req, res) => {
            try {
                const beliefs = await getBeliefs();
                res.json(beliefs);
            } catch (error: any) {
                console.error('Error in GET /api/beliefs:', error);
                res.status(500).json({ message: error.message || 'Internal server error' });
            }
        });

        // GET /api/now
        app.get('/api/now', async (req, res) => {
            try {
                const updates = await getNowUpdates();
                res.json(updates);
            } catch (error: any) {
                console.error('Error in GET /api/now:', error);
                res.status(500).json({ message: error.message || 'Internal server error' });
            }
        });

        // POST /api/contact
        app.post('/api/contact', async (req, res) => {
            try {
                const input = messageSchema.parse(req.body);
                const message = await createMessage(input);
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

// ==================== VERCEL HANDLER ====================
export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const app = await getApp();
        return app(req as any, res as any);
    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
