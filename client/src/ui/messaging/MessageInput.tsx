"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons/faCircleUp";
import { MessageCardProps } from "./MessageCard";
import { Profile, useProfile } from "../../lib/store/profile";
import { AvatarTypes } from "../ProfileAvatar";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "../../lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { memo, useMemo } from "react";
import { createPublicThread }  from "../../../lib/utils/Thread";

/**
 * Allows user to send a message into a conversation, and broadcasts the message based on the conversationId
  * @param {string} conversationId - ID used to broadcast messages to subscribed users

 */
export const MessageInput = memo(function MessageInput({
  conversationId,
}: {
  conversationId: string;
}) {
  const { profile } = useProfile();
  const [currentMessage, setCurrentMessage] = useState("");

  // Memoize the Supabase client and the sender channel to prevent changing it's value when MessageInput re-renders
  const supabase = useMemo(() => createSupabaseClient(), []);
  const senderChannel = useMemo(
    () => supabase.channel(conversationId),
    [supabase, conversationId]
  );

  useEffect(() => {
    // unsubscribes once component unmounts
    return () => {
      senderChannel.unsubscribe();
    };
  });

  function handleSendMessage(message: string) {
    // only allows to add message if profile is made
    if (profile) {
      const newMessage: MessageCardProps = {
        avatar: (profile.avatar as AvatarTypes) || "avatar1",
        sender_username: profile.username!,
        timestamp: new Date().toUTCString(),
        messageId: uuidv4(),
        message,
      };

      // TODO: need to check state of channel before sending message
      senderChannel.send({
        type: "broadcast",
        event: "conversation",
        payload: { message: newMessage },
      });

      InsertMessage(newMessage, conversationId, profile);
    }
  }

  async function InsertMessage(newMessage: MessageCardProps, conversationId: string, profile: Profile) 
  {
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
                  setCurrentMessage("");
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
      onChange={(e) => setCurrentMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          handleSendMessage(currentMessage);
          setCurrentMessage("");
        }
      }}
    />
  );
});

