import { create } from "zustand";
import { MessageCardProps } from "@/ui/message/MessageCard";

// state of the hook
interface MessageState {
  messages: MessageCardProps[];
  fetchCount: number;
  isPrivateConversation: boolean;
  addMessage: (newMessage: MessageCardProps) => void;
  incrementFetchCount: () => void;
  clearConversation: () => void;
  setConversationType: (conversationType: boolean) => void;
  setMessages: (newMessages: MessageCardProps[]) => void;
}

// hook that will be access in UI components
export const useConversation = create<MessageState>()((set) => ({
  messages: [],
  fetchCount: 0,
  isPrivateConversation: false,
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
  incrementFetchCount: () =>
    set((state) => ({ ...state, fetchCount: state.fetchCount + 1 })),
  clearConversation: () => set(() => ({ messages: [], fetchCount: 0 })),
  setConversationType: (conversationType) => {
    set((state) => ({ ...state, isPrivateConversation: conversationType }));
  },
  setMessages: (newMessages) => {
    set((state) => ({ ...state, messages: newMessages }));
  },
}));
