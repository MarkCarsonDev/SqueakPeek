import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface SelectLabelsProps {
  options: string[]; // Array of options as strings
  fullWidth?: boolean; // Optional boolean for full width
}

export default function SelectLabels({ options, fullWidth }: SelectLabelsProps) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl  
      sx={{
        height: '32px', // Reduce the height
        backgroundColor: "#496FFF",  
        borderRadius: '15px',
        border: 'none', // Remove the outer border
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none", // Remove the outer outline when focused
        },
      }} 
      fullWidth={fullWidth}
    >
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        sx={{
          color: "white", // Change text color to white
          padding: '4px 10px', // Adjust padding for thinner appearance
          height: '32px', // Control height for a thinner button
          fontSize: '14px', // Optionally reduce font size for a sleeker look
          "& .MuiSelect-icon": {
            color: "white", // Change the arrow color to white
          },
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              border: 'none', // Remove border around the select field
            },
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              Width: "auto", 
              boxShadow: 'none', // Remove the shadow from the dropdown
              border: '1px solid grey', // Retain a light border
              borderRadius: '15px',
              backgroundColor: "#496FFF", // Background for dropdown menu
            },
          },
        }}
      >
        <MenuItem value="">
          <em>status</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem 
            key={index} 
            value={option}
            sx={{ color: 'white' }} // Change text color inside dropdown to white
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}