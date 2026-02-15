import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// For "Thinking" (Essays) and "Kue" (Case Studies)
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(), // Markdown content
  type: text("type").notNull(), // 'thinking' | 'kue'
  publishedAt: timestamp("published_at").defaultNow(),
});

// For "Beliefs"
export const beliefs = pgTable("beliefs", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  order: serial("order").notNull(),
});

// For "Now" page updates
export const nowUpdates = pgTable("now_updates", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// For Contact messages
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertPostSchema = createInsertSchema(posts).omit({ id: true, publishedAt: true });
export const insertBeliefSchema = createInsertSchema(beliefs).omit({ id: true });
export const insertNowUpdateSchema = createInsertSchema(nowUpdates).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// === TYPES ===

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type Belief = typeof beliefs.$inferSelect;
export type InsertBelief = z.infer<typeof insertBeliefSchema>;

export type NowUpdate = typeof nowUpdates.$inferSelect;
export type InsertNowUpdate = z.infer<typeof insertNowUpdateSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export const POST_TYPES = {
  THINKING: 'thinking',
  KUE: 'kue',
} as const;
