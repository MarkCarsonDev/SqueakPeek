import React from "react";
import {
  faBuilding as solidBuilding,
  faMessage as solidMessage,
} from "@fortawesome/free-solid-svg-icons";

import {
  faBuilding as regularBuilding,
  faMessage as regularMessage,
} from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import { Typography, Tabs, Tab } from "@mui/material";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMessageNotification } from "@/lib/store/messageNotification";
interface SideNavTabsListProps {
  currentTab: string;
}
export default function SideNavTabsList({ currentTab }: SideNavTabsListProps) {
  const router = useRouter();
  const { privateNotifications } = useMessageNotification();
  const numPrivateNotifications = privateNotifications.filter(
    (notification) => notification.isRead === false
  ).length;
  return (
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
            <>
              {tabPathName === "private" && numPrivateNotifications > 0 && (
                <div
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                    bottom: "70%",
                    right: "20%",
                    backgroundColor: "red",
                    borderRadius: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                    }}
                    variant="caption"
                  >
                    {numPrivateNotifications}
                  </Typography>
                </div>
              )}
              <FontAwesomeIcon
                size="2x"
                icon={
                  currentTab === tabPathName // gets the route name after the /message route
                    ? solidIcon
                    : regularIcon
                }
              />
            </>
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
  );
}
