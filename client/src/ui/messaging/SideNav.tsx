"use client";
import { Typography, Tabs, Tab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const pathName = usePathname();
  console.log("pathName: ", pathName);

  return (
    <div>
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
      <Tabs>
        <Tab
          icon={
            <FontAwesomeIcon
              size="2x"
              icon={
                pathName === "/message/company"
                  ? solidBuilding
                  : regularBuilding
              }
            />
          }
          href="company"
          label="Company Threads"
          iconPosition="start"
        />
        <Tab
          icon={
            <FontAwesomeIcon
              size="2x"
              icon={
                pathName === "/message/private" ? solidMessage : regularMessage
              }
            />
          }
          href="private"
          label="Private Messages"
          iconPosition="start"
        />
      </Tabs>
    </div>
  );
}
