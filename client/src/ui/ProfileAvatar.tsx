"use client";
import { Avatar } from "@mui/material";

type AvatarTypes =
  | "avatar1"
  | "avatar2"
  | "avatar3"
  | "avatar4"
  | null
  | undefined;

/**
 * Returns the Avatar based on the profile's chosen avatar.
 */
export function ProfileAvatar(avatar: AvatarTypes) {
  // TODO: Change this to the actual mapping to the correct avatar images
  // TODO (BUG): On page refresh, or any situation that turns profile = null, it defaults to the image, creating a janky look when profile is initialize
  const avatarMaps = {
    avatar1: "/landingpage/insight.svg",
    avatar2: "/landingpage/message.svg",
    avatar3: "/landingpage/track.svg",
    avatar4: "/landingpage/track.svg",
  };
  return (
    <Avatar
      style={{
        width: "55px",
        height: "55px",
      }}
      src={avatar ? avatarMaps[avatar] : "/landingpage/track.svg"}
    />
  );
}
