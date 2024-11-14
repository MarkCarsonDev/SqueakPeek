import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "../supabase/client";

/**
 * Fetches all available opportunities with associated tracking data.
 * @param supabase - Supabase client
 * @returns {data: An array of opportunities with tracking details, error: PostgrestError}
 */
export async function fetchOpportunities(
  supabase: SupabaseClient = createSupabaseClient()
) {
  const { data, error } = await supabase
    .from("company_thread")
    .select(`
      *,
      opportunity:opportunity_id (*),
      opportunity_tracking:opportunity_id (*)
    `);

  console.log(data);
  return { data, error };
}
