"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client"; // Client-side supabase initialization

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Get the 'code' parameter from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  const supabase = createSupabaseClient(); // Use the Supabase client for client-side

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Use the resetPasswordForEmail method instead of updateUser
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

  // Optionally, you can verify the token if needed
  useEffect(() => {
    if (code) {
      const verifyToken = async () => {
        try {
          // Use resetPasswordForEmail with the token code
          const { error } = await supabase.auth.resetPasswordForEmail(code);
          if (error) {
            setError("Invalid or expired reset link.");
          } else {
            setMessage("Token verified, you can now reset your password.");
          }
        } catch (err) {
          setError("Failed to verify token.");
        }
      };

      verifyToken();
    }
  }, [code]);

  return (
    <div>
      <h2>Reset Your Password</h2>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
