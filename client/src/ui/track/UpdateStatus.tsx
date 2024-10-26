"use client";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SxProps } from "@mui/system";
import { ApplicationStage } from "@/lib/store/track";

interface UpdateStatusProps {
  options: ApplicationStage[];
  fullWidth?: boolean;
  name: string;
  required?: boolean;
  applicationStatus: ApplicationStage;
  setApplicationStage: React.Dispatch<React.SetStateAction<ApplicationStage>>;
  customSx?: SxProps; // Custom styles prop
}

export default function UpdateStatus({
  options,
  fullWidth,
  name,
  required,
  applicationStatus,
  setApplicationStage,
  customSx = {}, // Default to an empty object for custom styles
}: UpdateStatusProps) {
  // Handle change event for dropdown
  const handleChange = (event: SelectChangeEvent<string>) => {
    setApplicationStage(event.target.value as ApplicationStage);
  };

  const getDisplayValue = (status: ApplicationStage) => {
    // Display 'OA' for 'Online Assestment', else show the status as is
    return status === "Online Assesstment" ? "OA" : status;
  }

  return (
    <Select
      name={name}
      value={applicationStatus}
      onChange={handleChange}
      displayEmpty
      fullWidth={fullWidth}
      required={required}
      sx={{
        height: "32px",
        backgroundColor: "#496FFF",
        borderRadius: "15px",
        paddingX: "1px -20px",
        minWidth: "fit-content",
        color: "white",
        fontSize: "14px",

        "& .MuiSelect-icon": {
          color: "white",
        },
        "&.MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
        },
        ...customSx, // Apply any custom styles passed via props
      }}
      renderValue={(selected) => getDisplayValue(selected as ApplicationStage)}
      MenuProps={{
        PaperProps: {
          sx: {
            width: "auto",
            boxShadow: "none",
            border: "1px solid grey",
            borderRadius: "15px",
            backgroundColor: "#496FFF",
          },
        },
      }}
    >
      {options.map((option, index) => (
        <MenuItem
          key={index}
          value={option}
          sx={{
            color: "white",
            fontSize: "14px",
          }}
        >
          {option}{/* Use the display value function here */}
        </MenuItem>
      ))}
    </Select>
  );
}
