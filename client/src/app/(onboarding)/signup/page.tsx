"use client";
import { Button, Typography, Link, Divider } from "@mui/material";
import "./signup.css";
import { InputField } from "@/ui/InputField";
import { SignUpState, createAccount } from "../../../lib/actions/signup";
import { useFormState } from "react-dom";
import { handleGoogleLoginClientSide } from "../../../lib/supabase/auth/handleGoogleLoginClientSide";
import { useEffect } from "react";

export default function Page() {
  const initialState: SignUpState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createAccount, initialState);
  
  useEffect(() => {
    // Dynamically setting title and description using next/head
    document.title = "Sign Up - Create an Account";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Create a new account to get started");
    }
  }, []);
  
  return (
    <div className="main-container">
      {/* Let's get started section */}
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", marginTop: "110px" }}
      >
        Let’s Get Started.
      </Typography>

      {/* Sign in with Google Button */}
      <Button
        className="borderline"
        startIcon={
          <img src="https://www.google.com/favicon.ico" alt="Google" />
        }
        sx={{
          border: "4px solid #E0E4F2",
          backgroundColor: "white",
          borderRadius: "8px",
          width: "760px",
        }}
        onClick={handleGoogleLoginClientSide}
      >
        Sign up with Google
      </Button>

      {/* Divider with "Or" */}
      <div className="divider">
        <Divider
          sx={{
            width: "100px",
            height: "1px",
            backgroundColor: "#ccc",
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
            backgroundColor: "#ccc",
            marginLeft: 2,
          }}
        />
      </div>

      {/* Signup form */}
      <form className="signup-box" action={formAction}>
        {/* Email field */}
        <InputField
          fullWidth
          placeholder="Enter your email"
          required
          label="Email"
          name="email"
          style={{
            marginBottom: "15px",
          }}
          helperText={state.errors?.email}
        />

        {/* Password field */}
        <InputField
          type="password" // Ensure this is password input
          placeholder="Enter your password"
          required
          label="Password"
          fullWidth
          name="password"
          style={{
            marginBottom: "15px",
          }}
          helperText={state.errors?.password}
        />

        {/* Confirm Password field */}
        <InputField
          fullWidth
          type="password" // Ensure this is password input
          // label="Confirm Password"
          placeholder="Confirm your password"
          required
          label="Confirm Password"
          name="confirmPassword"
          style={{
            marginBottom: "15px",
          }}
          helperText={state.errors?.confirmPassword}
        />

        {/* Submit button */}
        <div className="buttons-links">
          <div className="spacer"></div>
          <div className="submit-button">
            <Link href="/profile_setup">
              <Button
                className="borderline"
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  width: "200px",
                  boxShadow: "none",
                  backgroundColor: "#496FFF",
                  borderRadius: "8px",
                  ":hover": {
                    backgroundColor: "#3B5AC6",
                    boxShadow: "none",
                  },
                }}
              >
                Confirm
              </Button>
            </Link>
          </div>
          <div className="login-link">
            <Link
              href="/login"
              color="inherit"
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                textAlign: "right",
              }}
            >
              <Typography variant="body2">Logging in?</Typography>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
