import { createSupabaseClient } from "../supabase/client";

/**
 * Inserts a record in the bookmark_opportunity table
 * @param opportunityId - Id of an opportunity
 * @param profileId - Id of the current user
 * @param supabase - Supabase client to make queries
 * @returns {data, error: PostgrestError}
 */
export async function insertBookmarkOpportunity(
  opportunityId: string,
  profileId: string,
  supabase = createSupabaseClient()
) {
  const { data, error } = await supabase.from("bookmark_opportunity").insert({
    profile_id: profileId,
    opportunity_id: opportunityId,
  });

  return { data, error };
}
