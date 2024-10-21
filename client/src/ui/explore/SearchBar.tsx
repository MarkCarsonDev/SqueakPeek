// import React from 'react';
// import { TextField } from '@mui/material';
// import { SelectedFilters } from './Filters';

// interface SearchBarProps {
//   filters: SelectedFilters;
//   setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({ filters, setFilters }) => {
//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilters((prev) => ({ ...prev, searchQuery: event.target.value }));
//   };

//   return (
//     <TextField
//       label="Search Opportunities"
//       variant="outlined"
//       fullWidth
//       value={filters.searchQuery}
//       onChange={handleSearchChange}
//       sx={{ marginBottom: '1rem' }}
//     />
//   );
// };
