"use server";
import { createSupabaseServer } from "../server";
import { redirect } from "next/navigation";

/**
 * Handles Google login Server Side
 */
export async function handleGoogleLoginServerSide() {
  const supabase = createSupabaseServer();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/auth/callback",
    },
  });

  if (error) {
    // TODO: Redirect to error page
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
