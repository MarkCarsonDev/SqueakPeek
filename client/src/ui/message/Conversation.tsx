"use client";
import { MessageInput } from "./MessageInput";
import { ConversationHeader } from "./ConversationHeader";
import { ConversationBody } from "./ConversationBody";
import Image from "next/image";
import { useMessage } from "../../lib/store/message";
import { useState, useRef, useEffect, useMemo } from "react";
import { useProfile } from "../../lib/store/profile";
import { useSubscribeConversation } from "@/lib/hooks/useSubscribeConversation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchCompanyThreadMessages } from "@/lib/utils/fetchCompanyThreadMessages";
import { MessageCardProps } from "./MessageCard";

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
  const bottomRef = useRef<null | HTMLDivElement>(null); // used for scrolling down the page
  const supabase = useMemo(() => createSupabaseClient(), []);

  // Resets numNewMessages to 0
  function resetNumNewMessages() {
    setNumNewMessages(0);
  }

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
    fetchCompanyThreadMessages(supabase, conversationId).then((res) => {
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
      }
    });
  }, [supabase, conversationId, setMessages]);

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
      {/* TODO: Make this consuem the metadata of an opportunity or user */}
      <ConversationHeader
        title="Amazon"
        subheader="Software Engineering, Internship"
        avatar={
          <Image
            alt="Profile of {company}"
            src="https://www.amazon.com/favicon.ico"
            width={50}
            height={50}
          />
        }
      />

      {/* Messages */}
      <ConversationBody
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
        <MessageInput conversationId={conversationId} />
      </div>
    </div>
  );
}
