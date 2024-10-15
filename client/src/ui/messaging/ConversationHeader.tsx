import { CardHeader, CardHeaderProps } from "@mui/material";

export function ConversationHeader(props: CardHeaderProps) {
  return (
    <CardHeader
      sx={{
        borderBottom: "2px #3C435C solid",
      }}
      {...props}
    />
  );
}
