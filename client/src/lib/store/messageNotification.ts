import { create } from "zustand";
import { MessageNotificationCardProps } from "../../ui/message/MessageNotificationCard";
// state of the hook
interface MessageNotificationState {
  notifications: MessageNotificationCardProps[];
  setNotifications: (newNotifications: MessageNotificationCardProps[]) => void;
  removeNotification: (conversation_id: string) => void;
}

// hook that will be access in UI components
export const useMessageNotification = create<MessageNotificationState>()((set) => ({
  notifications: [],
  setNotifications: (newNotifications) =>
    set((state) => ({ ...state, notifications: newNotifications })),
  removeNotification: (conversation_id) =>
    set((state) => {
      const filteredNotifications = state.notifications.filter(
        (notification) => notification.conversation_id !== conversation_id
      );
      return { ...state, notifications: filteredNotifications };
    }),
}));
