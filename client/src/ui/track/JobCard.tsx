"use client";
import React, { SetStateAction } from "react";
import { Card, Typography, IconButton, Box } from "@mui/material";
import {
  faChartColumn,
  faLink,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateStatus from "@/ui/track/UpdateStatus";
import { ApplicationStage, useTrack } from "@/lib/store/track";

// TODO:
// Implement the Link for message, chart, stats
// Implement the Company Brand Logo based on the company name

interface JobCardProps {
  applicationId: string;
  Company: string;
  Role: string;
  Status: ApplicationStage;
}

export function JobCard({
  applicationId,
  Company,
  Role,
  Status,
}: JobCardProps) {
  const { moveApplication } = useTrack();

  // Handle status change and update the card's state
  const handleStatusChange = (newStatus: SetStateAction<ApplicationStage>) => {
    const resolvedStatus =
      typeof newStatus === "function" ? newStatus(Status) : newStatus;
    if (resolvedStatus !== Status) {
      moveApplication(Status, resolvedStatus, applicationId);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: "8px",
        backgroundColor: "#F6F8FF",
        display: "grid",
        gridTemplateColumns: "20% 70% 10%",
        alignItems: "center",
        border: "1px solid #E0E4F2",
      }}
    >
      {/* Column 1: Company Brand (20%) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 1,
        }}
      >
        <Image
          src="/landingpage/logo.svg"
          height={50}
          width={50}
          alt="Squeakpeek Logo"
          style={{
            objectFit: "cover",
            objectPosition: "bottom",
            margin: "auto",
          }}
        ></Image>
      </Box>

      {/* Column 2: Main Content (70%) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          //   width: "100%",
          gap: "1px",
          //   backgroundColor: "white",
          ml: 1,
        }}
      >
        {/* Row 1: Company Name and Status */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Typography variant="subtitle2" sx={{ flexShrink: 0 }}>
            {Company}
          </Typography>
          <UpdateStatus
            name="status"
            options={[
              "Applied",
              "OnlineAssessment",
              "Interviewing",
              "Offer",
              "Rejected",
            ]}
            applicationStatus={Status}
            setApplicationStage={handleStatusChange}
            customSx={{
              fontSize: "10px", // Custom font size
              height: "20px", // Custom height
            }}
          />
        </Box>

        {/* Row 2: Role Title */}
        <Typography variant="subtitle2">{Role}</Typography>

        {/* Row 3: Icon Buttons */}
        <Box sx={{ display: "flex", gap: "5px" }}>
          <IconButton
            sx={{
              padding: "6px", // Controls the button size
              borderRadius: "50%", // Ensure it's circular
              ":hover": {
                backgroundColor: "#D0D4DA",
              },
            }}
          >
            <FontAwesomeIcon
              icon={faFacebookMessenger}
              style={{ fontSize: "10px", color: "#333333" }}
            />
          </IconButton>
          <IconButton
            sx={{
              padding: "6px",
              borderRadius: "50%",
              ":hover": {
                backgroundColor: "#D0D4DA",
              },
            }}
          >
            <FontAwesomeIcon
              icon={faChartColumn}
              style={{ fontSize: "10px", color: "#333333" }}
            />
          </IconButton>
          <IconButton
            sx={{
              padding: "6px",
              borderRadius: "50%",
              ":hover": {
                backgroundColor: "#D0D4DA",
              },
            }}
          >
            <FontAwesomeIcon
              icon={faLink}
              style={{ fontSize: "10px", color: "#333333" }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Column 3: 3-Bar Icon (10%) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          height: "100%",
          padding: "5px",
        }}
      >
        <IconButton
          sx={{
            padding: "6px",
            borderRadius: "50%",
            ":hover": {
              backgroundColor: "#D0D4DA",
            },
          }}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: "10px", color: "#333333" }}
          />
        </IconButton>
      </Box>
    </Card>
  );
}
