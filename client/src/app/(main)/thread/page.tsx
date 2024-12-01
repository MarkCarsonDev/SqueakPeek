"use client";

import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Dynamically setting title and description
    document.title = "Thread - Discuss and Collaborate";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Join the discussion and collaborate with others in various threads. Share insights, ask questions, and connect with the community."
      );
    }
  }, []);

  return <Typography variant="h2">Thread</Typography>;
}
