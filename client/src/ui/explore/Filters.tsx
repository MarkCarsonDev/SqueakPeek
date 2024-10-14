import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Divider,
} from '@mui/material';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FiltersProps {
  jobTypes: FilterOption[];
  appliedStatuses: FilterOption[];
  years: FilterOption[];
  initialFilters: SelectedFilters;
  onFilterChange: (filters: SelectedFilters) => void;
}

export interface SelectedFilters {
  jobTypes: string[];
  appliedStatuses: string[];
  years: string[];
}

export const Filters: React.FC<FiltersProps> = ({
  jobTypes,
  appliedStatuses,
  years,
  initialFilters,
  onFilterChange,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    initialFilters
  );

  useEffect(() => {
    setSelectedFilters(initialFilters);
  }, [initialFilters]);

  const handleCheckboxChange = (
    section: keyof SelectedFilters,
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const updatedSection = prev[section].includes(value)
        ? prev[section].filter((item) => item !== value)
        : [...prev[section], value];

      const newFilters = {
        ...prev,
        [section]: updatedSection,
      };

      // Call the parent callback function to update filters
      onFilterChange(newFilters);

      return newFilters;
    });
  };

  const renderSection = (
    title: string,
    options: FilterOption[],
    sectionKey: keyof SelectedFilters
  ) => (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        {title}
      </Typography>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selectedFilters[sectionKey].includes(option.value)}
                onChange={() => handleCheckboxChange(sectionKey, option.value)}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      <Divider sx={{ marginTop: 2 }} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {renderSection('Job Type', jobTypes, 'jobTypes')}
      {renderSection('Applied', appliedStatuses, 'appliedStatuses')}
      {renderSection('Year', years, 'years')}
    </Box>
  );
};
