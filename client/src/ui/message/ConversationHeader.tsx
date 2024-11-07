import { CardHeader, Tooltip, IconButton } from "@mui/material";
import { useMessage } from "@/lib/store/message";
import { useEffect, useState } from "react";
import { useProfile, Profile } from "@/lib/store/profile";
import { ProfileAvatar, AvatarTypes } from "../ProfileAvatar";
import Image from "next/image";
import { Database } from "@/lib/types/database.types";
import { fetchCompanyThreadMetaData } from "@/lib/utils/fetchCompanyThreadMetaData";
import { fetchPrivateConversationMetaData } from "@/lib/utils/fetchPrivateConversationMetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { createSupabaseClient } from "@/lib/supabase/client";
import { insertBookmarkOpportunity } from "@/lib/utils/insertBookmarkOpportunity";
interface ConversationHeaderProps {
  conversationId: string;
}
/**
 * Header section of the Conversation component
 * @param conversationId - id of the conversation. Either a company thread or a private conversation
 */
export function ConversationHeader({
  conversationId,
}: ConversationHeaderProps) {
  const { isPrivateConversation } = useMessage();
  const { profile } = useProfile();
  const [header, setHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");
  const [profileAvatar, setProfileAvatar] = useState<AvatarTypes | null>();

  useEffect(() => {
    if (isPrivateConversation && profile) {
      fetchPrivateConversationMetaData(conversationId, profile.profile_id).then(
        (res) => {
          const { data, error } = res;
          if (error) {
            // TODO: Do something with error
          } else if (data) {
            const conversationMetaData = data.profile as unknown as Profile;
            setHeader(conversationMetaData.username);
            setProfileAvatar(conversationMetaData.avatar);
          }
          console.log("data: ", data);
          console.log("error: ", error);
        }
      );
    } else if (!isPrivateConversation && profile) {
      fetchCompanyThreadMetaData(conversationId).then((res) => {
        const { data, error } = res;
        if (error) {
          // TODO: Do something with error
        }
        if (data) {
          const opportunityMetaData =
            data.opportunity as unknown as Database["public"]["Tables"]["opportunity"]["Row"];
          // TODO set CardHeaderAvatar for company thread
          setHeader(opportunityMetaData.company_name);
          setSubHeader(
            opportunityMetaData.role_title + ", " + opportunityMetaData.type
          );
        }
      });
    }
  }, [isPrivateConversation, profile, conversationId]);

  // TODO: Refactor to be inside the OpportunityBookmark component
  async function handleBookmarkClick() {
    const supabase = createSupabaseClient();
    const { data: opportunity, error: opportunityError } = await supabase
      .from("company_thread")
      .select("opportunity_id")
      .eq("thread_id", conversationId)
      .single();

    if (opportunityError) {
      // TODO do something
    }

    if (opportunity && profile) {
      const { data, error } = await insertBookmarkOpportunity(
        opportunity.opportunity_id,
        profile.profile_id,
        supabase
      );

      console.log("data: ", data);
      console.log("error after inserting: ", error);
    }
  }

  if (isPrivateConversation) {
    return (
      <CardHeader
        title={header}
        subheader={subHeader}
        avatar={<ProfileAvatar avatar={profileAvatar!} />}
        sx={{
          boxShadow: "rgba(224,228,242,.7) 0px 2px 2px 0px",
          zIndex: 1,
        }}
      />
    );
  } else {
    return (
      <CardHeader
        action={
          <Tooltip
            sx={{
              ":hover": {
                backgroundColor: "transparent",
              },
            }}
            title="Bookmark Opportunity"
          >
            <IconButton onClick={handleBookmarkClick}>
              <FontAwesomeIcon
                style={{
                  color: "#496FFF",
                }}
                icon={faBookmark}
              />
            </IconButton>
          </Tooltip>
        }
        title={header}
        subheader={subHeader}
        avatar={
          <Image
            alt="Profile of {company}"
            src="https://www.amazon.com/favicon.ico"
            width={50}
            height={50}
          />
        }
        sx={{
          boxShadow: "rgba(224,228,242,.7) 0px 2px 2px 0px",
          zIndex: 1,
        }}
      />
    );
  }
}
