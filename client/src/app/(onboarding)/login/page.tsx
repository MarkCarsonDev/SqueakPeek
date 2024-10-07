"use client";
import "./login.css";
import { Button, Typography, Divider, TextField, Link } from "@mui/material";
import { useState } from "react";

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
      hasError=true
    } 

    if (password === "") {
      setError(true);
      setPasswordHelperText("Password is required");
      hasError=true
    } 
    
    if (hasError===false) {
      handleSubmit();
    }
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
          <img src="https://www.google.com/favicon.ico" alt="Google" />
        }
        sx={{
          backgroundColor: "#ffff",
          width: "708px",
          borderRadius: "10px",
          border: "4px solid #E0E4F2",
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
            backgroundColor: "#E0E4F2",
            marginLeft: 2,
          }}
        />
      </div>

      <div className="login-box">
        <div className="login-fields">
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              width: "500px",
              marginBottom: "10px",
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
            label="Enter your email"
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
            variant="h5"
            sx={{
              marginTop: "10px",
              textAlign: "start",
              width: "500px",
              marginBottom: "10px"
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
            label="Enter your password"
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
          <div className="spacer">

          </div>
          <div className="login-button">
          <Button
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
          </div>
          
          <div className="links">
          <Link href="/signup">
            <Typography variant="h6" sx={{textAlign: "right"}}>Sign Up</Typography>
          </Link>
          <Link href="/recovery">
            <Typography variant="h6" sx={{textAlign: "right"}}>Forgot Password?</Typography>
          </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
