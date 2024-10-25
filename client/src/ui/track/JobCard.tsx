"use client";
import React, { SetStateAction } from "react";
import { Card, Typography, Button } from "@mui/material";
import { faChartColumn, faLink } from "@fortawesome/free-solid-svg-icons";
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

interface JobCardProps {
    applicationId: string;
    Company: string;
    Role: string;
    Status: ApplicationStage;
  }
  
  export function JobCard({ applicationId, Company, Role, Status }: JobCardProps) {
    const { moveApplication } = useTrack();
  
    // Wrap the handleStatusChange function to make it compatible with Dispatch<SetStateAction<ApplicationStage>>
    const handleStatusChange = (newStatus: SetStateAction<ApplicationStage>) => {
      const resolvedStatus = typeof newStatus === "function" ? newStatus(Status) : newStatus;
      if (resolvedStatus !== Status) {
        moveApplication(Status, resolvedStatus, applicationId);
      }
    };
  
    return (
      <Card sx={{ padding: "16px", borderRadius: "8px", backgroundColor: "white" }}>
        <UpdateStatus
          required
          name="status"
          options={["Applied", "OA", "Interviewing", "Offer", "Rejected"]}
          applicationStatus={Status}
          setApplicationStage={handleStatusChange} // Pass compatible function here
        />
        <Typography variant="subtitle1">{Company}</Typography>
        <Typography variant="subtitle2">{Role}</Typography>
        <Button><FontAwesomeIcon icon={faFacebookMessenger} /></Button>
        <Button><FontAwesomeIcon icon={faChartColumn} /></Button>
        <Button><FontAwesomeIcon icon={faLink} /></Button>
      </Card>
    );
  }