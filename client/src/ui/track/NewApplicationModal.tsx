"use client";
import React, { useState } from "react";
import { Modal, Typography, Button } from "@mui/material";
import { InputField } from "@/ui/InputField";
import { SearchDropdown } from "@/ui/track/SearchDropdown";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateStatus from "@/ui/track/UpdateStatus";
import  { Application } from "@/lib/store/TrackingApplicaitonStore";
// You will import your calendar component here once added

interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
  defaultStatus: string;
  //selectedStageId: string;
  onSubmit: (application: Application, status: string) => void;
}

export default function NewApplicationModal({
  open,
  handleClose,
  defaultStatus,
  //selectedStageId,
  onSubmit,

}: NewApplicationModalProps) {
  //const { addApplication } = TrackingApplicationStore(); // Access the addApplication method from Zustand store
  const [roleTitle, setRoleTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [company, setCompany] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [status, setStatus] = useState(defaultStatus);

  const handleAddApplication = () => {
    if (!status) {
      alert("Please select a status before submitting");
      return;
    }
    const newApplication = {
      id: Date.now().toString(), // Use a timestamp or UUID for a unique ID
      roleTitle,
      location,
      jobtype: jobType,
      companyName: company,
      dateApplied,
      jobURL: jobLink,
      status,
    };

    // Add the application to the selected stage
    //addApplication(selectedStageId, newApplication);
    onSubmit(newApplication, status);
    // Close the modal after adding
    handleClose();
  };

  // List of options for job types
  const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship"];

  // List of options for companies
  const companyOptions = ["Google", "Netflix", "Amazon", "Facebook", "Apple"];
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
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleAddApplication(); // Trigger adding new application
        }}
      >
        <Typography
          variant="h4"
          style={{
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

        {/* Container for the status dropdown and input fields */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Status dropdown */}
          <div style={{ width: "150px" }}>
            <UpdateStatus
              required
              name="status"
              options={["Applied", "OA", "Interviewing", "Offer", "Rejected"]}
              defaultStatus={defaultStatus}
              onChange={(e) => setStatus(e.target.value as string)}
            />
          </div>

          {/* Input Fields in a single flex container */}
          <div style={{ display: "flex", gap: "40px" }}>
            {/* Left column */}
            <div style={{ flex: 1 }}>
              <InputField
                label="Role Title"
                placeholder="Title"
                name="roleTitle"
                required
                fullWidth
                sx={{ marginBottom: "20px" }}
                onChange={(e) => setRoleTitle(e.target.value)}
              />
              <InputField
                label="Location"
                placeholder="Location"
                name="location" // Added name prop
                fullWidth
                sx={{ marginBottom: "20px" }}
                onChange={(e) => setLocation(e.target.value)}
              />

              {/* TODO:  Calendar component for Date Applied */}
              {/* Replace this with the actual calendar component */}
              <InputField
                label="Date Applied"
                placeholder="mm/dd/yyyy"
                name="dateApplied" // Added name prop
                fullWidth
                sx={{ marginBottom: "20px" }}
                onChange={(e) => setDateApplied(e.target.value)}
              />

              {/* Action buttons */}
              <Button
                variant="contained"
                onClick={handleClose}
                fullWidth
                sx={{
                  marginTop: "20px",
                  color: "#496FFF",
                  boxShadow: "none",
                  backgroundColor: "white",
                  height: "53px",
                  border: "1px solid #E0E3EB",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "white",
                    boxShadow: "none",
                    border: "1px solid #A6B0C3",
                  },
                }}
              >
                Cancel
              </Button>
            </div>

            {/* Right column */}
            <div style={{ flex: 1 }}>
              <SearchDropdown
                label="Company"
                placeholder="Company Name"
                name="company" // Added name prop
                options = {companyOptions}
                required
                fullWidth
                style={{ marginBottom: "20px" }}
                onChange={(e) => setCompany(e.target.value)}
              />
              <SearchDropdown
                label="Job Type"
                placeholder="Type"
                name="jobType" // Added name prop
                options = {jobTypeOptions}
                required
                fullWidth
                style={{ marginBottom: "20px" }}
                onChange={(e) => setJobType(e.target.value)}
              />
              <InputField
                label="Link to Job Application"
                placeholder="Link"
                name="jobLink" // Added name prop
                fullWidth
                style={{ marginBottom: "20px" }}
                onChange={(e) => setJobLink(e.target.value)}
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
