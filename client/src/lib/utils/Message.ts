
import { createPublicThread }  from "../../lib/utils/Thread";
import { MessageCardProps } from "../../ui/messaging/MessageCard";
import { Profile } from "../../lib/store/profile";
import { createSupabaseClient } from "../supabase/client"


export async function InsertMessage(newMessage: MessageCardProps, conversationId: string, profile: Profile) 
{
    const supabase = createSupabaseClient()  

    // must test with conversation id = '02db3fdc-1561-4d15-b2ac-d2f23e807454'
    if (conversationId && newMessage) {
      const { data: publicThreadData, error: publicThreadError } = await supabase
        .from("public_user_conversation")
        .select("thread_id")
        .eq("conversation_id", "14cd0270-2aae-431b-a536-d43002e33560")
        .eq("sender_id", profile.profile_id); // Test Conversation ID since conversation ID is not set

      // Log any errors encountered while checking for public threads
      if (publicThreadError) {
        console.error("Error checking public thread:", publicThreadError.message);
        return;
      }

      let threadID;

      console.log(profile.profile_id); // Log sender profile ID
      //console.log(conversationID); // Log conversation ID

      if (publicThreadData?.length > 0) {
        console.log("Public thread found:", publicThreadData[0].thread_id);
        threadID = publicThreadData[0].thread_id;
      } 
      else if (publicThreadData?.length === 0) {
        console.log("Creating public thread..");
        threadID = await createPublicThread(profile.profile_id, '14cd0270-2aae-431b-a536-d43002e33560');
      }
      // If a thread ID is available, send the message
      if (threadID) {
        const addMsg = {
          thread_id: threadID.toString(),
          message: newMessage.message,
          message_id: newMessage.messageId
        };
        
        // Insert the public message into the database
        const { data: insertPublicMsg, error: insertPublicMsgError } = await supabase
          .from("public_message")
          .insert(addMsg)
          .select("message_id");

        if (insertPublicMsg) {
          console.log("Message Inserted:", insertPublicMsg[0].message_id);
        }

        // Log any errors encountered while inserting the public message
        if (insertPublicMsgError) {
          console.error("Error inserting public msg:", insertPublicMsgError.message);
          return;
        }
      }
    }
}