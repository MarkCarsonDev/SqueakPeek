"use client";
import React, { useState, useEffect } from "react";
import { Button, Typography} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { StageColumn, StageColumnProps } from "@/ui/track/StageColumn"; 
import { Application, ApplicationStage, useTrack } from "@/lib/store/track";
import { useProfile } from "@/lib/store/profile";
// import {useAlert} from "@/lib/store/alert";
import "./tracking.css";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStage>("Applied");
  const [selectedApplication, setSelectedApplication] = useState<Application | undefined>();
  // const { setAlert } = useAlert();
  // Retrieve application data and actions from the Zustand store
  const {
    Applied,
    Rejected,
    "Online Assessment": OnlineAssessment,
    Interviewing,
    Offer,
    moveApplication,
    updateApplication,
    fetchApplications
  } = useTrack();
  const { profile } = useProfile();

  // Fetch applications when profile is available
  useEffect(() => {
    if (profile) {
      fetchApplications(profile);
    }
  }, [profile, fetchApplications]);

  // Stage configuration for displaying columns
  const stages: StageColumnProps[] = [
    { stage: "Applied", stageName: "Initial Screen", stageColor: "#769FCD", applications: Applied },
    { stage: "Rejected", stageName: "Rejected", stageColor: "#C7253E", applications: Rejected },
    { stage: "Online Assessment", stageName: "Online Assessment", stageColor: "#EB5B00", applications: OnlineAssessment },
    { stage: "Interviewing", stageName: "Interviewing", stageColor: "#F0A202", applications: Interviewing },
    { stage: "Offer", stageName: "Offer", stageColor: "#2E7E33", applications: Offer },
  ];

  // Function to open the modal and set the application status
  const handleOpenModal = (stage: ApplicationStage, application?: Application) => {
    setApplicationStatus(stage); 
    setSelectedApplication(application); 
    setOpenModal(true); 
  };

  // Function to close the modal and reset the selected application
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedApplication(undefined);
  };

  // Success handler to show a snackbar message
  // const handleSuccess = (message: string, severity: "success" | "error" | "info" | "warning" = "success") => {
  //   setSnackbarMessage(message);
  //   setSnackbarSeverity(severity);
  //   setSnackbarOpen(true);
  // };

  // Close Snackbar
  // const closeSnackbar = () => {
  //   setSnackbarOpen(false);
  // };

  // Handle drag-and-drop for moving applications between stages
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const from = result.source.droppableId as ApplicationStage;
    const to = result.destination.droppableId as ApplicationStage;
    const applicationId = result.draggableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const draggedApplication = [...useTrack.getState()[from]].find(
      (app) => app.application_id === applicationId
    );

    if (draggedApplication) {
      moveApplication(from, to, applicationId, sourceIndex, destinationIndex);

      if (profile) {
        updateApplication(applicationId, { ...draggedApplication, status: to }, profile);
      }
    }
  };

  return (
    <div className="main">
      <Typography variant="h4">Submitted Applications</Typography>
      <Typography variant="subtitle1">
        Total Applications:{" "}
        {stages.reduce((acc, stage) => acc + stage.applications.length, 0)}
      </Typography>

      {/* Button to open modal for adding a new application */}
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

      {/* New Application Modal */}
      {openModal && (
        <NewApplicationModal
          open={openModal}
          handleClose={handleCloseModal}
          applicationStatus={applicationStatus}
          setApplicationStatus={setApplicationStatus}
          existingApplication={selectedApplication}
          //onSuccess={handleSuccess} // Pass handleSuccess to handle success messages
        />
      )}

      {/* Drag-and-drop context for application stages */}
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
              onCardClick={(application) => handleOpenModal(stage.stage, application)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
