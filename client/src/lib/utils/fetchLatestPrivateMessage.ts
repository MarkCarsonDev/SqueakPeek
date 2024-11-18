import { createSupabaseClient } from "../supabase/client";

/**
 * Fetches latest private message from a private_conversation
 * @param conversation_id - The id of the private_conversation
 * @param supabase - The Supabase client to make queries
 * @returns {data: An array of private conversations from a particular user, error: PostgrestError}
 */
export async function fetchLatestPrivateMessage(
  conversation_id: string,
  supabase = createSupabaseClient()
) {
  const { data, error } = await supabase
    .from("private_message")
    .select("sender_username, message")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  return { data, error };
}
