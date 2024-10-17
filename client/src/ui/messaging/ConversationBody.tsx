"use client";
import { MessageCard, MessageCardProps } from "./MessageCard";
import { useRef, useEffect, memo } from "react";
import { NewMessagesNotification } from "./NewMessagesNotification";

/**
 * Handles rendering messages
 * @param messages: Messages sent from users in a particular conversation
 */
export const ConversationBody = memo(function ConversationBody({
  messages,
  numNewMessages,
  resetNumNewMessages,
}: {
  messages: MessageCardProps[];
  numNewMessages: number;
  resetNumNewMessages: () => void;
}) {
  const prevDate = useRef<Date | null>(null); // used for rendering date divider
  const bottomRef = useRef<null | HTMLDivElement>(null); // used for scrolling down the page

  // Scroll to the bottom of the element
  function scrollDown() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  // scrolls down to the latest message on page mount
  useEffect(() => {
    scrollDown();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      style={{
        overflowY: "auto", // allows scrolling on the messages
      }}
    >
      <NewMessagesNotification
        numNewMessages={numNewMessages}
        onClick={() => {
          scrollDown();
          resetNumNewMessages();
        }}
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

      {/* Used as a reference to scroll down the page */}
      <div ref={bottomRef} />
    </div>
  );
});
