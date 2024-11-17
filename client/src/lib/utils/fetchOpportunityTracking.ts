import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "../supabase/client";

/**
 * Fetches all available opportunities with associated tracking data.
 * @param supabase - Supabase client
 * @returns {data: An array of opportunities with tracking details, error: PostgrestError}
 */
export async function fetchOpportunityTracking(
  supabase: SupabaseClient = createSupabaseClient()
) {
  const { data, error } = await supabase
  .from("opportunity_tracking")
  .select("*");

  return { data, error };
}
