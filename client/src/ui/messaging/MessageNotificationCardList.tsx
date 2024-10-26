import {
  MessageNotificationCardProps,
  MessageNotificationCard,
} from "./MessageNotificationCard";

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
  return list.map((item) => <MessageNotificationCard {...item} />);
}
