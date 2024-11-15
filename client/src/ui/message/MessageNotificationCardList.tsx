import { MessageNotificationCard } from "./MessageNotificationCard";
import { usePathname } from "next/navigation";
import { useMessageNotification } from "@/lib/store/messageNotification";
import { CardSkeleton } from "./CardSkeleton";

interface MessageNotificationCardProps {
  isLoading: boolean;
}
/**
 * Renders the list of message notifications
 */
export function MessageNotificationCardList({
  isLoading,
}: MessageNotificationCardProps) {
  const { notifications } = useMessageNotification();

  const pathName = usePathname();
  const currentConversationId = pathName.split("/").at(-1); // tab is either company or private

  if (isLoading) {
    return [<CardSkeleton key={0} />, <CardSkeleton key={1} />, <CardSkeleton key={2} />];
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
