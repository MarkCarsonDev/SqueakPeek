import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

/**
 * Fetches messages from a conversation
 * @param supabase - supabase client
 * @param conversation_id - ID of the conversation which the
 * @returns
 */
export async function fetchPublicMessages(
  supabase: SupabaseClient,
  conversation_id: string
) {
  const res = await supabase
    .from("public_message")
    .select(
      `
      *,
      public_user_conversation!inner(
        conversation!inner()
      )
    `
    )
    .eq(
      "public_user_conversation.conversation.conversation_id",
      conversation_id
    );

  const { error } = res;
  const data =
    res.data as Database["public"]["Tables"]["public_message"]["Row"][];
  if (error) {
    console.error(error);
  }
  return { data, error };
}
