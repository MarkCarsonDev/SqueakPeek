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

interface SideNavTabsListProps {
  currentTab: string;
}
export default function SideNavTabsList({ currentTab }: SideNavTabsListProps) {
  const router = useRouter();

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
  );
}
