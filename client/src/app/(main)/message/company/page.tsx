"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, Button } from "@mui/material";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
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
        icon={faMagnifyingGlass}
      />
      <Typography variant="h4">Company Threads</Typography>
      <Typography variant="h6">
        Chat with other applicants in the pipeline
      </Typography>
      <Button
        onClick={() => router.push("/explore")}
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          width: "300px",
          boxShadow: "none",
          backgroundColor: "#496FFF",
          ":hover": {
            backgroundColor: "#3B5AC6",
            boxShadow: "none",
          },
        }}
      >
        Search Company Threads
      </Button>
    </div>
  );
}
