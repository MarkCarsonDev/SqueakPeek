import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'next/navigation';
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";
import { SelectedFilters } from './Filters';
import { Typography, Button, Divider, Box } from "@mui/material";
import { Database } from "@/lib/types/database.types";
import { Just_Another_Hand } from "next/font/google";

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
    setLoading(true);
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
    return <Typography sx={{width: '100%', margin: '4rem', display: 'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        Loading...
      </Typography>;
  }

  if (totalDBCount == 0 && !loading) {
    return <Typography sx={{width: '100%', margin: '4rem', display: 'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        We couldn't find any opportunities that match your criterion...
      </Typography>;
  }

  return (
    <Box>
      {!loading && (
        <Box sx={{width: '100%', marginTop: '1rem', display: 'flex', flexDirection:'column', alignItems:"flex-end", justifyContent:'end'}}>
          <Typography sx={{float: 'right'}}>
            Found {totalDBCount} results
          </Typography>
        </Box>
      )}
      {shownOpportunities.map((item) =>
        item.opportunity ? (
          <OpportunityCard key={item.opportunity.opportunity_id} {...item} />
        ) : null
      )}
      {loading && currentPage > 1 && <div>Loading more...</div>}
      {hasMore && !loading && (
        <Button onClick={handleLoadMore}>
          Load {Math.min(limit, totalDBCount - (currentPage * limit))} more (Showing {Math.min(currentPage * limit, totalDBCount)} of {totalDBCount})
        </Button>
      )}
      {!hasMore && !loading && (
        <Typography>
          <p>Showing all {totalDBCount} opportunities</p>
          </Typography>
      )}
    </Box>
  );
}
