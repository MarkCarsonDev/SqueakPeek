import { SupabaseClient } from "@supabase/supabase-js";
export async function fetchMessages(
  supabase: SupabaseClient,
  conversation_id: string
) {
  const { data, error } = await supabase
    .from("public_message")
    .select(
      `
    *,
    ...public_user_conversation!inner(
      ...conversation!inner()
    )
    `
    )
    .eq("conversation.conversation_id", conversation_id);

  return { data, error };
}
