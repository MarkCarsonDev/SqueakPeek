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
  [key: string]: string[] | string | undefined;
  jobType?: string[];
  jobPosition?: string[];
  company?: string[];
  searchQuery?: string;
  // Add more filter keys as needed
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
    const [filterOptions, setFilterOptions] = useState<{ [key: string]: FilterOption[] }>({});
    const [localSelectedFilters, setLocalSelectedFilters] = useState<SelectedFilters>({});
    const searchParams = useSearchParams();
    const router = useRouter();
    const supabase = createSupabaseClient();
  
    const filterDefinitions: FilterDefinition[] = React.useMemo(
      () => [
        { title: 'Job Type', dbColumn: 'type', stateKey: 'jobType' },
        { title: 'Role Title', dbColumn: 'role_title', stateKey: 'jobPosition' },
        { title: 'Company', dbColumn: 'company_name', stateKey: 'company' },
      ],
      []
    );
  
    useEffect(() => {
        const fetchFilterOptions = async () => {
          const { data: opportunities, error } = await supabase.from('opportunity').select('*');
          if (error) {
            console.error('Error fetching opportunities:', error);
            return;
          }
      
          const optionsData: { [key: string]: FilterOption[] } = {};
          filterDefinitions.forEach((filterDef) => {
            const counts: { [key: string]: number } = {};
      
            (opportunities as Record<string, any>[]).forEach((item) => {
              const value: string = item[filterDef.dbColumn] || 'Unknown';
              counts[value] = (counts[value] || 0) + 1;
            });
      
            optionsData[filterDef.stateKey] = Object.entries(counts).map(([value, count]) => ({
              label: `${value} (${count})`,
              value,
              count,
            }));
          });
      
          setFilterOptions(optionsData);
        };
      
        fetchFilterOptions();
      }, [filterDefinitions, supabase]);
  
      useEffect(() => {
        if (open) {
          const initialFilters: SelectedFilters = {};
          filterDefinitions.forEach((filterDef) => {
            const paramValue = searchParams.get(filterDef.stateKey);
            if (paramValue) {
              initialFilters[filterDef.stateKey] = paramValue.split(','); // Split comma-separated values into an array
            }
          });
          initialFilters['searchQuery'] = searchParams.get('searchQuery') || undefined; // Handle search query as a string
          setLocalSelectedFilters(initialFilters);
        }
      }, [open, searchParams, filterDefinitions]);
      
  
    const handleCheckboxChange = (sectionKey: string, value: string) => {
      setLocalSelectedFilters((prevFilters) => {
        const existingValues = prevFilters[sectionKey] || [];
        const newValues = existingValues.includes(value)
          ? (existingValues as string[]).filter((v) => v !== value)
          : [...(existingValues as string[]), value];
  
        return { ...prevFilters, [sectionKey]: newValues };
      });
    };
  
    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
      
        // Clear existing filter parameters
        filterDefinitions.forEach((filterDef) => {
          params.delete(filterDef.stateKey);
        });
      
        // Set new filter parameters as comma-separated values
        Object.keys(localSelectedFilters).forEach((sectionKey) => {
          const values = localSelectedFilters[sectionKey];
          if (Array.isArray(values) && values.length > 0) {
            params.set(sectionKey, values.join(',')); // Join values with commas
          } else if (typeof values === 'string' && values) {
            params.set(sectionKey, values); // Directly set for search query
          }
        });
      
        router.replace(`?${params.toString()}`);
        handleClose();
      };
      
  
    const handleClearSelections = () => {
      setLocalSelectedFilters({});
    };
  
    const handleCancel = () => {
      handleClose();
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
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={selectedValues.includes(option.value)}
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
            renderSection(filterDef.title, filterOptions[filterDef.stateKey] || [], filterDef.stateKey)
          )}
          <Box sx={{ display: 'flex', position: 'absolute', bottom: '9.5vh', justifyContent: 'space-between', marginTop: '2rem', backgroundColor: 'white', width: 'calc(70% - 1rem)' }}>
            <Button variant="outlined" onClick={handleClearSelections}>
              Clear Selections
            </Button>
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
  