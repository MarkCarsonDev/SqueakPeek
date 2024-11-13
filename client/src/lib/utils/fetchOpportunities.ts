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
  const searchPattern = filters.searchQuery ? `%${filters.searchQuery}%` : null;

  // Main query with filters for company, job position (role_title), and type
  let mainQuery = supabase
    .from("company_thread")
    .select(
      `
      thread_id,
      opportunity:opportunity_id (
        *
      )
    `,
      { count: "exact" }
    );

  // Apply company and job position filters if provided
  if (filters.company && filters.company.length > 0) {
    mainQuery = mainQuery.in("opportunity.company_name", filters.company);
  }

  if (filters.jobPosition && filters.jobPosition.length > 0) {
    mainQuery = mainQuery.in("opportunity.role_title", filters.jobPosition);
  }

  if (filters.jobType && filters.jobType.length > 0) {
    mainQuery = mainQuery.in("opportunity.type", filters.jobType);
  }

  // Exclude entries without a matching opportunity
  mainQuery = mainQuery.not("opportunity", "is", "null");

  // If no search query is provided, apply pagination and return main query results
  if (!searchPattern) {
    mainQuery = mainQuery.range(offset, offset + limit - 1);
    const { data: mainData, error: mainError, count } = await mainQuery;
    return { data: mainData, error: mainError, totalCount: count || 0 };
  }

  // Separate search queries for `role_title` and `company_name` using `ilike`
  const roleTitleQuery = supabase
    .from("company_thread")
    .select(
      `
      thread_id,
      opportunity:opportunity_id (
        *
      )
    `
    )
    .ilike("opportunity.role_title", searchPattern);

  const companyNameQuery = supabase
    .from("company_thread")
    .select(
      `
      thread_id,
      opportunity:opportunity_id (
        *
      )
    `
    )
    .ilike("opportunity.company_name", searchPattern);

    const jobTypeOptions: Database["public"]["Enums"]["OpportunityType"][] = [
      "Internship",
      "New Grad",
      "Co-Op",
      "Full-time",
      "Part-Time",
      "Contract",
    ];



  const typeMappings = Object.fromEntries(
    jobTypeOptions.map((typeValue: string) => [
      typeValue.toLowerCase().replace(/[^a-z]/g, ""),
      typeValue,
    ])
  );

// Find matching type based on normalized search query
const normalizedSearch = filters.searchQuery ? filters.searchQuery.toLowerCase().replace(/[^a-z]/g, "") : null;
const matchingType = normalizedSearch
  ? Object.keys(typeMappings).find((key) => key.includes(normalizedSearch))
  : null;

const typeQuery = matchingType
  ? supabase
      .from("company_thread")
      .select(
        `
        thread_id,
        opportunity:opportunity_id (
          *
        )
      `
      )
      .eq("opportunity.type", typeMappings[matchingType])
  : null;



  // Run the queries concurrently
  const [{ data: roleData }, { data: companyData }, typeResult] = await Promise.all([
    roleTitleQuery,
    companyNameQuery,
    typeQuery,
  ]);

  const typeData = typeResult ? typeResult.data : null;

  // Log the results for debugging
  console.log("roleData", roleData);
  console.log("companyData", companyData);
  console.log("typeData", typeData);

  // Combine results, filter out nulls, and deduplicate by `thread_id`
  const combinedData = [...(roleData || []), ...(companyData || []), ...(typeData || [])]
    .filter((item) => item.opportunity !== null);
  
  const uniqueData = Array.from(new Map(combinedData.map((item) => [item.thread_id, item])).values());

  // Paginate the unique results
  const paginatedData = uniqueData.slice(offset, offset + limit);

  return { data: paginatedData, error: null, totalCount: uniqueData.length };
}
