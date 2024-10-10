"use client";
import { Button, TextField, Typography, Link, Input } from "@mui/material";
import "/src/theme/global.css";
import "./profile_setup.css";
import { InputField } from "@/ui/InputField";
export default function ProfilePage() {
  return (
    <div className="main-container">
      <div className="profile-setup">
        <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Profile Setup
        </Typography>


        {/* This is the InputField component */}
        <InputField
          fullWidth
          className="input-field"
          label="Full Name"
          placeholder="Enter your full name"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />
        <InputField
          fullWidth
          label="Username"
          placeholder="Enter your username"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />
        <InputField
          fullWidth
          label="School"
          placeholder="Enter your school"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />
        <Button variant="contained" 
        sx={{
          mt: 2,
          width: "200px",
          boxShadow: "none",
          backgroundColor: "#496FFF",
          ":hover": {
            backgroundColor: "#3B5AC6",
            boxShadow: "none",
          },
        }}>
          Create Account
        </Button>
      </div>
    </div>
  );
}
