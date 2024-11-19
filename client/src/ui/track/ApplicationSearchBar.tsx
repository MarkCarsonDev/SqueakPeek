import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTrack } from "@/lib/store/track";

export default function ApplicationSearchBar() {
  const setSearchQuery = useTrack((state) => state.setSearchQuery);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <TextField
      variant="outlined"
      placeholder="Search Companies and roles"
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
        }
      }}
      sx={{
        marginLeft: "10px",
        borderRadius: "4px",
        width: "40%",
      }}
    />
  );
}
