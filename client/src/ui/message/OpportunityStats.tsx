"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { FetchOpportunityStats } from "@/lib/utils/Application/FetchOpportunityStats";
/**
 * Shows stats based on the opportunity
 */
export function OpportunityStats(
  { opportunity_id }: { opportunity_id: string }
) {
  const [data, setData] = useState<
    | {
        applied: number | null;
        created_at: string;
        interviewing: number | null;
        month: number | null;
        offer: number | null;
        online_assessment: number | null;
        opportunity_id: string;
        rejected: number | null;
        total_applied: number | null;
        tracking_id: number;
      }[]
    | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await FetchOpportunityStats( opportunity_id ); 
      if (error) {
        console.error("Error fetching opportunity stats:", error);
        setError(error);
        return;
      }
      setData(data);
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Error loading stats</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }
  // Combine the total numbers
  const totals = data.reduce(
    (acc, curr) => {
      acc.applied += curr.applied ?? 0;
      acc.rejected += curr.rejected ?? 0;
      acc.online_assessment += curr.online_assessment ?? 0;
      acc.interviewing += curr.interviewing ?? 0;
      acc.offer += curr.offer ?? 0;
      acc.total_applied += curr.total_applied ?? 0;
      return acc;
    },
    { applied: 0, rejected: 0, online_assessment: 0, interviewing: 0, offer: 0, total_applied: 0 }
  );

  const mockData = [
    { id: 0, value: totals.applied, label: "Applied", color: "#779fcd" },
    { id: 1, value: totals.rejected, label: "Rejected", color: "#c7253e" },
    { id: 2, value: totals.online_assessment, label: "OA", color: "#eb5a02" },
    {
      id: 3,
      value: totals.interviewing,
      label: "Interviewing",
      color: "#ffbf63",
    },
    { id: 4, value: totals.offer, label: "Offered", color: "#2e7e33" },
  ];
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
            data: mockData,
          },
        ]}
        sx={{
          display: "flex",
          fontFamily: "", // for some reason fontFamily is default to something else. This make font change to inter
          // TODO Figure out how to fix the font for hover tooltip
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fill: "white",
            color: "white",
          },
        }}
        height={175}
      />
    </div>
  );
}
