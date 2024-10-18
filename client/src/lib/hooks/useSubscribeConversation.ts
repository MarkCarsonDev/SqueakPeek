import { useEffect } from "react";
import { createSupabaseClient } from "../supabase/client";
import { MessageCardProps } from "../../ui/messaging/MessageCard";
import { Profile } from "../store/profile";
import { Dispatch, SetStateAction } from "react";

/**
 * Subscribes the client to messages based on the conversationId
 * @param {string} conversationId - ID used to subscribe users to listen to incoming messages
 * @param {() => void} addMessage - Adds message in message store
 * @param {Profile} profile - Profile of the current user
 * @param {Dispatch<SetStateAction<number>>} setNumNewMessages  - Resets the number of new messages to 0
 */
export const useSubscribeConversation = (
  conversationId: string,
  addMessage: (newMessage: MessageCardProps) => void,
  profile: Profile | null,
  setNumNewMessages: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    const supabase = createSupabaseClient();

    // Client joins conversation, and listens to messages
    const listenerChannel = supabase.channel(conversationId);

    // Subscribe to the Channel
    listenerChannel
      .on("broadcast", { event: "conversation" }, async (payload) => {
        // TODO check if payload is valid first
        // TODO: Payload is type of 'any' on this. If possible make this more explicit
        const newMessage = payload.payload.message as MessageCardProps;
        addMessage(newMessage);

        if (newMessage.sender_username !== profile?.username) {
          setNumNewMessages((prev) => prev + 1);
        }
      })
      .subscribe();

    // unsubscribes once component unmounts
    return () => {
      listenerChannel.unsubscribe();
    };
  }, [addMessage, conversationId, profile, setNumNewMessages]);
};
