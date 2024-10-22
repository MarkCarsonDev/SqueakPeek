"use client";
import { Typography } from "@mui/material";
import {
  PieChart,
  pieArcLabelClasses,
  BarChart,
  LineChart,
} from "@mui/x-charts";

export function OpportunityStats() {
  return (
    <div
      style={{
        borderLeft: "3px solid #E0E4F2",
      }}
    >
      <Typography
        style={{
          padding: "30px 0px 30px 30px",
        }}
        variant="h3"
      >
        Stats
      </Typography>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}`,
            arcLabelMinAngle: 35,
            data: [
              { id: 0, value: 90, label: "Applied", color: "#779fcd" },
              { id: 1, value: 190, label: "Rejected", color: "#c7253e" },
              {
                id: 2,
                value: 30,
                label: "OA",
                color: "#eb5a02",
              },
              { id: 3, value: 20, label: "Interviewing", color: "#ffbf63" },

              { id: 4, value: 10, label: "Offered", color: "#2e7e33" },
            ],
          },
        ]}
        sx={{
          fontFamily: "",
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fill: "white",
            color: "white",
          },
        }}
        width={450}
        height={250}
      />
    </div>
  );
}
