"use client";

import { Typography } from "@mui/material";
import usePageHeader from "@/lib/hooks/usePageHeader"; // Import the custom hook

export default function Page() {
  // Set page title and meta description using the custom hook
  usePageHeader(
    "Thread - Discuss and Collaborate",
    "Join the discussion and collaborate with others in various threads. Share insights, ask questions, and connect with the community."
  );

  return <Typography variant="h2">Thread</Typography>;
}
