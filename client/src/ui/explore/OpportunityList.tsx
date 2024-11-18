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
              const opportunity = item.opportunity as Database["public"]["Tables"]["opportunity"]["Row"] & {
                opportunity_tracking?: {
                  applied?: number;
                  interviewing?: number;
                  online_assessment?: number;
                  offered?: number;
                  rejected?: number;
                };
              };
              if (!opportunity) {
                return null;
              }

              const opportunityTracking  = opportunity.opportunity_tracking as unknown as Database["public"]["Tables"]["opportunity_tracking"]["Row"];

              console.log("Tracking Data: ", opportunityTracking);
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
