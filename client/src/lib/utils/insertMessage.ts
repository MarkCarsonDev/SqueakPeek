import { MessageCardProps } from "../../ui/message/MessageCard";
import { Profile } from "../store/profile";
import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { createSupabaseClient } from "../supabase/client";

// TODO Take into account for inserting private messages
/**
 * Inserts a message into a conversation table in the database
 * @param supabase - Supabase client to make queries to the database
 * @param newMessage - Metadata of the message that will be inserted into the message table
 * @param conversationId - The ID of the conversation in which the message will be inserted into
 * @param profile - The sender's profile metadata
 */
export async function insertMessage(
  newMessage: MessageCardProps,
  conversationId: string,
  profile: Profile,
  conversationType: "private" | "company",
  supabase: SupabaseClient = createSupabaseClient(),

): Promise<PostgrestError | null> {
  if (conversationType === "company") {
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
    return error;
  } else {
    // conversation type is private
    const addMsg: Database["public"]["Tables"]["private_message"]["Row"] = {
      conversation_id: conversationId,
      message: newMessage.message,
      message_id: newMessage.messageId,
      sender_username: newMessage.sender_username,
      sender_avatar: newMessage.avatar,
      created_at: new Date().toISOString(),
    };
    // Insert the public message into the database
    const { error } = await supabase.from("private_message").insert(addMsg);
    return error;
  }
}
