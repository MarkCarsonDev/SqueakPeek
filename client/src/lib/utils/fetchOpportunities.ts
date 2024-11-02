import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "../supabase/client";

/**
 * Fetches all available opportunities
 * @param supabase - Supabase client
 * @returns {data: An array of opportunities, error: PostgrestError}
 */
export async function fetchOpportunities(
  supabase: SupabaseClient = createSupabaseClient()
) {
  const { data, error } = await supabase.from("company_thread").select(`
        *,
        opportunity:opportunity_id (*)
      `);
  return { data, error };
}
