import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'next/navigation'; // To handle URL params
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";
import { SelectedFilters } from './Filters';

export function OpportunityList() {
  const [shownOpportunities, setShownOpportunities] = useState<
    OpportunityCardProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = useMemo(() => createSupabaseClient(), []); // only creates it once when the OpportunityList component mounts

  const searchParams = useSearchParams();

  // Parse filters from searchParams
  const filters: SelectedFilters = useMemo(() => ({
    searchQuery: searchParams.get('searchQuery') || '',
    sortOption: searchParams.get('sortOption') || 'recent',
    company: searchParams.getAll('company'),
    jobPosition: searchParams.getAll('jobPosition'),
    // Add more filter options here
  }), [searchParams]);

  // Fetch opportunities when the component mounts or when filters change
  useEffect(() => {
    const handleFetchOpportunities = async () => {
      setLoading(true);
      const { data, error } = await fetchOpportunities(supabase, filters);
      if (error) {
        console.error("Error fetching opportunities:", error);
      } else if (data) {
        const mappedData: OpportunityCardProps[] = data.map((item) => {
          const { thread_id: conversation_id } = item;
          const opportunity = item.opportunity;

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

        setShownOpportunities(mappedData);
      }

      setLoading(false);
    };

    handleFetchOpportunities();
  }, [supabase, filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (shownOpportunities.length === 0) {
    return <div>No opportunities found that match your criteria.</div>;
  }

  return (
    <div>
      {shownOpportunities.map((item) =>
        item.opportunity ? ( // Ensure item.opportunity is defined before rendering
          <OpportunityCard key={item.opportunity.opportunity_id} {...item} />
        ) : null
      )}
    </div>
  );
}
