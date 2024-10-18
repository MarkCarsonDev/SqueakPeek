import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextFieldProps } from "@mui/material";
import { InputField } from "@/ui/InputField"; // Custom InputField component

/**
 * A custom version of the Autocomplete component with the label designed similarly to the InputField.
 * @param {TextFieldProps} props - Props for the Autocomplete component, including label, placeholder, required status, and other relevant values.
 */
export function Searchbox({ required, label, placeholder, style, ...restProps }: TextFieldProps) {
  return (
    <div style={style}>
      {/* Autocomplete with custom InputField component */}
      <Autocomplete
        disablePortal
        options={[]} // Options will be added later
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
            {...restProps} 
          />
        )}
      />
    </div>
  );
}