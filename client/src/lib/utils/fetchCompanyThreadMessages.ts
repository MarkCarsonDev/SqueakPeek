import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

/**
 * Fetches messages from a company thread
 * @param supabase - supabase client
 * @param thread_id - ID of the conversation which the
 * @returns
 */
export async function fetchCompanyThreadMessages(
  supabase: SupabaseClient,
  thread_id: string
) {
  const res = await supabase
    .from("public_message")
    .select(
      `
      *,
      company_thread!inner()
    `
    )
    .eq("company_thread.thread_id", thread_id);

  const { error } = res;
  const data =
    res.data as Database["public"]["Tables"]["public_message"]["Row"][];
  if (error) {
    console.error(error);
  }
  return { data, error };
}
