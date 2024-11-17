import * as React from "react";
// import Popover from "@mui/material/Popover";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import { Application} from "@/lib/store/track";
interface ApplicationStatsProps {
  application: Application;
}

export default function ApplicationStats() {

  return (
    <Box>
    <Typography variant="h6" sx={{ m: 2 }}>
        Application Stats
    </Typography>
    <PieChart
      series={[
        {
          data: [
            { id: 0, color: "#769FCD", value: 10, label: "Applied" },
            { id: 1, color: "#C7253E", value: 15, label: "Rejected" },
            { id: 2, color: "#EB5B00", value: 20, label: "Online Assessment" },
            { id: 3, color: "#F0A202", value: 25, label: "Interviewing" },
            { id: 3, color: "#2E7E33", value: 25, label: "Offer" }
          ],
        },
      ]}
      width={400}
      height={200}
    />
    </Box>
  );
}
