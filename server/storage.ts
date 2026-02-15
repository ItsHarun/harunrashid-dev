import { db } from "./db";
import {
  posts, beliefs, nowUpdates, messages,
  type Post, type InsertPost,
  type Belief, type InsertBelief,
  type NowUpdate, type InsertNowUpdate,
  type Message, type InsertMessage
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

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
    let query = db.select().from(posts).orderBy(desc(posts.publishedAt));
    if (type) {
      // @ts-ignore - type checking on dynamic query building
      query = query.where(eq(posts.type, type));
    }
    return await query;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  // Beliefs
  async getBeliefs(): Promise<Belief[]> {
    return await db.select().from(beliefs).orderBy(beliefs.order);
  }

  async createBelief(belief: InsertBelief): Promise<Belief> {
    const [newBelief] = await db.insert(beliefs).values(belief).returning();
    return newBelief;
  }

  // Now Updates
  async getNowUpdates(): Promise<NowUpdate[]> {
    return await db.select().from(nowUpdates).orderBy(desc(nowUpdates.createdAt));
  }

  async createNowUpdate(update: InsertNowUpdate): Promise<NowUpdate> {
    const [newUpdate] = await db.insert(nowUpdates).values(update).returning();
    return newUpdate;
  }

  // Messages
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
