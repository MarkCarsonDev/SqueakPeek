"use client";
import { Typography } from "@mui/material";
import "@/app/(main)/explore/explore.css";
import { OpportunityList } from "@/ui/explore/OpportunityList";
import { Filters } from "@/ui/explore/Filters";

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
        {/* To Add Later <SearchBar /> */}
        {/* To Add Later <SortOptions /> */}
      </div>
      <div className="card-filter-container">
        {/* This OpportunityList contains the OpportunityCards */}
        <OpportunityList />
        <Typography
          variant="h6"
          sx={{ marginBottom: "0.5rem", marginLeft: "0.5rem" }}
        >
          Filters
          <Filters />
        </Typography>
      </div>
    </div>
  );
}
