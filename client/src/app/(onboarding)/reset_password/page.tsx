"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { InputField } from "@/ui/InputField"; // Assuming you're using this custom InputField
import { createSupabaseClient } from "@/lib/supabase/client"; // Client-side Supabase initialization
import "./reset_password.css"; // Import CSS for styling

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null); // Define session state
  const supabase = createSupabaseClient(); // Initialize the Supabase client

  // Get the 'code' parameter from the URL query string and set the session
  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await supabase.auth.getSession();
      console.log("Fetched session:", currentSession); // Log the session for debugging
      setSession(currentSession.data.session); // Store session
    };

    fetchSession();

    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    console.log("Code from URL:", codeParam); // Log the reset code from URL for debugging
    setCode(codeParam);
  }, [supabase]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Log the session and code when form is submitted
    console.log("Session at submit:", session); // Debugging the session
    console.log("Reset code at submit:", code); // Debugging the reset code

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!code) {
      setError("Invalid or expired reset link.");
      return;
    }

    // Check if session or email is available
    if (!session?.user?.email) {
      console.log("Session or email is missing:", session); // Debugging the session
      setError("Password recovery requires an email.");
      return;
    }

    // Debugging the email address from the session
    console.log("Resetting password for email:", session.user.email); // Debugging the email value

    try {
      // Use resetPasswordForEmail method to reset password
      const { error } = await supabase.auth.resetPasswordForEmail(session.user.email, {
        redirectTo: "/login", // Redirect to login page after password reset
      });

      if (error) {
        console.log("Error from Supabase:", error); // Log error for debugging
        setError("Failed to reset password: " + error.message);
      } else {
        setMessage("Password reset successfully. You can now log in.");
      }
    } catch (err) {
      console.error("Unexpected error during reset:", err); // Log unexpected errors
      setError("An unexpected error occurred while resetting the password.");
    }
  };

  return (
    <div className="main-container">
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Reset Your Password
      </Typography>
      {error && <Typography sx={{ color: "red", marginBottom: "20px" }}>{error}</Typography>}
      {message && <Typography sx={{ color: "green", marginBottom: "20px" }}>{message}</Typography>}

      <form onSubmit={handleSubmit} className="reset-password-form">
        <InputField
          fullWidth
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ marginBottom: "20px" }}
        />
        <InputField
          fullWidth
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{ marginBottom: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#496FFF",
            ":hover": { backgroundColor: "#3B5AC6" },
            boxShadow: "none",
            borderRadius: "8px",
          }}
        >
          Reset Password
        </Button>
      </form>

      <Typography variant="subtitle2" className="subtitle">
        Your anonymity is valued.
        <br />
        Information we collect will not be shared.
      </Typography>
    </div>
  );
};

export default ResetPasswordPage;
