"use client";
import React, { useRef, useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Droppable, Draggable} from "@hello-pangea/dnd";
import { Application, ApplicationStage } from "@/lib/store/track";
import { JobCard } from "./JobCard";

// Props for StageColumn component
export interface StageColumnProps {
  stage: ApplicationStage;
  stageName: string;
  stageColor: string;
  applications: Application[];
  handleOpenModal?: (stage: ApplicationStage) => void;
}

// Main component
export const StageColumn: React.FC<StageColumnProps> = ({
  stage,
  stageName,
  stageColor,
  applications,
  handleOpenModal,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollingDirection] = useState<"up" | "down" | null>(null);

  // Use effect to handle scrolling
  useEffect(() => {
    if (scrollingDirection) {
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;

      const scrollAmount = scrollingDirection === "down" ? 10 : -10; // Adjust speed as needed
      const interval = setInterval(() => {
        scrollContainer.scrollTop += scrollAmount;
      }, 20); // Frequency of scrolling (ms)

      return () => clearInterval(interval);
    }
  }, [scrollingDirection]);



  return (
    <Droppable droppableId={stage} key={stage}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={(ref) => {
            provided.innerRef(ref);
            if (ref) containerRef.current = ref; // Assign ref without modifying current directly
          }}
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

          {/* Scrolling container for Job Cards */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflowY: "auto",
              marginBottom: "10px",
              marginTop: "5px",
              scrollbarWidth: "none",
            }}
          >
            {applications.map((app, index) => (
              <Draggable key={app.id} draggableId={app.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      marginTop: "8px",
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
        </div>
      )}
    </Droppable>
  );
};


// TODO: Customize drag and drop functionality for color betweenn stages