"use client";
import { createTheme } from "@mui/material";
export const customTheme = createTheme({
  typography: {
    fontFamily: "var(--font-inter)",
    allVariants: {
      color: "#3C435C",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", // Rounded corners globally
            "& fieldset": {
              borderColor: "#E0E3EB", // Light border color globally
            },
            "&:hover fieldset": {
              borderColor: "#A6B0C3", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#A6B0C3", // Border color when focused
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: "red",
          '&$error': {
            color: 'red',
          },
        }
      }
    },
  },
});
