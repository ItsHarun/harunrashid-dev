import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { POST_TYPES } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Posts
  app.get(api.posts.list.path, async (req, res) => {
    const type = req.query.type as string | undefined;
    const posts = await storage.getPosts(type);
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  });

  // Beliefs
  app.get(api.beliefs.list.path, async (req, res) => {
    const beliefs = await storage.getBeliefs();
    res.json(beliefs);
  });

  // Now
  app.get(api.now.list.path, async (req, res) => {
    const updates = await storage.getNowUpdates();
    res.json(updates);
  });

  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // SEED DATA
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingBeliefs = await storage.getBeliefs();
  if (existingBeliefs.length === 0) {
    // Seed Beliefs
    const beliefs = [
      "Most startups fail because they copy.",
      "AI products fail because they lack systems thinking.",
      "Simplicity is seniority.",
      "Engineers should understand business."
    ];
    for (const [index, content] of beliefs.entries()) {
      await storage.createBelief({ content, order: index });
    }

    // Seed Now Updates
    const nows = [
      "Building Kue v2 architecture.",
      "Studying multi-agent AI systems.",
      "Thinking about notification intelligence at scale."
    ];
    for (const content of nows) {
      await storage.createNowUpdate({ content });
    }

    // Seed Posts (Thinking)
    await storage.createPost({
      slug: "software-should-think",
      title: "Software should think before it speaks",
      content: `The era of dumb input/output is over. 

We are moving into an era where software needs to have agency. It needs to understand context before it acts. 

When you build systems today, you are not just building pipelines. You are building decision engines.`,
      type: POST_TYPES.THINKING
    });

    await storage.createPost({
      slug: "ai-is-architecture",
      title: "AI is not magic. It's architecture.",
      content: `Too many people treat LLMs as a magic box. You put a prompt in, you get gold out.

Real engineering is about the piping around the model. How do you handle failure? How do you manage context? How do you ensure determinism in a probabilistic system?

That is where the value lies.`,
      type: POST_TYPES.THINKING
    });

    // Seed Posts (Kue)
    await storage.createPost({
      slug: "why-kue-exists",
      title: "Why Kue Exists",
      content: `Kue exists because notifications are broken.

We are bombarded with noise. Our attention is fragmented.

Kue is an attempt to restore order. To build a layer of intelligence between you and the noise.`,
      type: POST_TYPES.KUE
    });
  }
}
