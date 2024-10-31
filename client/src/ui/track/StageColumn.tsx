import React from "react";
import { Typography, Button } from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Application, ApplicationStage } from "@/lib/store/track";
import { JobCard } from "./JobCard";

export interface StageColumnProps {
  stage: ApplicationStage;
  stageName: string;
  stageColor: string;
  applications: Application[];
  handleOpenModal?: (stage: ApplicationStage) => void;
  onCardClick?: (application: Application) => void;
}

export const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  stageName,
  stageColor,
  applications,
  handleOpenModal,
  onCardClick
}) => {
  return (
    <Droppable droppableId={stage} key={stage}>
      {(provided, snapshot) => {
        // Set dynamic border color based on dragging state
        const borderColor = snapshot.isDraggingOver ? "#496FFF": "#E0E4F2";
        return (
          <div
            style={{
              flexGrow: 1,
              flexShrink: 0,
              flexBasis: "300px",
              minWidth: "370px",
              maxWidth: "500px",
              marginTop: "10px",
              backgroundColor: "white",
              border: `4px solid ${borderColor}`, // Apply dynamic border color here
              borderRadius: "8px",
              height: "75vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                  backgroundColor: stageColor,
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              ></span>
              {stageName} ({applications.length})
            </Typography>

            <Button
              variant="outlined"
              onClick={() => {
                if (handleOpenModal) handleOpenModal(stage);
              }}
              sx={{
                width: "90%",
                height: "40px",
                borderStyle: "dashed",
                marginBottom: "10px",
              }}
            >
              <Typography variant="h6">+</Typography>
            </Button>

            {/* Droppable Area below Button */}
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                width: "90%", 
                overflowY: "auto",
                padding: "10px",
                borderRadius: "8px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                scrollbarWidth: "none", 
                marginBottom: "10px",
              }}
            >
              {/* Job Cards */}
              {applications.map((app, index) => (
                <Draggable key={app.application_id} draggableId={app.application_id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        marginBottom: "8px",
                        width: "100%",
                        transition:
                          "transform 0.15s linear, opacity 0.15s linear",
                        opacity: snapshot.isDragging ? 0.9 : 1,
                        ...provided.draggableProps.style,
                      }}
                      onClick={() => onCardClick?.(app)}
                    >
                      <JobCard
                        application= {app}   
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};