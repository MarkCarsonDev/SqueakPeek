import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";
import { createSupabaseClient } from "@/lib/supabase/client";

/**
 * Initializes an opportunity for the opportunity table, if it does not exist.
 *
 * @param roleTitle - The role title of the opportunity.
 * @param companyName - The company name of the opportunity.
 * @param type - The type of the opportunity.
 * @param supabase - Optional Supabase client.
 * @returns A promise that resolves to the opportunity ID or null if an error occurs.
 */
export async function createOpportunity(
  roleTitle: string,
  companyName: string,
  type: Database["public"]["Enums"]["OpportunityType"],
  supabase: SupabaseClient = createSupabaseClient()
): Promise<{ data: { opportunity_id: string }[] | null; error: PostgrestError | null }> {
  console.log(roleTitle); // Log role title
  console.log(companyName); // Log company name

  // If no existing opportunity, create a new opportunity
  const { data, error } = await supabase
    .from("opportunity")
    .insert([
      {
        role_title: roleTitle,
        company_name: companyName,
        type: type,
        created_at: new Date().toISOString(),
      },
    ])
    .select("opportunity_id");

  if (error) {
    console.error("Error initializing opportunity:", error.message);
    return { data: null, error };
  }

  //console.log("Opportunity initialized:", data);

  return { data, error: null };
}