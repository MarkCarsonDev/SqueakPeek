import { useEffect, useState } from "react";
import { createSupabaseClient } from "../supabase/client";
export const useFetchOpportunityFromConversation = (conversationId: string) => {
  const [opportunityId, setOpportunityId] = useState<null | string>(null);

  useEffect(() => {
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

  return { opportunityId };
};
