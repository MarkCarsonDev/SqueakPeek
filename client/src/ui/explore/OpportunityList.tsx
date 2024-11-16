import React, { useEffect, useState, useMemo } from "react";
// import { useRouter } from 'next/navigation'; // To handle URL params
// import { SelectedFilters } from './Filters';
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/database.types";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";

// TODO: Add filters to the OpportunityList component
export function OpportunityList() {
  const [shownOpportunities, setShownOpportunities] = useState<
    OpportunityCardProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = useMemo(() => createSupabaseClient(), []); // only creates it once when the OpportunityList components mounts

  // Fetch all opportunities once when the component mounts
  useEffect(() => {
    const handleFetchOpportunities = async () => {
      setLoading(true);
      const { data, error } = await fetchOpportunities(supabase);
      if (error) {
        console.error("Error fetching opportunities:", error);
      } else if (data) {
        const mappedData: OpportunityCardProps[] = data
        .map((item) => {
          const { thread_id: conversation_id, opportunity, opportunity_tracking } = item;

          if (!opportunity || !opportunity_tracking) return null;

          const opp = opportunity as Database["public"]["Tables"]["opportunity"]["Row"];
          const tracking = opportunity_tracking as Database["public"]["Tables"]["opportunity_tracking"]["Row"];

          return {
            conversation_id,
            opportunity: opp,
            aggregate: {
              totalApplied: tracking.applied || 0,
              interviewing: tracking.interviewed || 0,
              oa: tracking.online_assessment || 0,
              offered: tracking.offered || 0,
              rejected: tracking.rejected || 0,
              messages: 12, // Placeholder for message count
            },
          };
        });
        console.log("mappedData: ", mappedData);

        setShownOpportunities(mappedData); // Initially, all opportunities are shown
      }

      setLoading(false);
    };

    handleFetchOpportunities();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (shownOpportunities.length === 0) {
    return <div>No opportunities found that match your criterion.</div>;
  }

  return (
    <div>
      {shownOpportunities.map((item) => (
        <OpportunityCard key={item.opportunity.opportunity_id} {...item} />
      ))}
    </div>
  );
}
