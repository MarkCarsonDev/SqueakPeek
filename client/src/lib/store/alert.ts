import { create } from "zustand";
import { AlertColor } from "@mui/material";
interface Alert {
  message: string;
  type: AlertColor;
}

// state of the hook
interface AlertState {
  alert: Alert | null;
  isOpen: boolean;
  setAlert: (newAlertState: Alert) => void;
  setOpen: (newState: boolean) => void;
}

// hook that will be access in UI components
export const useAlert = create<AlertState>()((set) => ({
  alert: null,
  isOpen: false,
  setAlert: (newAlertState) =>
    set(() => ({ isOpen: true, alert: newAlertState })),
  setOpen: (newState) => {
    set(() => ({ isOpen: newState }));
  },
}));
