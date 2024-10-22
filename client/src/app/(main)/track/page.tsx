"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import "./tracking.css";
import TrackingApplicationStore from "@/lib/store/TrackingApplicaitonStore";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState(""); // Use selectedStage to track the stage
  const { stages } = TrackingApplicationStore(); // Access stages from Zustand

  // Handle opening the modal with a specific stage
  const handleOpenModal = (stageId: string) => {
    setSelectedStage(stageId); // Store the selected stage (could be "" for new application button)
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => setOpenModal(false); // Close the modal

  return (
    <div className="main">
      <Typography variant="h4">Submitted Applications</Typography>
      <Typography variant="subtitle1">Total Applications: #</Typography>{" "}
      {/* Replace # with dynamic data */}
      {/* Button to open modal for a new application */}
      <Button
        variant="contained"
        endIcon={<FontAwesomeIcon icon={faFileCirclePlus} />}
        sx={{
          mt: 1,
          width: "200px",
          boxShadow: "none",
          backgroundColor: "#496FFF",
          borderRadius: "8px",
          ":hover": {
            backgroundColor: "#3B5AC6",
            boxShadow: "none",
          },
        }}
        onClick={() => handleOpenModal("")} // Empty string for free-form new application
      >
        New Application
      </Button>
      {/* The New Application Modal */}
      {openModal && (
        <NewApplicationModal
          open={openModal}
          handleClose={handleCloseModal}
          defaultStatus={
            stages.find((stage) => stage.id === selectedStage)?.name || ""
          } 
        />
      )}
      {/* Application stages */}
      <div style={{ display: "flex", gap: "20px" }}>
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="stage-column"
            style={{
              marginTop: "10px",
              width: "250px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                m: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  backgroundColor: stage.color,
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              ></span>
              {stage.name} ({stage.applications.length})
            </Typography>

            {/* Add New Application button */}
            <Button
              variant="outlined"
              onClick={() => handleOpenModal(stage.id)}
              sx={{
                width: "80%",
                height: "40px",
                borderStyle: "dashed",
              }}
            >
              <Typography variant="h6">+</Typography>
            </Button>

            {/* Render the applications card within the stage */}
            {stage.applications.map((app) => (
              <div
                key={app.id}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="subtitle1">{app.companyName}</Typography>
                <Typography variant="body2">{app.roleTitle}</Typography>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
