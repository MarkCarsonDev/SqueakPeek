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

  // Error state for form validation
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Function to handle form submission
  const validateForm = () => {
    const formErrors = { email:"", password:"", confirmPassword:"" };
    let isValid = true;

    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    }

    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    } 

    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setError(formErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Enail: ", email);
      console.log("Password", password);
    } else {
      console.log("Validation is failed");
    }
  };

  return (
    <div className="borderline main-container">
      {/* Let's get started section */}
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Let’s Get Started.
      </Typography>

      {/* Sign in with Google Button */}
      <Button
        className="borderline"
        variant="outlined"
        startIcon={
          <img src="https://www.google.com/favicon.ico" alt="Google" /> // will fix this to icon with mui
        }
        sx={{
          backgroundColor: "white",
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
            Email <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your email"
            required
            error={!!error.email} // Check if there is an error
            helperText={error.email} // Display error message
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
            Password <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            type="password" // Ensure this is password input
            placeholder="Enter your password"
            required
            error={!!error.password} // Check if there is an error
            helperText={error.password} // Display error message
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
            Confirm Password <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            type="password" // Ensure this is password input
            placeholder="Confirm your password"
            required
            error={!!error.confirmPassword} // Check if there is an error
            helperText={error.confirmPassword} // Display error message
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
          />
        </div>

        {/* Submit button */}
        <Button
          className="borderline"
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

        <Typography 
          variant="body2" 
          sx={{ 
            mt: 2, 
            width: "100%", // Ensures the Typography takes full width of the parent
            display: "flex", // Flexbox for controlling alignment
            justifyContent: "flex-end", // Aligns the link to the right
            textAlign: "right", // Ensures the text is aligned right
          }}>
          <Link href="/login" color="inherit">
            Logging in?
          </Link>
        </Typography>
      </div>
    </div>
  );
}
