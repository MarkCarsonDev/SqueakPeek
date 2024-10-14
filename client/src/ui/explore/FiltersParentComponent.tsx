// FiltersParentComponent.tsx

import React, { useEffect, useState } from 'react';
import { Filters, SelectedFilters, FilterOption } from './Filters';
import { useRouter, useSearchParams } from 'next/navigation';
import FilteredContentComponent from './FilteredContentComponent';

// Mock data for filter options
const jobTypes: FilterOption[] = [
  { label: 'Full-Time', value: 'full-time' },
  { label: 'Part-Time', value: 'part-time' },
  { label: 'Internship', value: 'internship' },
];

const appliedStatuses: FilterOption[] = [
  { label: 'Applied', value: 'applied' },
  { label: 'Not Applied', value: 'not-applied' },
];

const years: FilterOption[] = [
  { label: '2021', value: '2021' },
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
];

const FiltersParentComponent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Define getInitialFilters function
  const getInitialFilters = (): SelectedFilters => {
    const jobTypes = searchParams.getAll('jobType');
    const appliedStatuses = searchParams.getAll('appliedStatus');
    const years = searchParams.getAll('year');

    return {
      jobTypes,
      appliedStatuses,
      years,
    };
  };

  const [filters, setFilters] = useState<SelectedFilters>(getInitialFilters());

  const handleFilterChange = (selectedFilters: SelectedFilters) => {
    setFilters(selectedFilters);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();

    filters.jobTypes.forEach((value) => queryParams.append('jobType', value));
    filters.appliedStatuses.forEach((value) =>
      queryParams.append('appliedStatus', value)
    );
    filters.years.forEach((value) => queryParams.append('year', value));

    router.replace(`?${queryParams.toString()}`);
  }, [filters, router]);

  return (
    <div>
      <Filters
        jobTypes={jobTypes}
        appliedStatuses={appliedStatuses}
        years={years}
        initialFilters={filters}
        onFilterChange={handleFilterChange}
      />
      {/* Pass filters to the child component */}
      <FilteredContentComponent filters={filters} />
    </div>
  );
};

export default FiltersParentComponent;
