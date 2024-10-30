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
      public_user_conversation!inner(
        conversation!inner()
      )
    `
    )
    .eq(
      "public_user_conversation.conversation.conversation_id",
      conversation_id
    );

  if (error) {
    console.error(error);
  }
  return { data, error };
}
