"use client";
import { Button, TextField, Typography, Link, Input } from "@mui/material";
import "/src/theme/global.css";
import "./profile_setup.css";
import { InputField } from "@/ui/InputField";
export default function ProfilePage() {
  return (
    <div className="main-container">
      <div className="profile-setup">
        <InputField
          fullWidth = {true}
          label="Full Name"
          placeholder="Enter your full name"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />
        <InputField
          fullWidth = {true}
          label="Username"
          placeholder="Enter your username"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />
        <InputField
          fullWidth = {true}
          label="School"
          placeholder="Enter your school"
          variant="outlined"
          sx={{ marginBottom: "20px" }}
        />
        <Button variant="contained" sx={{ marginBottom: "20px" }}>
          Save
        </Button>
      </div>
    </div>
  );
}
