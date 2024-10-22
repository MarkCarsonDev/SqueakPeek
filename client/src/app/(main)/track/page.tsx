"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import NewApplicationModal from "@/ui/track/NewApplicationModal";
import TrackingApplicationStore, { JobStage, Application } from "@/lib/store/TrackingApplicaitonStore";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import "./tracking.css";

// Explicit typing for the reorder function
const reorder = (list: Application[], startIndex: number, endIndex: number): Application[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string>(""); // Use selectedStage to track the stage
  const [defaultStatus, setDefaultStatus] = useState<string>(""); // Track the default status
  const { stages, moveApplication, addApplication } = TrackingApplicationStore(); // Access stages and addApplication from Zustand

  // Handle opening the modal with a specific stage and default status
  const handleOpenModal = (stageId: string) => {
    setSelectedStage(stageId); // Store the selected stage
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
    const targetStage = stages.find(stage => stage.name === status);
    if (targetStage) {
      addApplication(targetStage.id, application); // Add application to the correct stage
    }
  };

  // Handle drag end event with DropResult typing
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a valid droppable area
    if (!destination) return;

    // Reordering within the same stage
    const sourceStage = stages.find((stage: JobStage) => stage.id === source.droppableId);
    if (!sourceStage) return;

    if (source.droppableId === destination.droppableId) {
      const reorderedApplications = reorder(
        sourceStage.applications,
        source.index,
        destination.index
      );

      // Update the stage with the reordered applications
      sourceStage.applications = reorderedApplications;
      moveApplication(source.droppableId, destination.droppableId, draggableId);
    } else {
      moveApplication(source.droppableId, destination.droppableId, draggableId);
    }
  };

  return (
    <div className="main">
      <Typography variant="h4">Submitted Applications</Typography>
      <Typography variant="subtitle1">Total Applications: #</Typography> {/* Replace with dynamic data */}
      
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
          defaultStatus={defaultStatus} // Pass the default status
          selectedStageId={selectedStage} // Pass the selected stage ID to the modal
          onSubmit={handleAddApplication} // Call a function to add the application
        />
      )}

      {/* Application stages */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {stages.map((stage: JobStage) => (
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
                    onClick={() => handleOpenModal(stage.name)} // Pass the stage ID and name
                    sx={{
                      width: "80%",
                      height: "40px",
                      borderStyle: "dashed",
                    }}
                  >
                    <Typography variant="h6">+</Typography>
                  </Button>

                  {/* Render the applications card within the stage */}
                  {stage.applications.map((app: Application, index: number) => (
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
                            ...provided.draggableProps.style, // <-- Apply draggable props style
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