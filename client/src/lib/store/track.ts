import { create } from "zustand";

type ApplicationStage =
  | "applied"
  | "rejected"
  | "onlineAssessment"
  | "interviewing"
  | "offer";

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
  applied: Application[];
  rejected: Application[];
  onlineAssessment: Application[];
  interviewing: Application[];
  offer: Application[];
  addApplication: (to: ApplicationStage, application: Application) => void;
  removeApplication: (from: ApplicationStage, applicationId: string) => void;
  moveApplication: (
    from: ApplicationStage,
    to: ApplicationStage,
    applicationId: string
  ) => void;
}

export const useTrack = create<TrackState>()((set) => ({
  applied: [],
  rejected: [],
  onlineAssessment: [],
  interviewing: [],
  offer: [],
  addApplication: (to, application) =>
    set((state) => {
      state[to].push(application);
      return { ...state };
    }),
  removeApplication: () => {},
  moveApplication: () => {},
}));
