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

// Explicit typing for the reorder function (when reordering within the same stage)
const reorder = (
  list: Application[],
  startIndex: number,
  endIndex: number
): Application[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState<string>("");

  // Connect the store for each stage
  const appliedStore = AppliedStore();
  const rejectedStore = RejectedStore();
  const onlineAssessmentStore = OnlineAssestmentStore();
  const interviewingStore = InterviewingStore();
  const offerStore = OfferStore();

  const stores = [
    { id: "1", name: "Applied", color: "#769FCD", store: appliedStore },
    { id: "2", name: "Rejected", color: "#C7253E", store: rejectedStore },
    { id: "3", name: "Online Assessment", color: "#EB5B00", store: onlineAssessmentStore },
    { id: "4", name: "Interviewing", color: "#F0A202", store: interviewingStore },
    { id: "5", name: "Offer", color: "#2E7E33", store: offerStore }
  ];

  // Handle opening the modal for a new application
  const handleOpenModal = (stageId: string) => {
    setDefaultStatus(stageId); // Set default status based on the stage
    setOpenModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setDefaultStatus(""); // Clear default status on modal close
  };

  // Add a new application
  const handleAddApplication = (application: Application, status: string) => {
    const targetStore = stores.find((store) => store.name === status)?.store;
    if (targetStore) {
      targetStore.addApplication(application); // Add to the correct store
    }
  };

  // Handle drag end event
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStore = stores.find(
      (store) => store.id === source.droppableId
    )?.store;
    const destinationStore = stores.find(
      (store) => store.id === destination.droppableId
    )?.store;

    if (!sourceStore || !destinationStore) return;

    // Reordering within the same stage
    if (source.droppableId === destination.droppableId) {
      const reorderedApplications = reorder(
        sourceStore.applications,
        source.index,
        destination.index
      );
      sourceStore.applications = reorderedApplications; // Update reordered applications
    } else {
      // Moving between stages
      const movedApp = sourceStore.applications[source.index];
      sourceStore.removeApplication(movedApp.id); // Remove from the source store
      destinationStore.addApplication(movedApp); // Add to the destination store
    }
  };

  return (
    <div className="main">
      <Typography variant="h4">Submitted Applications</Typography>
      <Typography variant="subtitle1">
        Total Applications: {stores.reduce((acc, store) => acc + store.store.applications.length, 0)}
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
          onSubmit={handleAddApplication}
        />
      )}

      {/* Application stages */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {stores.map((stage) => (
            <StageColumn
              key={stage.id}
              stageId={stage.id}
              stageName={stage.name}
              stageColor={stage.color}
              applications={stage.store.applications}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}