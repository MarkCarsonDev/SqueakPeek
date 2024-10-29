import { createSupabaseClient } from "../supabase/client";
import { v4 as uuidv4 } from "uuid";

/**
 * Initializes a thread for a conversation, either private or public.
 * 
 * @param senderProfileId - The ID of the sender's profile.
 * @param conversationID - The ID of the conversation to which the thread belongs.
 * @param recieverProfileId - The optional ID of the receiver's profile (only for private threads).
 * @returns A promise that resolves to the thread ID or null if an error occurs or no thread is found.
 */
export async function createPublicThread(
    senderProfileId: string,
    conversationID: string) {
    const supabase = createSupabaseClient(); // Create a Supabase client instance

    console.log(senderProfileId); // Log sender profile ID
    console.log(conversationID); // Log conversation ID
    
    // If no existing thread, create a new public thread
    const { data, error } = await supabase
        .from("public_user_conversation")
        .insert([
            {
                sender_id: senderProfileId.toString(),
                conversation_id: conversationID.toString(),
                thread_id: uuidv4()
            }
        ])
        .select("thread_id");

    if (error) {
        console.log(senderProfileId);
        console.log(conversationID);
        console.error("Error initializing public thread:", error.message);
        return;
    }

    console.log("Public thread initialized:", data);
 
    return data[0].thread_id; 
}
