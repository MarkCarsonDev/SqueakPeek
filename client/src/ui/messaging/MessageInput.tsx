"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons/faCircleUp";
import { useMessage } from "../../../lib/store/message";
import { MessageBodyProps } from "./MessageCard";
import { useProfile } from "../../../lib/store/profile";
import { AvatarTypes } from "../ProfileAvatar";
import { useState } from "react";
import { useConversation } from "../../../lib/store/conversation";
import { createSupabaseClient } from "../../../lib/supabase/client";


/**
 * Allows user to send a message into a conversation
 */
export function MessageInput(tableName: any) {
  const { addMessage } = useMessage();
  const { profile } = useProfile();
  const { conversation } = useConversation();
  const [ currentMessage, setCurrentMessage] = useState("");
  
  // TODO: Add this as a server action
  async function handleSendMessage(msg: string): Promise<void>
  {
    const messageToInsert = {message: msg};
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
          .from(tableName)
          .insert([messageToInsert]);

      if (error) {
          console.error('Error inserting message:', error.message);
      } else {
          console.log('Inserted message:', data);
      }
  } catch (err) {
      console.error('Error:', err);
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

