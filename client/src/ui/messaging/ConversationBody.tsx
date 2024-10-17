"use client";
import { MessageCard, MessageCardProps } from "./MessageCard";
import { useRef, memo } from "react";
import { NewMessagesNotification } from "./NewMessagesNotification";
import { MutableRefObject } from "react";
/**
 * Handles rendering messages
 * @param messages: Messages sent from users in a particular conversation
 */
export const ConversationBody = memo(function ConversationBody({
  messages,
  numNewMessages,
  resetNumNewMessages,
  scrollDown,
  bottomRef,
}: {
  messages: MessageCardProps[];
  numNewMessages: number;
  resetNumNewMessages: () => void;
  scrollDown: () => void;
  bottomRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const prevDate = useRef<Date | null>(null); // used for rendering date divider

  return (
    <div
      style={{
        overflowY: "auto", // allows vertical scrolling on the messages
      }}
    >
      <NewMessagesNotification
        numNewMessages={numNewMessages}
        scrollDown={scrollDown}
        resetNumNewMessages={resetNumNewMessages}
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
