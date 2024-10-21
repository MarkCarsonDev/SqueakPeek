import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // To handle URL params
import { SelectedFilters } from './Filters';
import { OpportunityCard } from './OpportunityCard';
import { createSupabaseClient } from '../../../lib/supabase/client';

const supabase = createSupabaseClient();

export interface Opportunity {
  id: number;
  title: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  jobPosition: string;
  jobType: string;
  positionStatus: string;
  userPositionStatus: string;
}

interface OpportunityListProps {
  filters: SelectedFilters;
}

export const OpportunityList: React.FC<OpportunityListProps> = ({ filters }) => {
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Fetch all opportunities once when the component mounts
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('opportunity').select('*');

      if (error) {
        console.error('Error fetching opportunities:', error);
      } else if (data) {
        // Map the data to match the Opportunity interface
        const mappedData: Opportunity[] = data.map((item) => ({
          id: item.opportunity_id,
          title: item.company_name ?? 'Unknown',
          dateRangeStart: item.start_date ?? 'N/A',
          dateRangeEnd: item.end_date ?? 'N/A',
          jobPosition: item.role_title ?? 'Unknown Position',
          jobType: item.type ?? 'Unknown Type',
          positionStatus: item.position_status ?? 'Unknown',
          userPositionStatus: item.user_position_status ?? 'Not Applied',
        }));
        setAllOpportunities(mappedData);
        setFilteredOpportunities(mappedData); // Initially, all opportunities are shown
      }

      setLoading(false);
    };

    fetchOpportunities();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    const applyFilters = () => {
      let filtered = allOpportunities;

      // Apply company filter
      if (filters.title && filters.title.length > 0) {
        filtered = filtered.filter((opp) =>
          (filters.title as string[]).includes(opp.title)
        );
      }

      // Apply role title filter
      if (filters.jobPosition && filters.jobPosition.length > 0) {
        filtered = filtered.filter((opp) =>
          (filters.jobPosition as string[]).includes(opp.jobPosition)
        );
      }

      // Apply search query filter
      if (filters.searchQuery) {
        const searchLower = (filters.searchQuery as string).toLowerCase();
        filtered = filtered.filter(
          (opp) =>
            opp.title.toLowerCase().includes(searchLower) ||
            opp.jobPosition.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      if (filters.sortOption) {
        const [column, order] = filters.sortOption.split(':');
        filtered = filtered.slice().sort((a, b) => {
          const aValue = (a as any)[column];
          const bValue = (b as any)[column];
          if (aValue < bValue) return order === 'asc' ? -1 : 1;
          if (aValue > bValue) return order === 'asc' ? 1 : -1;
          return 0;
        });
      }

      setFilteredOpportunities(filtered);

      // Update the URL search params based on filters
      const queryParams = new URLSearchParams();

      // Company filter
      if (filters.title && filters.title.length > 0) {
        (filters.title as string[]).forEach((value) => queryParams.append('title', value));
      }

      // Role title filter
      if (filters.jobPosition && filters.jobPosition.length > 0) {
        (filters.jobPosition as string[]).forEach((value) =>
          queryParams.append('jobPosition', value)
        );
      }

      // Search query
      if (filters.searchQuery) {
        queryParams.append('search', filters.searchQuery);
      }

      // Sort option
      if (filters.sortOption) {
        queryParams.append('sort', filters.sortOption);
      }

      // Update the URL with the new query parameters
      router.replace(`?${queryParams.toString()}`);
    };

    applyFilters();
  }, [filters, allOpportunities, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (filteredOpportunities.length === 0) {
    return <div>No opportunities found.</div>;
  }

  return (
    <div>
      {filteredOpportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} {...opportunity} />
      ))}
    </div>
  );
};
