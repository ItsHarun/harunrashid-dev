import { supabase } from "../../client/src/lib/supabase";
import { type NowUpdate, type InsertNowUpdate } from "@shared/schema";

export class NowService {
    /**
     * Get all now updates ordered by creation date (newest first)
     */
    async getUpdates(): Promise<NowUpdate[]> {
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

    /**
     * Create a new now update
     */
    async createUpdate(update: InsertNowUpdate): Promise<NowUpdate> {
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
}

// Export singleton instance
export const nowService = new NowService();
