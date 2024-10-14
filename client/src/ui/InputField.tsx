import { TextFieldProps, TextField, Typography } from "@mui/material";

/**
 * A custom version of the TextField component with the label design differently
 * @param props TextFieldProps
 */
export function InputField(props: TextFieldProps) {
  const { required, label } = props;

  // removing the style props so it impacts the rest of the component rather than just the TextField component
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

      <TextField {...restProps} label="" />
    </div>
  );
}