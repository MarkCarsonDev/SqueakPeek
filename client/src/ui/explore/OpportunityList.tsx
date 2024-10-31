import React, { useEffect, useState, useMemo } from "react";
// import { useRouter } from 'next/navigation'; // To handle URL params
// import { SelectedFilters } from './Filters';
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/database.types";

// TODO: Add filters to the OpportunityList component
export function OpportunityList() {
  const [shownOpportunities, setShownOpportunities] = useState<
    OpportunityCardProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = useMemo(() => createSupabaseClient(), []); // only creates it once when the OpportunityList components mounts

  // Fetch all opportunities once when the component mounts
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("conversation").select(`
        *,
        opportunity:opportunity_id (*)
      `);

      if (error) {
        console.error("Error fetching opportunities:", error);
      } else if (data) {
        const mappedData: OpportunityCardProps[] = data.map((item) => {
          const { conversation_id } = item;
          const opportunity =
            item.opportunity as unknown as Database["public"]["Tables"]["opportunity"]["Row"]; // converts opportunity of the type as listed in the database

          // TODO: Replace aggregate with real data
          return {
            conversation_id,
            opportunity,
            aggregate: {
              totalApplied: 200,
              interviewing: 12,
              oa: 12,
              offered: 12,
              rejected: 12,
              messages: 12,
            },
          };
        });
        console.log("mappedData: ", mappedData);

        setShownOpportunities(mappedData); // Initially, all opportunities are shown
      }

      setLoading(false);
    };

    fetchOpportunities();
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
