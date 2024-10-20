"use client";
import { MessageCard, MessageCardProps } from "./MessageCard";
import { useRef, memo, useCallback, useEffect } from "react";
import { NewMessagesNotification } from "./NewMessagesNotification";
import { MutableRefObject } from "react";
import { useProfile } from "@/lib/store/profile";

/**
 * Handles rendering messages
 * @param {MessageCardProps[]} messages - Messages sent from users in a particular conversation
 * @param {number} numNewMessages - The number of new messages received
 * @param {() => void} resetNumNewMessages - Resets the number of new messages when invoked
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
  const { profile } = useProfile();
  const prevDate = useRef<Date | null>(null); // used for rendering date divider
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  const scrollThreshold = 20; // threshold for determining on whether page scrolls down on new messages

  // determines if the scroll page is flushed in the bottom
  const pageIsBottomFlushed = () => {
    if (bottomRef.current && scrollContainerRef.current) {
      const elementRect = bottomRef.current.getBoundingClientRect();
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      // console.log("elementRect: ", elementRect.top);
      // console.log("containerRect: ", containerRect.top);

      // Calculate if the element is within the visible bounds of the container
      const isVisible =
        elementRect.top >= containerRect.top &&
        elementRect.bottom <= containerRect.bottom + scrollThreshold &&
        elementRect.left >= containerRect.left &&
        elementRect.right <= containerRect.right;

      if (isVisible) {
        console.log("isVisible");
        // console.log("elementRect: ", elementRect.bottom);
        // console.log("containerRect: ", containerRect.bottom);
      }
      return isVisible;
    }
    return false;
  };

  // scrolls down to the latest message on page mount"
  function scrollDown() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  // scrolls down on first page render
  useEffect(() => {
    scrollDown();
  }, []);

  return (
    <div
      style={{
        overflowY: "auto", // allows vertical scrolling on the messages
      }}
      ref={scrollContainerRef}
    >
      <NewMessagesNotification
        numNewMessages={numNewMessages}
        scrollDown={scrollDown}
        resetNumNewMessages={resetNumNewMessages}
      />
      {messages.map((message, index) => {
        const doScrollDown =
          (index === messages.length - 1 &&
            profile?.username === message.sender_username) ||
          pageIsBottomFlushed();
        return (
          <MessageCard
            key={message.messageId}
            {...message}
            prevDate={prevDate}
            scrollDown={doScrollDown ? scrollDown : undefined}
          />
        );
      })}

      {/* Used as a reference to scroll down the page */}
      <div
        ref={bottomRef}
        style={{
          height: `${scrollThreshold}px`,
        }}
      />
    </div>
  );
});
