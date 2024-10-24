"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import { AppliedStore } from "@/lib/store/Tracking/AppliedStore";
import { RejectedStore } from "@/lib/store/Tracking/RejectedStore";
import { OnlineAssestmentStore } from "@/lib/store/Tracking/OnlineAssestmentStore";
import { InterviewingStore } from "@/lib/store/Tracking/InterviewingStore";
import { OfferStore } from "@/lib/store/Tracking/OfferStore";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { StageColumn } from "@/ui/track/StageColumn"; // Refactored column component
import { Application } from "@/lib/store/Tracking/Types";
import "./tracking.css";
import { useTrack } from "@/lib/store/track";

// Explicit typing for the reorder function
// const reorder = (list: Application[], startIndex: number, endIndex: number): Application[] => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState<string>(""); // Track the default status

  // Connect the store for each stage
  const { applied, rejected, onlineAssessment, interviewing, offer } =
    useTrack();

  const stages = [
    { id: "Applied", name: "Applied", color: "#769FCD", applications: applied },
    {
      id: "Rejected",
      name: "Rejected",
      color: "#C7253E",
      applications: rejected,
    },
    {
      id: "OA",
      name: "Online Assessment",
      color: "#EB5B00",
      applications: onlineAssessment,
    },
    {
      id: "Interviewing",
      name: "Interviewing",
      color: "#F0A202",
      applications: interviewing,
    },
    { id: "Offer", name: "Offer", color: "#2E7E33", applications: offer },
  ];

  // Handle opening the modal with a specific stage and default status
  const handleOpenModal = (stageId: string) => {
    setDefaultStatus(stageId); // Set the default status based on the stage name
    setOpenModal(true); // Open the modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setDefaultStatus(""); // Clear default status on modal close
  };

  // TODO refactor
  // Handle adding a new application
  const handleAddApplication = (application: Application, status: string) => {

  };

  // TODO refactor
  // Handle drag end event with DropResult typing
  const onDragEnd = (result: DropResult) => {
    
  };

  return (
    <div className="main">
      <Typography variant="h4">Submitted Applications</Typography>
      <Typography variant="subtitle1">
        Total Applications:{" "}
        {stages.reduce(
          (acc, stage) => acc + stage.applications.length,
          0
        )}
      </Typography>

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
        onClick={() => handleOpenModal("")}
      >
        New Application
      </Button>

      {/* The New Application Modal */}
      {openModal && (
        <NewApplicationModal
          open={openModal}
          handleClose={handleCloseModal}
          defaultStatus={defaultStatus}
          onSubmit={handleAddApplication}
        />
      )}

      {/* Application stages */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {stages.map((stage) => (
            <StageColumn
              key={stage.id}
              stageId={stage.id}
              stageName={stage.name}
              stageColor={stage.color}
              applications={stage.applications}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
