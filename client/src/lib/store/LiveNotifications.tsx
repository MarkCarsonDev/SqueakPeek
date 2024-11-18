import { useProfile } from "@/lib/store/profile";
import { useEffect, useCallback } from "react";
import { fetchBookmarkOpportunities } from "@/lib/utils/fetchBookmarkOpportunities";
import { useAlert } from "@/lib/store/alert";
import { MessageNotificationCardProps } from "@/ui/message/MessageNotificationCard";
import { fetchPrivateConversations } from "@/lib/utils/fetchPrivateConversations";
import { fetchLatestPrivateMessage } from "@/lib/utils/fetchLatestPrivateMessage";
import { Database } from "@/lib/types/database.types";

import { useMessageNotification } from "@/lib/store/messageNotification";
export default function LiveNotifications() {
  const { profile } = useProfile();
  const { setAlert } = useAlert();
  const { setNotifications, setReadPrivateConversation } =
    useMessageNotification();
  // sets notifications based on user's bookmarked opportunities
  const setOpportunityBookmarksNotifications = useCallback(
    (profileId: string) => {
      fetchBookmarkOpportunities(profileId).then((res) => {
        const { data, error } = res;

        if (error) {
          setAlert({
            message: "Failed to fetch bookmarked company threads",
            type: "error",
          });
        } else if (data) {
          const mappedData: MessageNotificationCardProps[] = data.map(
            (item) => {
              const opportunity = item.opportunity;
              const conversationId = item.opportunity.company_thread.thread_id;
              return {
                avatar: opportunity.company_name[0],
                conversation_id: conversationId,
                header: opportunity.company_name,
                subHeader: `${opportunity.role_title},  ${opportunity.type}`,
                isRead: true,
              };
            }
          );

          setNotifications("publicNotifications", mappedData);
          setIsLoading(false);
        }
      });
    },
    [setNotifications, setAlert]
  );

  // sets notifications based on private conversations
  const setPrivateConversationNotifications = useCallback(
    (profileId: string) => {
      fetchPrivateConversations(profileId).then(async (res) => {
        const { data, error } = res;
        if (error) {
          setAlert({
            message: "Failed to fetch conversations",
            type: "error",
          });
        } else if (data) {
          const mappedData: MessageNotificationCardProps[] = await Promise.all(
            data.map(async (item) => {
              const { conversation_id, is_read } = item;
              const { avatar, username } =
                item.profile as unknown as Database["public"]["Tables"]["profile"]["Row"]; // it returns profile as an array of profiles
              const { data: privateMessageData } =
                await fetchLatestPrivateMessage(conversation_id); // fetches latest message on each conversation

              return {
                avatar,
                conversation_id,
                header: username,
                subHeader: privateMessageData
                  ? `${privateMessageData.sender_username}: ${privateMessageData.message}`
                  : "",
                isRead: is_read,
              };
            })
          );
          setNotifications("privateNotifications", mappedData);
        }
      });
    },
    [setNotifications, setAlert]
  );

  useEffect(() => {
    if (profile) {
      setPrivateConversationNotifications(profile.profile_id);

      setOpportunityBookmarksNotifications(profile.profile_id);
    }
  }, [
    profile,
    setOpportunityBookmarksNotifications,
    setPrivateConversationNotifications,
  ]);
  return null;
}
