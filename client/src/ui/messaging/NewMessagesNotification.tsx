import { Chip, Snackbar } from "@mui/material";

/**
 * A floating component that renders whenever a user receives a new message
 * @param {number} numNewMessages: The number of new messages
 * @param {() => void} scrollDown: Vertically scrolls down the page when invoked
 * @param {() => void} resetNumNewMessages: Resets the number of new messages when invoked
 */
export function NewMessagesNotification({
  numNewMessages,
  scrollDown,
  resetNumNewMessages,
}: {
  numNewMessages: number;
  scrollDown: () => void;
  resetNumNewMessages: () => void;
}) {
  return (
    <Snackbar
      open={numNewMessages > 0}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClick={() => {
        scrollDown();
        resetNumNewMessages();
      }}
      autoHideDuration={5000}
      onClose={() => resetNumNewMessages()}
      sx={{
        "&.MuiSnackbar-root": { top: "200px" }, // positions Snackbar within ConversationBody
      }}
    >
      <Chip
        label={`${numNewMessages > 10 ? "10+" : numNewMessages} new ${
          numNewMessages > 1 ? "messages" : "message"
        }`}
        variant="filled"
        sx={{
          borderColor: "none",
          borderWidth: "2px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          backgroundColor: "#496FFF",
          color: "white",
          cursor: "pointer",
        }}
      />
    </Snackbar>
  );
}
