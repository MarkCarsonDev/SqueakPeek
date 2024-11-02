// import { v4 as uuidv4 } from "uuid";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";


/**
 * Initializes an oportunity for a opportunity table, if it is not exist.
 *
 * @param opportunity - The ID of the opportunity as uuid.
 * @param roleTitle - The role title of the opportunity.
 * @param companyName -  The company name of the opportunity.
 * @param type - The type of the opportunity.
 * @returns A promise that resolves to opportunity or null if an error occurs or no thread is found.
    type: OpportunityType,
*/

export async function createOpportunity(
    supabase: SupabaseClient,
    roleTitle: string,
    companyName: string,
    type: Database["public"]["Enums"]["OpportunityType"],
): Promise<string | null> {
    console.log(roleTitle); // Log role title
    console.log(companyName); // Log company name

    // If no existing opportunity, create a new opportunity
    const { data, error } = await supabase
        .from("opportunity")
        .insert([
            {
                // opportunity_id: uuidv4(),
                role_title: roleTitle,
                company_name: companyName,
                type: type,
                created_at: new Date().toISOString(),
            },
        ])
        .select("opportunity_id");

    if (error) {
        console.error("Error initializing opportunity:", error.message);
        return null;
    }

    console.log("Opportunity initialized:", data);

    return data[0].opportunity_id;
}