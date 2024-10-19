"use client";
import { MessageCard, MessageCardProps } from "./MessageCard";
import { useRef, memo, useEffect } from "react";
import { NewMessagesNotification } from "./NewMessagesNotification";
import { MutableRefObject } from "react";
/**
 * Handles rendering messages
 * @param {MessageCardProps[]} messages - Messages sent from users in a particular conversation
 * @param {number} numNewMessages - The number of new messages was received
 * @param {() =>  void} resetNumNewMessages - Resets the number of new messages when invoked
 * @param {() => void} scrollDown - Vertically scrolls down the page when invoked
 * @param { MutableRefObject<HTMLDivElement | null>} bottomRef - Used as a reference to be able to scroll down the page when scrollDown is invoked
 */
export const ConversationBody = memo(function ConversationBody({
  messages,
  numNewMessages,
  resetNumNewMessages,
  bottomRef,
}: {
  messages: MessageCardProps[];
  numNewMessages: number;
  resetNumNewMessages: () => void;
  bottomRef: MutableRefObject<HTMLDivElement | null>;
}) {
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

  const prevDate = useRef<Date | null>(null); // used for rendering date divider
  const bodyRef = useRef<null | HTMLDivElement>(null);

  return (
    <div
      style={{
        overflowY: "auto", // allows vertical scrolling on the messages
      }}
      ref={bodyRef}
    >
      <NewMessagesNotification
        numNewMessages={numNewMessages}
        scrollDown={scrollDown}
        resetNumNewMessages={resetNumNewMessages}
      />
      {messages.map((message, index) => {
        return (
          <MessageCard
            key={message.messageId}
            {...message}
            prevDate={prevDate}
            scrollDown={index === messages.length - 1 ? scrollDown : undefined}
          />
        );
      })}

      {/* Used as a reference to scroll down the page */}
      <div
        ref={bottomRef}
        style={{
          backgroundColor: "yellow",
        }}
      />
    </div>
  );
});
