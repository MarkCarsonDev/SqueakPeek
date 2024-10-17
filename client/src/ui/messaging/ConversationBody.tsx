"use client";
import { MessageCard, MessageCardProps } from "./MessageCard";
import { Chip } from "@mui/material";
import { useRef } from "react";

/**
 * Handles rendering messages
 * @param messages: Messages sent from users in a particular conversation
 */
export function ConversationBody({
  messages,
}: {
  messages: MessageCardProps[];
}) {
  const prevDate = useRef<Date | null>(null);

  return (
    <div
      style={{
        overflowY: "auto", // allows scrolling on the messages
      }}
    >
      <Chip
        style={{}}
        label="2 new messages"
        variant="outlined"
        sx={{
          position: "absolute",
          margin: "0 auto",
          top: "20%",
          borderColor: "#E0E4F2",
          borderWidth: "2px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",

          // centers chip horizontally relative to the
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={() => {}}
      />
      {messages.map((message) => {
        return (
          <MessageCard
            key={message.messageId}
            {...message}
            prevDate={prevDate}
          />
        );
      })}
    </div>
  );
}
