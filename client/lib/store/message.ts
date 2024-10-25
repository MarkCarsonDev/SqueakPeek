import { create } from "zustand";
// import { Tables } from "../types/database.types";
import { MessageBodyProps } from "@/ui/messaging/MessageCard";
import { Tables } from "../types/database.types";

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
