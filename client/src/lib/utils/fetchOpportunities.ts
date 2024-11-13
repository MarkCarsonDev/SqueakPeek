import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";
import { SelectedFilters } from "@/ui/explore/Filters";

/**
 * Fetches opportunities with applied filters and pagination.
 * @param supabase - Supabase client
 * @param filters - Selected filters to apply
 * @param limit - Number of records to fetch
 * @param offset - Number of records to skip
 * @returns {data: An array of opportunities, error: PostgrestError, totalCount: number}
 */
export async function fetchOpportunities(
  supabase: SupabaseClient<Database>,
  filters: SelectedFilters,
  limit: number,
  offset: number
) {
  let query = supabase
    .from("company_thread")
    .select(
      `
      thread_id,
      opportunity:opportunity_id (
        *
      )
    `,
      { count: "exact" } // To get the total count
    )
    .range(offset, offset + limit - 1);

  // Apply filters
  if (filters.company && filters.company.length > 0) {
    query = query.in('opportunity.company_name', filters.company);
  }

  if (filters.jobPosition && filters.jobPosition.length > 0) {
    query = query.in('opportunity.role_title', filters.jobPosition);
  }

  // Exclude those that are unmatched due to the filters
  query = query.not('opportunity', 'is', 'null');

  const { data, error, count } = await query;
  console.log("Fetched data:", data); // Log the fetched data

  return { data, error, totalCount: count };
}
