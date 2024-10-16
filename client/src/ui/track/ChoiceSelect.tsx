import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

interface SelectLabelsProps {
  // labels: string; // Label for the select dropdown
  options: string[]; // Array of options as strings
  fullWidth?: boolean; // Optional boolean for full width
}

export default function SelectLabels({ options, fullWidth }: SelectLabelsProps) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={fullWidth}>
        {/* <InputLabel>{labels}</InputLabel> */}
        <Select
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          // label={labels} // Add label prop for the Select
        >
          <MenuItem value="">
            <em>Choice</em>
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}