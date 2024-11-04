import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";
import { SelectedFilters } from "@/ui/explore/Filters";


/**
 * Fetches all available opportunities
 * @param supabase - Supabase client
 * @returns {data: An array of opportunities, error: PostgrestError}
 */
export async function fetchOpportunities(
  supabase: SupabaseClient<Database>,
  filters: SelectedFilters
) {
  let query = supabase
    .from("company_thread")
    .select(
      `
      thread_id,
      opportunity:opportunity_id (
        *
      )
    `
    );

  // Apply filters
  if (filters.company && filters.company.length > 0) {
    query = query.in('opportunity.company_name', filters.company);
  }

  if (filters.jobPosition && filters.jobPosition.length > 0) {
    query = query.in('opportunity.role_title', filters.jobPosition);
  }

  // Add more filters here

  const { data, error } = await query;

  return { data, error };
}