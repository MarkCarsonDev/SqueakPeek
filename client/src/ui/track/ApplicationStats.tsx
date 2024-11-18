import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import { Application} from "@/lib/store/track";
interface ApplicationStatsProps {
  application: Application;
}

export default function ApplicationStats({application}: ApplicationStatsProps) {
  return (
    <Box>
    <Typography variant="h4" sx={{ m: 2 }}>
        Application Stats
    </Typography>
    <PieChart
      series={[
        {
          data: [
            { id: 0, color: "#769FCD", value: application.application_stats?.applied ?? 0, label: "Applied" },
            { id: 1, color: "#C7253E", value: application.application_stats?.rejected ?? 0, label: "Rejected" },
            { id: 2, color: "#EB5B00", value: application.application_stats?.online_assessment ?? 0, label: "Online Assessment" },
            { id: 4, color: "#F0A202", value: application.application_stats?.interviewing ?? 0, label: "Interviewing" },
            { id: 5, color: "#2E7E33", value: application.application_stats?.offer ?? 0, label: "Offer" }
          ],
        },
      ]}
      width={600}
      height={200}
    />
    </Box>
  );
}
