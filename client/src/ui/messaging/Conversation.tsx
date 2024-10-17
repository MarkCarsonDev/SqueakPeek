"use client";
import { MessageInput } from "./MessageInput";
import { ConversationHeader } from "./ConversationHeader";
import { ConversationBody } from "./ConversationBody";
import Image from "next/image";
import { useMessage } from "../../../lib/store/message";
import { createSupabaseClient } from "../../../lib/supabase/client";
import { useEffect, useState } from "react";
import { useProfile } from "../../../lib/store/profile";
import { MessageCardProps } from "./MessageCard";
interface ConversationBodyProps {
  conversationId: string;
}

/**
 * This is a UI container that holds all messages for a particular conversation
 * Also allows to send messages to that particular conversation
 */
export function Conversation({ conversationId }: ConversationBodyProps) {
  const { addMessage, messages } = useMessage();
  const { profile } = useProfile();
  const [numNewMessages, setNumNewMessages] = useState(0);

  function resetNumNewMessages() {
    setNumNewMessages(0);
  }
  useEffect(() => {
    const supabase = createSupabaseClient();

    // Client joins conversation, and listens to messages
    const listenerChannel = supabase.channel(conversationId);

    // Subscribe to the Channel
    listenerChannel
      .on("broadcast", { event: "conversation" }, async (payload) => {
        // TODO check if payload is valid first
        // TODO: Payload is type of 'any' on this. If possible make this more explicit
        const newMessage = payload.payload.message as MessageCardProps;
        addMessage(newMessage);

        if (newMessage.sender_username !== profile?.username) {
          setNumNewMessages((prev) => prev + 1);
        }
      })
      .subscribe();

    // unsubscribes once component unmounts
    return () => {
      listenerChannel.unsubscribe();
    };
  }, [addMessage, conversationId, profile]);

  return (
    <div
      style={{
        height: "90vh", // not 100vh since it takes into account the navigation bar
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
        messages={messages}
        numNewMessages={numNewMessages}
        resetNumNewMessages={() => resetNumNewMessages()}
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
