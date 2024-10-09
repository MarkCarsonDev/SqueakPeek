"use client";
import "./login.css";
import { Button, Typography, TextField, Link } from "@mui/material";
import { useState } from "react";
import { DividerWithText } from "@/ui/DividerWithText"

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  // Dummy Function, will handle login logic
  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const validateInput = () => {
    setError(false);
    setEmailHelperText("");
    setPasswordHelperText("");

    let hasError = false;

    if (email === "") {
      setError(true);
      setEmailHelperText("Email is required");
      hasError = true;
    }

    if (password === "") {
      setError(true);
      setPasswordHelperText("Password is required");
      hasError = true;
    }

    if (hasError === false) {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <Typography variant="h2" sx={{ marginBottom: "10px" }}>
        Welcome Back
      </Typography>
      <Button
        variant="outlined"
        startIcon={
          <img src="https://www.google.com/favicon.ico" alt="Google" />
        }
        sx={{
          backgroundColor: "white",
          width: "708px",
          borderRadius: "10px",
          border: "4px solid #E0E4F2",
        }}
      >
        Login with Google
      </Button>

      <DividerWithText />

      <div className="login-box">
        <div className="login-fields">
          <Typography
            variant="subtitle1"
            className="required-label"
            sx={{
              textAlign: "start",
              width: "500px",
              marginBottom: "10px",
              fontWeight: "bold"
            }}
          >
            Email
          </Typography>
          <TextField
            variant="outlined"
            required
            error={error}
            helperText={emailHelperText}
            autoComplete="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "500px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#769FCD",
                },
              },
            }}
          />
          <Typography
            variant="subtitle1"
            className="required-label"
            sx={{
              marginTop: "10px",
              textAlign: "start",
              width: "500px",
              marginBottom: "10px",
              fontWeight: "bold"
            }}
          >
            Password
          </Typography>
          <TextField
            variant="outlined"
            required
            error={error}
            helperText={passwordHelperText}
            autoComplete="current-password"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "500px",
              marginBottom: "30px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#769FCD",
                },
              },
            }}
          />
        </div>

        <div className="login-button-links">
          <div className="spacer"></div>

            <Button
              className="login-button"
              variant="contained"
              onClick={validateInput}
              sx={{
                backgroundColor: "#496FFF",
                borderRadius: "8px",
                padding: "10px 60px",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#3C435C",
                },
              }}
            >
              <Typography sx={{ color: "white" }}>Log In</Typography>
            </Button>

          <div className="links">
            <Link href="/signup" sx={{textDecorationColor: "#496FFF"}}>
              <Typography variant="body2" sx={{ textAlign: "right" }}>
                Sign Up
              </Typography>
            </Link>
            <Link href="/recovery" sx={{textDecorationColor: "#496FFF"}}>
              <Typography variant="body2" sx={{ textAlign: "right" }}>
                Forgot Password?
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
