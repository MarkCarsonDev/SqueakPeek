"use client";
import { Typography, Tabs, Tab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  faBuilding as solidBuilding,
  faMessage as solidMessage,
} from "@fortawesome/free-solid-svg-icons";

import {
  faBuilding as regularBuilding,
  faMessage as regularMessage,
} from "@fortawesome/free-regular-svg-icons";

import { usePathname } from "next/navigation";
/**
 * Allows the user to navigate between company threads or private messages in the message page
 */
export function SideNav() {
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
  const pathName = usePathname();
  const [currentTab, setCurrentTab] = useState(0);

  const setTab = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRight: "2px solid #E0E4F2",
        padding: "20px",
      }}
    >
      {" "}
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
        onChange={setTab}
        TabIndicatorProps={{
          hidden: true,
        }}
        sx={{
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
                  pathName.split("/")[2] === tabPathName // gets the route name after the /message route
                    ? solidIcon
                    : regularIcon
                }
              />
            }
            onClick={() => router.push(`/message/${tabPathName}`)}
            label={label}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </div>
  );
}
