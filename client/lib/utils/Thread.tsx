import { createSupabaseClient } from "../../src/lib/supabase/client";

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
    conversationID: string): Promise<string | null> {
    const supabase = createSupabaseClient(); // Create a Supabase client instance

    console.log(senderProfileId); // Log sender profile ID
    console.log(conversationID); // Log conversation ID
    // If the conversation is public, check for existing public thread
    const { data: existingPublicThread, error: publicThreadError } = await supabase
        .from("public_user_conversation")
        .select("thread_id")
        .eq("sender_id", senderProfileId)
        .eq("conversation_id", conversationID);

    // Log and return null if there's an error
    if (publicThreadError) {
        console.error("Error checking public thread:", publicThreadError.message);
        return null;
    }

    // If a public thread already exists, return its thread_id
    if (existingPublicThread && existingPublicThread.length > 0) {
        console.log("Public thread found:", existingPublicThread[0]);
        return existingPublicThread[0].thread_id; 
    }

    // If no existing thread, create a new public thread
    const { data, error } = await supabase
        .from("public_user_conversation")
        .insert([
            {
                sender_id: senderProfileId,
                conversation_id: conversationID
            }
        ])
        .select("thread_id");

    if (error) {
        console.error("Error initializing public thread:", error.message);
        return null;
    }

    console.log("Public thread initialized:", data);
 
    return data[0]?.thread_id || null; 
}
