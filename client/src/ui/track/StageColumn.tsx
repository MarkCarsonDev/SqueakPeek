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
  setApplicationStatus: React.Dispatch<React.SetStateAction<ApplicationStage>>; // Add this prop
}


export const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  stageName,
  stageColor,
  applications,
  handleOpenModal,
  setApplicationStatus, // Use this prop to pass it down to JobCard
}) => {
  return (
    <Droppable droppableId={stage} key={stage}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            marginTop: "10px",
            width: "18%",
            backgroundColor: "white",
            border: "4px solid #E0E4F2",
            borderRadius: "8px",
            height: "70vh",
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
                    margin: "8px",
                    width: "80%",
                    ...provided.draggableProps.style,
                  }}
                >
                  
                  <JobCard Company={app.companyName} Role={app.roleTitle} Status={app.applicationStatus} setStatus={setApplicationStatus} /> {/* Pass the setStatus prop to JobCard */}
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
