import { create } from "zustand";
// import { Tables } from "../types/database.types";
import { MessageCardProps } from "@/ui/messaging/MessageCard";

// TODO Get the actual types from the database
// export type MessageType = Tables<"public_message" | "private_message">;

// state of the hook
interface MessageState {
  messages: MessageCardProps[];
  addMessage: (newMessage: MessageCardProps) => void;
}

// hook that will be access in UI components
export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));

