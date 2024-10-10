import { TextFieldProps, TextField, Typography } from "@mui/material";

/**
 * A custom version of the TextField component with the label design differently
 * @param props TextFieldProps
 */
export function InputField(props: TextFieldProps) {
  const { required, label, fullWidth } = props;
  return (
    <div style={{ width: fullWidth ? "100%" : "auto" }}>
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

      <TextField {...props} label="" fullWidth={fullWidth} />
    </div>
  );
}