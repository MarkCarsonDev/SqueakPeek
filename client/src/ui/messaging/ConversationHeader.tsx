import { CardHeader, CardHeaderProps } from "@mui/material";

/**
 * Header section of the Conversation component
 * @param props - Props of the CardHeader MUI component
 */
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
