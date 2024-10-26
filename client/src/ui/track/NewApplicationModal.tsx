"use client";
import React, { useState } from "react";
import { Modal, Typography, Button } from "@mui/material";
import { InputField } from "@/ui/InputField";
import { SearchDropdown } from "@/ui/track/SearchDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateStatus from "@/ui/track/UpdateStatus";

import { ApplicationStage, useTrack, Application } from "@/lib/store/track";

interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
  applicationStatus: ApplicationStage;
  setApplicationStatus: React.Dispatch<React.SetStateAction<ApplicationStage>>;
}

const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship"];
const companyOptions = ["Google", "Netflix", "Amazon", "Facebook", "Apple"];

export default function NewApplicationModal({
  open,
  handleClose,
  applicationStatus,
  setApplicationStatus,
}: NewApplicationModalProps) {
  const [roleTitle, setRoleTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [company, setCompany] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [jobLink, setJobLink] = useState("");

  const { addApplication } = useTrack();

  const handleAddApplication = () => {
    console.log("status: ", applicationStatus);
    if (!applicationStatus) {
      alert("Please select a status before submitting");
      return;
    }

    const newApplication: Application = {
      id: Date.now().toString(),
      roleTitle,
      location,
      jobtype: jobType, //can't pull the information
      companyName: company, //can't pull the information
      dateApplied,
      applicationURL: jobLink,
      applicationStatus,
    };

    addApplication(applicationStatus, newApplication);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          width: "70%",
          padding: "30px 40px",
          backgroundColor: "white",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
        onSubmit={handleAddApplication}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ marginRight: "10px" }}
          />
          Add New Application
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ width: "150px" }}>
            <UpdateStatus
              required
              name="status"
              options={["Applied","Rejected",  "Online Assesstment", "Interviewing", "Offer", ]}
              applicationStatus={applicationStatus}
              setApplicationStage={setApplicationStatus}
            />
          </div>

          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ flex: 1 }}>
              <InputField
                label="Role Title"
                placeholder="Title"
                name="roleTitle"
                required
                fullWidth
                onChange={(e) => setRoleTitle(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
              <InputField
                label="Location"
                placeholder="Location"
                name="location"
                fullWidth
                onChange={(e) => setLocation(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
              <InputField
                label="Date Applied"
                placeholder="mm/dd/yyyy"
                name="dateApplied"
                fullWidth
                onChange={(e) => setDateApplied(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
              <Button
                variant="contained"
                onClick={handleClose}
                fullWidth
                sx={{
                  marginTop: "20px",
                  color: "#496FFF",
                  backgroundColor: "white",
                  boxShadow: "none",
                  height: "53px",
                  border: "1px solid #E0E3EB",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "white",
                    border: "1px solid #A6B0C3",
                    boxShadow: "none",
                  },
                }}
              >
                Cancel
              </Button>
            </div>

            <div style={{ flex: 1 }}>
              <SearchDropdown
                label="Company"
                placeholder="Company Name"
                name="company"
                options={companyOptions}
                value={company} // Bind value to company state
                onValueChange={(newValue) => setCompany(newValue || "")} // Update company
                required
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <SearchDropdown
                label="Job Type"
                placeholder="Type"
                name="jobType"
                options={jobTypeOptions}
                value={jobType} // Bind value to jobType state
                onValueChange={(newValue) => setJobType(newValue || "")} // Update jobType
                required
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <InputField
                label="Link to Job Application"
                placeholder="Link"
                name="jobLink"
                fullWidth
                onChange={(e) => setJobLink(e.target.value)}
                style={{ marginBottom: "20px" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: "20px",
                  height: "53px",
                  boxShadow: "none",
                  borderRadius: "8px",
                  backgroundColor: "#496FFF",
                  ":hover": {
                    backgroundColor: "#3B5AC6",
                    boxShadow: "none",
                  },
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
