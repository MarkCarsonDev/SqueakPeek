import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseClient } from "../supabase/client";

/**
 * Initializes a private conversation between two users
 * @param senderId - The ID of the sender's profile.
 * @param recieverId - The optional ID of the receiver's profile (only for private threads).
 * @param supabase - Supabase client to make queries to the database
 * @return {data: conversation ID of the newly created conversation, error: PostgrestError}
 */
export async function insertPrivateConversation(
  senderId: string,
  receiverId: string,
  supabase: SupabaseClient = createSupabaseClient()
) {
  // Invokes a insert_private_conversation transaction in the database
  const { data, error } = await supabase.rpc("insert_private_conversation", {
    sender_id: senderId,
    receiver_id: receiverId,
  });

  return { data, error };
}
