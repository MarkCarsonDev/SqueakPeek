"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons/faCircleUp";
import { useMessage } from "../../../lib/store/message";
import { useProfile } from "../../../lib/store/profile";
import { useState } from "react";
import { useConversationStore } from "../../../lib/store/conversation";
import { createSupabaseClient } from "../../../lib/supabase/client";
import { initializeThread } from "../../../lib/store/initThread";

/**
 * Allows the user to send a message into a conversation.
 */
export function MessageInput() {
  const { addMessage } = useMessage();
  const { profile } = useProfile();
  const { conversation } = useConversationStore();
  const [currentMessage, setCurrentMessage] = useState("");

  // Handle sending a message
  async function handleSendMessage(currentMessage: string, receiverProfile?: typeof profile): Promise<void> {
    const supabase = createSupabaseClient();

    // Check for private thread and send message if found
    if (receiverProfile && conversation) {
      const { data: privateThreadData, error: privateThreadError } = await supabase
        .from("private_user_conversation")
        .select("thread_id")
        .eq("conversation_id", conversation.conversation_id);

      // Log any errors encountered while checking for private threads
      if (privateThreadError) {
        console.error("Error checking private thread:", privateThreadError.message);
        return;
      }

      // If a private thread is found, send the message
      if (privateThreadData?.length > 0) {
        console.log("Private thread found:", privateThreadData[0]);
        const threadID = privateThreadData[0].thread_id;

        const addMsg = {
          thread_id: threadID,
          message: currentMessage
        };

        // Insert the message into the database
        const { data: insertPrivateMsg, error: insertPrivateMsgError } = await supabase
          .from("private_message")
          .insert(addMsg)
          .select("message_id");

        if (insertPrivateMsg) {
          console.log("Message Inserted:", insertPrivateMsg[0].message_id);
        }

        // Log any errors encountered while inserting the private message
        if (insertPrivateMsgError) {
          console.error("Error inserting private msg:", insertPrivateMsgError.message);
          return;
        }
      }
    }

    // Check for public thread and send message if found
    if (conversation && conversation.opportunity_id) {
      const { data: publicThreadData, error: publicThreadError } = await supabase
        .from("public_user_conversation")
        .select("thread_id")
        .eq("conversation_id", conversation.conversation_id);

      // Log any errors encountered while checking for public threads
      if (publicThreadError) {
        console.error("Error checking public thread:", publicThreadError.message);
        return;
      }

      let threadID;

      // Check for existing public thread
      if (publicThreadData?.length > 0) {
        console.log("Public thread found:", publicThreadData[0].thread_id);
        threadID = publicThreadData[0].thread_id;
      } 
      // If no public thread is found, initialize a new thread
      else if (publicThreadData?.length === 0) {
        // TEST with hardcoded profile ID for initialization // 
        threadID = initializeThread('41045da6-e503-4049-ba70-337de4febfbb', conversation.conversation_id);
      }

      // If a thread ID is available, send the message
      if (threadID) {
        console.log(threadID);
        const addMsg = {
          thread_id: threadID.toString(),
          message: currentMessage
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

  return (
    <TextField
      value={currentMessage}
      placeholder="Message..."
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  handleSendMessage(currentMessage);
                  setCurrentMessage(""); // Clear the input field after sending
                }}
              >
                <FontAwesomeIcon
                  style={{
                    color: "#496FFF",
                  }}
                  icon={faCircleUp}
                />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      onChange={(e) => setCurrentMessage(e.target.value)} // Update message state on change
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          handleSendMessage(currentMessage);
          setCurrentMessage(""); // Clear the input field after sending
        }
      }}
    />
  );
}
