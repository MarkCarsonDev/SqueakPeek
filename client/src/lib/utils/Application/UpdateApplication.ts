import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
// import { Database } from "../types/database.types";
import { Profile } from "@/lib/store/profile";
import { Application } from "@/lib/store/track";

export async function UpdateApplication(
  supabase: SupabaseClient,
  profile: Profile,
  applicationId: string,
  updatedFields: Application
): Promise<PostgrestError | undefined> {
  // Ensure the application belongs to the profile
  const { data: existingApplicationData, error: existingApplicationError } =
    await supabase
      .from("application")
      .select("application_id")
      .eq("application_id", applicationId)
      .eq("profile_id", profile.profile_id);

  if (existingApplicationError) {
    console.error(updatedFields.application_id, profile.profile_id);
    console.error(
      "Error checking existing application:",
      existingApplicationError.message
    );
    return existingApplicationError;
  }

  if (!existingApplicationData || existingApplicationData.length === 0) {
    console.error("Application not found or does not belong to the profile");
    return {
      message: "Application not found or does not belong to the profile",
      details: "",
      hint: "",
      code: "application_not_found",
    } as PostgrestError;
  }

  // Update the application with the provided changes
  const { data: updateApplication, error: updateApplicationError } =
    await supabase
      .from("application")
      .update(updatedFields)
      .eq("application_id", applicationId)
      .select("application_id");

  if (updateApplicationError) {
    console.error(
      "Error updating application:",
      updateApplicationError.message
    );
    return updateApplicationError;
  }

  if (updateApplication && updateApplication.length > 0) {
    console.log("Application updated:", updateApplication[0].application_id);
  }
}
