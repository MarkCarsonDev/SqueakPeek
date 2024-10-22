"use client";
import { Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

/**
 * Shows stats based on the opportunity
 */
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
        // TODO: Adjust the data with real data, based on the opportunityID
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
          width: "100%",
          fontFamily: "", // for some reason fontFamily is default to something else. This make font change to inter
          // TODO Figure out how to fix the font for hover tooltip
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fill: "white",
            color: "white",
          },
        }}
        height={250}
      />
    </div>
  );
}
