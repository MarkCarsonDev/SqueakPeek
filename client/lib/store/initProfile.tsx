"use client";
import { useProfile } from "./profile";
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";

/**
 * Used as a profile store to be accessible throughout the pages
 * NOTE: This is not a UI component which is why it returns null
 */
export default function InitProfile({ user }: { user: User | null }) {
  console.log("initprofile rendered");
  const { profile, initializeProfile } = useProfile((state) => state);

  //   console.log("user profile: ", profile);

  useEffect(() => {
    console.log("user profile: ", profile);

    // only calls when an authenticated user doesn't have their profile initialized
    if (user && profile === null) {
      initializeProfile({
        avatar: "avatar_1",
        created_at: new Date().toISOString(),
        profile_id: 12,
        school: "CSULB",
        username: "Bropharah",
        user_id: 11,
      });
    }
    console.log("user profile: ", profile);
  }, [profile]);
  return null;
}
