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
        const mappedData: OpportunityCardProps[] = data.map((item) => {
          const { thread_id: conversation_id } = item;
          
          const opportunity =
            item.opportunity as unknown as Database["public"]["Tables"]["opportunity"]["Row"]; // converts opportunity of the type as listed in the database
          const opportunity_tracking = 
            item.opportunity_tracking as unknown as Database["public"]["Tables"]["opportunity_tracking"]["Row"];
          // TODO: Replace aggregate with real data
          return {
            conversation_id,
            opportunity,
            aggregate: {
              totalApplied: opportunity_tracking.applied,
              interviewing: opportunity_tracking.interviewed,
              oa: opportunity_tracking.online_assessment,
              offered: opportunity_tracking.offered,
              rejected: opportunity_tracking.rejected,
              messages: 12,
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
