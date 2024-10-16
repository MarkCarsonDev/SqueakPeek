import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // To handle URL params
import { SelectedFilters } from './Filters';
import { OpportunityCard } from './OpportunityCard';
import { createSupabaseClient } from "../../../lib/supabase/client";

const supabase = createSupabaseClient();

interface Opportunity {
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
  const searchParams = useSearchParams();

  // Fetch all opportunities once when the component mounts
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('opportunity').select('*');

      if (error) {
        console.error('Error fetching opportunities:', error);
      } else if (data) {
        const mappedData: Opportunity[] = data.map((item) => ({
          id: item.opportunity_id,
          title: item.company_name,
          dateRangeStart: item.start_date ?? 'N/A', // Replace with actual field or default
          dateRangeEnd: item.end_date ?? 'N/A',     // Replace with actual field or default
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

  // Apply filters when they change
  useEffect(() => {
    const applyFilters = () => {
      let filtered = allOpportunities;

      // Apply company filter
      if (filters.title && filters.title.length > 0) {
        filtered = filtered.filter((opp) =>
          filters.title.includes(opp.title)
        );
      }

      // Apply role title filter
      if (filters.jobPosition && filters.jobPosition.length > 0) {
        filtered = filtered.filter((opp) =>
          filters.jobPosition.includes(opp.jobPosition)
        );
      }

      // Apply search query filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
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
        filters.title.forEach((value) => queryParams.append('company', value));
      }

      // Role title filter
      if (filters.jobPosition && filters.jobPosition.length > 0) {
        filters.jobPosition.forEach((value) =>
          queryParams.append('role', value)
        );
        console.log('filters.jobPosition:', filters.jobPosition);
      }

      // Search query
      if (filters.searchQuery) {
        queryParams.append('search', filters.searchQuery);
      }

      // Sort option
      if (filters.sortOption) {
        queryParams.append('sort', filters.sortOption);
      }

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
