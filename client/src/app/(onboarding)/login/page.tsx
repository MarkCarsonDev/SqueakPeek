"use client";
import "./login.css";
import { Button, Typography, Divider, TextField, Link } from "@mui/material";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <Typography variant="h2" sx={{ marginBottom: "10px" }}>
        Welcome Back
      </Typography>
      <Button
        className="border-line"
        variant="outlined"
        startIcon={
          <img src="https://www.google.com/favicon.ico" alt="Google" /> // will fix this to icon with mui
        }
        sx={{
          backgroundColor: "#ffff",
          width: "708px",
          borderRadius: "10px",
          border: "4px solid #E0E4F2",
          boxShadow: "#6d6d6d 0px 0px 5px",
        }}
      >
        Login with Google
      </Button>

      <div className="login-divider">
        <Divider
          sx={{
            width: "100px",
            height: "1px",
            backgroundColor: "#E0E4F2",
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
            backgroundColor: "#E0E4F2",
            marginLeft: 2,
          }}
        />
      </div>

      <div className="login-box">
        <Typography
          variant="h5"
          marginTop="50px"
          sx={{
            textAlign: "start",
            width: "500px",
          }}
        >
          Email
        </Typography>
        <TextField
          variant="outlined"
          required
          name="email"
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            width: "500px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#769FCD", // Default outline color
              },
            },
          }}
        />
        <Typography
          variant="h5"
          margin="normal"
          sx={{
            marginTop: "20px",
            textAlign: "start",
            width: "500px",
          }}
        >
          Password
        </Typography>
        <TextField
          variant="outlined"
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: "500px",
            marginBottom: "30px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#769FCD", // Default outline color
              },
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
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

        <Link
          href="/signup"
          sx={{
            alignSelf: "flex-end",
            justifySelf: "flex-end",
            marginRight: "15px",
            position: "relative",
            bottom: "55px",
          }}
        >
          <Typography variant="h6">Sign Up</Typography>
        </Link>
        <Link
          href="/recovery"
          sx={{
            alignSelf: "flex-end",
            justifySelf: "flex-end",
            marginRight: "15px",
            position: "relative",
            bottom: "55px"
          }}
        >
          <Typography variant="h6">Forgot Password?</Typography>
        </Link>
      </div>
    </div>
  );
}
