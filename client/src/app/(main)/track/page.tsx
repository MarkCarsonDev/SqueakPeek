"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import { Application } from "@/lib/store/Tracking/Types"; // Import Application type
import { DragDropContext,  DropResult } from "@hello-pangea/dnd";
import  {StageColumn}  from "@/ui/track/StageColumn"; // Refactored column component
import "./tracking.css";

// Dummy data for stages
const stages: { id: string; name: string; color: string; applications: Application[] }[] = [
  {
    id: "1",
    name: "Applied",
    color: "#769FCD",
    applications: [],
  },
  {
    id: "2",
    name: "Rejected",
    color: "#C7253E",
    applications: [],
  },
  {
    id: "3",
    name: "Online Assessment",
    color: "#EB5B00",
    applications: [],
  },
  {
    id: "4",
    name: "Interviewing",
    color: "#F0A202",
    applications: [],
  },
  {
    id: "5",
    name: "Offer",
    color: "#2E7E33",
    applications: [],
  },
];

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState<string>(""); // Track the default status
  const [appStages, setAppStages] = useState(stages); // Track stages and their applications

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

  // Handle adding a new application
  const handleAddApplication = (application: Application, status: string) => {
    setAppStages((prevStages) => {
      return prevStages.map((stage) =>
        stage.name === status
          ? { ...stage, applications: [...stage.applications, application] }
          : stage
      );
    });
  };

  // Handle drag end event with DropResult typing
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // Dropped outside a valid droppable area

    const sourceStage = appStages.find((stage) => stage.id === source.droppableId);
    const destinationStage = appStages.find((stage) => stage.id === destination.droppableId);
    if (!sourceStage || !destinationStage) return;

    // Reordering or moving between stages
    const movedApp = sourceStage.applications[source.index];
    sourceStage.applications.splice(source.index, 1);
    destinationStage.applications.splice(destination.index, 0, movedApp);

    setAppStages([...appStages]);
  };

  return (
    <div className="main">
      <Typography variant="h4">Submitted Applications</Typography>
      <Typography variant="subtitle1">Total Applications: {appStages.reduce((acc, stage) => acc + stage.applications.length, 0)}</Typography>

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
        onClick={() => handleOpenModal("")} // Open modal for new application without specific status
      >
        New Application
      </Button>

      {/* The New Application Modal */}
      {openModal && (
        <NewApplicationModal
          open={openModal}
          handleClose={handleCloseModal}
          defaultStatus={defaultStatus}
          onSubmit={handleAddApplication} // Call a function to add the application
        />
      )}

      {/* Application stages */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {appStages.map((stage) => (
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