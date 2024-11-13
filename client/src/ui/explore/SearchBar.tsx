import React, { useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('searchQuery') || '';
  const [localQuery, setLocalQuery] = useState(initialQuery); // Local state for search input

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value); // Update local state only
  };

  const applySearch = () => {
    // Update the search query in URL parameters when Enter is pressed or button clicked
    const params = new URLSearchParams(searchParams.toString());
    if (localQuery) {
      params.set('searchQuery', localQuery);
    } else {
      params.delete('searchQuery');
    }
    router.replace(`?${params.toString()}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applySearch();
    }
  };

  return (
    <TextField
      className="search-bar"
      label="Search Opportunities"
      variant="outlined"
      fullWidth
      value={localQuery} // Controlled by local state
      onChange={handleInputChange} // Update local state on change
      onKeyPress={handleKeyPress} // Trigger search on Enter key press
      sx={{ marginBottom: '1rem' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="text"
              size="small"
              onClick={applySearch} // Trigger search on button click
              sx={{
                color: 'grey',
                textTransform: 'none',
                fontSize: '0.8rem',
                padding: '0 4px',
                minWidth: 'fit-content',
              }}
              disableRipple
            >
              Press Enter
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};
