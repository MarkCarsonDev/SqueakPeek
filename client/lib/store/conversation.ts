import { create } from "zustand";
import { Tables } from "../types/database.types";

type Conversation = Tables<"conversation">;

type Thread = Tables<"private_user_conversation"> | Tables<"public_user_conversation">;


interface ConversationState {
    conversation: Conversation | null;
    thread: Thread | null;
    initializeConversation: (conversation: Conversation) => void;
    initializeThread: (thread: Thread) => void;
}

interface ThreadState 
{
    thread: Thread | null;
    initializeThread: (thread: Thread) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
    conversation: null,
    thread: null,  // Initialize thread to null
    initializeConversation: (conversation: Conversation) => {
        set({ conversation });
    },
    initializeThread: (thread: Thread) => {  // Initialize thread method
        set({ thread });
    },
}));

export const useThreadStore = create<ThreadState>((set) => ({
    thread: null,
    initializeThread: (thread: Thread) => {
        set({ thread });
    },
}));


