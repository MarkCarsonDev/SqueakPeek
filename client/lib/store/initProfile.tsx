"use client";
import { useProfile } from "./profile";
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";

/**
 * Used as a profile store to be accessible throughout the pages
 * NOTE: This is not a UI component which is why it returns null
 */
export default function InitProfile({ user }: { user: User | null }) {
  const { profile, initializeProfile } = useProfile((state) => state);

  useEffect(() => {
    // only calls when an authenticated user doesn't have their profile initialized
    if (user && profile === null) {
      // TODO: Switch this to the actual profile received from the actual user
      initializeProfile({
        avatar: "avatar_2",
        created_at: new Date().toISOString(),
        school: "CSULB",
        username: "Bropharah",
        user_id: "",
        profile_id: "",
      });
    }
  }, [profile, initializeProfile, user]);
  return null;
}
