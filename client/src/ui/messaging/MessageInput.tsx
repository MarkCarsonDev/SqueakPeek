"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons/faCircleUp";
import { useMessage } from "../../../lib/store/message";
import { MessageBodyProps } from "./MessageCard";
import { useProfile } from "../../../lib/store/profile";
import { AvatarTypes } from "../ProfileAvatar";
import { useState } from "react";

/**
 * Allows user to send a message into a conversation
 */
export function MessageInput() {
  const { addMessage } = useMessage();
  const { profile } = useProfile();
  const [currentMessage, setCurrentMessage] = useState("");
  
  // TODO: Add this as a server action
  function handleSendMessage(message: string) {
    // only allows to add message if profile is made
    if (profile) {
      const newMessage: MessageBodyProps = {
        avatar: (profile.avatar as AvatarTypes) || "avatar1",
        sender_username: profile.username!,
        timestamp: new Date(),
        messageId: 12,
        message,
      };
      addMessage(newMessage);
      // TODO Call on Supabase to insert the message in the conversation table
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
