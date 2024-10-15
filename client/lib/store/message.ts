import { create } from "zustand";
import { Tables } from "../types/database.types";

export type MessageType = Tables<"public_message" | "private_message">;

// state of the hook
interface MessageState {
  messages: MessageType[];
  addMessage: (newMessage: MessageType) => void;
}

// hook that will be access in UI components
export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));
