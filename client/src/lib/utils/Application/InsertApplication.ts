import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";
import { createOpportunity } from "@/lib/utils/Application/createOpportunity";
import { Profile } from "../../store/profile";
import { Application } from "@/lib/store/track";
import { createSupabaseClient } from "@/lib/supabase/client";

export async function InsertApplication(
  profile: Profile,
  application: Application,
  supabase: SupabaseClient = createSupabaseClient()
): Promise<{ data: string | null; error: PostgrestError | null }> {
  const { data: opportunityData, error: opportunityError } = await supabase
    .from("opportunity")
    .select("opportunity_id")
    .eq("role_title", application.role_title)
    .eq("company_name", application.company_name)
    .eq("type", application.type);

  let opportunityId: string | null;
  if (opportunityError) {
    console.log("Error finding opportunity:", opportunityError.message); // This should be never printed, but here just for debugging
  }

  if (opportunityData && opportunityData.length > 0) {
    console.log("Opportunity found:", opportunityData[0].opportunity_id); // This should be never printed, but here just for debugging
    opportunityId = opportunityData[0].opportunity_id;
  } else {
    const { data, error } = await createOpportunity(
      application.role_title,
      application.company_name,
      application.type as Database["public"]["Enums"]["OpportunityType"],
      supabase
    );
    if (error) {
      console.error("Error creating opportunity:", error.message);
      return { data: null, error };
    }
    if (data && data.length > 0) {
      opportunityId = data[0].opportunity_id;
    } else {
      console.error("Error: No opportunity data returned");
      return { data: null, error: { message: "No opportunity data returned" } as PostgrestError };
    }
  }

  if (!opportunityId) {
    console.error("Failed to find or create opportunity");
    return { data: null, error: { message: "Failed to find or create opportunity" } as PostgrestError };
  }

  const newApplication: Omit<
    Database["public"]["Tables"]["application"]["Row"],
    "application_id"
  > = {
    opportunity_id: opportunityId,
    profile_id: profile.profile_id,
    role_title: application.role_title,
    company_name: application.company_name,
    type: application.type,
    status: application.status,
    currentScore: application.currentScore,
    interviewing_round: application.interviewing_round,
    link: application.link,
    location: application.location,
    created_at: new Date().toISOString(),
    outOfScore: application.outOfScore,
    status_update_date: new Date().toISOString(),
    test_provider: application.test_provider,
    order: 0,
  };

  // Check if an application with the same role_title, company_name, type, and profile_id already exists
  const { data: existingApplicationData, error: existingApplicationError } = await supabase
    .from("application")
    .select("application_id")
    .eq("role_title", application.role_title)
    .eq("company_name", application.company_name)
    .eq("type", application.type)
    .eq("profile_id", profile.profile_id);

  if (existingApplicationError) {
    console.error("Error checking existing application:", existingApplicationError.message);
    return { data: null, error: existingApplicationError };
  }

  if (existingApplicationData && existingApplicationData.length > 0) {
    // This should be never printed, but here just for debugging
    console.log("Duplicate application found:", existingApplicationData[0].application_id);
    return { data: null, error: { message: "Duplicate application found", details: "", hint: "", code: "duplicate_application" } as PostgrestError };
  }

  // If no existing application, create a new application
  const { data: insertApplication, error: insertApplicationError } = await supabase
    .from("application")
    .insert([newApplication])
    .select("application_id");

  if (insertApplicationError) {
    console.error("Error inserting application:", insertApplicationError.message);
    return { data: null, error: insertApplicationError };
  }

  if (insertApplication && insertApplication.length > 0) {
    console.log("Application inserted:", insertApplication[0].application_id);
    return { data: insertApplication[0].application_id, error: null };
  }

  return { data: null, error: { message: "Unknown error occurred" } as PostgrestError };
}