import * as React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { BarChart } from "@mui/x-charts";
import { Database } from "@/lib/types/database.types";

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

export interface OpportunityStatsModalProps{
  opportunity: Database["public"]["Tables"]["opportunity"]["Row"] & {
    opportunity_tracking:
      | Database["public"]["Tables"]["opportunity_tracking"]["Row"][]
      | null;
  };
}

export function OpportunityStatsModal({opportunity}:OpportunityStatsModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June", 
    "July", "Aug", "Sept", "Oct", "Nov", "Dec",
  ];

  // Transform the tracking data
  const dataset = React.useMemo(() => {
    if (opportunity.opportunity_tracking) {
      const tracking = opportunity.opportunity_tracking;

      console.log("Stats Modal Tracking Data:", tracking)

      // Map month data into the desired dataset format
      const monthData = months.map((month, index) => {
        const trackingData = tracking.find(
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

      return monthData;
    }

    // Default dataset if no tracking data exists
    return months.map((month) => ({
      month,
      rejected: 0,
      oa: 0,
      interviewing: 0,
      offered: 0,
    }));
  }, [opportunity.opportunity_tracking]);

  return (
    <div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#496FFF",
          height: "40px",
          width: "auto",
          borderRadius: "20px",
          boxShadow: "none",
        }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faChartColumn} />
        <Typography style={{ color: "white", marginLeft: ".5rem" }}>
          Stats
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BarChart
            dataset={dataset}
            xAxis={[
              { scaleType: "band", dataKey: "month" },
            ]}
            series={[
              {dataKey: "initial_screen", label: "Initial Screen", color: "#769FCD"},
              {dataKey: "rejected", label: "Rejected", color: "#C7253E"},
              {dataKey: "oa", label: "OA", color: "#EB5B00"},
              {dataKey: "interviewing", label: "Interviewing", color: "#F0A202"},
              {dataKey: "offered", label: "Offered", color: "#2E7E33"},
            ]}
            width={600}
            height={400}
          />
        </Box>
      </Modal>
    </div>
  );
}
