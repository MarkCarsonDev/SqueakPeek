import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Divider,
  Card
} from '@mui/material';

export interface FilterOption {
  label: string;
  value: string;
}

export interface SelectedFilters {
  jobTypes: string[];
  appliedStatuses: string[];
  years: string[];
  searchQuery: string;
  sortOption: string;
}

interface FiltersProps {
  filters: SelectedFilters;
  setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const jobTypeOptions: FilterOption[] = [
    { label: 'Full-Time', value: 'full-time' },
    { label: 'Part-Time', value: 'part-time' },
    { label: 'Internship', value: 'internship' },
    // Fetch from Supabase if needed
  ];

  const appliedStatusOptions: FilterOption[] = [
    { label: 'Applied', value: 'applied' },
    { label: 'Not Applied', value: 'not-applied' },
  ];

  const yearOptions: FilterOption[] = [
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
  ];

  const handleCheckboxChange = (
    section: keyof Omit<SelectedFilters, 'searchQuery' | 'sortOption'>,
    value: string
  ) => {
    setFilters((prev) => {
      const currentValues = prev[section];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return { ...prev, [section]: newValues };
    });
  };

  const renderSection = (
    title: string,
    options: FilterOption[],
    sectionKey: keyof Omit<SelectedFilters, 'searchQuery' | 'sortOption'>
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
                checked={filters[sectionKey].includes(option.value)}
                onChange={() => handleCheckboxChange(sectionKey, option.value)}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      <Divider />
    </Box>
  );

  return (
    <Card sx={{ border: "solid 3px #e0e4f2", borderRadius: "20px", padding: "1rem" }}>
      {renderSection('Job Type', jobTypeOptions, 'jobTypes')}
      {renderSection('Applied Status', appliedStatusOptions, 'appliedStatuses')}
      {renderSection('Year', yearOptions, 'years')}
      {/* Add more filter sections as needed */}
    </Card>
  );
};
