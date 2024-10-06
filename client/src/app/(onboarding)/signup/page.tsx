"use client";
import { Button, TextField, Typography, Link, Divider } from "@mui/material";
import "./signup.css";
import { useState } from "react";
/*
This page will represent the signup page of the application,
which include the signup with google button, email, confirm email, and password fields
and logging in link.
*/

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    // Handle signup logic here (e.g., call an API)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="main-container">
      {/* Let's get started section */}
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Let’s Get Started.
      </Typography>

      {/* Sign in with Google Button */}
      <Button
        className="border-line"
        variant="outlined"
        startIcon={
          <img src="https://www.google.com/favicon.ico" alt="Google" /> // will fix this to icon with mui
        }
        sx={{
          marginBottom: 3,
          backgroundColor: "#ffff",
          width: "780px",
          borderRadius: "8px",
          border: "none",
        }}
      >
        Sign up with Google
      </Button>

      {/* Divider with "Or" */}
      <div className="box-container">
        <Divider
          sx={{
            width: "100px",
            height: "1px",
            backgroundColor: "#ccc",
            marginRight: 2, // MUI shorthand for marginRight
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            textAlign: "center",
          }}
        >
          Or
        </Typography>
        <Divider
          sx={{
            width: "100px",
            height: "1px",
            backgroundColor: "#ccc",
            marginLeft: 2, // MUI shorthand for marginLeft
          }}
        />
      </div>

      {/* Signup form */}
      <div className="signup-form">
        {/* Email field */}
        <div className="text-field">
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
        </div>

        {/* Password field */}
        <div className="text-field">
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            type="password" // Ensure this is password input
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>

        {/* Confirm Password field */}
        <div className="text-field">
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type="password" // Ensure this is password input
            placeholder="Confirm your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
          />
        </div>

        {/* Submit button */}
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit} // Trigger submit logic on click
          sx={{
            mt: 2,
            width: "200px",
            boxShadow: "none",
            backgroundColor: "#496FFF",
            ":hover": {
              backgroundColor: "#3B5AC6",
              boxShadow: "none",
            },
          }}
        >
          Confirm
        </Button>

        <Typography variant="body2" sx={{ mt: 2, textAlign: "right" }}>
          <Link href="/login" color="inherit">
            Logging in?
          </Link>
        </Typography>
      </div>
    </div>
  );
}
