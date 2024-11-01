import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "../supabase/client";

export async function fetchOpportunities(
  supabase: SupabaseClient = createSupabaseClient()
) {
  const { data, error } = await supabase.from("company_thread").select(`
        *,
        opportunity:opportunity_id (*)
      `);
  return { data, error };
}
