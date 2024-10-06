"use client";
import {
  Button,
  TextField,
  Typography,
  Box,
  Link,
  Divider,
} from "@mui/material";
import { InputField } from "@/ui/Inputbox";
import "./signup.css";
/*
This page will represent the signup page of the application,
which include the signup with google button, email, confirm email, and password fields
and logging in link.
*/

export default function SignupPage() {
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
      <div className="signup-form" >
        <InputField
          label="Email"
          placeholder="Enter your email"
          required={true}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          required={true}
        />
        <InputField
          label="Password"
          placeholder="Confirm your password"
          required={true}
        />
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            boxShadow: "none", // Removed the shadow
            backgroundColor: "#496FFF", // Applied the requested color for the button
            ":hover": {
              backgroundColor: "#3B5AC6",
              boxShadow: "none",
            }, // Slightly darker shade on hover
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
