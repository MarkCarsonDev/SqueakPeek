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
  [key: string]: string | string[] | undefined;
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

// Define an interface for the raw opportunity data with an index signature
interface OpportunityRaw {
  [key: string]: any; // Allows dynamic property access using string keys
  company_name?: string;
  role_title?: string;
  // Add other known properties if needed
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [filterOptions, setFilterOptions] = useState<{
    [key: string]: FilterOption[];
  }>({});

  // Define the filters here
  const filterDefinitions: FilterDefinition[] = [
    {
      title: 'Company',
      dbColumn: 'company_name',
      stateKey: 'title',
    },
    {
      title: 'Role Title',
      dbColumn: 'role_title',
      stateKey: 'jobPosition',
    },
    // Add more filters as needed
  ];

  useEffect(() => {
    const fetchFilterOptions = async () => {
      // Fetch all necessary data from the 'opportunity' table
      const { data: opportunities, error } = await supabase
        .from('opportunity')
        .select('*');

      if (error) {
        console.error('Error fetching opportunities:', error);
      } else if (opportunities) {
        const optionsData: { [key: string]: FilterOption[] } = {};

        // Loop through each filter definition to generate options
        for (const filterDef of filterDefinitions) {
          const counts: { [key: string]: number } = {};

          // Cast opportunities to OpportunityRaw[] to use index signature
          (opportunities as OpportunityRaw[]).forEach((item) => {
            // Access the value dynamically using the dbColumn
            let value: string = item[filterDef.dbColumn] || 'Unknown';

            // Increment the count for this value
            counts[value] = (counts[value] || 0) + 1;
          });

          // Convert counts object to an array of FilterOption
          const options = Object.entries(counts).map(([value, count]) => ({
            label: `${value} (${count})`,
            value: value,
            count,
          }));

          // Store the options using the stateKey
          optionsData[filterDef.stateKey] = options;
        }

        // Update the state with the new filter options
        setFilterOptions(optionsData);
      }
    };

    fetchFilterOptions();
  }, [filterDefinitions]);

  const handleCheckboxChange = (sectionKey: string, value: string) => {
    setFilters((prev) => {
      const prevValue = prev[sectionKey];
      let currentValues: string[] = [];

      if (Array.isArray(prevValue)) {
        currentValues = prevValue;
      } else if (typeof prevValue === 'string') {
        currentValues = [prevValue];
      } else {
        currentValues = [];
      }

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
  ) => {
    const selectedValues = filters[sectionKey];
    const isArray = Array.isArray(selectedValues);

    return (
      <Box sx={{ marginBottom: 4 }} key={sectionKey}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {title}
        </Typography>
        <FormGroup>
          {options.map((option) => {
            const isChecked =
              isArray && (selectedValues as string[]).includes(option.value);
            return (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(sectionKey, option.value)}
                  />
                }
                label={option.label}
              />
            );
          })}
        </FormGroup>
        <Divider />
      </Box>
    );
  };

  return (
    <Card
      sx={{ border: 'solid 3px #e0e4f2', borderRadius: '20px', padding: '1rem' }}
    >
      {filterDefinitions.map((filterDef) =>
        renderSection(
          filterDef.title,
          filterOptions[filterDef.stateKey] || [],
          filterDef.stateKey
        )
      )}
    </Card>
  );
};
