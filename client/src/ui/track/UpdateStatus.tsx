import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

/**
 * This component renders a customizable dropdown for selecting status values.
 * It shows a default placeholder ("Status") when no value is selected.
 *
 * @param {string[]} options - Array of options to be displayed in the dropdown menu.
 * @param {boolean} [fullWidth] - Optional prop to allow the Select component to take the full width of its container.
 * @param {string} name - The name of the field to be used in form submissions (useful for FormData extraction).
 */
export default function UpdateStatus({ options, fullWidth, name }: { options: string[], fullWidth?: boolean, name: string }) {
  return (
    <Select
      name={name} // Use the name prop for form submission
      displayEmpty
      defaultValue="" // Default value set to show placeholder
      fullWidth={fullWidth}
      renderValue={(selected) => {
        if (selected === "") {
          return <em>Status</em>; // Only show "Status" in the display area
        }
        return selected;
      }}
      sx={{
        height: '32px',
        backgroundColor: "#496FFF",  
        borderRadius: '15px',
        border: 'none',
        color: "white",
        padding: '4px 10px',
        fontSize: '14px', 
        "& .MuiSelect-icon": {
          color: "white", 
        },
        "&.MuiOutlinedInput-root": {
          "& fieldset": {
            border: 'none',
          },
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            Width: "auto", 
            boxShadow: 'none', 
            border: '1px solid grey',
            borderRadius: '15px',
            backgroundColor: "#496FFF", 
          },
        },
      }}
    >
      {options.map((option, index) => (
        <MenuItem 
          key={index} 
          value={option}
          sx={{ color: 'white' }}
        >
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}