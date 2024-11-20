import { create } from "zustand";
import { MessageCardProps } from "@/ui/message/MessageCard";

// state of the hook
interface MessageState {
  messages: MessageCardProps[];
  fetchCount: number;
  isPrivateConversation: boolean;
  incrementFetchCount: () => void;
  addMessage: (newMessage: MessageCardProps) => void;
  clearConversation: () => void;
  setConversationType: (conversationType: boolean) => void;
  setMessages: (newMessages: MessageCardProps[]) => void;
}

// hook that will be access in UI components
export const useConversation = create<MessageState>()((set) => ({
  messages: [],
  fetchCount: 0,
  isPrivateConversation: false,
  incrementFetchCount: () =>
    set((state) => ({ fetchCount: state.fetchCount + 1 })),
  addMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
  clearConversation: () => set(() => ({ messages: [], fetchCount: 0 })),
  setConversationType: (conversationType) => {
    set(() => ({ isPrivateConversation: conversationType }));
  },
  setMessages: (newMessages) => {
    set(() => ({ messages: newMessages }));
  },
}));
