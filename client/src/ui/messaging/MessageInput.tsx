"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons/faCircleUp";
import { MessageCardProps } from "./MessageCard";
import { useProfile } from "../../../lib/store/profile";
import { AvatarTypes } from "../ProfileAvatar";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "../../../lib/supabase/client";
import { v4 as uuidv4 } from "uuid";

/**
 * Allows user to send a message into a conversation, and broadcasts the message based on the conversationId
 */
export function MessageInput({ conversationId }: { conversationId: string }) {
  const { profile } = useProfile();
  const [currentMessage, setCurrentMessage] = useState("");
  const supabase = createSupabaseClient();
  const senderChannel = supabase.channel(conversationId);

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
        timestamp: new Date().toISOString(),
        messageId: uuidv4(),
        message,
      };

      // TODO: need to check state of channel before sending message
      senderChannel.send({
        type: "broadcast",
        event: "conversation",
        payload: { message: newMessage },
      });

      // TODO: Insert message into the message table
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
}
