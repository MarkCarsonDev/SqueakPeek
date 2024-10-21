"use client";
import { MessageCard } from "./MessageCard";
import { MessageInput } from "./MessageInput";
import { ConversationHeader } from "./ConversationHeader";
import Image from "next/image";
import { useMessage } from "../../../lib/store/message";

interface ConversationBodyProps {
  conversationId: string;
}

/**
 * This is a UI container that holds all messages for a particular conversation
 * Also allows to send messages to that particular conversation
 */
export function ConversationBody({ conversationId }: ConversationBodyProps) {
  console.log("convoID: ", conversationId);
  const { messages } = useMessage();

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
      <div
        style={{
          overflowY: "auto", // allows scrolling on the messages
        }}
      >
        {messages.map((message) => (
          <MessageCard key={message.messageId} {...message} />
        ))}
      </div>

      {/* Message Input */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 10px",
        }}
      >
        <MessageInput tableName = "private_message" />
      </div>
    </div>
  );
}
