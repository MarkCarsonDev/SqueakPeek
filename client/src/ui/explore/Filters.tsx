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
import { createSupabaseClient } from '@/lib/supabase/client';
import { useSearchParams, useRouter } from 'next/navigation';

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface SelectedFilters {
  [key: string]: string | string[] | undefined;
  searchQuery?: string;
  sortOption?: string;
  company?: string[];
  jobPosition?: string[];
}

interface FilterDefinition {
  title: string;
  dbColumn: string;
  stateKey: string;
}

export const Filters: React.FC = () => {
  const [filterOptions, setFilterOptions] = useState<{
    [key: string]: FilterOption[];
  }>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createSupabaseClient();

  // Define the filters here
  const filterDefinitions: FilterDefinition[] = React.useMemo(() => [
    {
      title: 'Company',
      dbColumn: 'company_name',
      stateKey: 'company',
    },
    {
      title: 'Role Title',
      dbColumn: 'role_title',
      stateKey: 'jobPosition',
    },
    // Add more filters as needed
  ], []);

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

          opportunities.forEach((item) => {
            // Access the value dynamically using the dbColumn
            const value: string = item[filterDef.dbColumn] || 'Unknown';

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
  }, [filterDefinitions, supabase]);

  const handleCheckboxChange = (sectionKey: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Get existing values
    const existingValues = params.getAll(sectionKey);

    if (existingValues.includes(value)) {
      // Remove the value
      const newValues = existingValues.filter((v) => v !== value);
      params.delete(sectionKey);
      newValues.forEach((v) => params.append(sectionKey, v));
    } else {
      // Add the value
      params.append(sectionKey, value);
    }

    router.replace(`?${params.toString()}`);
  };

  const renderSection = (
    title: string,
    options: FilterOption[],
    sectionKey: string
  ) => {
    const selectedValues = searchParams.getAll(sectionKey);

    return (
      <Box sx={{ marginBottom: 4 }} key={sectionKey}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {title}
        </Typography>
        <FormGroup>
          {options.map((option) => {
            const isChecked = selectedValues.includes(option.value);
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
