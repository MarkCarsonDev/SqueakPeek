"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { fetchOpportunities } from "@/lib/utils/fetchOpportunities";
import { SelectedFilters } from "./Filters";
import { Typography, Button, Box } from "@mui/material";
import { Database } from "@/lib/types/database.types";
import { OpportunityCardSkeletonList } from "./OpportunityCardSkeletonList";

interface OpportunityListProps {
  applicationsLoaded: boolean; // Prop to ensure data loads after applications are fetched
}

export function OpportunityList({ applicationsLoaded }: OpportunityListProps) {
  const [shownOpportunities, setShownOpportunities] = useState<
    OpportunityCardProps[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDBCount, setTotalDBCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const supabase = useMemo(() => createSupabaseClient(), []);
  const searchParams = useSearchParams();

  const limit = 33; // Number of opportunities per page

  // Parse filters from searchParams
  const filters: SelectedFilters = useMemo(() => {
    const company = searchParams.getAll("company");
    const jobPosition = searchParams.getAll("jobPosition");
    const jobType = searchParams.getAll("jobType");
    const searchQuery = searchParams.get("searchQuery") || undefined;

    return {
      company: company.length > 0 ? company : undefined,
      jobPosition: jobPosition.length > 0 ? jobPosition : undefined,
      jobType: jobType.length > 0 ? jobType : undefined,
      searchQuery,
    };
  }, [searchParams]);

  // Fetch opportunities when filters change
  useEffect(() => {
    if (!applicationsLoaded) return; // Wait for applications to load
    setLoading(true);
    setCurrentPage(1);
    setShownOpportunities([]);
    setHasMore(true);
    fetchFilteredData(1); // Fetch the first page
  }, [filters, applicationsLoaded]);

  // Fetch additional pages when currentPage changes
  useEffect(() => {
    if (!applicationsLoaded || currentPage === 1) return; // Skip on initial load or if not ready
    fetchFilteredData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchFilteredData = async (page: number) => {
    setLoading(true);
    const offset = (page - 1) * limit;

    const { data, error, totalCount } = await fetchOpportunities(
      supabase,
      filters,
      limit,
      offset
    );

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
              opportunity_tracking?:
                | Database["public"]["Tables"]["opportunity_tracking"]["Row"][]
                | null;
            };
          if (!opportunity) {
            console.warn("Unexpected opportunity structure:", opportunity);
            return null;
          }
          // Sum up the fields from all `opportunity_tracking` entries
          const aggregate = opportunity.opportunity_tracking?.reduce(
            (totals, tracking) => {
              return {
                rejected: totals.rejected + (tracking.rejected || 0),
                interviewing:
                  totals.interviewing + (tracking.interviewing || 0),
                offered: totals.offered + (tracking.offer || 0),
                oa: totals.oa + (tracking.online_assessment || 0),
                applied: totals.applied + (tracking.applied || 0),
                totalApplied:
                  totals.totalApplied + (tracking.total_applied || 0),
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
            opportunity:
              opportunity as Database["public"]["Tables"]["opportunity"]["Row"] & {
                opportunity_tracking:
                  | Database["public"]["Tables"]["opportunity_tracking"]["Row"][]
                  | null;
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

      setShownOpportunities((prev) =>
        page === 1 ? mappedData : [...prev, ...mappedData]
      );

      setHasMore(offset + data.length < (totalCount || 0));
    }

    setLoading(false);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // TODO Add Skeleton list here
  // Render Skeleton while loading the first page
  if (loading && currentPage === 1) {
    return <OpportunityCardSkeletonList />;
  }

  // Display a message if no results are found
  if (!loading && totalDBCount === 0) {
    return (
      <Typography
        sx={{
          width: "100%",
          margin: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        We couldn&apos;t find any opportunities that match your criteria...
      </Typography>
    );
  }

  return (
    <Box>
      {/* Results summary */}
      {!loading && (
        <Box sx={{ textAlign: "right", marginBottom: "1rem" }}>
          <Typography>Found {totalDBCount} opportunities</Typography>
        </Box>
      )}

      {/* Opportunity cards */}
      {shownOpportunities.map((item) => (
        <OpportunityCard key={item.opportunity.opportunity_id} {...item} />
      ))}

      {/* Load more button */}
      {hasMore && !loading && (
        <Button onClick={handleLoadMore}>
          Load More ({Math.min(limit, totalDBCount - currentPage * limit)}{" "}
          remaining)
        </Button>
      )}

      {/* End of results message */}
      {!hasMore && !loading && (
        <Typography sx={{ textAlign: "center", marginTop: "2rem" }}>
          You&apos;ve reached the end of the list!
        </Typography>
      )}
    </Box>
  );
}
