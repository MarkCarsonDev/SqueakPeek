"use client";
import React from "react";
import { Typography, Button } from "@mui/material"; // Using MUI for consistency
import "./404.css";  // Import the CSS file

const NotFound = () => {
  return (
    <div className="main-container">
      <div className="logo-container">
        <img
          src="/general/website_logo.svg"
          alt="Website Logo"
          className="website-logo"
        />
      </div>
      <div className="error-content">
        <Typography
          variant="h1"
          className="error-title"
          sx={{ textAlign: "center", fontSize: "4rem", fontWeight: "bold" }}
        >
          404
        </Typography>
        <Typography
          variant="h6"
          className="error-message"
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            color: "#6E7191",
            marginBottom: "40px",
          }}
        >
          Oops! The page you are looking for doesn&apos;t exist.
        </Typography>
        <Button
          href="/"
          variant="contained"
          sx={{
            backgroundColor: "#496FFF",
            ":hover": { backgroundColor: "#3B5AC6" },
            boxShadow: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            marginTop: "30px",
            fontSize: "1rem",
          }}
        >
          Go back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
