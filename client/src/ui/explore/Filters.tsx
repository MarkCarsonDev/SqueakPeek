import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Divider,
  Card,
} from '@mui/material';
import { createSupabaseClient } from '../../../lib/supabase/client';

const supabase = createSupabaseClient();

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface SelectedFilters {
  [key: string]: string[]; // Changed to make it dynamic
  searchQuery: string;
  sortOption: string;
}

interface FilterDefinition {
  title: string;
  dbColumn: string;
  stateKey: string;
}

interface FiltersProps {
  filters: SelectedFilters;
  setFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [filterOptions, setFilterOptions] = useState<{
    [key: string]: FilterOption[];
  }>({});

  // Define filters here
  const filterDefinitions: FilterDefinition[] = [
    // {
    //   title: 'Applied Status',
    //   dbColumn: 'user_position_status',
    //   stateKey: 'appliedStatuses',
    // },
    // {
    //   title: 'Year',
    //   dbColumn: 'start_date',
    //   stateKey: 'years',
    // },
    {
        title: 'Company',
        dbColumn: 'company_name',
        stateKey: 'title',
    },
    {
        title: 'Role Title',
        dbColumn: 'role_title',
        stateKey: 'jobPosition',
    }
  ];

  useEffect(() => {
    const fetchFilterOptions = async () => {
      // Fetch all necessary data
      const { data: opportunities, error } = await supabase
        .from('opportunity')
        .select('*');

      if (error) {
        console.error('Error fetching opportunities:', error);
      } else if (opportunities) {
        const optionsData: { [key: string]: FilterOption[] } = {};

        for (const filterDef of filterDefinitions) {
          const counts: { [key: string]: number } = {};

          opportunities.forEach((item) => {
            let value: string;

            // if (filterDef.dbColumn === 'start_date') {
            //   if (item.start_date) {
            //     value = new Date(item.start_date).getFullYear().toString();
            //   } else {
            //     value = 'Unknown';
            //   }
            // } else {
            //   value = item[filterDef.dbColumn] || 'Unknown';
            // }
            value = item[filterDef.dbColumn] || 'Unknown';

            counts[value] = (counts[value] || 0) + 1;
          });

          const options = Object.entries(counts).map(([value, count]) => ({
            label: `${value} (${count})`,
            value: value,
            count,
          }));

          optionsData[filterDef.stateKey] = options;
        }

        setFilterOptions(optionsData);
      }
    };

    fetchFilterOptions();
  }, [filterDefinitions]);

  const handleCheckboxChange = (
    sectionKey: string,
    value: string
  ) => {
    setFilters((prev) => {
      const currentValues = prev[sectionKey] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return { ...prev, [sectionKey]: newValues };
    });
  };

  const renderSection = (
    title: string,
    options: FilterOption[],
    sectionKey: string
  ) => (
    <Box sx={{ marginBottom: 4 }} key={sectionKey}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        {title}
      </Typography>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={(filters[sectionKey] || []).includes(option.value)}
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
    <Card sx={{ border: 'solid 3px #e0e4f2', borderRadius: '20px', padding: '1rem' }}>
      {filterDefinitions.map((filterDef) =>
        renderSection(
          filterDef.title,
          filterOptions[filterDef.stateKey] || [],
          filterDef.stateKey
        )
      )}
      {/* Add more filter sections as needed */}
    </Card>
  );
};
