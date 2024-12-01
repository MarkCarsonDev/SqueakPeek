"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
/**
 * Private Message section in the messages page
 */
export default function Page() {

  useEffect(() => {
    // Dynamically setting title and description
    document.title = "Private Messages - Chat Privately with Applicants";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Send and receive private messages with other applicants to discuss opportunities, share insights, or network."
      );
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <FontAwesomeIcon
        style={{
          border: "3px solid #E0E4F2",
          padding: "25px",
          borderRadius: "100px",
          marginBottom: "20px",
        }}
        size="3x"
        icon={faPaperPlane}
      />
      <Typography variant="h4">Private Messages</Typography>
      <Typography variant="h6">Chat privately with applicants</Typography>
    </div>
  );
}
