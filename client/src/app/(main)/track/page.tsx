"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import "./tracking.css";

export default function Page() {
  const [openModal, setOpenModal] = useState(false); 
  const [defaultStatus, setDefaultStatus] = useState(""); 

  // Open the modal with a specific default status
  const handleOpenModal = (status: string) => {
    setDefaultStatus(status); 
    setOpenModal(true); 
  };

  const handleCloseModal = () => setOpenModal(false);

  const num_applications = "#"; // dummy data for number of applications

  // Column data section
  const stages = [
    { name: "Initial Screen", color: "#769FCD", defaultStatus: "Applied" },
    { name: "Rejected", color: "#C7253E", defaultStatus: "Rejected" },
    { name: "Online Assessment", color: "#EB5B00", defaultStatus: "OA" },
    { name: "Interviewing", color: "#F0A202", defaultStatus: "Interviewing" },
    { name: "Offer", color: "#2E7E33", defaultStatus: "Offer" },
  ];

  return (
    <div className="main">
      <Typography variant="h3">Submitted Applications</Typography>
      <Typography variant="subtitle1">
        Total Applications: {num_applications}
      </Typography>

      {/* Button to open modal with default status 'Applied' */}
      <Button
        variant="contained"
        endIcon={<FontAwesomeIcon icon={faFileCirclePlus} />}
        sx={{
          mt: 2,
          width: "200px",
          boxShadow: "none",
          backgroundColor: "#496FFF",
          borderRadius: "8px",
          ":hover": {
            backgroundColor: "#3B5AC6",
            boxShadow: "none",
          },
        }}
        onClick={() => handleOpenModal("Applied")} // Open modal with default status "Applied"
      >
        New Application
      </Button>

      {/* The New Application Modal with the defaultStatus passed */}
      <NewApplicationModal 
        open={openModal} 
        handleClose={handleCloseModal}
        defaultStatus={defaultStatus} // Pass the default status to the modal
      />
      
      {/* Application stages with drag and drop */}
      <div className="application-stages">
        {stages.map((stage, index) => (
          <div key={index} className="stage-column">
            <Typography
              variant="subtitle2"
              sx={{
                margin: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  backgroundColor: stage.color,
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              ></span>
              {stage.name} ({num_applications})
            </Typography>
            <div
              className="application-box"
              onClick={() => handleOpenModal(stage.defaultStatus)} // Open modal with the status based on column clicked
            >
              +
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
