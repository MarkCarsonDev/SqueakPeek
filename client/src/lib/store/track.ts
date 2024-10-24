import { create } from "zustand";

export type ApplicationStage =
  | "Applied"
  | "Rejected"
  | "OA"
  | "Interviewing"
  | "Offer";

export interface Application {
  id: string;
  roleTitle: string;
  companyName: string;
  location: string;
  jobtype: string;
  dateApplied: string;
  applicationURL: string;
  applicationStatus: ApplicationStage;
}

interface TrackState {
  Applied: Application[];
  Rejected: Application[];
  OA: Application[];
  Interviewing: Application[];
  Offer: Application[];
  addApplication: (to: ApplicationStage, application: Application) => void;
  removeApplication: (from: ApplicationStage, applicationId: string) => void;
  moveApplication: (
    from: ApplicationStage,
    to: ApplicationStage,
    applicationId: string
  ) => void;
}

export const useTrack = create<TrackState>()((set) => ({
  Applied: [],
  Rejected: [],
  OA: [],
  Interviewing: [],
  Offer: [],
  addApplication: (to, application) =>
    set((state) => {
      state[to].push(application);
      return { ...state };
    }),
  removeApplication: () => {},
  moveApplication: () => {},
}));
