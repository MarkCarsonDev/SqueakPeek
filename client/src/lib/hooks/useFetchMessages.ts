import { fetchMessages } from "@/lib/utils/fetchMessages";
import { MessageCardProps } from "@/ui/message/MessageCard";
import { useEffect } from "react";
import { useConversation } from "../store/conversation";
import { createSupabaseClient } from "../supabase/client";
export const useFetchMessage = (
  conversationId: string,
  setIsLoading: (isLoading: boolean) => void,
  supabase = createSupabaseClient()
) => {
  const {
    isPrivateConversation,
    fetchCount,
    setMessages,
    incrementFetchCount,
  } = useConversation();
  useEffect(() => {
    fetchMessages(
      conversationId,
      isPrivateConversation,
      fetchCount,
      supabase
    ).then((res) => {
      const { error, data } = res;

      if (error) {
        // do something on the UI
      } else {
        const mappedData: MessageCardProps[] = data.map(
          ({
            created_at,
            sender_avatar,
            sender_username,
            message,
            message_id,
            sender_id,
          }) => ({
            avatar: sender_avatar,
            sender_username,
            timestamp: created_at,
            message,
            messageId: message_id,
            sender_id: sender_id!,
          })
        );
        setMessages(mappedData);
        incrementFetchCount();
        setIsLoading(false);
      }
    });
  }, [supabase, conversationId, setMessages, isPrivateConversation, fetchCount, incrementFetchCount, setIsLoading]);
};
