"use client";
import { Button, Typography } from "@mui/material";
import "./forgot_password.css";
import { InputField } from "@/ui/InputField";
import { useFormState } from "react-dom";
import { sendPasswordResetEmail } from "@/lib/actions/reset_password";
import { useEffect } from "react";

export default function ForgotPasswordPage() {
  const initialState = { message: "", errors: {} as Record<string, string[]> };
  const [state, formAction] = useFormState(sendPasswordResetEmail, initialState);

  useEffect(() => {
    document.title = "Forgot Password - Reset Your Account";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Request a password reset email.");
    }
  }, []);

  return (
    <div className="main-container">
      <Typography variant="h4" sx={{ marginBottom: "20px", marginTop: "110px" }}>
        Forgot Your Password?
      </Typography>
      <form action={formAction} className="forgot-password-form">
        <InputField
          fullWidth
          placeholder="Enter your email"
          required
          label="Email"
          name="email"
          helperText={state.errors?.email?.[0]}
          style={{ marginBottom: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            backgroundColor: "#496FFF",
            ":hover": { backgroundColor: "#3B5AC6" },
          }}
        >
          Send Reset Email
        </Button>
        {state.message && <Typography sx={{ marginTop: "10px" }}>{state.message}</Typography>}
      </form>
    </div>
  );
}
