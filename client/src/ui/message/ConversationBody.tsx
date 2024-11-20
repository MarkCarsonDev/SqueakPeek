"use client";
import { useRef, memo } from "react";
import { NewMessagesNotificationModal } from "./NewMessageNotificationModal";
import { MutableRefObject } from "react";
import { MessageList } from "./MessageList";
import { CircularProgress } from "@mui/material";

/**
 * Renders new message notifications, message list, and the message input
 * Handles the page scrolling for new messages and message input
 * @param {number} numNewMessages - The number of new messages received
 * @param {() => void} resetNumNewMessages - Resets the number of new messages when invoked
 * @param { MutableRefObject<HTMLDivElement | null>} bottomRef - Used as a reference to be able to scroll down the page when scrollDown is invoked
 */
export const ConversationBody = memo(function ConversationBody({
  numNewMessages,
  resetNumNewMessages,
  bottomRef,
  isLoading,
}: {
  numNewMessages: number;
  resetNumNewMessages: () => void;
  bottomRef: MutableRefObject<HTMLDivElement | null>;
  isLoading: boolean;
}) {
  // Scroll to the bottom of the element
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

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: "#496FFF",
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          overflowY: "auto", // allows vertical scrolling on the messages
        }}
        ref={scrollContainerRef}
      >
        <NewMessagesNotificationModal
          numNewMessages={numNewMessages}
          scrollDown={scrollDown}
          resetNumNewMessages={resetNumNewMessages}
        />

        <MessageList
          isPageBottomFlushed={pageIsBottomFlushed()}
          scrollDown={scrollDown}
        />

        {/* Used as a reference to scroll down the page */}
        <div
          ref={bottomRef}
          style={{
            height: `${scrollThreshold}px`,
          }}
        />
      </div>
    );
  }
});
