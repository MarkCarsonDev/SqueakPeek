"use client";
import React, { SetStateAction } from "react";
import { Card, Typography, Button, Box } from "@mui/material";
import { faChartColumn, faLink, faBars } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateStatus from "@/ui/track/UpdateStatus";
import { ApplicationStage, useTrack } from "@/lib/store/track";

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
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "#F6F8FF",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%", // Ensure it takes full width of container
      }}
    >
      {/* Row for the company name and status dropdown */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Company and Role Title */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {Company}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555" }}>
            {Role}
          </Typography>
        </Box>

        {/* Status Dropdown */}
        <UpdateStatus
          required
          name="status"
          options={["Applied", "OA", "Interviewing", "Offer", "Rejected"]}
          applicationStatus={Status}
          setApplicationStage={handleStatusChange}
        //   customSx={{
        //     backgroundColor: "#496FFF",
        //     borderRadius: "8px",
        //     padding: "4px 8px",
        //     color: "white",
        //   }} // Custom styling for the dropdown
        />
      </Box>

      {/* Row for action buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Action Icons */}
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Button>
            <FontAwesomeIcon icon={faFacebookMessenger} />
          </Button>
          <Button>
            <FontAwesomeIcon icon={faChartColumn} />
          </Button>
          <Button>
            <FontAwesomeIcon icon={faLink} />
          </Button>
        </Box>

        {/* Menu Icon */}
        <FontAwesomeIcon icon={faBars} />
      </Box>

      {/* Date Applied */}
      <Typography variant="body2" sx={{ textAlign: "right", color: "#999" }}>
        9/7/24
      </Typography>
    </Card>
  );
}