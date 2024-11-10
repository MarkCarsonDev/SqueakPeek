import { Tooltip, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { createSupabaseClient } from "@/lib/supabase/client";
import { insertBookmarkOpportunity } from "@/lib/utils/insertBookmarkOpportunity";
import { useProfile } from "@/lib/store/profile";
import { useState, useEffect } from "react";

interface OpportunityBookmarkProps {
  conversationId: string;
}

/**
 * Handles adding and removing opportunity bookmarks in the database
 * @param opportunityId - Id of a opportunity record
 * @returns
 */
export function OpportunityBookmark({
  conversationId,
}: OpportunityBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState<null | boolean>(null);
  const [opportunityId, setOpportunityId] = useState<null | string>(null);

  // fetches opportunity id based on the conversationId
  useEffect(() => {
    fetchOpportunityId().then((id) => {
      if (id) {
        console.log("id: ", id);
        setOpportunityId(id);
        console.log("opp ID exists");
      } else {
        console.log("opp id does not exist");
      }
    });
  }, [conversationId]);

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
  }, [opportunityId]);

  const { profile } = useProfile();

  // handles inserting or removing bookmarks depending on it's current state
  async function handleBookmarkClick() {
    if (isBookmarked !== null) {
      if (isBookmarked) {
        // TODO do something here to remove it
        
      } else {
        const supabase = createSupabaseClient();
        const opportunityId = await fetchOpportunityId();
        if (opportunityId && profile) {
          const { data, error } = await insertBookmarkOpportunity(
            opportunityId,
            profile.profile_id,
            supabase
          );

          if (error) {
            // TODO Handle error
          } else {
            setIsBookmarked(true);
          }
        }
      }
    }
  }

  // retrieves opportunityId based on conversationId if it exists
  async function fetchOpportunityId() {
    const supabase = createSupabaseClient();
    const { data: opportunity, error } = await supabase
      .from("company_thread")
      .select("opportunity_id")
      .eq("thread_id", conversationId)
      .single();

    if (error) {
      // TODO handle error
      return null;
    }
    return opportunity.opportunity_id;
  }

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
        <IconButton onClick={handleBookmarkClick}>
          <FontAwesomeIcon
            style={{
              color: "#496FFF",
            }}
            icon={isBookmarked ? bookmarkSolid : bookmarkRegular}
          />
        </IconButton>
      </Tooltip>
    );
  }
}
