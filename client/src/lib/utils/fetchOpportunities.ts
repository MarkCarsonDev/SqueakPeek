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

    if (filters.company) {
      const companies = filters.company[0]?.split(',') || [];
      if (companies.length > 0) {
        mainQuery = mainQuery.in("opportunity.company_name", companies);
      }
    }
  
    if (filters.jobPosition) {
      const positions = filters.jobPosition[0]?.split(',') || [];
      if (positions.length > 0) {
        mainQuery = mainQuery.in("opportunity.role_title", positions);
      }
    }
  
    if (filters.jobType) {
      const jobTypes = filters.jobType[0]?.split(',') || [];
      if (jobTypes.length > 0) {
        mainQuery = mainQuery.in("opportunity.type", jobTypes);
      }
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
      typeValue.toLowerCase().replace(/[^a-z0-9]/g, ""),
      typeValue,
    ])
  );

// Find matching type based on normalized search query
const normalizedSearch = filters.searchQuery ? filters.searchQuery.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
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

    console.log("combinedData", combinedData);

// Get mainData with applied filters and all search query matches, then filter for intersection
const combinedThreadIds = new Set(combinedData.map((item) => item.thread_id));

const { data: mainData, error: mainError, count } = await mainQuery;
const filteredData = (mainData || []).filter(
  (item) => combinedThreadIds.has(item.thread_id)
);

// Paginate the filtered results
const paginatedData = filteredData.slice(offset, offset + limit);


return { data: paginatedData, error: null, totalCount: filteredData.length };

}
