"use client";
import { Typography, Tabs, Tab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useCallback, useState } from "react";
import { fetchLatestPrivateMessage } from "@/lib/utils/fetchLatestPrivateMessage";
import {
  faBuilding as solidBuilding,
  faMessage as solidMessage,
} from "@fortawesome/free-solid-svg-icons";

import {
  faBuilding as regularBuilding,
  faMessage as regularMessage,
} from "@fortawesome/free-regular-svg-icons";

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
/**
 * Allows the user to navigate between company threads or private messages in the message page
 */
export function SideNav() {
  const [isLoading, setIsLoading] = useState(true);
  const { setAlert } = useAlert();
  const { setNotifications, notifications } = useMessageNotification();
  const { profile } = useProfile();
  const pathName = usePathname();
  const tabs = [
    {
      label: "Company Threads",
      tabPathName: "company",
      solidIcon: solidBuilding,
      regularIcon: regularBuilding,
    },
    {
      label: "Private",
      tabPathName: "private",
      solidIcon: solidMessage,
      regularIcon: regularMessage,
    },
  ];
  const router = useRouter();
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
          setNotifications(mappedData);
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

          setNotifications(mappedData);
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
      } else {
        // currentTab == "private"
        // filter does not exist on delete.
        const bookmarkChannel = supabase
          .channel("private_changes")
          .on(
            "postgres_changes",
            {
              schema: "public", // Subscribes to the "public" schema in Postgres
              event: "INSERT", // Listen to all changes
              table: "private_user_conversation",
              filter: `receiver_id=eq.${profile.profile_id}`,
            },
            () => {
              setPrivateConversationNotifications(profile.profile_id);
            }
          )
          .subscribe();

        return () => {
          bookmarkChannel.unsubscribe();
        };
      }
    }
  }, [
    currentTab,
    profile,
    supabase,
    setPrivateConversationNotifications,
    setOpportunityBookmarksNotifications,
  ]);

  // sets notifications on page load
  useEffect(() => {
    if (profile) {
      if (currentTab === "private") {
        setPrivateConversationNotifications(profile.profile_id);
      } else {
        setOpportunityBookmarksNotifications(profile.profile_id);
      }
    }
  }, [
    currentTab,
    profile,
    setOpportunityBookmarksNotifications,
    setPrivateConversationNotifications,
  ]);

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
          Talk to other applicants in the process, or talk privately
        </Typography>
        <Tabs
          value={currentTab}
          TabIndicatorProps={{
            style: {
              background: "#496FFF",
            },
          }}
          sx={{
            marginTop: "20px",
            justifySelf: "center",
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            "&.Mui-selected": {
              color: "yellow",
              opacity: 1,
            },
            "&.Mui-focusVisible": {
              backgroundColor: "#d1eaff",
            },
          }}
        >
          {tabs.map(({ tabPathName, solidIcon, regularIcon, label }) => (
            <Tab
              value={tabPathName}
              key={tabPathName}
              sx={{
                padding: "0px",
                marginRight: "20px",
                "&.Mui-selected": {
                  color: "#496FFF",
                },
              }}
              icon={
                <FontAwesomeIcon
                  size="2x"
                  icon={
                    currentTab === tabPathName // gets the route name after the /message route
                      ? solidIcon
                      : regularIcon
                  }
                />
              }
              onClick={() => router.push(`/message/${tabPathName}`)}
              label={
                <Typography
                  sx={{
                    color: currentTab === tabPathName ? "#496FFF" : "#3C435C",
                  }}
                  variant="caption"
                >
                  {label}
                </Typography>
              }
            />
          ))}
        </Tabs>
      </div>
      <MessageNotificationCardList
        currentTab={currentTab}
        isLoading={isLoading}
      />
    </div>
  );
}
