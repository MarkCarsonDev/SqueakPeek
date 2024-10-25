import { create } from "zustand";
import { Tables } from "../types/database.types";

type Thread = Tables<"private_user_conversation"> | Tables<"public_user_conversation">;

interface ThreadState 
{
    thread: Thread | null;
    initializeThread: (thread: Thread) => void;
}

export const useThreadStore = create<ThreadState>((set) => ({
    thread: null,
    initializeThread: (thread: Thread) => {
        set({ thread });
    },
}));

