"use client";
import { MessageCard, MessageCardProps } from "./MessageCard";
import { Chip } from "@mui/material";
import { useRef, useEffect } from "react";

/**
 * Handles rendering messages
 * @param messages: Messages sent from users in a particular conversation
 */
export function ConversationBody({
  messages,
  numNewMessages,
}: {
  messages: MessageCardProps[];
  numNewMessages: number;
}) {
  const prevDate = useRef<Date | null>(null);
  const bottomRef = useRef<null | HTMLDivElement>(null);

  // Scroll to the bottom of the element

  function scrollDown() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    scrollDown();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      style={{
        overflowY: "auto", // allows scrolling on the messages
      }}
    >
      <Chip
        style={{}}
        label={`${numNewMessages} new messages`}
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
        onClick={() => scrollDown()}
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
      <div ref={bottomRef} />
    </div>
  );
}
