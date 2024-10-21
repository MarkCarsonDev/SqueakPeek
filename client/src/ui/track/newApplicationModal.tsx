"use client";
//import React from "react";
import { Modal, Typography, Button } from "@mui/material";
import { InputField } from "@/ui/InputField"; 
import { Searchbox } from "@/ui/track/Searchbox"; 
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateStatus from "@/ui/track/UpdateStatus";
// You will import your calendar component here once added

interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
  defaultStatus: string;
}

export default function NewApplicationModal({
  open,
  handleClose,
  defaultStatus
}: NewApplicationModalProps) {
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
              />
              <InputField
                label="Location"
                placeholder="Location"
                name="location" // Added name prop
                fullWidth
                sx={{ marginBottom: "20px" }}
              />

              {/* Calendar component for Date Applied */}
              {/* Replace this with the actual calendar component */}
              <InputField
                label="Date Applied"
                placeholder="mm/dd/yyyy"
                name="dateApplied" // Added name prop
                fullWidth
                sx={{ marginBottom: "20px" }}
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
              <Searchbox
                label="Company"
                placeholder="Company Name"
                name="company" // Added name prop
                required
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <Searchbox
                label="Job Type"
                placeholder="Type"
                name="jobType" // Added name prop
                required
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <InputField
                label="Link to Job Application"
                placeholder="Link"
                name="jobLink" // Added name prop
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <Button 
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