import { Typography } from "@mui/material";
import { memo } from "react";
interface DateDividerProps {
  messageDate: Date;
  doRenderDateDivider: boolean;
}
export const DateDivider = memo(function DateDivider({
  messageDate,
  doRenderDateDivider,
}: DateDividerProps) {
  // TODO: Decouple boolean logic and setting prevDate state
  // TODO: This needs to get tested

  if (doRenderDateDivider) {
    return (
      <Typography
        sx={{
          paddingTop: "20px",
          fontWeight: "bold",
        }}
      >
        {new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }).format(messageDate)}
      </Typography>
    );
  }
  return null;
});
