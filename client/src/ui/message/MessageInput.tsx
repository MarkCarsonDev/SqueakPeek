"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons/faCircleUp";
import { MessageCardProps } from "./MessageCard";
import { useProfile } from "../../lib/store/profile";
import { useEffect, useState, useRef } from "react";
import { createSupabaseClient } from "../../lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { memo, useMemo } from "react";
import { insertMessage } from "../../lib/utils/insertMessage";
import { AvatarTypes } from "../ProfileAvatar";
import { useMessage } from "@/lib/store/message";
import { useAlert } from "@/lib/store/alert";
/**
 * Allows user to send a message into a private conversation or a company thread, and broadcasts the message based on the conversationId
  * @param {string} conversationId - ID used to broadcast messages to subscribed users

 */
export const MessageInput = memo(function MessageInput({
  conversationId,
}: {
  conversationId: string;
}) {
  const { profile } = useProfile();
  const [currentMessage, setCurrentMessage] = useState("");
  const messageInputRef = useRef<null | HTMLDivElement>(null);
  const { isPrivateConversation } = useMessage();
  const { setAlert } = useAlert();

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

  // TODO: This causes a bug when the PrivateMessage modal is rendered, and the user tries to input a message
  // Makes MessageInput always on focus
  // useEffect(() => {
  //   function handleFocus() {
  //     if (messageInputRef.current) messageInputRef.current.focus();
  //   }
  //   document.addEventListener("click", handleFocus);
  //   return () => document.removeEventListener("click", handleFocus);
  // }, []);

  async function handleSendMessage(message: string) {
    // only allows to add message if profile is made
    if (profile) {
      const newMessage: MessageCardProps = {
        avatar: profile.avatar as AvatarTypes,
        sender_username: profile.username!,
        sender_id: profile.profile_id,
        timestamp: new Date().toUTCString(),
        messageId: uuidv4(),
        message,
      };

      const error = await insertMessage(
        newMessage,
        conversationId,
        profile,
        isPrivateConversation,
        supabase
      );

      if (error) {
        setAlert({
          message: error.message,
          type: "error",
        });
      }

      // TODO: need to check state of channel before sending message
      else {
        senderChannel.send({
          type: "broadcast",
          event: "conversation",
          payload: { message: newMessage },
        });
      }
    }
  }

  return (
    <TextField
      autoFocus
      inputRef={messageInputRef}
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
