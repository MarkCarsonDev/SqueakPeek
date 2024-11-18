"use client";
import { useEffect, useMemo, useCallback } from "react";
import { useProfile } from "@/lib/store/profile";
import { createSupabaseClient } from "../supabase/client";
import { fetchPrivateConversations } from "@/lib/utils/fetchPrivateConversations";
import { MessageNotificationCardProps } from "@/ui/message/MessageNotificationCard";
import { fetchLatestPrivateMessage } from "@/lib/utils/fetchLatestPrivateMessage";
import { Database } from "@/lib/types/database.types";
import { useMessageNotification } from "./messageNotification";
export default function LiveNotifications() {
  const { profile } = useProfile();
  const supabase = useMemo(() => createSupabaseClient(), []);

  const { setNotifications, setReadPrivateConversation } =
    useMessageNotification();
  const setPrivateConversationNotifications = useCallback(
    (profileId: string) => {
      fetchPrivateConversations(profileId).then(async (res) => {
        const { data } = res;
        if (data) {
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
    [setNotifications]
  );
  // tracks live changes which sets message notifications in real time
  useEffect(() => {
    if (profile) {
      console.log("reado to listen for live notifications hiii");
      // currentTab == "private"
      // filter does not exist on delete.
      const privateChannel = supabase
        .channel("private_notifications")
        .on(
          "postgres_changes",
          {
            schema: "public", // Subscribes to the "public" schema in Postgres
            event: "INSERT", // Listen to all changes
            table: "private_user_conversation",
            filter: `sender_id=eq.${profile.profile_id}`,
          },
          (payload) => {
            console.log("payload: ", payload);
            setPrivateConversationNotifications(profile.profile_id);
          }
        )
        .on(
          "postgres_changes",
          {
            schema: "public", // Subscribes to the "public" schema in Postgres
            event: "UPDATE", // Listen to all changes
            table: "private_user_conversation",
            filter: `sender_id=eq.${profile.profile_id}`,
          },
          (payload) => {
            const newNotification =
              payload.new as Database["public"]["Tables"]["private_user_conversation"]["Row"];
            setReadPrivateConversation(
              newNotification.conversation_id,
              newNotification.is_read
            );
          }
        )
        .subscribe();

      return () => {
        privateChannel.unsubscribe();
      };
    }
  }, [
    profile,
    supabase,
    setPrivateConversationNotifications,
    setReadPrivateConversation,
  ]);
  return null;
}
