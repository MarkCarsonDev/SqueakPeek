import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'next/navigation'; // To handle URL params
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";
import { SelectedFilters } from './Filters';
import { Button } from "@mui/material";

export function OpportunityList() {
  const [shownOpportunities, setShownOpportunities] = useState<
    OpportunityCardProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true);
  const [totalDBCount, setTotalDBCount] = useState<number>(0);
  const supabase = useMemo(() => createSupabaseClient(), []); // only creates it once when the OpportunityList component mounts

  const searchParams = useSearchParams();

  // Parse filters from searchParams
  const filters: SelectedFilters = useMemo(() => {
    const company = searchParams.getAll('company');
    const jobPosition = searchParams.getAll('jobPosition');
    return {
      company: company.length > 0 ? company : undefined,
      jobPosition: jobPosition.length > 0 ? jobPosition : undefined,
      // Add more filter options here
    };
  }, [searchParams]);

  // **New useEffect to reset currentPage when filters change**
  useEffect(() => {
    // Reset currentPage to 1 when filters change
    setCurrentPage(1);
    // Clear the shown opportunities to avoid displaying old data
    setShownOpportunities([]);
    // Optionally, reset hasMore to true
    setHasMore(true);
  }, [filters]);

  // Fetch opportunities when the component mounts or when filters or pagination change
  useEffect(() => {
    const handleFetchOpportunities = async () => {
      setLoading(true);
      const offset = (currentPage - 1) * limit;
      const { data, error, totalCount } = await fetchOpportunities(supabase, filters, limit, offset);
      setTotalDBCount(totalCount || 0);

      if (error) {
        console.error("Error fetching opportunities:", error);
      } else if (data) {
        const mappedData: OpportunityCardProps[] = data.map((item) => {
          const { thread_id, opportunity } = item;

          return {
            conversation_id: thread_id,
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

        if (currentPage === 1) {
          setShownOpportunities(mappedData);
        } else {
          setShownOpportunities((prev) => [...prev, ...mappedData]);
        }

        // Check if there are more results
        if (offset + data.length >= (totalCount || 0)) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }

      setLoading(false);
    };

    handleFetchOpportunities();
  }, [supabase, filters, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading && currentPage === 1) {
    return <div>Loading...</div>;
  }

  if (shownOpportunities.length === 0 && !loading) {
    return <div>No opportunities found that match your criteria.</div>;
  }

  return (
    <div>
      {shownOpportunities.map((item) =>
        item.opportunity ? ( // Ensure item.opportunity is defined before rendering
          <OpportunityCard key={item.opportunity.opportunity_id} {...item} />
        ) : null
      )}
      {loading && currentPage > 1 && <div>Loading more...</div>}
      {hasMore && !loading && (
        <Button onClick={handleLoadMore}>
          Load {Math.min(limit, totalDBCount - (currentPage * limit))} More (Showing {Math.min(currentPage * limit, totalDBCount)} of {totalDBCount})
        </Button>
      )}
    </div>
  );
}
