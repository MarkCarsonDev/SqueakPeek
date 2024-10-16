import React, { useEffect, useState } from 'react';
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
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      let query = supabase.from('opportunity').select('*');

    //   if (filters.jobTypes.length > 0) {
    //     query = query.in('jobType', filters.jobTypes);
    //   }

    //   if (filters.appliedStatuses.length > 0) {
    //     query = query.in('userPositionStatus', filters.appliedStatuses);
    //   }

    //   if (filters.years.length > 0) {
    //     query = query.or(
    //       filters.years
    //         .map((year) => `(dateRangeStart.eq.${year},dateRangeEnd.eq.${year})`)
    //         .join(',')
    //     );
    //   }

    //   if (filters.searchQuery) {
    //     query = query.ilike('title', `%${filters.searchQuery}%`);
    //   }

    //   if (filters.sortOption) {
    //     const [column, order] = filters.sortOption.split(':');
    //     query = query.order(column, { ascending: order === 'asc' });
    //   }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching opportunities:', error);
      } else {
        console.log(data);
        setOpportunities(data || []);
      }

      setLoading(false);
    };

    fetchOpportunities();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (opportunities.length === 0) {
    return <div>No opportunities found.</div>;
  }

  return (
    <div>
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} {...opportunity} />
      ))}
    </div>
  );
};
