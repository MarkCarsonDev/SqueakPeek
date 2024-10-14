import React, { useEffect, useState } from 'react';
import { Filters, SelectedFilters, FilterOption } from './Filters';
import { useRouter, useSearchParams } from 'next/navigation';

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

const ParentComponent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  // Example data to be filtered
  const data = [
    // {
    //   id: 1,
    //   jobType: 'full-time',
    //   appliedStatus: 'applied',
    //   year: '2022',
    // },
    // ... more data
  ];

  // Function to filter data based on selected filters
  const getFilteredData = () => {
    return data.filter((item) => {
      const matchesJobType =
        filters.jobTypes.length === 0 ||
        filters.jobTypes.includes(item.jobType);
      const matchesAppliedStatus =
        filters.appliedStatuses.length === 0 ||
        filters.appliedStatuses.includes(item.appliedStatus);
      const matchesYear =
        filters.years.length === 0 || filters.years.includes(item.year);

      return matchesJobType && matchesAppliedStatus && matchesYear;
    });
  };

  const filteredData = getFilteredData();

  return (
    <div>
      <Filters
        jobTypes={jobTypes}
        appliedStatuses={appliedStatuses}
        years={years}
        initialFilters={filters}
        onFilterChange={handleFilterChange}
      />
      {/* Render filtered results here */}
      <div>
        {filteredData.map((item) => (
          <div key={item.id}>
            {/* Render item details */}
            <p>{item.jobType}</p>
            <p>{item.appliedStatus}</p>
            <p>{item.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentComponent;
