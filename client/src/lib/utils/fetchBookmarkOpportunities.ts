import { createSupabaseClient } from "../supabase/client";

/**
 * Fetches the bookmarked opportunities for a user
 * @param profileId - Id of the user's profile
 * @param supabase  - Supabase client to query database
 * @returns {data, error}
 */
export async function fetchBookmarkOpportunities(
  profileId: string,
  supabase = createSupabaseClient()
) {
  const { data, error } = await supabase
    .from("bookmark_opportunity")
    .select(
      "*, opportunity:opportunity!inner(*,company_thread:company_thread!inner(thread_id))"
    )
    .eq("profile_id", profileId);
  return { data, error };
}
