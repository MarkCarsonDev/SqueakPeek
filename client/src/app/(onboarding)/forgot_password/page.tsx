"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "@/lib/actions/reset_password";
import {  Button, Typography } from "@mui/material";
import { InputField } from "@/ui/InputField";
import "./forgot_password.css";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    const { message } = await sendPasswordResetEmail(formData);
    setMessage(message);
  };

  return (
    // <div>
    //   <Typography variant="h5">Forgot Password</Typography>
    //   <form onSubmit={handleSubmit}>
    //     <TextField
    //       label="Email"
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <Button type="submit">Send Reset Email</Button>
    //   </form>
    //   {message && <Typography>{message}</Typography>}
    // </div>
    <div className="main-container">
      <Typography variant="h4" sx={{ marginTop: "80px", marginBottom: "20px" }}>
        Forgot Your Password?
      </Typography>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <InputField
          fullWidth
          placeholder="Enter your email"
          required
          label="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          // helperText={state.errors?.email?.[0]}
          style={{ marginBottom: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            backgroundColor: "#496FFF",
            boxShadow: "none",
            ":hover": { backgroundColor: "#3B5AC6", boxShadow: "none" },
          }}
        >
          Send Reset Email
        </Button>
        {message && <Typography sx={{ marginTop: "10px" }}>{message}</Typography>}
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
