import { createSupabaseClient } from "../supabase/client";

/**
 * Removes a record in the bookmark_opportunity table
 * @param opportunityId - Id of an opportunity
 * @param profileId - Id of the current user
 * @param supabase - Supabase client to make queries
 * @returns {data, error: PostgrestError}
 */
export async function removeBookmarkOpportunity(
  opportunityId: string,
  profileId: string,
  supabase = createSupabaseClient()
) {
  const { data, error } = await supabase
    .from("bookmark_opportunity")
    .delete()
    .eq("opportunity_id", opportunityId)
    .eq("profile_id", profileId);

  return { data, error };
}
