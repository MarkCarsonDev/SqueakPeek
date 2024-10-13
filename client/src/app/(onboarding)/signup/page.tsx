"use client";
import { Button, TextField, Typography, Link, Divider } from "@mui/material";
import "./signup.css";
import { useState } from "react";
import "/src/theme/global.css";

export default function SignupPage() {
  return (
    <div className="main-container">
      {/* Let's get started section */}
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Let’s Get Started.
      </Typography>

      {/* Sign in with Google Button */}
      <Button
        className="borderline"
        variant="outlined"
        startIcon={
          <img src="https://www.google.com/favicon.ico" alt="Google" />
        }
        sx={{
          border: "4px solid #E0E4F2",
          backgroundColor: "white",
          width: "780px",
          borderRadius: "8px",
        }}
      >
        Sign up with Google
      </Button>

      {/* Divider with "Or" */}
      <div className="divider">
        <Divider
          sx={{
            width: "100px",
            height: "1px",
            backgroundColor: "#ccc",
            marginRight: 2,
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
            marginLeft: 2,
          }}
        />
      </div>

      {/* Signup form */}
      <div className="signup-box">
        {/* Email field */}
        <div className="text-field">
          <Typography
            variant="subtitle1"
            className="required-label"
            sx={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            // label="Email"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password field */}
        <div className="text-field">
          <Typography
            variant="subtitle1"
            className="required-label"
            sx={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            // label="Password"
            type="password" // Ensure this is password input
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password field */}
        <div className="text-field">
          <Typography
            variant="subtitle1"
            className="required-label"
            sx={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type="password" // Ensure this is password input
            // label="Confirm Password"
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Submit button */}
        <div className="buttons-links">
          <div className="spacer"></div>
          <div className="submit-button">
            <Button
              className="borderline"
              type="button"
              variant="contained"
              color="primary"
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
          </div>
          <div className="login-link">
            <Link
              href="/login"
              color="inherit"
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                textAlign: "right",
              }}
            >
              <Typography variant="body2">Logging in?</Typography>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Old code for reference in the future
{
  /* <Typography
variant="subtitle1"
sx={{ fontWeight: "bold", marginBottom: "8px" }}
>
Email
</Typography> */
}
