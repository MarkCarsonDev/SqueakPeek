import {
  MessageNotificationCardProps,
  MessageNotificationCard,
} from "./MessageNotificationCard";
import { usePathname } from "next/navigation";
import { useMessageNotification } from "@/lib/store/messageNotification";
/**
 *
 */
export function MessageNotificationCardList() {
  const { notifications } = useMessageNotification();

  const pathName = usePathname();
  const currentConversationId = pathName.split("/").at(-1); // tab is either company or private

  return notifications.map((notification) => (
    <MessageNotificationCard
      key={notification.conversation_id}
      {...notification}
      isSelected={currentConversationId === notification.conversation_id}
    />
  ));
}
