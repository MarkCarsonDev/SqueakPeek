import { createSupabaseClient } from "@/lib/supabase/client";

/**
 * Fetches metadata of a private conversation
 * @param conversationId - ID of the private conversation
 * @param profileId - profileId of the current user
 * @param supabase  - supabase client to make queries
 * @returns {data: metadata, error: PostgrestError}
 */
export async function fetchPrivateConversationMetaData(
  conversationId: string,
  profileId: string,
  supabase = createSupabaseClient()
) {
  const { data, error } = await supabase
    .from("private_user_conversation")
    .select("*, profile:profile!receiver_id(profile_id, avatar, username)")
    .eq("conversation_id", conversationId)
    .eq("sender_id", profileId)
    .single();
  return { data, error };
}
