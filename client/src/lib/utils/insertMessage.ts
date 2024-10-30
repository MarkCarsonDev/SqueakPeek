import { createPublicThread } from "./createPublicThread";
import { MessageCardProps } from "../../ui/messaging/MessageCard";
import { Profile } from "../store/profile";
import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
export async function insertMessage(
  supabase: SupabaseClient,
  newMessage: MessageCardProps,
  conversationId: string,
  profile: Profile
): Promise<PostgrestError | undefined> {
  const { data: publicThreadData, error: publicThreadError } = await supabase
    .from("public_user_conversation")
    .select("thread_id")
    .eq("conversation_id", conversationId)
    .eq("sender_id", profile.profile_id);

  // Log any errors encountered while checking for public threads
  if (publicThreadError) {
    console.error("Error checking public thread:", publicThreadError.message);
    return publicThreadError;
  }

  let threadID;

  console.log(profile.profile_id); // Log sender profile ID
  //console.log(conversationID); // Log conversation ID

  if (publicThreadData?.length > 0) {
    console.log("Public thread found:", publicThreadData[0].thread_id);
    threadID = publicThreadData[0].thread_id;
  } else if (publicThreadData?.length === 0) {
    console.log("Creating public thread..");
    threadID = await createPublicThread(
      supabase,
      profile.profile_id,
      conversationId
    );
  }

  // If a thread ID is available, send the message
  if (threadID) {
    const addMsg: Database["public"]["Tables"]["public_message"]["Row"] = {
      thread_id: threadID.toString(),
      message: newMessage.message,
      message_id: newMessage.messageId,
      sender_username: newMessage.sender_username,
      sender_avatar: newMessage.avatar,
      created_at: new Date().toISOString(),
    };

    // Insert the public message into the database
    const { data: insertPublicMsg, error: insertPublicMsgError } =
      await supabase.from("public_message").insert(addMsg).select("message_id");

    if (insertPublicMsg) {
      console.log("Message Inserted:", insertPublicMsg[0].message_id);
    }

    // Log any errors encountered while inserting the public message
    if (insertPublicMsgError) {
      console.error(
        "Error inserting public msg:",
        insertPublicMsgError.message
      );
      return insertPublicMsgError;
    }
  }
}
