import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link for navigation
// import { useRouter } from 'next/navigation'; // To handle URL params
// import { SelectedFilters } from './Filters';
import { OpportunityCard, OpportunityCardProps } from "./OpportunityCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/database.types";

interface OpportunityRaw {
  company_name: string;
  created_at: string;
  opportunity_id: string;
  role_title: Database["public"]["Enums"]["OpportunityType"];
  type: string;
  conversation: { conversation_id: string } | null;
}

const supabase = createSupabaseClient();

// interface OpportunityListProps {
//     filters: SelectedFilters;
// }

// TODO: Add filters to the OpportunityList component
// export const OpportunityList: React.FC<OpportunityListProps> = ({ filters }) => {
export const OpportunityList: React.FC = () => {
  const [shownOpportunities, setShownOpportunities] = useState<
    OpportunityCardProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Commented out until filters are implemented
  // const router = useRouter();

  // Fetch all opportunities once when the component mounts
  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("opportunity").select(`
            *,
            conversation!left (conversation_id)
        `);

      if (error) {
        console.error("Error fetching opportunities:", error);
      } else if (data) {
        // log the id
        console.log("Data ", data);
        // Map the data to match the OpportunityCardProps interface
        const mappedData = data.map((opportunity: OpportunityRaw) => ({
          id: opportunity.opportunity_id,
          conversation_id: opportunity.conversation?.conversation_id || "test", // TODO: Change later, Flatten the conversation_id manually
          title: opportunity.company_name,
          jobPosition: opportunity.role_title,
          jobType: opportunity.type,
          jobAvatar: "",
          hiringStatus: false,
          // TODO: Update these values with the client's data
          appliedStatus: false,
          bookmarked: false,
          // END TODO
          totalApplied: 0,
          rejected: 0,
          oa: 0,
          interviewing: 0,
          offered: 0,
          recentMessages: 0,
        }));

        setShownOpportunities(mappedData); // Initially, all opportunities are shown
      }

      setLoading(false);
    };

    fetchOpportunities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (shownOpportunities.length === 0) {
    return <div>No opportunities found that match your criterion.</div>;
  }

  return (
    <div>
      {shownOpportunities.map((opportunity) => (
        
          <OpportunityCard {...opportunity} />
      ))}
    </div>
  );
};
