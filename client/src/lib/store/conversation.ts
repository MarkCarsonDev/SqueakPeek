import { create } from "zustand";
import { MessageCardProps } from "@/ui/message/MessageCard";

// state of the hook
interface MessageState {
  messages: MessageCardProps[];
  isPrivateConversation: boolean;
  addMessage: (newMessage: MessageCardProps) => void;
  clearMessages: () => void;
  setConversationType: (conversationType: boolean) => void;
  setMessages: (newMessages: MessageCardProps[]) => void;
}

// hook that will be access in UI components
export const useConversation = create<MessageState>()((set) => ({
  messages: [],
  isPrivateConversation: false,
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
  clearMessages: () => set(() => ({ messages: [] })),
  setConversationType: (conversationType) => {
    set((state) => ({ ...state, isPrivateConversation: conversationType }));
  },
  setMessages: (newMessages) => {
    set((state) => ({ ...state, messages: newMessages }));
  },
}));
