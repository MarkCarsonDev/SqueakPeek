"use client";
import { useAlert } from "@/lib/store/alert";
import { Snackbar, Alert } from "@mui/material";

export function AlertToast() {
  const { alert, setOpen, isOpen } = useAlert();

  function handleClose() {
    setOpen(false);
  }
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Alert severity={alert?.type} variant="filled" sx={{ width: "100%" }}>
        {alert?.message}
      </Alert>
    </Snackbar>
  );
}
