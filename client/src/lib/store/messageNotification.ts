import { create } from "zustand";
import { MessageNotificationCardProps } from "../../ui/message/MessageNotificationCard";
// state of the hook

type NotificationType = "publicNotifications" | "privateNotifications";
interface MessageNotificationState {
  publicNotifications: MessageNotificationCardProps[];
  privateNotifications: MessageNotificationCardProps[];
  setNotifications: (
    type: NotificationType,
    newNotifications: MessageNotificationCardProps[]
  ) => void;
  removeNotification: (type: NotificationType, conversationId: string) => void;
}

// hook that will be access in UI components
export const useMessageNotification = create<MessageNotificationState>()(
  (set) => ({
    publicNotifications: [],
    privateNotifications: [],
    setNotifications: (type, newNotifications) => {
      if (type === "publicNotifications") {
        set((state) => ({ ...state, publicNotifications: newNotifications }));
      } else {
        set((state) => ({ ...state, privateNotifications: newNotifications }));
      }
    },

    removeNotification: (type, conversation_id) => {
      if (type === "publicNotifications") {
        set((state) => {
          const filteredNotifications = state.publicNotifications.filter(
            (notification) => notification.conversation_id !== conversation_id
          );
          return { ...state, publicNotifications: filteredNotifications };
        });
      } else {
        set((state) => {
          const filteredNotifications = state.privateNotifications.filter(
            (notification) => notification.conversation_id !== conversation_id
          );
          return { ...state, privateNotifications: filteredNotifications };
        });
      }
    },
  })
);
