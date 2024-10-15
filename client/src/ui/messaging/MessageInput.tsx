"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons/faCircleUp";
import { useMessage } from "../../../lib/store/message";
import { MessageBodyProps } from "./MessageCard";
import { useProfile } from "../../../lib/store/profile";
import { AvatarTypes } from "../ProfileAvatar";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "../../../lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";
/**
 * Allows user to send a chmessage into a conversation
 */
export function MessageInput({ channel }: { channel?: RealtimeChannel }) {
  const { addMessage } = useMessage();
  const { profile } = useProfile();
  const [currentMessage, setCurrentMessage] = useState("");
  const supabase = createSupabaseClient();
  const channelB = supabase.channel("room-1");

  // TODO: Add this as a server action
  function handleSendMessage(message: string) {
    // only allows to add message if profile is made
    if (profile) {
      const newMessage: MessageBodyProps = {
        avatar: (profile.avatar as AvatarTypes) || "avatar1",
        sender_username: profile.username!,
        timestamp: new Date().toISOString(),
        messageId: 12,
        message,
      };

      channelB.subscribe((status) => {
        // Wait for successful connection
        if (status !== "SUBSCRIBED") {
          return null;
        }

        // Send a message once the client is subscribed
        channelB.send({
          type: "broadcast",
          event: "test",
          payload: { message: newMessage },
        });
      });
      addMessage(newMessage);
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
