import { supabase } from "../supabase";
import { type Message, type InsertMessage } from "@shared/schema";

export class MessagesService {
    /**
     * Create a new contact message
     */
    async create(message: InsertMessage): Promise<Message> {
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

// Export singleton instance
export const messagesService = new MessagesService();
