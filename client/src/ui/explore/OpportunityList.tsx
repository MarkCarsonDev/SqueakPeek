import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'next/navigation';
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";
import { SelectedFilters } from './Filters';
import { Button } from "@mui/material";
import { Database } from "@/lib/types/database.types";

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
    const jobType = searchParams.getAll('jobType');
    const searchQuery = searchParams.get('searchQuery') || undefined;

    return {
      company: company.length > 0 ? company : undefined,
      jobPosition: jobPosition.length > 0 ? jobPosition : undefined,
      jobType: jobType.length > 0 ? jobType : undefined,
      searchQuery,
    };
  }, [searchParams]);

  useEffect(() => {
    console.log("Filters changed:", filters);
    setCurrentPage(1);
    setShownOpportunities([]);
    setHasMore(true);
    fetchFilteredData(1);
  }, [filters]);

  const fetchFilteredData = async (page: number) => {
    setLoading(true);
    const offset = (page - 1) * limit;
    const { data, error, totalCount } = await fetchOpportunities(supabase, filters, limit, offset);

    if (error) {
      console.error("Error fetching opportunities:", error);
      setLoading(false);
      return;
    }

    setTotalDBCount(totalCount || 0);

    if (data) {
      const mappedData: OpportunityCardProps[] = data.map((item) => {
        const { thread_id, opportunity } = item;
    
        // Assert `opportunity` as `Database["public"]["Tables"]["opportunity"]["Row"]`
        if (opportunity && !Array.isArray(opportunity)) {
          return {
            conversation_id: thread_id,
            opportunity: opportunity as Database["public"]["Tables"]["opportunity"]["Row"],
            aggregate: {
              totalApplied: 200,
              interviewing: 12,
              oa: 12,
              offered: 12,
              rejected: 12,
              messages: 12,
            },
          };
        } else {
          console.warn("Unexpected `opportunity` structure:", opportunity);
          return null; // Handle cases where `opportunity` is missing or invalid
        }
      }).filter((item): item is OpportunityCardProps => item !== null); // Remove any `null` values if `opportunity` was missing
    
      if (page === 1) {
        setShownOpportunities(mappedData);
      } else {
        setShownOpportunities((prev) => [...prev, ...mappedData]);
      }
    
      setHasMore(offset + data.length < (totalCount || 0));
    }
    
    
    setLoading(false);
  };

  useEffect(() => {
    if (currentPage > 1) {
      fetchFilteredData(currentPage);
    }
  }, [currentPage]);

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
        item.opportunity ? (
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
