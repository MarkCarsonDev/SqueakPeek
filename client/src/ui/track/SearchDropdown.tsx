import * as React from "react";
//"use client";
import Autocomplete from "@mui/material/Autocomplete";
import { TextFieldProps } from "@mui/material";
import { InputField } from "@/ui/InputField"; // Custom InputField component

/**
 * A custom version of the Autocomplete component with the label designed similarly to the InputField.
 * @param {TextFieldProps} props - Props for the Autocomplete component, including label, placeholder, required status, and other relevant values.
 */

interface SearchDropdownProps {
  options: string[]; // The options prop to accept a list of strings
  value: string; // Track the current selected value
  onValueChange: (newValue: string | null) => void; // Handler for value changes
  disabled?: boolean; // Optional disabled prop
}

export function SearchDropdown({ required, label, placeholder, style, options, value, onValueChange, disabled, ...restProps }: SearchDropdownProps & TextFieldProps) {
  return (
    <div style={style}>
      {/* Autocomplete with custom InputField component */}
      <Autocomplete
        disablePortal
        options={options} // Options will be added later
        value={value} // Bind the value to the current selection
        onChange={(event, newValue) => {onValueChange(newValue);}} // Handle the change event
        disabled={disabled} // Pass the disabled prop
        PaperComponent={(props) => (
          <div
            {...props}
            style={{
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          />
        )}
        renderInput={(params) => (
          <InputField
            {...params} 
            placeholder={placeholder} 
            label={label} 
            required={required}
            disabled={disabled}
            {...restProps} 
          />
        )}
      />
    </div>
  );
}