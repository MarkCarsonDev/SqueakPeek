'use client';
import React, { useState, useEffect } from "react";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "@/app/(main)/explore/explore.css";
import { OpportunityList } from "@/ui/explore/OpportunityList";
import { Filters } from "@/ui/explore/Filters";
import { useRouter } from 'next/navigation';
import { useTrack } from "@/lib/store/track";
import { useProfile } from "@/lib/store/profile"; 
import { faFilter, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBar({ resetSearch, onResetComplete }: { resetSearch: boolean; onResetComplete: () => void }) {
  const setSearchQuery = useTrack((state) => state.setSearchQuery);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
    if (resetSearch) {
      onResetComplete();
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search companies and roles"
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          mt: 1,
          height: "38px",
          backgroundColor: "white",
          borderRadius: "4px",
        },
      }}
      sx={{
        marginLeft: "10px",
        borderRadius: "4px",
        width: "40%",
      }}
    />
  );
}

export default function Page() {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [resetSearch, setResetSearch] = useState(false);
  const router = useRouter();

  const handleResetFilters = () => {
    router.replace(`?`);
    setResetSearch(true);
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
        <SearchBar resetSearch={resetSearch} onResetComplete={() => setResetSearch(false)} />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#496FFF",
            height: "40px",
            width: "auto",
            borderRadius: "20px",
            boxShadow: "none",
          }}
          onClick={() => setFilterModalOpen(true)}
        >
          <FontAwesomeIcon icon={faFilter} style={{ marginRight: ".5rem" }} />
          <Typography
            variant="subtitle1"
            style={{ color: "white", marginLeft: ".5rem" }}
          >
            Filters
          </Typography>
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#496FFF",
            height: "40px",
            width: "auto",
            borderRadius: "20px",
            boxShadow: "none",
          }}
          onClick={handleResetFilters}
        >
          <FontAwesomeIcon icon={faRedo} style={{ marginRight: ".5rem" }} />
          <Typography
            variant="subtitle1"
            style={{ color: "white", marginLeft: ".5rem" }}
          >
            Reset Filters
          </Typography>
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
