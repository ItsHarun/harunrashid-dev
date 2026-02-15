import { supabase } from "./supabase";
import {
  type Post, type InsertPost,
  type Belief, type InsertBelief,
  type NowUpdate, type InsertNowUpdate,
  type Message, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  // Posts (Thinking & Kue)
  getPosts(type?: string): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;

  // Beliefs
  getBeliefs(): Promise<Belief[]>;
  createBelief(belief: InsertBelief): Promise<Belief>;

  // Now Updates
  getNowUpdates(): Promise<NowUpdate[]>;
  createNowUpdate(update: InsertNowUpdate): Promise<NowUpdate>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  // Posts
  async getPosts(type?: string): Promise<Post[]> {
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

  async getPostBySlug(slug: string): Promise<Post | undefined> {
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

  async createPost(post: InsertPost): Promise<Post> {
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

  // Beliefs
  async getBeliefs(): Promise<Belief[]> {
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

  async createBelief(belief: InsertBelief): Promise<Belief> {
    const { data, error } = await supabase
      .from('beliefs')
      .insert([belief])
      .select()
      .single();

    if (error) {
      console.error('Error creating belief:', error);
      throw new Error(`Failed to create belief: ${error.message}`);
    }

    return data as Belief;
  }

  // Now Updates
  async getNowUpdates(): Promise<NowUpdate[]> {
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

  async createNowUpdate(update: InsertNowUpdate): Promise<NowUpdate> {
    const { data, error } = await supabase
      .from('now_updates')
      .insert([update])
      .select()
      .single();

    if (error) {
      console.error('Error creating now update:', error);
      throw new Error(`Failed to create now update: ${error.message}`);
    }

    return data as NowUpdate;
  }

  // Messages
  async createMessage(message: InsertMessage): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) {
      console.error('Error creating message:', error);
      throw new Error(`Failed to create message: ${error.message}`);
    }

    return data as Message;
  }
}

export const storage = new DatabaseStorage();
