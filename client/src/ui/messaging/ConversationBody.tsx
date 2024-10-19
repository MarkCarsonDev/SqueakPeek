"use client";
import { MessageCard, MessageCardProps } from "./MessageCard";
import { useRef, memo, useEffect } from "react";
import { NewMessagesNotification } from "./NewMessagesNotification";
import { MutableRefObject } from "react";

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

  const scrollThreshold = 30;
  function scrollDown() {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const isVisibleInContainer = () => {
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

  // scrolls down to the latest message on page mount
  useEffect(() => {
    scrollDown();
  }, []); // Empty dependency array ensures this runs only once on mount

  const prevDate = useRef<Date | null>(null); // used for rendering date divider
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const handleScroll = () => {
        isVisibleInContainer();
      };

      scrollContainerRef.current.addEventListener("scroll", handleScroll);

      return () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.removeEventListener(
            "scroll",
            handleScroll
          );
        }
      };
    }
  }, [scrollContainerRef]);

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
          height: `${scrollThreshold}px`,
        }}
      >
        Hello
      </div>
    </div>
  );
});
