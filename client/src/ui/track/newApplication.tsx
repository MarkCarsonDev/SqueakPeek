import React from "react";
import { Modal, Typography, Button } from "@mui/material";
import { InputField } from "@/ui/InputField"; 
import { ComboBox } from "@/ui/track/Searchbox"; 
import SelectLabels from "@/ui/track/ChoiceSelect"; 
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function NewApplicationModal({
  open,
  handleClose,
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
          <div style={{width: "30px"}}>
          <SelectLabels
            options={["Applied", "OA", "Interviewing", "Offer", "Rejected"]}
          />
          </div>

          {/* Input Fields in a single flex container */}
          <div style={{ display: "flex", gap: "40px" }}>
            {/* Left column */}
            <div style={{ flex: 1 }}>
              <InputField
                label="Role Title"
                placeholder="Title"
                fullWidth
                sx={{ marginBottom: "20px" }}
              />
              <InputField
                label="Location"
                placeholder="Location"
                fullWidth
                sx={{ marginBottom: "20px" }}
              />
              <InputField
                label="Date Applied"
                placeholder="mm/dd/yyyy"
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
              <ComboBox
                label="Company"
                placeholder="Company Name"
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <ComboBox
                label="Job Type"
                placeholder="Type"
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <InputField
                label="Link to Job Application"
                placeholder="Link"
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
