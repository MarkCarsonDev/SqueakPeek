"use server";
import { createSupabaseClient } from "@/lib/supabase/client";
import { createSupabaseServer } from "@/lib/supabase/server";

interface Application {
  application_id: string;
  opportunity_id: string;
  profile_id: string;
  // Other fields for the Application
}

// Function to check if an application already exists for a specific opportunity and user
export async function applicationExists(
  opportunity_id: string,
  profile_id: string
): Promise<boolean> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("application")
    .select("application_id")
    .eq("opportunity_id", opportunity_id)
    .eq("profile_id", profile_id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116: no rows returned, meaning no application exists
    console.error("Error checking existing application:", error);
    throw error;
  }

  return !!data; // Returns true if an application exists, false otherwise
}

// Insert a new application only if it doesn’t already exist
export async function InsertApplicationToSupabase(
  application: Application
): Promise<Application[] | null> {
  const { opportunity_id, profile_id } = application;

  // Step 1: Check if the application already exists
  const exists = await applicationExists(opportunity_id, profile_id);
  if (exists) {
    console.warn("Application already exists for this opportunity and user.");
    return null;
  }

  // Step 2: Insert the application if it doesn’t exist
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("application")
    .insert([application]);
  if (error) {
    console.error("Error adding application to database:", error);
    return null;
  }
  return data;
}

export async function UpdateApplicationToSupabase(
  application: Application
): Promise<Application[] | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("application")
    .update(application)
    .eq("application_id", application.application_id);
  if (error) {
    console.error("Error updating application in database:", error);
    return null;
  }
  return data;
}

export async function fetchingApplications(application_id: string) {
  const supabase = createSupabaseServer();
  const { data, error } = await supabase
    .from("application")
    .select("*")
    .eq("application_id", application_id);
  if (error) {
    console.error("Error fetching applications from database:", error);
    return null;
  }
  return data;
}
