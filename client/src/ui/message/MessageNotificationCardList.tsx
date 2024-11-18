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
  const { privateNotifications, publicNotifications } =
    useMessageNotification();

  const pathName = usePathname();
  const currentConversationId = pathName.split("/").at(-1); // tab is either company or private
  if (isLoading) {
    return [
      <CardSkeleton key={0} />,
      <CardSkeleton key={1} />,
      <CardSkeleton key={2} />,
    ];
  } else {
    {
      if (currentTab == "company") {
        {
          return publicNotifications.length === 0 ? (
            <Typography width={"100%"} textAlign={"center"}>
              Bookmarked Threads Empty
            </Typography>
          ) : (
            publicNotifications.map((notification) => (
              <MessageNotificationCard
                key={notification.conversation_id}
                {...notification}
                isSelected={
                  currentConversationId === notification.conversation_id
                }
              />
            ))
          );
        }
      } else {
        return privateNotifications.length === 0 ? (
          <Typography width={"100%"} textAlign={"center"}>
            Private Conversations Empty
          </Typography>
        ) : (
          privateNotifications.map((notification) => (
            <MessageNotificationCard
              key={notification.conversation_id}
              {...notification}
              isSelected={
                currentConversationId === notification.conversation_id
              }
            />
          ))
        );
      }
    }
  }
}
