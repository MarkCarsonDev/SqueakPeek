// Page.tsx

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Filters, SelectedFilters, FilterOption } from "@/ui/explore/Filters";
import { Typography, Avatar } from "@mui/material";
import { OpportunityCard } from "@/ui/explore/OpportunityCard";
import "@/app/(main)/explore/explore.css";
import FilteredContentComponent from "@/ui/explore/FilteredContentComponent";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Define getInitialFilters function
  const getInitialFilters = (): SelectedFilters => {
    const jobTypes = searchParams.getAll("jobType");
    const appliedStatuses = searchParams.getAll("appliedStatus");
    const years = searchParams.getAll("year");

    return {
      jobTypes,
      appliedStatuses,
      years,
    };
  };

  const [filters, setFilters] = useState<SelectedFilters>(getInitialFilters());

  const handleFilterChange = (selectedFilters: SelectedFilters) => {
    setFilters(selectedFilters);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();

    filters.jobTypes.forEach((value) => queryParams.append("jobType", value));
    filters.appliedStatuses.forEach((value) =>
      queryParams.append("appliedStatus", value)
    );
    filters.years.forEach((value) => queryParams.append("year", value));

    router.replace(`?${queryParams.toString()}`);
  }, [filters, router]);

  // Mock data for filter options
  const jobTypes: FilterOption[] = [
    { label: "Full-Time", value: "full-time" },
    { label: "Part-Time", value: "part-time" },
    { label: "Internship", value: "internship" },
  ];

  const appliedStatuses: FilterOption[] = [
    { label: "Applied", value: "applied" },
    { label: "Not Applied", value: "not-applied" },
  ];

  const years: FilterOption[] = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
  ];

  return (
    <div className="page-container">
      <div className="header-search-container">
        <div className="header-text">
          <Typography sx={{ margin: "1rem 1rem" }} variant="h5">
            <span style={{ fontWeight: "bold" }}>Explore</span> 321 Results
          </Typography>
          <Typography sx={{ marginLeft: "1rem" }} variant="body1">
            Explore entry-level roles, discover the application pipeline,
          </Typography>
          <Typography sx={{ marginLeft: "1rem" }} variant="body1">
            and talk to other applicants in the{" "}
            <span style={{ fontWeight: "bold" }}>company threads</span>.
          </Typography>
        </div>
      </div>
      <div className="card-filter-container">
        <div className="opportunity-column">
          {/* Render FilteredContentComponent here */}
          <OpportunityCard
            title="Amazon"
            jobAvatar={
              <Image
                src="/landingpage/insight.svg"
                height={50}
                width={50}
                alt="Logo"
              />
            }
            dateRangeStart="2023"
            dateRangeEnd="2024"
            jobPosition="Software Developer"
            jobType="Full-Time"
            positionStatus={true}
            userPositionStatus={true}
            totalApplied={100}
            rejected={50}
            oa={50}
            interviewing={50}
            offered={50}

          />
        </div>

        <div className="filter-column">
          <Typography
            variant="h6"
            style={{ marginBottom: "5px", marginLeft: ".5rem" }}
          >
            Filters
          </Typography>
          {/* Render Filters component here */}
          <Filters
            jobTypes={jobTypes}
            appliedStatuses={appliedStatuses}
            years={years}
            initialFilters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}
