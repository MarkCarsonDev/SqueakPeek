"use client";
import React, { SetStateAction } from "react";
import {Card, Typography,IconButton, Box, Select, MenuItem, SelectChangeEvent} from "@mui/material";
import { faChartColumn, faLink, faBars,} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateStatus from "@/ui/track/UpdateStatus";
import { Application, useTrack, ApplicationStage } from "@/lib/store/track";

// TODO:
// Implement the Link for message, chart, stats
// Implement the Company Brand Logo based on the company name

interface JobCardProps {
  application: Application;
}

export function JobCard({ application }: JobCardProps) {
  const { moveApplication, updateApplication } = useTrack();

  const {
    application_id: applicationId,
    company_name,
    role_title,
    status: status,
    currentScore,
    outOfScore,
    interviewing_round,
  } = application;

  const handleStatusChange = (value: SetStateAction<ApplicationStage>) => {
    const newStatus = typeof value === "function" ? value(status) : value;
    if (newStatus !== status) {
      moveApplication(status, newStatus, applicationId, 0, 0);
      updateApplication( applicationId, {...application,status: newStatus});
    }
  };

  const handleInterviewRoundChange = (event: SelectChangeEvent<string>) => {
    const newRound = event.target.value;
    updateApplication( applicationId, { ...application, interviewing_round: newRound });
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
        <Image
          src="/landingpage/logo.svg"
          height={40}
          width={40}
          alt="Squeakpeek Logo"
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
              {["1", "2", "3", "4+"].map(
                (round) => (
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
                )
              )}
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
            sx={{
              padding: "6px", // Adjusted padding for larger button size
              borderRadius: "50%",
            }}
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
      </Box>
    </Card>
  );
}
