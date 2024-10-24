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
      console.log("hellow");
      state[to].push(application);
      return { ...state };
    }),
  removeApplication: () => {},
  moveApplication: (from, to, applicationId) =>
    set((state) => {
      const movedApplication = state[from].find(
        (application) => application.id === applicationId
      );

      // removes application
      state[from] = state[from].filter(
        (application) => application.id !== applicationId
      );

      // moves application to new stage
      state[to] = [movedApplication!, ...state[to]];
      return { ...state };
    }),
}));
