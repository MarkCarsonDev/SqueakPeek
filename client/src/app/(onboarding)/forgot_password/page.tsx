"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "@/lib/actions/reset_password";
import { TextField, Button, Typography } from "@mui/material";

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
    <div>
      <Typography variant="h5">Forgot Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Send Reset Email</Button>
      </form>
      {message && <Typography>{message}</Typography>}
    </div>
  );
};

export default ForgotPasswordPage;
