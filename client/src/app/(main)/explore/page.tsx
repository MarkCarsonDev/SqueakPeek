"use client";
import { Typography } from "@mui/material";
import "@/app/(main)/explore/explore.css";
import { OpportunityCard } from "@/ui/explore/OpportunityCard";
import { OpportunityList } from "@/ui/explore/OpportunityList";

export default function Page() {

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
        {/* To Add Later <SearchBar filters={filters} setFilters={setFilters} /> */}
        {/* To Add Later <SortOptions filters={filters} setFilters={setFilters} /> */}
      </div>
      <div className="card-filter-container">


          {/* Hard coded card will be repalaced with opportunity list which is connected to filters */}
          <OpportunityCard
            id={"1"}
            conversation_id={"1"}
            title="Amazon"
            jobPosition="Lead Software Developer"
            jobType="Full-Time"
            jobAvatar="/landingpage/insight.svg"
            positionStatus={true}
            userPositionStatus={false}
            totalApplied={100}
            rejected={25}
            oa={25}
            interviewing={25}
            offered={25}
            recentMessages={50}
            bookmarked={true}
          />
          {/* <OpportunityList filters={filters} />
          <OpportunityList /> */}
          <Typography
            variant="h6"
            sx={{ marginBottom: "0.5rem", marginLeft: "0.5rem" }}
          >
            Filters
          </Typography>
          {/* <Filters filters={filters} setFilters={setFilters} /> */}
      </div>
    </div>
  );
}
