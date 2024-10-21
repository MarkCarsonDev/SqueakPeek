"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import { Filters, SelectedFilters } from "@/ui/explore/Filters";
import { OpportunityList } from "@/ui/explore/OpportunityList";
import { SearchBar } from "@/ui/explore/SearchBar";
import { SortOptions } from "@/ui/explore/SortOptions";
import "@/app/(main)/explore/explore.css";
import { OpportunityCard } from "@/ui/explore/OpportunityCard";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters with dynamic keys
  const [filters, setFilters] = useState<SelectedFilters>({
    searchQuery: '', // Initialize as empty string
    sortOption: '',  // Initialize as empty string
  });

  // Update filters when URL parameters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: SelectedFilters = {
      searchQuery: params.get('search') || '',
      sortOption: params.get('sort') || '',
    };

    // Iterate over all entries in the URL search params
    params.forEach((value, key) => {
      if (key !== 'search' && key !== 'sort') {
        // Handle other filters as arrays
        if (newFilters[key]) {
          // If the filter already exists, ensure it's an array and add the new value
          newFilters[key] = Array.isArray(newFilters[key])
            ? [...(newFilters[key] as string[]), value]
            : [newFilters[key] as string, value];
        } else {
          newFilters[key] = [value];
        }
      }
    });

    setFilters(newFilters);
  }, [searchParams]);

  // Update URL parameters when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (key === 'searchQuery' && typeof value === 'string' && value) {
        // TypeScript knows value is a string here
        queryParams.set('search', value);
      } else if (key === 'sortOption' && typeof value === 'string' && value) {
        // TypeScript knows value is a string here
        queryParams.set('sort', value);
      } else if (Array.isArray(value)) {
        // Handle other filters as arrays
        value.forEach((item) => queryParams.append(key, item));
      }
    });

    router.replace(`?${queryParams.toString()}`);
  }, [filters, router]);

  return (
    <div className="page-container">
      <div className="header-search-container">
        <div className="header-text">
          <Typography sx={{ margin: "1rem 1rem" }} variant="h5">
            <span style={{ fontWeight: "bold" }}>Explore</span> Opportunities
          </Typography>
          <Typography sx={{ marginLeft: "1rem" }} variant="body1">
            Explore entry-level roles, discover the application pipeline,
          </Typography>
          <Typography sx={{ marginLeft: "1rem" }} variant="body1">
            and talk to other applicants in the{" "}
            <span style={{ fontWeight: "bold" }}>company threads</span>.
          </Typography>
        </div>
        <SearchBar filters={filters} setFilters={setFilters} />
        <SortOptions filters={filters} setFilters={setFilters} />

      </div>
      <div className="card-filter-container">
        <div className="opportunity-column">
          

        <OpportunityCard
            id={1}
            title="Amazon"
            dateRangeStart="2023"
            dateRangeEnd="2024"
            jobPosition="Lead Software Developer (hardcoded sample, filters don't apply) "
            jobType="Full-Time"
            jobAvatar="/landingpage/insight.svg"
            positionStatus={true}
            userPositionStatus={false}
            totalApplied={100}
            rejected={50}
            oa={50}
            interviewing={50}
            offered={50}
            recentMessages={50}
            bookmarked={true}
          />


          <OpportunityList filters={filters} />
        </div>
        <div className="filter-column">
          <Typography
            variant="h6"
            sx={{ marginBottom: "0.5rem", marginLeft: "0.5rem" }}
          >
            Filters
          </Typography>
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </div>
  );
}
