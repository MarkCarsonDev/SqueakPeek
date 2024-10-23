"use client";
import { Typography, Tabs, Tab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
          label="Company Threads"
          iconPosition="start"
          onClick={() => router.push("/message/company")}
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
          onClick={() => router.push("/message/private")}
          label="Private Messages"
          iconPosition="start"
        />
      </Tabs>
    </div>
  );
}
