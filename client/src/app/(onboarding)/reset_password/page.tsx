"use client";
import { Button, Typography } from "@mui/material";
import "./reset_password.css";
import { InputField } from "@/ui/InputField";
import { useFormState } from "react-dom";
import { resetPassword } from "@/lib/actions/reset_password";
import { useEffect } from "react";

export default function ResetPasswordPage() {
  const initialState = { message: "", errors: {} as Record<string, string[]> };
  const [state, formAction] = useFormState(resetPassword, initialState);

  useEffect(() => {
    document.title = "Reset Password - Set a New Password";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Reset your account password.");
    }
  }, []);

  return (
    <div className="main-container">
      <Typography variant="h4" sx={{ marginBottom: "20px", marginTop: "110px" }}>
        Reset Your Password
      </Typography>
      <form action={formAction} className="reset-password-form">
        <InputField
          type="password"
          placeholder="New Password"
          required
          label="New Password"
          name="newPassword"
          helperText={state.errors?.newPassword?.[0]}
          style={{ marginBottom: "20px" }}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          required
          label="Confirm Password"
          name="confirmPassword"
          helperText={state.errors?.confirmPassword?.[0]}
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
          Reset Password
        </Button>
        {state.message && <Typography sx={{ marginTop: "10px" }}>{state.message}</Typography>}
      </form>
    </div>
  );
}
