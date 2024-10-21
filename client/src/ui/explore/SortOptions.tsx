import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { SelectedFilters } from './Filters';

interface SortOptionsProps {
  filters: SelectedFilters;
  setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export const SortOptions: React.FC<SortOptionsProps> = ({ filters, setFilters }) => {
  const handleSortChange = (
    event: SelectChangeEvent,
  ) => {
    setFilters((prev) => ({ ...prev, sortOption: event.target.value }));
  };

  return (
    <FormControl variant="outlined" className="sort-options" fullWidth sx={{ marginBottom: '1rem' }}>
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select
        labelId="sort-label"
        value={filters.sortOption}
        onChange={handleSortChange}
        label="Sort By"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="dateRangeStart:asc">Start Date Ascending</MenuItem>
        <MenuItem value="dateRangeStart:desc">Start Date Descending</MenuItem>
        {/* Add more sorting options as needed */}
      </Select>
    </FormControl>
  );
};
