import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'next/navigation'; // To handle URL params
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";
import { SelectedFilters } from './Filters';
import { Button } from "@mui/material";

export function OpportunityList() {
  const [shownOpportunities, setShownOpportunities] = useState<OpportunityCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const [hasMore, setHasMore] = useState(true);
  const [totalDBCount, setTotalDBCount] = useState<number>(0);
  const supabase = useMemo(() => createSupabaseClient(), []);
  const searchParams = useSearchParams();

  // Parse filters from searchParams
  const filters: SelectedFilters = useMemo(() => {
    const company = searchParams.getAll('company');
    const jobPosition = searchParams.getAll('jobPosition');
    return {
      company: company.length > 0 ? company : undefined,
      jobPosition: jobPosition.length > 0 ? jobPosition : undefined,
    };
  }, [searchParams]);

  // **Effect to reset state and immediately fetch new data on filter change**
  useEffect(() => {
    console.log("Filters changed:", filters); // Log the new filters
    // Reset relevant states when filters change
    setCurrentPage(1);             // Start from the first page
    setShownOpportunities([]);      // Clear current opportunities list
    setHasMore(true);               // Reset hasMore to true in case of new results
    fetchFilteredData(1);           // Fetch the first set of results for the new filters
  }, [filters]);                    // Triggered only when filters change

  // **Function to handle data fetching based on page and filters**
  const fetchFilteredData = async (page: number) => {
    setLoading(true);
    const offset = (page - 1) * limit;

    // Fetch data based on the provided page and filters
    const { data, error, totalCount } = await fetchOpportunities(supabase, filters, limit, offset);
    console.log("Fetched data:", data); // Log the fetched data
    console.log("Total count:", totalCount); // Log the total count
    if (error) {
      console.error("Error fetching opportunities:", error);
      setLoading(false);
      return;
    }

    setTotalDBCount(totalCount || 0); // Update the total count to reflect filtered results

    if (data) {
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

      // If fetching the first page, replace shownOpportunities; otherwise, append
      if (page === 1) {
        setShownOpportunities(mappedData);
      } else {
        setShownOpportunities((prev) => [...prev, ...mappedData]);
      }

      // Determine if there are more results to load
      setHasMore(offset + data.length < (totalCount || 0));
    }
    
    setLoading(false);
  };

  // **Effect to fetch additional pages (pagination)**
  useEffect(() => {
    if (currentPage > 1) {        // Only fetch additional data if currentPage is > 1
      fetchFilteredData(currentPage);
    }
  }, [currentPage]);               // Triggered only when currentPage changes

  // **Handler for Load More button**
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increase currentPage to trigger fetching the next page
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
