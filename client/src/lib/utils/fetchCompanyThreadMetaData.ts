import { createSupabaseClient } from "@/lib/supabase/client";

/**
 * Fetches metadata of a company thread
 * @param conversationId - ID of the company thread
 * @param supabase - supabase client to make queries
 * @returns 
 */
export async function fetchCompanyThreadMetaData(
  conversationId: string,
  supabase = createSupabaseClient()
) {
  const { data, error } = await supabase
    .from("company_thread")
    .select(
      `*,opportunity:opportunity!opportunity_id(
        company_name, 
        created_at, 
        opportunity_id, 
        role_title, 
        type)`
    )
    .eq("thread_id", conversationId)
    .single();

  return { data, error };
}
