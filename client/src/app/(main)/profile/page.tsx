import { Typography } from "@mui/material";
import { OpportunityCard } from "@/ui/explore/OpportunityCard";
import { OpportunityTimeline } from "@/ui/explore/OpportunityTimeline";
export default function Page() {
  return (
    <OpportunityCard
      id={1}
      title="Amazon"
      dateRangeStart="2023"
      dateRangeEnd="2024"
      jobPosition="Lead Software Developer"
      jobType="Full-Time"
      jobAvatar="/landingpage/insight.svg"
      positionStatus={true}
      userPositionStatus={false}
      totalApplied={100}
      rejected={50}
      oa={50}
      interviewing={50}
      offered={50}
      recentMessages={50}
    />
  );
}
