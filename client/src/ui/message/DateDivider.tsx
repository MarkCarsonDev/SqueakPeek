import { Divider, Typography } from "@mui/material";
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
    <Divider
      sx={{
        marginTop: "20px",
        padding: "0px 20px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
        }}
      >
        {new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }).format(messageDate)}
      </Typography>
    </Divider>
  );
});
