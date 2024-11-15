"use client";
import { MessageInput } from "./MessageInput";
import { ConversationHeader } from "./ConversationHeader";
import { ConversationBody } from "./ConversationBody";
import { useMessage } from "../../lib/store/message";
import { useState, useRef, useEffect, useMemo } from "react";
import { useProfile } from "../../lib/store/profile";
import { useSubscribeConversation } from "@/lib/hooks/useSubscribeConversation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchMessages } from "@/lib/utils/fetchMessages";
import { MessageCardProps } from "./MessageCard";
import { notFound } from "next/navigation";

/**
 * This is a UI container that holds all messages for a particular conversation
 * @param {string} conversationId - ID used to subscribe users to listen to incoming messages
 */
export function Conversation({
  conversationId,
  isPrivateConversation = false,
}: {
  conversationId: string;
  isPrivateConversation?: boolean;
}) {
  const { addMessage, clearMessages, setConversationType, setMessages } =
    useMessage();
  const { profile } = useProfile();
  const [numNewMessages, setNumNewMessages] = useState(0); // used for rendering new message notification
  const [isLoading, setIsLoading] = useState(true);
  const [pageNotFound, setNotFound] = useState(false);
  const bottomRef = useRef<null | HTMLDivElement>(null); // used for scrolling down the page
  const supabase = useMemo(() => createSupabaseClient(), []);

  // Resets numNewMessages to 0
  function resetNumNewMessages() {
    setNumNewMessages(0);
  }

  // determines if conversation exists
  useEffect(() => {
    const doesConversationExist = async () => {
      if (isPrivateConversation) {
        const { data, error } = await supabase
          .from("private_conversation")
          .select("conversation_id")
          .eq("conversation_id", conversationId)
          .single();
        return { data, error };
      } else {
        const { data, error } = await supabase
          .from("company_thread")
          .select("thread_id")
          .eq("thread_id", conversationId)
          .single();
        return { data, error };
      }
    };
    doesConversationExist().then((res) => {
      const { data, error } = res;
      console.log("data res: ", data);
      console.log("error: ", error);
      if (error || !data) {
        // TODO navigate to not found page
        setNotFound(true);
      }
    });
  }, [supabase, conversationId, isPrivateConversation]);

  // routes to not-found if conversation does not exist
  useEffect(() => {
    if (pageNotFound) {
      notFound();
    }
  }, [pageNotFound]);

  useSubscribeConversation(
    supabase,
    conversationId,
    addMessage,
    profile,
    setNumNewMessages
  );

  useEffect(() => {
    clearMessages();
    return () => clearMessages();
  }, [conversationId, clearMessages]);

  useEffect(() => {
    setConversationType(isPrivateConversation);
  }, [setConversationType, isPrivateConversation]);

  useEffect(() => {
    fetchMessages(conversationId, isPrivateConversation, supabase).then(
      (res) => {
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
          setIsLoading(false);
        }
      }
    );
  }, [supabase, conversationId, setMessages, isPrivateConversation]);

  return (
    <div
      style={{
        height: "calc(100vh - 80px)", // full viewport - height of nav bar
        backgroundColor: "white",
        display: "grid",
        gridTemplateRows: "10% 80% 10%",
      }}
    >
      {/* Header */}
      <ConversationHeader conversationId={conversationId} />

      {/* Messages */}
      <ConversationBody
        isLoading={isLoading}
        numNewMessages={numNewMessages}
        resetNumNewMessages={() => resetNumNewMessages()}
        bottomRef={bottomRef}
      />

      {/* Message Input */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 10px",
        }}
      >
        <MessageInput isLoading={isLoading} conversationId={conversationId} />
      </div>
    </div>
  );
}
