import { useConversation } from "@/lib/store/conversation";
import { useProfile } from "@/lib/store/profile";
import { DateDivider } from "./DateDivider";
import { MessageCard } from "./MessageCard";
import { memo, useEffect } from "react";
interface MessageListProps {
  isPageBottomFlushed: boolean;
  scrollDown: (isSmooth: boolean) => void;
}
/**
 * Handles rendering a list of messages from zustand store
 * Handles when DateDivider component is rendered
 * @param {boolean} isPageBottomFlushed - Used to determine if DateDivider is rendered
 * @param {() => void} scrollDown - A function that scrolls the page down when invoked
 */
export const MessageList = memo(function MessageList({
  isPageBottomFlushed,
  scrollDown,
}: MessageListProps) {
  const { messages } = useConversation();
  const { profile } = useProfile();

  // scrolls down on first page render
  useEffect(() => {
    scrollDown(false);
  }, []);

  // determines if DateDivider should be rendered
  function doRenderDateDivider(
    index: number,
    currentDate: Date,
    prevDate?: Date
  ): boolean {
    if (index === 0) return true;
    if (currentDate.getDay() !== prevDate?.getDay()) return true;
    return false;
  }

  function doScrollDown(index: number, sender_username: string) {
    if (
      (index === messages.length - 1 &&
        profile?.username === sender_username) ||
      isPageBottomFlushed
    )
      return (
        (index === messages.length - 1 &&
          profile?.username === sender_username) ||
        isPageBottomFlushed
      );
  }

  return messages.map((message, index) => {
    let prevDate: undefined | Date;
    if (index > 0) prevDate = new Date(messages[index - 1].timestamp);
    return (
      <div key={message.messageId}>
        {doRenderDateDivider(index, new Date(message.timestamp), prevDate) && (
          <DateDivider messageDate={new Date(message.timestamp)} />
        )}
        <MessageCard
          {...message}
          scrollDown={
            doScrollDown(index, message.sender_username)
              ? () => scrollDown(true)
              : undefined
          }
        />
      </div>
    );
  });
});
