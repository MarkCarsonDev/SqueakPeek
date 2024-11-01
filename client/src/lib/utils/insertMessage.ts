import { MessageCardProps } from "../../ui/message/MessageCard";
import { Profile } from "../store/profile";
import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

// TODO Take into account for inserting private messages
export async function insertMessage(
  supabase: SupabaseClient,
  newMessage: MessageCardProps,
  conversationId: string,
  profile: Profile
): Promise<PostgrestError | undefined> {
  // If a thread ID is available, send the message
  const addMsg: Database["public"]["Tables"]["public_message"]["Row"] = {
    thread_id: conversationId,
    message: newMessage.message,
    message_id: newMessage.messageId,
    sender_username: newMessage.sender_username,
    sender_avatar: newMessage.avatar,
    created_at: new Date().toISOString(),
    sender_id: profile.profile_id,
  };
  // Insert the public message into the database
  const { error } = await supabase.from("public_message").insert(addMsg);

  // Log any errors encountered while inserting the public message
  if (error) {
    console.error("Error inserting public msg:", error.message);
    return error;
  }
}
