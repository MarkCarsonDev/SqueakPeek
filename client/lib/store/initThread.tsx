import { createSupabaseClient } from "../supabase/client";

/**
 * Initializes a thread for a conversation, either private or public.
 * 
 * @param senderProfileId - The ID of the sender's profile.
 * @param conversationID - The ID of the conversation to which the thread belongs.
 * @param recieverProfileId - The optional ID of the receiver's profile (only for private threads).
 * @returns A promise that resolves to the thread ID or null if an error occurs or no thread is found.
 */
export async function initializeThread(
    senderProfileId: string,
    conversationID: string,
    recieverProfileId?: string
): Promise<string | null> {
    const supabase = createSupabaseClient(); // Create a Supabase client instance

    console.log(senderProfileId); // Log sender profile ID
    console.log(conversationID); // Log conversation ID

    // Check if the conversation is private
    if (recieverProfileId) {
        // Query for an existing private thread
        const { data: existingPrivateThread, error: privateThreadError } = await supabase 
            .from("private_user_conversation")
            .select("thread_id")
            .eq("sender_id", senderProfileId)
            .eq("reciever_id", recieverProfileId) 
            .eq("conversation_id", conversationID);

        // Log and return null if there's an error
        if (privateThreadError) {
            console.error("Error checking private thread:", privateThreadError.message);
            return null;
        }

        // If a private thread already exists, return its thread_id
        if (existingPrivateThread && existingPrivateThread.length > 0) {
            console.log("Private thread found:", existingPrivateThread[0]);
            return existingPrivateThread[0].thread_id; 
        }

        // If no existing thread, create a new private thread
        const { data, error } = await supabase
            .from("private_user_conversation")
            .insert([
                {
                    sender_id: senderProfileId,
                    reciever_id: recieverProfileId, 
                    conversation_id: conversationID
                }
            ])
            .select("thread_id"); 

        // Log and return null if there's an error during thread creation
        if (error) {
            console.error("Error initializing private thread:", error.message);
            return null;
        }

        console.log("Private thread initialized:", data); // Log the created thread data
        return data[0]?.thread_id; // Return the new thread ID
    } else { 
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
}
