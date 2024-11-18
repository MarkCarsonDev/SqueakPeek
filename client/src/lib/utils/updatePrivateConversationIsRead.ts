import { createSupabaseClient } from "../supabase/client";

/**
 * Updates the is_read attribute of a private conversation
 * @param conversationId - id of the private conversation
 * @param senderId - profile id of the user
 * @param supabase - supabase client to request quries
 * @returns
 */
export async function updatePrivateConversationIsRead(
  conversationId: string,
  senderId: string,
  supabase = createSupabaseClient()
) {
  const { data, error } = await supabase
    .from("private_user_conversation")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .eq("sender_id", senderId);

  return { data, error };
}
