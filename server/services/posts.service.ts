import { supabase } from "../supabase";
import { type Post, type InsertPost } from "@shared/schema";

export class PostsService {
    /**
     * Get all posts, optionally filtered by type
     */
    async getAll(type?: string): Promise<Post[]> {
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

    /**
     * Get a single post by slug
     */
    async getBySlug(slug: string): Promise<Post | undefined> {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // Not found
                return undefined;
            }
            console.error('Error fetching post by slug:', error);
            throw new Error(`Failed to fetch post: ${error.message}`);
        }

        return data as Post;
    }

    /**
     * Create a new post
     */
    async create(post: InsertPost): Promise<Post> {
        const { data, error } = await supabase
            .from('posts')
            .insert([post])
            .select()
            .single();

        if (error) {
            console.error('Error creating post:', error);
            throw new Error(`Failed to create post: ${error.message}`);
        }

        return data as Post;
    }
}

// Export singleton instance
export const postsService = new PostsService();
