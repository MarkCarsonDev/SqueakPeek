// "use client"
import React from "react";
import { Modal, Typography, Button } from "@mui/material";
import { InputField } from "@/ui/InputField"; // Assuming this is a custom input component
import { ComboBox } from "@/ui/track/Searchbox"; // Assuming this is a custom combobox component
import SelectLabels from "@/ui/track/ChoiceSelect"; // Assuming this is a custom select component
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Define the types for the props
interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function NewApplicationModal({
  open,
  handleClose,
}: NewApplicationModalProps) {
  const modalStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "900px",
    height: "500px",
    backgroundColor: "white",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Valid CSS box shadow
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={modalStyle}>
        <form>
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ marginRight: "10px" }}
            />
            Add New Application
          </Typography>
          {/* Job status */}
          <SelectLabels
            options={["Applied", "OA", "Interviewing", "Offer", "Rejected"]}
          />
          {/* Field Input part */}
          <div style={{ display: "flex", gap: "20px" }}>
            {/* Left side of the form */}
            <div style={{ flex: 1 }}>
              <InputField label="Role Title" placeholder="Title" fullWidth />
              <InputField label="Location" placeholder="Location" fullWidth />
              <InputField
                label="Date Applied"
                placeholder="mm/dd/yyyy"
                fullWidth
              />
            </div>

            {/* Right side of the form */}
            <div style={{ flex: 1 }}>
              {/* <InputField label="Company" placeholder="Company Name" /> */}
              <ComboBox label="Company" placeholder="Company Name" fullWidth />
              <ComboBox label="Job Type" placeholder="Type" fullWidth />
              <InputField
                label="Link to Job Application"
                placeholder="Link"
                fullWidth
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              style={{
                width: "150px",
                backgroundColor: "#f0f0f0",
                color: "#000",
                boxShadow: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "150px",
                backgroundColor: "#496FFF",
                boxShadow: "none",
              }}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
