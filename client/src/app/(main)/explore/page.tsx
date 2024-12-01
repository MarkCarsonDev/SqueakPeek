'use client';
import { Typography, Button } from "@mui/material";
import "@/app/(main)/explore/explore.css";
import { OpportunityList } from "@/ui/explore/OpportunityList";
import { Filters } from "@/ui/explore/Filters";
import { SearchBar } from "@/ui/explore/SearchBar";
import { useState, useEffect, use } from "react";
import { useRouter } from 'next/navigation';
import { useTrack } from "@/lib/store/track";
import { useProfile } from "@/lib/store/profile"; 

export default function Page() {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [resetSearch, setResetSearch] = useState(false); // New state
  const router = useRouter();

  const handleResetFilters = () => {
    router.replace(`?`);
    setResetSearch(true);
  };

  // Reset `resetSearch` state after the search bar has cleared
  const handleSearchResetComplete = () => {
    setResetSearch(false);
  };

  const { fetchApplications } = useTrack();
  const { profile } = useProfile();

  useEffect(() => {
    if (profile) {
      fetchApplications(profile);
    }
  }, [profile, fetchApplications]);

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
        <SearchBar resetSearch={resetSearch} onResetComplete={handleSearchResetComplete} />
        <Button className="filter-button explore-control-button" variant="contained" onClick={() => setFilterModalOpen(true)}>
          Filters
        </Button>
        <Button className="reset-filter-button explore-control-button" variant="outlined" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
      <div className="card-filter-container">
        <div className="opportunity-list-container">
          <OpportunityList />
        </div>
        <Filters open={isFilterModalOpen} handleClose={() => setFilterModalOpen(false)} />
      </div>
    </div>
  );
}
