import * as React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { BarChart } from "@mui/x-charts";
import { ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import { dataset } from "./OpportunityStatsDataset";

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

export function OpportunityStatsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [alignment, setAlignment] = React.useState<string | null>("left");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

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
              {dataKey: "rejected", label: "Rejected", color: "red"},
              {dataKey: "oa", label: "OA", color: "orange"},
              {dataKey: "interviewing", label: "Interviewing", color: "gold"},
              {dataKey: "offered", label: "Offered", color: "green"},
            ]}
            width={500}
            height={300}
          />
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="week" aria-label="left aligned">
              <Typography>Week</Typography>
            </ToggleButton>
            <ToggleButton value="month" aria-label="centered">
              <Typography>Month</Typography>
            </ToggleButton>
            <ToggleButton value="year" aria-label="right aligned">
              <Typography>Year</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Modal>
    </div>
  );
}
