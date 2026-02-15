import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertMessage } from "@shared/routes";

// ============================================
// POSTS (Thinking & Kue)
// ============================================

export function usePosts(type?: 'thinking' | 'kue') {
  return useQuery({
    queryKey: [api.posts.list.path, type],
    queryFn: async () => {
      const url = type
        ? buildUrl(api.posts.list.path) + `?type=${type}`
        : api.posts.list.path;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return api.posts.list.responses[200].parse(await res.json());
    },
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: [api.posts.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.posts.get.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch post");
      return api.posts.get.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// BELIEFS
// ============================================

export function useBeliefs() {
  return useQuery({
    queryKey: [api.beliefs.list.path],
    queryFn: async () => {
      const res = await fetch(api.beliefs.list.path);
      if (!res.ok) throw new Error("Failed to fetch beliefs");
      return api.beliefs.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// NOW UPDATES
// ============================================

export function useNowUpdates() {
  return useQuery({
    queryKey: [api.now.list.path],
    queryFn: async () => {
      const res = await fetch(api.now.list.path);
      if (!res.ok) throw new Error("Failed to fetch now updates");
      return api.now.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// CONTACT MESSAGES
// ============================================

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.create.input.parse(data);
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
  });
}
