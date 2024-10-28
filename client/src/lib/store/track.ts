import { create } from "zustand";

export type ApplicationStage =
  | "Applied"
  | "Rejected"
  | "Online Assesstment"
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
  currentScore?: string;
  outOfScore?: string;
  interviewingRound?: string;
  testProvider?: string;
}

interface TrackState {
  Applied: Application[];
  Rejected: Application[];
  "Online Assesstment": Application[];
  Interviewing: Application[];
  Offer: Application[];
  addApplication: (to: ApplicationStage, application: Application) => void;
  removeApplication: (from: ApplicationStage, applicationId: string) => void;
  moveApplication: (
    from: ApplicationStage,
    to: ApplicationStage,
    applicationId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  updateInterviewingRound: (applicationId: string, round: string) => void;
}

// Helper function to reorder items in a list
const reorder = (list: Application[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const useTrack = create<TrackState>()((set) => ({
  Applied: [],
  Rejected: [],
  "Online Assesstment": [],
  Interviewing: [],
  Offer: [],
  
  addApplication: (to, application) =>
    set((state) => {
      const existingApplicationIndex = state[to].findIndex(
        (app) => app.id === application.id
      );

      if (existingApplicationIndex >= 0) {
        // Update existing application
        state[to][existingApplicationIndex] = application;
      } else {
        // Add new application
        state[to].push(application);
      }

      return { ...state };
    }),
    
  removeApplication: (from, applicationId) =>
    set((state) => {
      state[from] = state[from].filter(
        (application) => application.id !== applicationId
      );
      return { ...state };
    }),

  moveApplication: (from, to, applicationId, sourceIndex, destinationIndex) =>
    set((state) => {
      if (from === to) {
        // Reorder within the same stage
        state[to] = reorder(state[to], sourceIndex, destinationIndex);
      } else {
        // Move application to a different stage
        const movedApplication = state[from].find(
          (application) => application.id === applicationId
        );
        if (movedApplication) {
          // Remove from the old stage
          state[from] = state[from].filter(
            (application) => application.id !== applicationId
          );
          // Insert into the new stage at the destination index
          const updatedToList = Array.from(state[to]);
          updatedToList.splice(destinationIndex, 0, movedApplication);
          state[to] = updatedToList;
        }
      }
      return { ...state };
    }),

    updateInterviewingRound: (applicationId, round) =>
      set((state) => {
        // Search in the Interviewing stage only
        const application = state.Interviewing.find(
          (app) => app.id === applicationId
        );
        if (application) {
          application.interviewingRound = round;
        }
        return { ...state };
      }),
}));