"use client";
import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { StageColumn, StageColumnProps } from "@/ui/track/StageColumn";
import { Application, ApplicationStage, useTrack } from "@/lib/store/track";
import ApplicationSearchBar from "@/ui/track/ApplicationSearchBar";
import { useProfile } from "@/lib/store/profile";
import usePageHeader from "@/lib/hooks/usePageHeader"; // Import the custom hook
import "./tracking.css";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStage>("Applied");
  const [selectedApplication, setSelectedApplication] = useState<Application | undefined>();
  const [preventClick, setPreventClick] = useState(false);
  
  // Set page title and meta description using the custom hook
  usePageHeader(
    "Track Applications - Manage Your Job Search",
    "Track your job applications efficiently across various stages. Manage your pipeline from applied to offer, and stay organized throughout your job search."
  );

  // Retrieve application data and actions from the Zustand store
  const {
    Applied,
    Rejected,
    "Online Assessment": OnlineAssessment,
    Interviewing,
    Offer,
    moveApplication,
    updateApplication,
    fetchApplications,
    searchQuery
  } = useTrack();
  const { profile } = useProfile();

  useEffect(() => {
    // Fetch applications when profile is available
    if (profile) {
      fetchApplications(profile);
    }
  }, [profile, fetchApplications]);

  // Helper function to filter applications based on search query
  const filterBySearch = (applications: Application[]) => {
    const query = searchQuery.toLowerCase();
    return applications.filter(
      (app) =>
        app.company_name?.toLowerCase().includes(query) ||
        app.role_title?.toLowerCase().includes(query) ||
        app.type?.toLowerCase().includes(query)
    );
  };

  // Stage configuration for displaying columns
  const stages: StageColumnProps[] = [
    { stage: "Applied", stageName: "Initial Screen", stageColor: "#769FCD", applications: filterBySearch(Applied) },
    { stage: "Rejected", stageName: "Rejected", stageColor: "#C7253E", applications: filterBySearch(Rejected) },
    { stage: "Online Assessment", stageName: "Online Assessment", stageColor: "#EB5B00", applications: filterBySearch(OnlineAssessment) },
    { stage: "Interviewing", stageName: "Interviewing", stageColor: "#F0A202", applications: filterBySearch(Interviewing) },
    { stage: "Offer", stageName: "Offer", stageColor: "#2E7E33", applications: filterBySearch(Offer) },
  ];

  // Function to open the modal and set the application status
  const handleOpenModal = (stage: ApplicationStage, application?: Application) => {
    if (preventClick) {
      setPreventClick(false); // Reset preventClick to allow subsequent clicks
      return;
    }
    setApplicationStatus(stage);
    setSelectedApplication(application);
    setOpenModal(true);
  };

  // Function to close the modal and reset the selected application
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedApplication(undefined);
    setPreventClick(false);
  };

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

      {/* Search Bar for filtering */}
      <ApplicationSearchBar />

      {/* New Application Modal */}
      {openModal && (
        <NewApplicationModal
          open={openModal}
          handleClose={handleCloseModal}
          applicationStatus={applicationStatus}
          setApplicationStatus={setApplicationStatus}
          existingApplication={selectedApplication}
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
              onCardClick={(application) => { if (!preventClick) { handleOpenModal(stage.stage, application) }}}
              setPreventClick={setPreventClick}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
