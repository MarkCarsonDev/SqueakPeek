import { createSupabaseClient } from "../client";
/**
 * Handles Google login Client Side
 * This is also works for Google signup
 */
export function handleGoogleLoginClientSide() {
  const supabase = createSupabaseClient();
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: location.origin + "/auth/callback",
    },
  });
}
