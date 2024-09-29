"use client";
import { createTheme } from "@mui/material";

declare module "@mui/material/Container" {
  interface ContainerPropsVariantOverrides {
    dashed: true;
  }
}

export const customTheme = createTheme({
  typography: {
    fontFamily: "var(--font-inter)",
    allVariants: {
      color: "#3C435C",
    },
  },
});
