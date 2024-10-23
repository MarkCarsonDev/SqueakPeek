import { create } from "zustand";
import { Tables } from "../types/database.types";
import { initialize } from "next/dist/server/lib/render-server";


type Conversation = Tables<"conversation">;


interface ConversationState {
    conversation: Conversation | null;
    initializeConversation: (conversation: Conversation) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
    conversation: null,
    created_at: null,
    opportunity_id: null,
    initializeConversation: (conversation: Conversation) => {
        set({ conversation});
    },
}));

  