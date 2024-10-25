import { useConversationStore } from "./conversation"; 
import { createSupabaseClient } from "../supabase/client";

interface Conversation {
    conversation_id: string; 
    created_at: string;       
    opportunity_id: string | null;
}

/**
 * Fetches a public conversation from the Supabase database by its ID.
 * 
 * @param conversationID - The ID of the conversation to fetch.
 * @returns A promise that resolves to a Conversation object or null if not found or an error occurs.
 */
export const fetchPublicConversation = async (conversationID: string): Promise<Conversation | null> => {
    const supabase = createSupabaseClient(); // Create a Supabase client instance

    try {
        // Query the conversation table for a specific conversation ID
        const { data, error } = await supabase
            .from("conversation")
            .select("*") 
            .eq("conversation_id", conversationID.trim()) 
            .maybeSingle(); 

        if (error) {
            console.error('Error fetching public conversation:', error.message); 
            return null; 
        }

        if (data) {
            // Construct a Conversation object from the fetched data
            const fetchedConversation: Conversation = {
                conversation_id: data.conversation_id,
                created_at: data.created_at.toString(), 
                opportunity_id: data.opportunity_id, 
            };

            // Update the conversation state in the store
            useConversationStore.getState().initializeConversation(fetchedConversation);
            return fetchedConversation; 
        }

        return null; 
    } catch (error) {
        console.error('Unexpected error fetching public conversation:', error); // Log unexpected errors
        return null; 
    }
};

/**
 * Fetches a conversation by its ID and updates the state in the conversation store.
 * 
 * @param conversation_id - The ID of the conversation to fetch.
 */
export const fetchConversationAndSetState = async (conversation_id: string) => {
    // Fetch the conversation and store it in the state
    const conversation = await fetchPublicConversation(conversation_id);
    
    if (conversation) {
        console.log("Conversation fetched and state updated:", conversation); 
    } else {
        console.log("No conversation found for the given conversation ID."); 
    }
};

/**
 * Creates a new private conversation in the Supabase database.
 * 
 * @returns A promise that resolves to the newly created Conversation object or null if creation fails.
 */
export const createPrivateConversation = async (): Promise<Conversation | null> => {
    const supabase = createSupabaseClient(); 

    try {
        // Insert a new conversation into the database and select the necessary fields
        const { data, error } = await supabase
            .from('conversation')
            .insert({})
            .select('conversation_id, created_at') 
            .single(); 

        if (error) {
            console.error('Error creating new conversation:', error); 
            return null; 
        }

        if (data) {
            // Construct the new Conversation object from the returned data
            const newConversation: Conversation = {
                conversation_id: data.conversation_id,
                created_at: data.created_at, 
                opportunity_id: null, 
            };

            // Update the conversation state in the store
            useConversationStore.getState().initializeConversation(newConversation);
            return newConversation; 
        }

        return null; 
    } catch (error) {
        console.error('Unexpected error creating new conversation:', error); 
        return null; 
    }
}
