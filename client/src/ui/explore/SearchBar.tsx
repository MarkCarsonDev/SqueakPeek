import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  resetSearch: boolean;
  onResetComplete: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ resetSearch, onResetComplete }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('searchQuery') || '';
  const [localQuery, setLocalQuery] = useState(initialQuery);

  useEffect(() => {
    if (resetSearch) {
      setLocalQuery(''); // Clear the search input
      onResetComplete(); // Notify parent that reset is complete
    }
  }, [resetSearch, onResetComplete]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
  };

  const applySearch = () => {
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
      value={localQuery}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      sx={{ marginBottom: '1rem' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="text"
              size="small"
              onClick={applySearch}
              sx={{
                color: 'grey',
                textTransform: 'none',
                fontSize: '0.8rem',
                padding: '0 4px',
                minWidth: 'fit-content',
              }}
              disableRipple
            >
              Search -&gt;
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};
