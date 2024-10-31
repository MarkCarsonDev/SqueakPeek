// ApplicationAction.ts
"use server";
import { createSupabaseClient } from "@/lib/supabase/client";

// This function checks for an existing opportunity and creates a new one if it doesn't exist
export async function findOrCreateOpportunity(
  role_title: string,
  company_name: string,
  type: "Internship" | "New Grad" | "Co-Op" // Use specific string union type
): Promise<string | null> {
  const supabase = createSupabaseClient();

  // Validate that `type` is one of the expected values
  const validTypes = ["Internship", "New Grad", "Co-Op"];
  if (!validTypes.includes(type)) {
    console.error("Invalid opportunity type:", type);
    return null;
  }

  // Check if the opportunity exists
  const { data: opportunityData, error: opportunityError } = await supabase
    .from("opportunity")
    .select("opportunity_id")
    .eq("role_title", role_title)
    .eq("company_name", company_name)
    .eq("type", type)
    .single();

  if (opportunityError && opportunityError.code !== "PGRST116") {
    console.error("Error querying opportunity:", opportunityError);
    return null;
  }

  if (opportunityData) {
    return opportunityData.opportunity_id;
  }

  // Insert new opportunity if not found
  const { data: newOpportunityData, error: newOpportunityError } = await supabase
    .from("opportunity")
    .insert([{ role_title, company_name, type }])
    .select("opportunity_id")
    .single();

  if (newOpportunityError) {
    console.error("Error creating new opportunity:", newOpportunityError);
    return null;
  }

  return newOpportunityData.opportunity_id;
}

// ApplicationAction.ts
export async function addApplicationWithOpportunityValidation(
  role_title: string,
  company_name: string,
  type: "Internship" | "New Grad" | "Co-Op", // Use specific string union type
  applicationData: any
): Promise<void> {
  // Ensure type is a valid opportunity type
  const validTypes = ["Internship", "New Grad", "Co-Op"];
  if (!validTypes.includes(type)) {
    console.error("Invalid opportunity type:", type);
    return;
  }

  // Find or create the opportunity
  const opportunity_id = await findOrCreateOpportunity(role_title, company_name, type);

  if (!opportunity_id) {
    console.error("Unable to find or create opportunity for the application.");
    return;
  }

  // Add the application with the found opportunity_id
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("application").insert([
    {
      ...applicationData,
      opportunity_id,
      status: applicationData.status, // or default status if not provided
    },
  ]);

  if (error) {
    console.error("Error adding application:", error);
  } else {
    console.log("Application added successfully:", data);
  }
}