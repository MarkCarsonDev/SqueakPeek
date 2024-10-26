import React from "react";
import { Typography, Button } from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Application, ApplicationStage } from "@/lib/store/track";
import { JobCard } from "./JobCard";


// TODO: Customize drag and drop functionality for color betweenn stages
export interface StageColumnProps {
  stage: ApplicationStage;
  stageName: string;
  stageColor: string;
  applications: Application[];
  handleOpenModal?: (stage: ApplicationStage) => void;
  // setApplicationStatus: React.Dispatch<React.SetStateAction<ApplicationStage>>;
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
          style={{
            flexGrow: 1,             
            flexShrink: 0,           
            flexBasis: "300px",      
            minWidth: "250px",       
            maxWidth: "500px",       
            marginTop: "10px",      
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

          <Button
            variant="outlined"
            onClick={() => {
              if (handleOpenModal) handleOpenModal(stage);
            }}
            sx={{
              width: "90%",
              height: "40px",
              borderStyle: "dashed",
              marginBottom: "10px", // Add spacing below the button
            }}
          >
            <Typography variant="h6">+</Typography>
          </Button>

          {applications.map((app, index) => (
            <Draggable key={app.id} draggableId={app.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    margin: "8px",
                    width: "90%",
                    ...provided.draggableProps.style,
                  }}
                >
                  <JobCard
                    applicationId={app.id}
                    Company={app.companyName}
                    Role={app.roleTitle}
                    Status={stage}
                  />
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