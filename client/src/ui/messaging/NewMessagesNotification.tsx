import { Chip } from "@mui/material";
export function NewMessagesNotification({
  numNewMessages,
  onClick,
}: {
  numNewMessages: number;
  onClick: () => void;
}) {
  if (numNewMessages > 0) {
    return (
      <Chip
        label={`${numNewMessages} new messages`}
        variant="outlined"
        sx={{
          position: "absolute",
          margin: "0 auto",
          top: "20%",
          borderColor: "#E0E4F2",
          borderWidth: "2px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",

          // centers chip horizontally relative to the
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={onClick}
      />
    );
  }
}
