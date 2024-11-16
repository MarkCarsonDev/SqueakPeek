import { MessageNotificationCard } from "./MessageNotificationCard";
import { usePathname } from "next/navigation";
import { useMessageNotification } from "@/lib/store/messageNotification";
import { CardSkeleton } from "./CardSkeleton";
import { Typography } from "@mui/material";

interface MessageNotificationCardProps {
  isLoading: boolean;
  currentTab: string;
}
/**
 * Renders the list of message notifications
 */
export function MessageNotificationCardList({
  isLoading,
  currentTab,
}: MessageNotificationCardProps) {
  const { notifications } = useMessageNotification();

  const pathName = usePathname();
  const currentConversationId = pathName.split("/").at(-1); // tab is either company or private
  if (isLoading) {
    return [
      <CardSkeleton key={0} />,
      <CardSkeleton key={1} />,
      <CardSkeleton key={2} />,
    ];
  } else {
    if (notifications.length === 0) {
      // user has no notifications
      return (
        <>
          <Typography width={"100%"} textAlign={"center"}>
            {currentTab === "private"
              ? "Private Conversations Empty"
              : "Bookmarked Threads Empty"}
          </Typography>
        </>
      );
    } else {
      return notifications.map((notification) => (
        <MessageNotificationCard
          key={notification.conversation_id}
          {...notification}
          isSelected={currentConversationId === notification.conversation_id}
        />
      ));
    }
  }
}
