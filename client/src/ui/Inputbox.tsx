"use client"
import { TextField, Box} from "@mui/material";

export function Inputbox() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundColor: "#f6f8ff",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
    </Box>
  );
}