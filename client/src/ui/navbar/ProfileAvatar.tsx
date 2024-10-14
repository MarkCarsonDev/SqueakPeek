"use client";
import { useProfile } from "../../../lib/store/profile";
import { Avatar } from "@mui/material";

type AvatarTypes =
  | "avatar_1"
  | "avatar_2"
  | "avatar_3"
  | "avatar_4"
  | null
  | undefined;

/**
 * Returns the Avatar based on the profile's chosen avatar.
 */
export function ProfileAvatar() {
  const { profile } = useProfile();
  const avatar = profile?.avatar as AvatarTypes;

  // TODO: Change this to the actual mapping to the correct avatar images
  // TODO (BUG): On page refresh, or any situation that turns profile = null, it defaults to the image, creating a janky look when profile is initialize
  const avatarMaps = {
    avatar_1: "/landingpage/insight.svg",
    avatar_2: "/landingpage/message.svg",
    avatar_3: "/landingpage/track.svg",
    avatar_4: "/landingpage/track.svg",
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
