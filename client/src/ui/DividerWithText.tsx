import React from "react";
import { Divider, Typography, Box } from "@mui/material";

export function DividerWithText({ text = "Or" }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      className="login-divider"
      sx={{ width: '100%' }}
    >
      <Divider
        sx={{
          width: "100px",
          height: "1px",
          backgroundColor: "#E0E4F2",
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
        {text}
      </Typography>
      <Divider
        sx={{
          width: "100px",
          height: "1px",
          backgroundColor: "#E0E4F2",
          marginLeft: 2,
        }}
      />
    </Box>
  );
}


