import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // To handle URL params
// import { SelectedFilters } from './Filters';
import { OpportunityCard, OpportunityCardProps } from './OpportunityCard';
import { createSupabaseClient } from '@/lib/supabase/client';
import { Database } from '@/lib/types/database.types';

interface OpportunityRaw {
    [key: string]: string
    company_name: string
    created_at: string
    opportunity_id: string
    role_title: Database["public"]["Enums"]["OpportunityType"]
    type: string
}

const supabase = createSupabaseClient();

// interface OpportunityListProps {
//     filters: SelectedFilters;
// }

// TODO: Add filters to the OpportunityList component
// export const OpportunityList: React.FC<OpportunityListProps> = ({ filters }) => {
export const OpportunityList: React.FC = () => {

  const [allOpportunities, setAllOpportunities] = useState<OpportunityCardProps[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<OpportunityCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // allOpportunities is not used until filters are implemented, so just to appease TS:
  allOpportunities;

  // Commented out until filters are implemented
  // const router = useRouter();

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
