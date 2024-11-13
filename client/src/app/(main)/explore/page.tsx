"use client";
import { Typography, Button } from "@mui/material";
import "@/app/(main)/explore/explore.css";
import { OpportunityList } from "@/ui/explore/OpportunityList";
import { Filters } from "@/ui/explore/Filters";
import { SearchBar } from "@/ui/explore/SearchBar";
import { useState } from "react";

export default function Page() {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

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
        < SearchBar />
        {/* To Add Later <SortOptions /> */}
        <Button variant="contained" onClick={() => setFilterModalOpen(true)}>
          Filters
        </Button>
      </div>
      <div className="card-filter-container">
        {/* This OpportunityList contains the OpportunityCards */}
        <div className="opportunity-list-container">
          <OpportunityList />
        </div>
        {/* Filters Modal */}
        <Filters open={isFilterModalOpen} handleClose={() => setFilterModalOpen(false)} />
      </div>
    </div>
  );
}
