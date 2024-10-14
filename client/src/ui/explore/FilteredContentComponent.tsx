// FilteredContentComponent.tsx

import React, { useEffect, useState } from 'react';
import { SelectedFilters } from './Filters';
import { OpportunityCard } from './OpportunityCard';

interface Opportunity {
  id: number;
  title: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  jobPosition: string;
  jobType: string;
  positionStatus: string;
  userPositionStatus: string;
  // Add other fields as necessary
}

interface FilteredContentProps {
  filters: SelectedFilters;
}

const FilteredContentComponent: React.FC<FilteredContentProps> = ({ filters }) => {
  const [data, setData] = useState<Opportunity[]>([]);
  const [filteredData, setFilteredData] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data (from an API, database, etc.)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Replace this with your actual data fetching logic
        // For example, using fetch API or axios to call your backend
        // Here's an example with mock data:

        const fetchedData: Opportunity[] = [
          {
            id: 1,
            title: 'Amazon',
            dateRangeStart: '2023',
            dateRangeEnd: '2024',
            jobPosition: 'Software Development Engineer',
            jobType: 'full-time',
            positionStatus: 'Actively Hiring',
            userPositionStatus: 'Applied',
          },
          {
            id: 2,
            title: 'Google',
            dateRangeStart: '2023',
            dateRangeEnd: '2024',
            jobPosition: 'Intern',
            jobType: 'internship',
            positionStatus: 'Closed',
            userPositionStatus: 'Not Applied',
          },
          // ... more data
        ];

        // Simulate an API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data whenever the data or filters change
  useEffect(() => {
    const getFilteredData = () => {
      return data.filter((item) => {
        const matchesJobType =
          filters.jobTypes.length === 0 ||
          filters.jobTypes.includes(item.jobType);
        const matchesAppliedStatus =
          filters.appliedStatuses.length === 0 ||
          filters.appliedStatuses.includes(
            item.userPositionStatus.toLowerCase().replace(' ', '-')
          );
        const matchesYear =
          filters.years.length === 0 ||
          filters.years.includes(item.dateRangeStart) ||
          filters.years.includes(item.dateRangeEnd);

        return matchesJobType && matchesAppliedStatus && matchesYear;
      });
    };

    setFilteredData(getFilteredData());
  }, [data, filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (filteredData.length === 0) {
    return <div>No opportunities found.</div>;
  }

  return (
    <div>
      {/* Render OpportunityCards for each filtered opportunity */}
      {filteredData.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          title={opportunity.title}
          dateRangeStart={opportunity.dateRangeStart}
          dateRangeEnd={opportunity.dateRangeEnd}
          jobPosition={opportunity.jobPosition}
          jobType={opportunity.jobType}
          positionStatus={opportunity.positionStatus}
          userPositionStatus={opportunity.userPositionStatus}
        />
      ))}
    </div>
  );
};

export default FilteredContentComponent;
