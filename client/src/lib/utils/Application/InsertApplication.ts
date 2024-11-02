import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";
import { createOpportunity } from "@/lib/utils/Application/createOpportunity";
import { Profile } from "../../store/profile";
import { Application } from "@/lib/store/track";

export async function InsertApplication(
  supabase: SupabaseClient,
  profile: Profile,
  application: Application
): Promise<string | PostgrestError | undefined> {
  const { data: opportunityData, error: opportunityError } = await supabase
    .from("opportunity")
    .select("opportunity_id")
    .eq("role_title", application.role_title)
    .eq("company_name", application.company_name)
    .eq("type", application.type);

  let opportunityId;
  if (opportunityError) {
    console.log("Error finding opportunity:", opportunityError.message);
  }

  if (opportunityData && opportunityData.length > 0) {
    console.log("Opportunity found:", opportunityData[0].opportunity_id);
    opportunityId = opportunityData[0].opportunity_id;
  } else {
    opportunityId = await createOpportunity(
      supabase,
      application.role_title,
      application.company_name,
      application.type as Database["public"]["Enums"]["OpportunityType"]
    );
  }

  if (!opportunityId) {
    console.error("Failed to find or create opportunity");
    return;
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
    return existingApplicationError;
  }

  if (existingApplicationData && existingApplicationData.length > 0) {
    console.log("Duplicate application found:", existingApplicationData[0].application_id);
    return { message: "Duplicate application found", details: "", hint: "", code: "duplicate_application" } as PostgrestError;
  }

  // If no existing application, create a new application
  const { data: insertApplication, error: insertApplicationError } = await supabase
    .from("application")
    .insert([newApplication])
    .select("application_id");

  if (insertApplicationError) {
    console.error("Error inserting application:", insertApplicationError.message);
    return insertApplicationError;
  }

  if (insertApplication && insertApplication.length > 0) {
    console.log("Application inserted:", insertApplication[0].application_id);
    return insertApplication[0].application_id;
  }
}
