"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import TrackingApplicationStore from "@/lib/store/TrackingApplicaitonStore";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"; // Explicit import for DropResult type
import "./tracking.css";

// Explicit typing for the reorder function
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState(""); // Use selectedStage to track the stage
  const { stages, moveApplication, addApplication } = TrackingApplicationStore(); // Access stages from Zustand

  // Handle opening the modal with a specific stage
  const handleOpenModal = (stageId: string) => {
    setSelectedStage(stageId); // Store the selected stage (could be "" for new application button)
    setOpenModal(true); // Open the modal
  };

  // Close the modal
  const handleCloseModal = () => setOpenModal(false);

  // Handle drag end event with DropResult typing
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a valid droppable area
    if (!destination) return;

    // Reordering within the same stage
    const sourceStage = stages.find((stage: any) => stage.id === source.droppableId);
    if (!sourceStage) return; // Ensure sourceStage exists

    if (source.droppableId === destination.droppableId) {
      const reorderedApplications = reorder(
        sourceStage.applications,
        source.index,
        destination.index
      );

      // Update the stage with the reordered applications
      sourceStage.applications = reorderedApplications;

      // Force Zustand to update
      moveApplication(
        source.droppableId,
        destination.droppableId,
        draggableId
      );
    } else {
      // Moving between stages
      const destinationStage = stages.find((stage: any) => stage.id === destination.droppableId);
      if (!destinationStage) return; // Ensure destinationStage exists

      moveApplication(
        source.droppableId,
        destination.droppableId,
        draggableId
      );
    }
  };

  return (
    <div className="main">
      <Typography variant="h4">Submitted Applications</Typography>
      <Typography variant="subtitle1">Total Applications: #</Typography> {/* Replace # with dynamic data */}
      
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
            stages.find((stage: any) => stage.id === selectedStage)?.name || ""
          }
          selectedStageId={selectedStage} // Pass the selected stage ID to the modal
        />
      )}

      {/* Application stages */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {stages.map((stage: any) => (
            <Droppable droppableId={stage.id} key={stage.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
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
                  {stage.applications.map((app: any, index: number) => (
                    <Draggable
                      key={app.id}
                      draggableId={app.id}
                      index={index} // <-- You were missing this index prop
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "10px",
                            marginBottom: "10px",
                            backgroundColor: "white",
                            border: "1px solid rgba(0, 0, 0, 0.12)",
                            borderRadius: "5px",
                            ...provided.draggableProps.style, // <-- Make sure the draggable props style is applied here
                          }}
                        >
                          <Typography variant="subtitle1">
                            {app.companyName}
                          </Typography>
                          <Typography variant="body2">{app.roleTitle}</Typography>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}