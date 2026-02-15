import { supabase } from "../supabase";
import { type Belief, type InsertBelief } from "@shared/schema";

export class BeliefsService {
    /**
     * Get all beliefs ordered by their order field
     */
    async getAll(): Promise<Belief[]> {
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

    /**
     * Create a new belief
     */
    async create(belief: InsertBelief): Promise<Belief> {
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
}

// Export singleton instance
export const beliefsService = new BeliefsService();
