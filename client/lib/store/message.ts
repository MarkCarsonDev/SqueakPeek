import { create } from "zustand";
// import { Tables } from "../types/database.types";
import { MessageBodyProps } from "@/ui/messaging/MessageCard";


// TODO Get the actual types from the database
// export type MessageType = Tables<"public_message" | "private_message">;

// state of the hook
interface MessageState {
  messages: MessageBodyProps[];
  addMessage: (newMessage: MessageBodyProps) => void;
}

// hook that will be access in UI components
export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
}));
