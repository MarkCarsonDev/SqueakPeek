import {
  MessageNotificationCardProps,
  MessageNotificationCard,
} from "./MessageNotificationCard";
import { usePathname } from "next/navigation";
/**
 *
 * @param {MessageNotificationCardProps} list: A list of MessageNotificationsCardProps
 * @returns
 */
export function MessageNotificationCardList({
  list,
}: {
  list: MessageNotificationCardProps[];
}) {
  const pathName = usePathname();
  const currentConversationId = pathName.split("/").at(-1); // tab is either company or private

  return list.map((item) => (
    <MessageNotificationCard
      key={item.conversation_id}
      {...item}
      isSelected={currentConversationId === item.conversation_id}
    />
  ));
}
