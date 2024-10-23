import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // To handle URL params
import { SelectedFilters } from './Filters';
import { OpportunityCard, OpportunityCardProps } from './OpportunityCard';
import { createSupabaseClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/database.types';

interface OpportunityRaw {
    [key: string]: any; 
    company_name: string
    created_at: string
    opportunity_id: string
    role_title: Database["public"]["Enums"]["OpportunityType"]
    type: string
}

const supabase = createSupabaseClient();

interface OpportunityListProps {
  filters: SelectedFilters;
}

export const OpportunityList: React.FC<OpportunityListProps> = ({ filters }) => {
  const [allOpportunities, setAllOpportunities] = useState<OpportunityCardProps[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<OpportunityCardProps[]>([]);
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
        // Map the data to match the OpportunityCardProps interface
        const mappedData = data.map((opportunity: OpportunityRaw) => ({
            id: parseInt(opportunity.opportunity_id),
            title: opportunity.company_name,
            jobPosition: opportunity.role_title,
            jobType: opportunity.type,
            jobAvatar: '',
            positionStatus: false,
            userPositionStatus: false,
            totalApplied: 0,
            rejected: 0,
            oa: 0,
            interviewing: 0,
            offered: 0,
            recentMessages: 0,
            bookmarked: false,
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
