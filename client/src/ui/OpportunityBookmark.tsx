import { Tooltip, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { createSupabaseClient } from "@/lib/supabase/client";
import { insertBookmarkOpportunity } from "@/lib/utils/insertBookmarkOpportunity";
import { useProfile } from "@/lib/store/profile";

interface OpportunityBookmarkProps {
  opportunityId?: string;
  conversationId?: string;
}

/**
 * Handles adding and removing opportunity bookmarks in the database
 * @param conversationId - Id of a conversation record
 * @param opportunityId - Id of a opportunity record
 * @returns
 */
export function OpportunityBookmark({
  conversationId,
  opportunityId,
}: OpportunityBookmarkProps) {
  const { profile } = useProfile();

  // handles inserting and removing bookmarks
  async function handleBookmarkClick() {
    const supabase = createSupabaseClient();
    const idToInsert = opportunityId ?? (await fetchOpportunityId());
    if (idToInsert && profile) {
      const { data, error } = await insertBookmarkOpportunity(
        idToInsert,
        profile.profile_id,
        supabase
      );

      console.log("data: ", data);
      console.log("error after inserting: ", error);
    }
  }

  // retrieves opportunityId based on conversationId
  async function fetchOpportunityId() {
    if (conversationId) {
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
      return opportunity.opportunity_id || null;
    }
  }
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
          icon={faBookmark}
        />
      </IconButton>
    </Tooltip>
  );
}
