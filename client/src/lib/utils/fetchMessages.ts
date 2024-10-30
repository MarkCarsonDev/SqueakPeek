import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
export async function fetchMessages(
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
