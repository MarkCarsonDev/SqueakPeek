import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/database.types";

/**
 * Fetches opportunity tracking data for a given opportunity_id.
 * @param opportunity_id - Opportunity ID
 * @param supabase - Supabase client
 * @returns {data: Opportunity tracking data, error: Error}
 */

export async function FetchOpportunityStats(
    opportunity_id: string,
    supabase: SupabaseClient = createSupabaseClient()
): Promise<{ data: Database["public"]["Tables"]["opportunity_tracking"]["Row"][] | null; error: string | null }> {
    const { data, error } = await supabase
        .from("opportunity_tracking")
        .select("*")
        .eq("opportunity_id", opportunity_id)
        .order("month", { ascending: true });

    if (error) {
        //console.error("Error fetching opportunity tracking data:", error.message);
        return { data: null, error: error.message };
    }
    console.log(data);
    return { data: data, error: null };
}