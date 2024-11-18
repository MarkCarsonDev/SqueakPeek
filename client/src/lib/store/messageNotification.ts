import { create } from "zustand";
import { MessageNotificationCardProps } from "../../ui/message/MessageNotificationCard";

type NotificationType = "publicNotifications" | "privateNotifications";
interface MessageNotificationState {
  publicNotifications: MessageNotificationCardProps[];
  privateNotifications: MessageNotificationCardProps[];
  setNotifications: (
    type: NotificationType,
    newNotifications: MessageNotificationCardProps[]
  ) => void;
  removeNotification: (type: NotificationType, conversationId: string) => void;
  setReadPrivateConversation: (
    conversation_id: string,
    readValue: boolean
  ) => void;
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

    setReadPrivateConversation: (conversation_id, readValue) => {
      set((state) => {
        const { privateNotifications } = state;
        const newNotification = privateNotifications.find(
          (notification) => notification.conversation_id === conversation_id
        );
        const changeOrder = newNotification?.isRead !== readValue;

        if (changeOrder) {
          let newNotifications = privateNotifications.filter(
            (notification) => notification.conversation_id !== conversation_id
          );

          if (newNotification) {
            newNotifications = [
              { ...newNotification, isRead: readValue },
              ...newNotifications,
            ];
          }
          return { ...state, privateNotifications: newNotifications };
        } else {
          const newNotifications = privateNotifications.map((notification) => {
            if (notification.conversation_id === conversation_id) {
              notification.isRead = readValue;
            }
            return notification;
          });

          return { ...state, privateNotifications: newNotifications };
        }
      });
    },
  })
);
