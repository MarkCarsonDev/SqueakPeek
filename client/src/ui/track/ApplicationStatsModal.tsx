import React, { useEffect, useState, useMemo } from "react";
import { Box, Modal, Typography, CircularProgress } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { FetchOpportunityStats } from "@/lib/utils/Application/FetchOpportunityStats";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "solid 3px #e0e4f2",
  p: 4,
  borderRadius: "10px",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
};

// Define the structure of opportunity tracking data
interface OpportunityTrackingData {
    month: number | null;
    rejected: number | null;
    online_assessment: number | null;
    interviewing: number | null;
    offer: number | null;
    applied: number | null;
  }

export interface ApplicationStatsModalProps {
  open: boolean; 
  onClose: () => void; 
  opportunity_id: string; 
}

export function ApplicationStatsModal({
  open,
  onClose,
  opportunity_id,
}: ApplicationStatsModalProps) {
  const [opportunityData, setOpportunityData] = useState<OpportunityTrackingData[]>([]); 
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); 

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June", 
    "July", "Aug", "Sept", "Oct", "Nov", "Dec",
  ];

  // Fetch opportunity stats when the modal opens
  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await FetchOpportunityStats(opportunity_id);
        if (error) {
          throw new Error(error);
        }
        setOpportunityData(data || []); // Store fetched data or empty array
      } catch (err) {
        //console.error("Error fetching opportunity stats:", err);
        setError("Failed to fetch opportunity stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open, opportunity_id]);

  // Transform the tracking data into the dataset for the chart
  const dataset = useMemo(() => {
    return months.map((month, index) => {
      const trackingData = opportunityData.find(
        (entry) => entry.month === index + 1 // Match month number (1-based index)
      );

      return {
        month,
        rejected: trackingData?.rejected || 0,
        oa: trackingData?.online_assessment || 0,
        interviewing: trackingData?.interviewing || 0,
        offered: trackingData?.offer || 0,
        initial_screen: trackingData?.applied || 0,
      };
    });
  }, [opportunityData, months]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="application-stats-modal-title"
      aria-describedby="application-stats-modal-description"
    >
      <Box sx={style}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : opportunityData.length > 0 ? (
          <>
            <Typography variant="h6" component="h2">
              Opportunity Stats
            </Typography>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                { dataKey: "initial_screen", label: "Initial Screen", color: "#769FCD" },
                { dataKey: "rejected", label: "Rejected", color: "#C7253E" },
                { dataKey: "oa", label: "OA", color: "#EB5B00" },
                { dataKey: "interviewing", label: "Interviewing", color: "#F0A202" },
                { dataKey: "offered", label: "Offered", color: "#2E7E33" },
              ]}
              width={600}
              height={400}
            />
          </>
        ) : (
          <Typography>No data available</Typography>
        )}
      </Box>
    </Modal>
  );
}
