import { useConversationStore } from "./conversation";
import { createSupabaseClient } from "../supabase/client";

interface Conversation {
    conversation_id: string;
    created_at: string;  
    opportunity_id: string | null;
}

// Fetch public conversation based on opportunity_id
export const fetchPublicConversation = async (opportunity_id: string): Promise<Conversation | null> => {
    const supabase = createSupabaseClient();

    try {
        const { data, error } = await supabase
            .from('conversation')
            .select('*')
            .eq('opportunity_id', opportunity_id) 
            .single(); 

        if (error) {
            console.error('Error fetching public conversation:', error);
            return null; 
        }

        if (data) {
            const fetchedConversation: Conversation = {
                conversation_id: data.conversation_id,
                created_at: data.created_at.toString(),
                opportunity_id: data.opportunity_id,
            };

            useConversationStore.getState().initializeConversation(fetchedConversation);

            return fetchedConversation;
        }

        return null; 
    } catch (error) {
        console.error('Unexpected error fetching public conversation:', error);
        return null; 
    }
};

const fetchConversationAndSetState = async (opportunity_id: string) => {
    const conversation = await fetchPublicConversation(opportunity_id);
    if (conversation) {
        console.log("Conversation fetched and state updated:", conversation);
    } else {
        console.log("No conversation found for the given opportunity ID.");
    }
};




// createPrivateConversation function to insert a new private conversation
export const createPrivateConversation = async (): Promise<Conversation | null> => {
    const supabase = createSupabaseClient();

    try {
        const { data, error } = await supabase
            .from('conversation')
            .insert({})
            .select('conversation_id, created_at')
            .single();

        if (error) {
            console.error('Error creating new conversation:', error);
            return null; // Handle error appropriately
        }

        if (data) {
            const newConversation: Conversation = {
                conversation_id: data.conversation_id,
                created_at: data.created_at,
                opportunity_id: null,
            };

            useConversationStore.getState().initializeConversation(newConversation);
            return newConversation; 
        }

        return null; 
    } catch (error) {
        console.error('Unexpected error:', error);
        return null; 
    }
};
