import React from "react";
import { Typography, Button } from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Application, ApplicationStage } from "@/lib/store/track";

export interface StageColumnProps {
  stage: ApplicationStage;
  stageName: string;
  stageColor: string;
  applications: Application[];
  handleOpenModal?: (stage: ApplicationStage) => void;
}

export const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  stageName,
  stageColor,
  applications,
  handleOpenModal,
}) => {
  return (
    <Droppable droppableId={stage} key={stage}>
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

          {/* Add New Application button */}
          <Button
            variant="outlined"
            onClick={() => {
              if (handleOpenModal) handleOpenModal(stage);
            }}
            sx={{
              width: "80%",
              height: "40px",
              borderStyle: "dashed",
            }}
          >
            <Typography variant="h6">+</Typography>
          </Button>

          {/* Render the applications card within the stage */}
          {applications.map((app, index) => (
            <Draggable key={app.id} draggableId={app.id} index={index}>
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
                    ...provided.draggableProps.style,
                  }}
                >
                  <Typography variant="subtitle1">{app.companyName}</Typography>
                  <Typography variant="body2">{app.roleTitle}</Typography>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
