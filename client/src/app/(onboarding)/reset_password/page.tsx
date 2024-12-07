"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import { InputField } from "@/ui/InputField"; // Assuming you're using the same InputField component
import { createSupabaseClient } from "@/lib/supabase/client"; // Client-side supabase initialization
import "./reset_password.css"; // Import CSS for styling


const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isTokenVerified, setIsTokenVerified] = useState(false); // Track token verification status
  const [code, setCode] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createSupabaseClient(); // Use the Supabase client for client-side

  // Get the 'code' parameter from the URL query string
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setCode(urlParams.get("code"));
    }
    
    //const code = urlParams.get("code");
  }, []);

  
  // Token verification process
  useEffect(() => {
    if (code) {
      const verifyToken = async () => {
        try {
          // Verify the reset token with Supabase
          const { error } = await supabase.auth.resetPasswordForEmail(code);

          if (error) {
            setError("Invalid or expired reset link.");
          } else {
            setMessage("Token verified, you can now reset your password.");
            setIsTokenVerified(true); // Mark token as verified
          }
        } catch (err) {
          setError("Failed to verify token.");
        }
      };

      verifyToken();
    }
  }, [code]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isTokenVerified) {
      setError("Invalid or expired reset link.");
      return;
    }

    try {
      // Use the code to reset password with Supabase
      const { error } = await supabase.auth.updateUser({
        password, // Only the password
      });

      if (error) {
        setError("Failed to reset password.");
      } else {
        setMessage("Password reset successfully.");
        router.push("/login"); // Redirect to login page after successful reset
      }
    } catch (err) {
      setError("An unexpected error occurred while resetting password.");
    }
  };

  return (
    <div className="main-container">
      <Typography variant="h4" sx={{ marginBottom: "40px" }}>
        Reset Your Password
      </Typography>
      {error && <Typography sx={{ color: "red", marginBottom: "20px" }}>{error}</Typography>}
      {message && <Typography sx={{ color: "green", marginBottom: "20px" }}>{message}</Typography>}

      {/* Form to reset the password */}
      {isTokenVerified && (
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
      )}
      <Typography variant="subtitle2" className="subtitle">
        Your anonymity is valued.
        <br />
        Information we collect will not be shared.
      </Typography>
    </div>
  );
};

export default ResetPasswordPage;
