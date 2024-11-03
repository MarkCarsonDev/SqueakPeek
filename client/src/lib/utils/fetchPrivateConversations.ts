import { createSupabaseClient } from "../supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Fetches private conversations of the current user
 * @param profile_id - The current user's profile id
 * @param supabase - The Supabase client to make queries
 * @returns {data: An array of private conversations from a particular user, error: PostgrestError}
 */
export async function fetchPrivateConversations(
  profile_id: string,
  supabase: SupabaseClient = createSupabaseClient()
) {
  const { data, error } = await supabase
    .from("private_user_conversation")
    .select("*, profile:profile!sender_id(profile_id, avatar, username)")
    .eq("sender_id", profile_id);
  return { data, error };
}
