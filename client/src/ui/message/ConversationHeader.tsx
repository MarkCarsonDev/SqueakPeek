import { CardHeader, CardHeaderProps } from "@mui/material";

/**
 * Header section of the Conversation component
 * @param props - Props of the CardHeader MUI component
 */
export function ConversationHeader(props: CardHeaderProps) {
  return (
    <CardHeader
      {...props}
      sx={{
        boxShadow: "rgba(224,228,242,.7) 0px 2px 2px 0px",
        zIndex: 1,
      }}
    />
  );
}
