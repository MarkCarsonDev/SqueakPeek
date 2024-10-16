"use client"
import React from 'react';
import { Modal, Typography, Button } from '@mui/material';
import { InputField } from '@/ui/InputField'; // Assuming this is a custom input component
import {ComboBox} from '@/ui/Searchbox'; // Assuming this is a custom combobox component

// Define the types for the props
interface NewApplicationModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function NewApplicationModal({ open, handleClose }: NewApplicationModalProps) {
  const modalStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Valid CSS box shadow
    padding: '20px',
    borderRadius: '8px',
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={modalStyle}>
        <Typography variant="h3" style={{ marginBottom: '20px' }}>
          Add New Application
        </Typography>

        <form>
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Left side of the form */}
            <div style={{ flex: 1 }}>
              <InputField label="Role Title" placeholder="Title" />
              <InputField label="Location" placeholder="Location" />
              <InputField label="Date Applied" placeholder="mm/dd/yyyy" />
            </div>

            {/* Right side of the form */}
            <div style={{ flex: 1 }}>
              {/* <InputField label="Company" placeholder="Company Name" /> */}
              <ComboBox label = "Company" placeholder="Company Name" />
              <InputField label="Job Type" placeholder="Type" />
              <InputField label="Link to Job Application" placeholder="Link" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              style={{
                width: '150px',
                backgroundColor: '#f0f0f0',
                color: '#000',
                boxShadow: 'none',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                width: '150px',
                backgroundColor: '#496FFF',
                boxShadow: 'none',
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