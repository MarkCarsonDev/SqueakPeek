import { Typography } from "@mui/material";
import { memo } from "react";
interface DateDividerProps {
  messageDate: Date;
}

/**
 * Divides the messages by date
 * @param {Date} messageDate - The date the DateDivider renders
 */
export const DateDivider = memo(function DateDivider({
  messageDate,
}: DateDividerProps) {
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
});
