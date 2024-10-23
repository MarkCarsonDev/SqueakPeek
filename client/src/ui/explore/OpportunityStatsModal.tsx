import * as React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { BarChart } from "@mui/x-charts";

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
  display: "flex"
};

export function OpportunityStatsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={500}
            height={300}
          />
        </Box>
      </Modal>
    </div>
  );
}
