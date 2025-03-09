"use client";
import { Avatar, Skeleton } from "@mui/material";
import { AvatarProps } from "@mui/material";
import { Database } from "@/lib/types/database.types";

export type AvatarTypes = Database["public"]["Enums"]["Avatar"];
/**
 * Returns the Avatar based on the avatar prop
 * Returns a loading skeleton if Avatar is null
 */
export function ProfileAvatar({
  avatar,
  width = 55,
  height = 55,
  ...props
}: {
  avatar: AvatarTypes;
  width?: number;
  height?: number;
} & AvatarProps) {
  // TODO: Change this to the actual mapping to the correct avatar images
  // TODO (BUG): On page refresh, or any situation that turns profile = null, it defaults to the image, creating a janky look when profile is initialize
  const avatarMaps = {
    avatar1: "/avatars/cool_rat.svg",
    avatar2: "/avatars/incognito_rat.svg",
    avatar3: "/avatars/peephole_rat.svg",
    avatar4: "/avatars/professional_rat.svg",
  };

  // Hacky fix to make skeleton loader approximately same size as Profile
  const SKELETON_SIZE_DIFF = 15;

  if (avatar) {
    return (
      <Avatar
        style={{
          width: width,
          height: height,
        }}
        src={avatarMaps[avatar]}
        {...props}
      />
    );
  } else {
    return (
      <Skeleton
        width={width - SKELETON_SIZE_DIFF}
        height={height - SKELETON_SIZE_DIFF}
        variant="circular"
      />
    );
  }
}
