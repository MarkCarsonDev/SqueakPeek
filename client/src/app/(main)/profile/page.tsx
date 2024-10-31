"use client"
import "@/app/(main)/profile/profile.css"
import { InputField } from "@/ui/InputField";
import { useState } from "react";
import { Button, Avatar, Typography } from "@mui/material";
export default function Page() {

  const avatars = [
    {
      profile: "/landingpage/track.svg",
      avatarType: "avatar1",
    },

    {
      profile: "/landingpage/insight.svg",
      avatarType: "avatar2",
    },
    {
      profile: "/landingpage/message.svg",
      avatarType: "avatar3",
    },
    {
      profile: "/landingpage/track.svg",
      avatarType: "avatar4",
    },
  ];

  const [chosenAvatar, setAvatar] = useState("");

  return (



    <div className="profile_page_container">
      <div className="edit_profile">
        <div className="avatar-container">
          {avatars.map(({ profile, avatarType }) => (
            <Avatar
              key={avatarType}
              src={profile}
              sx={{
                width: 80,
                height: 80,
                cursor: "pointer",
                margin: "0 10px",
                border:
                  avatarType === chosenAvatar
                    ? "4px solid #496FFF" // Highlight selected avatar
                    : "4px solid #E0E4F2", // Default border for unselected avatars
                opacity: avatarType === chosenAvatar ? 1 : 0.85,
                ":hover": {
                  opacity: 1,
                },
              }}
              onClick={() => setAvatar(avatarType)} // Select avatar on click
            />
          ))}
        </div>
        <InputField required label="Full Name"/>
        <InputField required label="Username"/>
        <InputField required label="Full Name"/>
      </div>
    </div>
  );

}

