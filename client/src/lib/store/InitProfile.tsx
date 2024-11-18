"use client";
import { useProfile } from "./profile";
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createSupabaseClient } from "../supabase/client";

/**
 * Used as a profile store to be accessible throughout the pages
 * NOTE: This is not a UI component which is why it returns null
 */
export function InitProfile({ user }: { user: User | null }) {
  const { profile, initializeProfile } = useProfile((state) => state);
  useEffect(() => {
    // only calls when an authenticated user doesn't have their profile initialized
    if (user && profile === null) {
      const supabase = createSupabaseClient();
      supabase
        .from("profile")
        .select("*")
        .eq("user_id", user.id)
        .single()
        .then((res) => {
          const { data, error } = res;

          if (!error && data) {
            initializeProfile(data);
          }
        });
    }
  }, [profile, initializeProfile, user]);
  return null;
}
