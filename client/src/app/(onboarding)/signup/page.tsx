"use client";
import {
  Button,
  TextField,
  Typography,
  Link,
  Divider,
  Input,
} from "@mui/material";
import "./signup.css";
import { useState } from "react";
import "/src/theme/global.css";
import { InputField } from "@/ui/InputField";

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
      <form className="signup-box">
        {/* Email field */}
        <InputField
          fullWidth
          placeholder="Enter your email"
          required
          label="Email"
          name="email"
        />

        {/* Password field */}
        <InputField
          type="password" // Ensure this is password input
          placeholder="Enter your password"
          required
          label="Password"
          fullWidth
          name="password"
        />

        {/* Confirm Password field */}
        <InputField
          fullWidth
          type="password" // Ensure this is password input
          // label="Confirm Password"
          placeholder="Confirm your password"
          required
          label="Confirm Password"
          name="confirmPassword"
        />

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
      </form>
    </div>
  );
}
