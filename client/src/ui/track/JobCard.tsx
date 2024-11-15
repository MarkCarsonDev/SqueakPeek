"use client";
import React, { SetStateAction} from "react";
import {Card, Typography, IconButton, Box, Select, MenuItem, SelectChangeEvent} from "@mui/material";
import {
  faChartColumn,
  faLink,
  faBars,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";

import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateStatus from "@/ui/track/UpdateStatus";
import { Application, useTrack, ApplicationStage } from "@/lib/store/track";
import { Profile } from "@/lib/store/profile";
import { useFetchCompanyLogo } from "@/lib/hooks/useFetchCompanyLogo";
import { useAlert } from "@/lib/store/alert";

// TODO:
// Implement the Link for chart
// Implement the delete button.

interface JobCardProps {
  application: Application;
  profile: Profile;
}

export function JobCard({ application, profile }: JobCardProps) {
  const { moveApplication, updateApplication, removeApplication } = useTrack();
  const logoUrl = useFetchCompanyLogo(application.company_name);
  const { setAlert } = useAlert();
  const {
    application_id: applicationId,
    company_name,
    role_title,
    status,
    currentScore,
    outOfScore,
    interviewing_round,
    thread_id,
    link,
  } = application;

  const handleStatusChange = (value: SetStateAction<ApplicationStage>) => {
    const newStatus = typeof value === "function" ? value(status) : value;
    if (newStatus !== status) {
      moveApplication(status, newStatus, applicationId, 0, 0);
      updateApplication(
        applicationId,
        { ...application, status: newStatus },
        profile
      );
    }
  };

  const handleInterviewRoundChange = (event: SelectChangeEvent<string>) => {
    const newRound = event.target.value;
    updateApplication(
      applicationId,
      { ...application, interviewing_round: newRound },
      profile
    );
  };

  const handleRemoveApplication = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const {success, message} = await removeApplication(status, application, profile);
    if (success) {
      // This would never print since there is nothing to return from the database
      setAlert( {message: "Error remove application", type: "error" });
    }
    else if (message) {
      setAlert( {message: "Application removed", type: "success" });
    }
  };
  return (
    <Card
      sx={{
        borderRadius: "8px",
        border: "2px solid #E0E4F2",
        backgroundColor: "#F6F8FF",
        display: "grid",
        gridTemplateColumns: "50px auto 30px",
        alignItems: "center",
        padding: "10px",
        marginX: "auto",
        boxShadow: "none",
        marginBottom: "10px",
        overflow: "hidden",
      }}
    >
      {/* Column 1: Company Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4px",
        }}
      >
        <img
          src={logoUrl}
          height={40}
          width={40}
          alt={`${company_name} Logo`}
          style={{
        objectFit: "cover",
        borderRadius: "8px",
          }}
        />
      </Box>

      {/* Column 2: Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "4px",
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
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
            {company_name}
          </Typography>
          <UpdateStatus
            required
            name="status"
            options={[
              "Applied",
              "Rejected",
              "Online Assessment",
              "Interviewing",
              "Offer",
            ]}
            applicationStatus={status}
            setApplicationStage={handleStatusChange}
            customSx={{
              height: "20px",
              fontSize: "10px",
              width: "70px",
            }}
          />
          {/* Display the score if status is OA */}
          {status === "Online Assessment" && currentScore && outOfScore && (
            <Typography
              variant="caption"
              sx={{
                backgroundColor: "#496FFF",
                color: "white",
                borderRadius: "8px",
                padding: "2px 6px",
                fontSize: "10px",
              }}
            >
              {currentScore}/{outOfScore}
            </Typography>
          )}
          {/* Display the score if status is OA */}
          {status === "Interviewing" && (
            <Select
              value={interviewing_round || ""}
              onChange={handleInterviewRoundChange}
              renderValue={(selected) => `R: ${selected}`}
              onClick={(e) => e.stopPropagation()}
              sx={{
                height: "20px",
                fontSize: "10px",
                backgroundColor: "#496FFF",
                color: "white",
                borderRadius: "8px",
                width: "auto",
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "&.MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "8px",
                    boxShadow: "none",
                    backgroundColor: "#496FFF",
                  },
                },
              }}
            >
              {["1", "2", "3", "4+"].map((round) => (
                <MenuItem
                  key={round}
                  value={round}
                  sx={{
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  {round}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>

        {/* Row 2: Role Title */}
        <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
          {role_title}
        </Typography>

        {/* Row 3: Icon Buttons */}
        <Box sx={{ display: "flex", gap: "6px" }}>
          <IconButton
            href={`/message/company/${thread_id}`}
            sx={{
              padding: "6px", // Adjusted padding for larger button size
              borderRadius: "50%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon
              icon={faMessage}
              style={{ fontSize: "14px", color: "#333333" }} // Larger icon size
            />
          </IconButton>
          <IconButton
            sx={{
              padding: "6px",
              borderRadius: "50%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon
              icon={faChartColumn}
              style={{ fontSize: "14px", color: "#333333" }}
            />
          </IconButton>
          <IconButton
            sx={{
              padding: "6px",
              borderRadius: "50%",
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (link) {
                navigator.clipboard.writeText(link)
                setAlert({
                  message: "Link copied to clipboard",
                  type: "success",
                })
              } else {
                setAlert({
                  message: "No link available",
                  type: "error",
                })
              }
            }}
          >
            <FontAwesomeIcon
              icon={faLink}
              style={{ fontSize: "14px", color: "#333333" }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Column 3: 3-Bar Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          paddingRight: "8px",
        }}
      >
        <IconButton
          sx={{ padding: "4px", borderRadius: "50%", position: "relative" }}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: "12px", color: "#333333" }}
          />
        </IconButton>
        <IconButton
          sx={{ padding: "4px", borderRadius: "50%", marginTop: "auto" }}
          onClick={handleRemoveApplication}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ fontSize: "12px", color: "#333333" }}
          />
        </IconButton>
      </Box>
    </Card>
  );
}
