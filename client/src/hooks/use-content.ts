import { useQuery, useMutation } from "@tanstack/react-query";
import { postsService, beliefsService, nowService, messagesService } from "@shared/services";
import type { InsertMessage } from "@shared/schema";

// ============================================
// POSTS (Thinking & Kue)
// ============================================

export function usePosts(type?: 'thinking' | 'kue') {
  return useQuery({
    queryKey: ['posts', type],
    queryFn: async () => {
      return await postsService.getAll(type);
    },
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      return await postsService.getBySlug(slug);
    },
  });
}

// ============================================
// BELIEFS
// ============================================

export function useBeliefs() {
  return useQuery({
    queryKey: ['beliefs'],
    queryFn: async () => {
      return await beliefsService.getAll();
    },
  });
}

// ============================================
// NOW UPDATES
// ============================================

export function useNowUpdates() {
  return useQuery({
    queryKey: ['now-updates'],
    queryFn: async () => {
      return await nowService.getUpdates();
    },
  });
}

// ============================================
// CONTACT MESSAGES
// ============================================

export function useSendMessage() {
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      return await messagesService.create(data);
    },
  });
}

