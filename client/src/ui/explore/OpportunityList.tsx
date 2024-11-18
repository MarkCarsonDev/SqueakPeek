// OpportunityList.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'next/navigation';
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";
import { SelectedFilters } from './Filters';
import { Typography, Button, Box, Skeleton } from "@mui/material";
import { Database } from "@/lib/types/database.types";

export function OpportunityList() {
  const [shownOpportunities, setShownOpportunities] = useState<OpportunityCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 25;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const mappedData: OpportunityCardProps[] = data
        .map((item) => {
          const { thread_id: conversation_id } = item;
            
            // const trackingData = (opportunity as Database["public"]["Tables"]["opportunity"]["Row"] & {
            //   opportunity_tracking: Database["public"]["Tables"]["opportunity_tracking"]["Row"][];
            // }).opportunity_tracking;

            const opportunity =
              item.opportunity as unknown as Database["public"]["Tables"]["opportunity"]["Row"] & {
                opportunity_tracking?: {
                  applied?: number;
                  interviewing?: number;
                  online_assessment?: number;
                  offered?: number;
                  rejected?: number;
                };
              };
          if (!opportunity) {
            console.warn("Unexpected `opportunity` structure:", opportunity);
            return null;
          }
            
          const trackingData = opportunity.opportunity_tracking;



            if (trackingData && trackingData) {
              const tracking = trackingData; // Taking the first tracking entry
              console.log("Tracking data found for opportunity:", opportunity, tracking);

              return {
                conversation_id,
                opportunity: opportunity as Database["public"]["Tables"]["opportunity"]["Row"] & {
                  opportunity_tracking: Database["public"]["Tables"]["opportunity_tracking"]["Row"][] | null;
                },
                aggregate: {
                  totalApplied: tracking.applied || 0,
                  interviewing: tracking.interviewing || 0,
                  oa: tracking.online_assessment || 0,
                  offered: tracking.offered || 0,
                  rejected: tracking.rejected || 0,
                },
              };
            } else {
              // Handle cases where 'opportunity_tracking' is null or empty
              console.log("No tracking data found for opportunity:", opportunity);
              return {
                conversation_id,
                opportunity: opportunity as Database["public"]["Tables"]["opportunity"]["Row"] & {
                  opportunity_tracking: Database["public"]["Tables"]["opportunity_tracking"]["Row"][] | null;
                },
                aggregate: {
                  totalApplied: 0,
                  interviewing: 0,
                  oa: 0,
                  offered: 0,
                  rejected: 0,
                },
              };
            }
        })
        .filter((item) => item !== null); // Remove any `null` values

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (loading && currentPage === 1) {
    return (
      <Box>
        <Skeleton variant="rectangular" width="100%" height={118} />
      </Box>
    );
  }

  if (totalDBCount === 0 && !loading) {
    return (
      <Typography
        sx={{
          width: '100%',
          margin: '4rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        We couldn{"'"}t find any opportunities that match your criterion...
      </Typography>
    );
  }

  return (
    <Box>
      {!loading && (
        <Box
          sx={{
            width: '100%',
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "flex-end",
            justifyContent: 'end',
          }}
        >
          <Typography sx={{ float: 'right' }}>
            Found {totalDBCount} results
          </Typography>
        </Box>
      )}
      {shownOpportunities.map((item) =>
        item.opportunity ? (
          <OpportunityCard key={item.opportunity.opportunity_id} {...item} />
        ) : null
      )}
      {loading && currentPage > 1 && (
        <Skeleton variant="rectangular" width="100%" height={118} />
      )}
      {hasMore && !loading && (
        <Button onClick={handleLoadMore}>
          Load {Math.min(limit, totalDBCount - (currentPage * limit))} more (Showing{' '}
          {Math.min(currentPage * limit, totalDBCount)} of {totalDBCount})
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
