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
  const limit = 33;
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

                const opportunity =
                    item.opportunity as unknown as Database["public"]["Tables"]["opportunity"]["Row"] & {
                        opportunity_tracking?: Database["public"]["Tables"]["opportunity_tracking"]["Row"][] | null;
                    };
                if (!opportunity) {
                    console.warn("Unexpected `opportunity` structure:", opportunity);
                    return null;
                }

                console.log("Opp ID:", opportunity.opportunity_id)
                console.log("Opportunity Tracking:", opportunity.opportunity_tracking)

                // Sum up the fields from all `opportunity_tracking` entries
                const aggregate = opportunity.opportunity_tracking?.reduce(
                    (totals, tracking) => {
                      console.log("track data", tracking)
                        return {
                            rejected: totals.rejected + (tracking.rejected || 0),
                            interviewing: totals.interviewing + (tracking.interviewing || 0),
                            offered: totals.offered + (tracking.offer || 0),
                            oa: totals.oa + (tracking.online_assessment || 0),
                            applied: totals.applied + (tracking.applied || 0),
                            totalApplied: totals.totalApplied + (tracking.total_applied || 0),
                        };
                    },
                    {
                        rejected: 0,
                        interviewing: 0,
                        offered: 0,
                        oa: 0,
                        applied: 0,
                        totalApplied: 0,
                    }
                );

                return {
                    conversation_id,
                    opportunity: opportunity as Database["public"]["Tables"]["opportunity"]["Row"] & {
                        opportunity_tracking: Database["public"]["Tables"]["opportunity_tracking"]["Row"][] | null;
                    },
                    aggregate: aggregate || {
                        rejected: 0,
                        interviewing: 0,
                        offered: 0,
                        oa: 0,
                        applied: 0,
                        totalApplied: 0,
                    },
                };
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
