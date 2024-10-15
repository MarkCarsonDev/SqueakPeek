"use client";
import { useProfile } from "../../../lib/store/profile";
import { Avatar } from "@mui/material";

type AvatarTypes =
  | "avatar1"
  | "avatar2"
  | "avatar3"
  | "avatar4"
  | null
  | undefined;

// TODO: Make a new component that renders the avatar based on the props passed in, instead of just the user's avatar
/**
 * Returns the Avatar based on the profile's chosen avatar.
 */
export function ProfileAvatar() {
  const { profile } = useProfile();
  const avatar = profile?.avatar as AvatarTypes;

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
