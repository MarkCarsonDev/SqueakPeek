"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@mui/material';
import { Filters, SelectedFilters } from "@/ui/explore/Filters";
import { OpportunityList } from "@/ui/explore/OpportunityList";
import { SearchBar } from '@/ui/explore/SearchBar';
import { SortOptions } from '@/ui/explore/SortOptions';
import "@/app/(main)/explore/explore.css";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<SelectedFilters>({
    jobTypes: [],
    appliedStatuses: [],
    years: [],
    searchQuery: '',
    sortOption: ''
  });

  // Update filters when URL parameters change
  useEffect(() => {
    const jobTypes = searchParams.getAll('jobType');
    const appliedStatuses = searchParams.getAll('appliedStatus');
    const years = searchParams.getAll('year');
    const searchQuery = searchParams.get('search') || '';
    const sortOption = searchParams.get('sort') || '';

    setFilters({
      jobTypes,
      appliedStatuses,
      years,
      searchQuery,
      sortOption
    });
  }, [searchParams]);

  // Update URL parameters when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();

    filters.jobTypes.forEach((value) => queryParams.append('jobType', value));
    filters.appliedStatuses.forEach((value) =>
      queryParams.append('appliedStatus', value)
    );
    filters.years.forEach((value) => queryParams.append('year', value));

    if (filters.searchQuery) {
      queryParams.set('search', filters.searchQuery);
    }

    if (filters.sortOption) {
      queryParams.set('sort', filters.sortOption);
    }

    router.replace(`?${queryParams.toString()}`);
  }, [filters, router]);

  return (
    <div className="page-container">
      <div className="header-search-container">
        {/* Search bar component can be placed here */}
        <Typography variant="h5" sx={{ margin: "1rem" }}>
          <strong>Explore</strong>
        </Typography>
        <SearchBar filters={filters} setFilters={setFilters} />
        <SortOptions filters={filters} setFilters={setFilters} />
      </div>
      <div className="card-filter-container">
        <div className="opportunity-column">
          <OpportunityList filters={filters} />
        </div>
        <div className="filter-column">
          <Typography variant="h6" sx={{ marginBottom: "0.5rem", marginLeft: "0.5rem" }}>
            Filters
          </Typography>
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </div>
  );
}
