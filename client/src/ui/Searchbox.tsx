import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextFieldProps, TextField, Typography } from "@mui/material";

/**
 * A custom version of the Autocomplete component with the label designed similarly to the InputField
 * @param props TextFieldProps
 */
export function ComboBox(props: TextFieldProps) {
  const { required, label, placeholder } = props; // Extracting placeholder
  const { style, ...restProps } = props;

  return (
    <div style={style}>
      <div
        style={{
          display: "flex",
        }}
      >
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: "bold",
            display: "flex",
          }}
        >
          {label}
        </Typography>
        {required && (
          <Typography
            sx={{
              paddingLeft: "5px",
              color: "red",
            }}
          >
            *
          </Typography>
        )}
      </div>

      {/* Autocomplete with TextField input */}
      <Autocomplete
        disablePortal
        options={[]} // Will fix this later
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params} // Spreading the Autocomplete params
            placeholder={placeholder} // Added placeholder
            {...restProps} // Spreading other props (e.g., value, onChange)
            label="" // Keeping label empty to maintain consistency with InputField
          />
        )}
      />
    </div>
  );
}