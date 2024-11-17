import React, { useEffect, useState, useMemo } from "react";
// import { useRouter } from 'next/navigation'; // To handle URL params
// import { SelectedFilters } from './Filters';
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/database.types";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";
import { fetchOpportunityTracking } from "@/lib/utils/fetchOpportunityTracking";

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

      try {
        const [opportunitiesResult, trackingResult] = await Promise.all([
          fetchOpportunities(supabase),
          fetchOpportunityTracking(supabase),
        ]);

        const { data: opportunities, error: opportunitiesError } = opportunitiesResult;
        const { data: trackingData, error: trackingError } = trackingResult;

        if (opportunitiesError) {
          console.error("Error fetching opportunities:", opportunitiesError);
        }
        if (trackingError) {
          console.error("Error fetching opportunity tracking:", trackingError);
        }

        if (opportunities && trackingData) {
          const mappedData: OpportunityCardProps[] = opportunities
            .map((item) => {
              const { thread_id: conversation_id } = item;
              const opportunity = item.opportunity as Database["public"]["Tables"]["opportunity"]["Row"];
              if (!opportunity) {
                return null;
              }

              const opportunityTracking = trackingData.find(
                (tracking) =>
                  tracking.opportunity_id === opportunity.opportunity_id
              ) as Database["public"]["Tables"]["opportunity_tracking"]["Row"];

              return {
                conversation_id,
                opportunity,
                aggregate: {
                  totalApplied: opportunityTracking?.applied || 0,
                  interviewing: opportunityTracking?.interviewed || 0,
                  oa: opportunityTracking?.online_assessment || 0,
                  offered: opportunityTracking?.offered || 0,
                  rejected: opportunityTracking?.rejected || 0,
                  messages: 12, // Placeholder for message count
                },
              };
            })
            .filter((item) => item !== null);

          console.log("mappedData: ", mappedData);
          setShownOpportunities(mappedData);
        }
      } catch (error) {
        console.error("Error in fetching opportunities or tracking data:", error);
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
