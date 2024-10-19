"use client";
import { MessageInput } from "./MessageInput";
import { ConversationHeader } from "./ConversationHeader";
import { ConversationBody } from "./ConversationBody";
import Image from "next/image";
import { useMessage } from "../../lib/store/message";
import { useState, useRef } from "react";
import { useProfile } from "../../lib/store/profile";
import { useSubscribeConversation } from "@/lib/hooks/useSubscribeConversation";

/**
 * This is a UI container that holds all messages for a particular conversation
 * @param {string} conversationId - ID used to subscribe users to listen to incoming messages
 */
export function Conversation({ conversationId }: { conversationId: string }) {
  const { addMessage, messages } = useMessage();
  const { profile } = useProfile();
  const [numNewMessages, setNumNewMessages] = useState(0); // used for rendering new message notification
  const bottomRef = useRef<null | HTMLDivElement>(null); // used for scrolling down the page

  // Resets numNewMessages to 0
  function resetNumNewMessages() {
    setNumNewMessages(0);
  }

  useSubscribeConversation(
    conversationId,
    addMessage,
    profile,
    setNumNewMessages
  );

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
