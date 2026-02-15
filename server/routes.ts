import type { Express } from "express";
import type { Server } from "http";
import { postsService, beliefsService, nowService, messagesService } from "@shared/services";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Posts
  app.get(api.posts.list.path, async (req, res) => {
    const type = req.query.type as string | undefined;
    const posts = await postsService.getAll(type);
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await postsService.getBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  });

  // Beliefs
  app.get(api.beliefs.list.path, async (req, res) => {
    const beliefs = await beliefsService.getAll();
    res.json(beliefs);
  });

  // Now
  app.get(api.now.list.path, async (req, res) => {
    const updates = await nowService.getUpdates();
    res.json(updates);
  });

  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await messagesService.create(input);
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

  return httpServer;
}
