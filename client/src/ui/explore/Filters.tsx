import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Divider,
  Card,
  Button,
  Modal,
} from '@mui/material';
import { createSupabaseClient } from '@/lib/supabase/client';
import { useSearchParams, useRouter } from 'next/navigation';

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface SelectedFilters {
  [key: string]: string[] | undefined;
  company?: string[];
  jobPosition?: string[];
  // Add more filter keys as needesd
}

interface FilterDefinition {
  title: string;
  dbColumn: string;
  stateKey: string;
}

interface FiltersProps {
  open: boolean;
  handleClose: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ open, handleClose }) => {
  const [filterOptions, setFilterOptions] = useState<{
    [key: string]: FilterOption[];
  }>({});
  const [localSelectedFilters, setLocalSelectedFilters] = useState<SelectedFilters>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createSupabaseClient();

  // Define the filters here
  const filterDefinitions: FilterDefinition[] = React.useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const fetchFilterOptions = async () => {
      // Fetch all necessary data from the 'opportunity' table
      const { data: opportunities, error } = await supabase.from('opportunity').select('*');

      if (error) {
        console.error('Error fetching opportunities:', error);
      } else if (opportunities) {
        const optionsData: { [key: string]: FilterOption[] } = {};

        // Loop through each filter definition to generate options
        for (const filterDef of filterDefinitions) {
          const counts: { [key: string]: number } = {};

          opportunities.forEach((item) => {
            // Access the value dynamically using the dbColumn
            const key: keyof typeof item = filterDef.dbColumn as keyof typeof item;
            const value: string = item[key] || 'Unknown';

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

  // Synchronize localSelectedFilters with URL parameters when modal opens
  useEffect(() => {
    if (open) {
      const initialFilters: SelectedFilters = {};
      filterDefinitions.forEach((filterDef) => {
        initialFilters[filterDef.stateKey] = searchParams.getAll(filterDef.stateKey);
      });
      setLocalSelectedFilters(initialFilters);
    }
  }, [open, searchParams, filterDefinitions]);

  const handleCheckboxChange = (sectionKey: string, value: string) => {
    setLocalSelectedFilters((prevFilters) => {
      const existingValues = prevFilters[sectionKey] || [];
      let newValues: string[];

      if (existingValues.includes(value)) {
        // Remove the value
        newValues = existingValues.filter((v) => v !== value);
      } else {
        // Add the value
        newValues = [...existingValues, value];
      }

      return {
        ...prevFilters,
        [sectionKey]: newValues,
      };
    });
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Clear existing filter parameters
    filterDefinitions.forEach((filterDef) => {
      params.delete(filterDef.stateKey);
    });

    // Set new filter parameters
    Object.keys(localSelectedFilters).forEach((sectionKey) => {
      const values = localSelectedFilters[sectionKey];
      if (values) {
        values.forEach((value) => {
          params.append(sectionKey, value);
        });
      }
    });

    router.replace(`?${params.toString()}`);

    handleClose();
  };

  const handleCancel = () => {
    handleClose();
    // Reset localSelectedFilters to match URL parameters
    const initialFilters: SelectedFilters = {};
    filterDefinitions.forEach((filterDef) => {
      initialFilters[filterDef.stateKey] = searchParams.getAll(filterDef.stateKey);
    });
    setLocalSelectedFilters(initialFilters);
  };

  const renderSection = (title: string, options: FilterOption[], sectionKey: string) => {
    const selectedValues = localSelectedFilters[sectionKey] || [];

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
    <Modal
      open={open}
      onClose={handleCancel}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          width: '70%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '2rem',
          borderRadius: '8px',
        }}
      >
        {filterDefinitions.map((filterDef) =>
          renderSection(
            filterDef.title,
            filterOptions[filterDef.stateKey] || [],
            filterDef.stateKey
          )
        )}
        <Box sx={{ display: 'flex', position: 'absolute', bottom: '9.5vh', justifyContent: 'space-between', marginTop: '2rem', backgroundColor: 'white', width: 'calc(70% - 1rem)'}}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};
