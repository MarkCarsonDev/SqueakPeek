import React from "react";
import { TextField, Box, Typography } from "@mui/material";

interface InputFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
}

export function InputField({ label, placeholder, required }: InputFieldProps) {
  return (
    <Box sx={{ width: '100%', marginBottom: '16px' }}>
      {/* Label for the input */}
      <Typography 
        variant="subtitle1" 
        sx={{ fontWeight: 'bold', marginBottom: '8px' }}
      >
        {label}
      </Typography>
      
      {/* TextField with rounded corners */}
      <TextField
        fullWidth
        placeholder={placeholder}  // Placeholder as prop
        variant="outlined"
        required={required}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px', // Rounded corners
            '& fieldset': {
              borderColor: '#E0E3EB',  // Light border color
            },
            '&:hover fieldset': {
              borderColor: '#A6B0C3',  // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#A6B0C3',  // Border color when focused
            },
          },
        }}
      />
    </Box>
  );
}