import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import { Profile } from "../../store/profile";
import { createSupabaseClient } from "../../supabase/client";

export async function RemoveApplication(
  profile: Profile,
  applicationId: string,
  supabase: SupabaseClient = createSupabaseClient()
): Promise<{ success: boolean | null; error: PostgrestError | null }> {
  const { error } = await supabase
    .from("application")
    .delete()
    .eq("application_id", applicationId)
    .eq("profile_id", profile.profile_id);

  if (error) {
    console.error("Error:", error.message);
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code || "unknown_code",
        details: error.details || "No details provided",
        hint: error.hint || "No hint available",
      },
    };
  }

  return { success: true, error: null };
}
