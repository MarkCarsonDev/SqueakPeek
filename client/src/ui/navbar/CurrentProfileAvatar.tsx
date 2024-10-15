"use client";
import { useProfile } from "../../../lib/store/profile";
import { ProfileAvatar } from "../ProfileAvatar";
import { AvatarTypes } from "../ProfileAvatar";
/**
 * Returns the Avatar based on the profile's chosen avatar.
 */
export function CurrentProfileAvatar() {
  const { profile } = useProfile();
  const avatar = profile?.avatar as AvatarTypes;
  return <ProfileAvatar avatar={avatar} />;
}
