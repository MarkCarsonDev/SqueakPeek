"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { StageColumn, StageColumnProps } from "@/ui/track/StageColumn"; 
import "./tracking.css";
import { Application, ApplicationStage, useTrack } from "@/lib/store/track";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStage>("Applied"); // Track the default status
  const [selectedApplication, setSelectedApplication] = useState<Application | undefined>(); // Track the application being edited

  // Connect the store for each stage
  const {
    Applied,
    Rejected,
    "Online Assesstment": OnlineAssesstment,
    Interviewing,
    Offer,
    moveApplication,
    updateApplication
  } = useTrack();

  const stages: StageColumnProps[] = [
    {
      stage: "Applied",
      stageName: "Applied",
      stageColor: "#769FCD",
      applications: Applied,
    },
    {
      stage: "Rejected",
      stageName: "Rejected",
      stageColor: "#C7253E",
      applications: Rejected,
    },
    {
      stage: "Online Assesstment",
      stageName: "Online Assessment",
      stageColor: "#EB5B00",
      applications: OnlineAssesstment,
    },
    {
      stage: "Interviewing",
      stageName: "Interviewing",
      stageColor: "#F0A202",
      applications: Interviewing,
    },
    {
      stage: "Offer",
      stageName: "Offer",
      stageColor: "#2E7E33",
      applications: Offer,
    },
  ];

  // Handle opening the modal with a specific stage and default status
  const handleOpenModal = (stage: ApplicationStage, application?: Application) => {
    setApplicationStatus(stage); 
    setSelectedApplication(application); 
    setOpenModal(true); 
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedApplication(undefined);
  };

  // Handle drag end event with DropResult typing
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
  
    const from = result.source.droppableId as ApplicationStage;
    const to = result.destination.droppableId as ApplicationStage;
    const applicationId = result.draggableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
  
    // Retrieve the application being moved
    const draggedApplication = [...useTrack.getState()[from]].find(
      (app) => app.id === applicationId
    );
  
    if (draggedApplication) {
      // Move application to a new stage
      moveApplication(from, to, applicationId, sourceIndex, destinationIndex);
  
      // Update application status in the store
      updateApplication(applicationId, {...draggedApplication,applicationStatus: to});
    }
  };

  return (
    <div className="main">
      <Typography variant="h4">Submitted Applications</Typography>
      <Typography variant="subtitle1">
        Total Applications:{" "}
        {stages.reduce((acc, stage) => acc + stage.applications.length, 0)}
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
        onClick={() => handleOpenModal("Applied")}
      >
        New Application
      </Button>
      {/* The New Application Modal */}
      {openModal && (
        <NewApplicationModal
          open={openModal}
          handleClose={handleCloseModal}
          applicationStatus={applicationStatus}
          setApplicationStatus={setApplicationStatus}
          existingApplication={selectedApplication}
        />
      )}

      {/* Application stages */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            flexWrap: "nowrap",
            marginTop: "16px",
          }}
        >
          {stages.map((stage) => (
            <StageColumn
              key={stage.stage}
              stage={stage.stage}
              stageName={stage.stageName}
              stageColor={stage.stageColor}
              applications={stage.applications}
              handleOpenModal={handleOpenModal}
              onCardDoubleClick={(application) => handleOpenModal(stage.stage, application)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
