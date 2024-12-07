import { Tooltip, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { createSupabaseClient } from "@/lib/supabase/client";
import { insertBookmarkOpportunity } from "@/lib/utils/insertBookmarkOpportunity";
import { useProfile } from "@/lib/store/profile";
import { useState, useEffect } from "react";
import { removeBookmarkOpportunity } from "@/lib/utils/removeBookmarkOpportunity";
import { useMessageNotification } from "@/lib/store/messageNotification";
import { useFetchOpportunityFromConversation } from "@/lib/hooks/useFetchOpportunityFromConversation";
interface OpportunityBookmarkProps {
  conversationId: string;
  isDisabled?: boolean;
  size: string;
}

/**
 * Handles adding and removing opportunity bookmarks in the database
 * @param opportunityId - Id of a opportunity record
 * @returns
 */
export function OpportunityBookmark({
  isDisabled = false,
  conversationId,
  size,
}: OpportunityBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState<null | boolean>(null);
  const { profile } = useProfile();
  const { removeNotification } = useMessageNotification();
  // handles inserting or removing bookmarks depending on it's current state
  async function handleBookmarkClick() {
    if (isBookmarked !== null && opportunityId && profile) {
      const supabase = createSupabaseClient();

      if (isBookmarked) {
        const { error } = await removeBookmarkOpportunity(
          opportunityId,
          profile.profile_id,
          supabase
        );

        if (error) {
          // TODO: Handle Error
        } else {
          removeNotification("publicNotifications", conversationId);
          setIsBookmarked(false);
        }
      } else {
        // Not bookmarked
        const { error } = await insertBookmarkOpportunity(
          opportunityId,
          profile.profile_id,
          supabase
        );

        if (error) {
          // TODO Handle error
          console.error(error);
        } else {
          console.log("successufly bookmarked opportunity");
          setIsBookmarked(true);
        }
      }
    }
  }

  const { opportunityId } = useFetchOpportunityFromConversation(conversationId);

  // checks and sets bookmark state if it's a bookmaked opportunity
  useEffect(() => {
    if (opportunityId && profile) {
      const supabase = createSupabaseClient();
      supabase
        .from("bookmark_opportunity")
        .select("*")
        .eq("opportunity_id", opportunityId)
        .eq("profile_id", profile.profile_id)
        .then((res) => {
          const { data, error } = res;
          if (error) {
            console.error(error);
            // TODO: Handle error
          }
          if (data && data.length > 0) {
            setIsBookmarked(true);
          } else {
            setIsBookmarked(false);
          }
        });
    }
  }, [opportunityId, conversationId, profile]);

  if (isBookmarked !== null) {
    return (
      <Tooltip
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
        title="Bookmark Opportunity"
      >
        <IconButton disabled={isDisabled} onClick={handleBookmarkClick}>
          <FontAwesomeIcon
            style={{
              color: "#496FFF",
              fontSize: size,
            }}
            icon={isBookmarked ? bookmarkSolid : bookmarkRegular}
          />
        </IconButton>
      </Tooltip>
    );
  }
}
