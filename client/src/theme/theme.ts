import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";

export const inter = Inter({ weight: ["700", "800"], subsets: ["latin"] });
export const roboto = Roboto({ weight: ["700"], subsets: ["latin"] });

export const customTheme = createTheme({
  typography: {
    fontFamily: inter.className,
  },
});
