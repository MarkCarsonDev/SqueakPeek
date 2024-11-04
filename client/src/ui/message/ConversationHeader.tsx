import { CardHeader } from "@mui/material";
import { useMessage } from "@/lib/store/message";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useProfile, Profile } from "@/lib/store/profile";
import { ProfileAvatar, AvatarTypes } from "../ProfileAvatar";
import Image from "next/image";
import { Database } from "@/lib/types/database.types";
interface ConversationHeaderProps {
  conversationId: string;
}
/**
 * Header section of the Conversation component
 */

export function ConversationHeader({
  conversationId,
}: ConversationHeaderProps) {
  const { isPrivateConversation } = useMessage();
  const { profile } = useProfile();
  const supabase = createSupabaseClient();

  const [header, setHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");
  const [profileAvatar, setProfileAvatar] = useState<AvatarTypes | null>();

  useEffect(() => {
    if (isPrivateConversation && profile) {
      supabase
        .from("private_user_conversation")
        .select("*, profile:profile!receiver_id(profile_id, avatar, username)")
        .eq("conversation_id", conversationId)
        .eq("sender_id", profile.profile_id)
        .single()
        .then((res) => {
          const { data, error } = res;
          if (data) {
            const conversationMetaData = data.profile as unknown as Profile;
            setHeader(conversationMetaData.username);
            setProfileAvatar(conversationMetaData.avatar);
          }
          console.log("data: ", data);
          console.log("error: ", error);
        });
    } else if (!isPrivateConversation && profile) {
      supabase
        .from("company_thread")
        .select(
          `*,opportunity:opportunity!opportunity_id(      company_name, 
      created_at, 
      opportunity_id, 
      role_title, 
      type)`
        )
        .eq("thread_id", conversationId)
        .single()
        .then((res) => {
          const { data, error } = res;
          if (data) {
            const opportunityMetaData =
              data.opportunity as unknown as Database["public"]["Tables"]["opportunity"]["Row"];
            setHeader(opportunityMetaData.company_name);
            setSubHeader(
              opportunityMetaData.role_title + ", " + opportunityMetaData.type
            );
          }
        });
    }
  }, [supabase, isPrivateConversation, profile]);
  return (
    <CardHeader
      title={header}
      subheader={subHeader}
      avatar={
        isPrivateConversation ? (
          <ProfileAvatar avatar={profileAvatar!} />
        ) : (
          <Image
            alt="Profile of {company}"
            src="https://www.amazon.com/favicon.ico"
            width={50}
            height={50}
          />
        )
      }
      sx={{
        boxShadow: "rgba(224,228,242,.7) 0px 2px 2px 0px",
        zIndex: 1,
      }}
    />
  );
}
