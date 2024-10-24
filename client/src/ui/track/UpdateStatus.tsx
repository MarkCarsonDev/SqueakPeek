"use client";
import * as React from "react";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Application, ApplicationStage } from "@/lib/store/track";

/**
 * This component renders a customizable dropdown for selecting status values.
 * It shows a default placeholder ("Status") when no value is selected.
 *
 * @param {string[]} options - Array of options to be displayed in the dropdown menu.
 * @param {boolean} [fullWidth] - Optional prop to allow the Select component to take the full width of its container.
 * @param {string} name - The name of the field to be used in form submissions (useful for FormData extraction).
 * @param {boolean} [required] - Optional prop to make the Select field required.
 * @param {string} [defaultStatus] - Optional prop to set the initial status value.
 */
export default function UpdateStatus({
  options,
  fullWidth,
  name,
  required,
  applicationStatus,
  setApplicationStage,
}: {
  options: ApplicationStage[];
  fullWidth?: boolean;
  name: string;
  required?: boolean;
  applicationStatus: ApplicationStage;
  setApplicationStage: React.Dispatch<React.SetStateAction<ApplicationStage>>;
}) {
  // const [selectedStatus, setSelectedStatus] =
  //   React.useState<ApplicationStage>("Applied");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setApplicationStage(event.target.value as ApplicationStage); // Update the selected status
  };

  return (
    <Select
      name={name} // Use the name prop for form submission
      value={applicationStatus} // Set the selected status or the default status
      onChange={handleChange} // Update the selected value on change
      displayEmpty
      fullWidth={fullWidth}
      required={required}
      // renderValue={(selected) => {
      //   if (selected === "") {
      //     return <Typography sx={{ color: "white" }}>Status</Typography>; // Only show "Status" in the display area
      //   }
      //   return selected;
      // }}
      sx={{
        height: "32px",
        backgroundColor: "#496FFF",
        borderRadius: "15px",
        border: "none",
        color: "white",
        padding: "4px 10px",
        fontSize: "14px",
        "& .MuiSelect-icon": {
          color: "white",
        },
        "&.MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            Width: "auto",
            boxShadow: "none",
            border: "1px solid grey",
            borderRadius: "15px",
            backgroundColor: "#496FFF",
          },
        },
      }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option} sx={{ color: "white" }}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
