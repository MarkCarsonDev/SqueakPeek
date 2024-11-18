"use client";
import { Typography } from "@mui/material";
import { useEffect, useMemo, useCallback, useState } from "react";
import { fetchLatestPrivateMessage } from "@/lib/utils/fetchLatestPrivateMessage";

import { usePathname } from "next/navigation";
import { MessageNotificationCardProps } from "./MessageNotificationCard";
import { MessageNotificationCardList } from "./MessageNotificationCardList";
import { fetchPrivateConversations } from "@/lib/utils/fetchPrivateConversations";
import { useProfile } from "@/lib/store/profile";
import { Database } from "@/lib/types/database.types";
import { fetchBookmarkOpportunities } from "@/lib/utils/fetchBookmarkOpportunities";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useMessageNotification } from "@/lib/store/messageNotification";
import { useAlert } from "@/lib/store/alert";
import SideNavTabsList from "./SideNavTabsList";
/**
 * Allows the user to navigate between company threads or private messages in the message page
 */
export function SideNav() {
  const [isLoading, setIsLoading] = useState(true);
  const { setAlert } = useAlert();
  const { setNotifications, setReadPrivateConversation, privateNotifications } =
    useMessageNotification();
  const { profile } = useProfile();
  const pathName = usePathname();

  const currentTab = pathName.split("/")[2]; // tab is either company or private
  const supabase = useMemo(() => createSupabaseClient(), []);

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
          setIsLoading(false);
        }
      });
    },
    [setNotifications, setAlert]
  );

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

  // TODO: Need to test this

  // tracks live changes which sets message notifications in real time
  useEffect(() => {
    setIsLoading(true);
    if (profile) {
      // currentTab == "private"
      // filter does not exist on delete.
      const privateChannel = supabase
        .channel("private_changes")
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

      if (currentTab === "company") {
        // filter does not exist on delete.
        const bookmarkChannel = supabase
          .channel("bookmark_opportunity_changes")
          .on(
            "postgres_changes",
            {
              schema: "public", // Subscribes to the "public" schema in Postgres
              event: "INSERT", // Listen to all changes
              table: "bookmark_opportunity",
              filter: `profile_id=eq.${profile.profile_id}`,
            },
            () => setOpportunityBookmarksNotifications(profile.profile_id)
          )
          .subscribe();

        return () => {
          bookmarkChannel.unsubscribe();
        };
      }

      return () => {
        privateChannel.unsubscribe();
      };
    }
  }, [
    currentTab,
    profile,
    supabase,
    setPrivateConversationNotifications,
    setOpportunityBookmarksNotifications,
    setReadPrivateConversation,
  ]);

  // sets notifications on page load
  useEffect(() => {
    if (profile) {
      setPrivateConversationNotifications(profile.profile_id);
      if (currentTab === "company") {
        setOpportunityBookmarksNotifications(profile.profile_id);
      }
    }
  }, [
    currentTab,
    profile,
    setOpportunityBookmarksNotifications,
    setPrivateConversationNotifications,
  ]);

  useEffect(() => {
    supabase.channel("");
  }, [supabase]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRight: "3px solid #E0E4F2",
        overflowY: "auto",
      }}
    >
      {" "}
      <div
        style={{
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          Messages
        </Typography>
        <Typography>
          Talk to other applicants in the process, or talk privately{" "}
          {
            privateNotifications.filter(
              (notification) => notification.isRead === false
            ).length
          }
        </Typography>
      <SideNavTabsList currentTab={currentTab} />
      </div>
      <MessageNotificationCardList
        currentTab={currentTab}
        isLoading={isLoading}
      />
    </div>
  );
}
