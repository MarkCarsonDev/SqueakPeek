import { create } from "zustand";
import { Database} from "@/lib/types/database.types"
import {InsertApplication} from "@/lib/utils/InsertApplication"
import { v4 as uuidv4 } from "uuid";

export type ApplicationStage =
  | "Applied"
  | "Rejected"
  | "Online Assessment"
  | "Interviewing"
  | "Offer";



export type Application = Database["public"]["Tables"]["application"]["Row"];

interface TrackState {
  Applied: Application[];
  Rejected: Application[];
  "Online Assessment": Application[];
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
  updateApplication: (applicationId: string, updates: Partial<Application>) => void;
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
  "Online Assessment": [],
  Interviewing: [],
  Offer: [],

  // addApplication: (to, application) =>
  //   set((state) => {
  //     const existingApplicationIndex = state[to].findIndex(
  //       (app) => app.application_id === application.application_id
  //     );

  //     if (existingApplicationIndex >= 0) {
  //       // Update existing application
  //       state[to][existingApplicationIndex] = application;
  //     } else {
  //       // Add new application
  //       state[to].push(application);
  //       // call the server to insert the application
  //     };

  //     return { ...state };
  //   }),

  addApplication: async (to, application) => {
    try {
      
      const insertedApplication = await InsertApplication(application);
      if (insertedApplication) {
        set((state) => {
          const existingApplicationIndex = state[to].findIndex(
            (app) => app.application_id === insertedApplication.application_id
          );

          if (existingApplicationIndex >= 0) {
            // Update existing application
            state[to][existingApplicationIndex] = insertedApplication;
          } else {
            // Add new application to the local state
            state[to].push(insertedApplication);
          }

          return { ...state };
        });
      } 
    } catch (error) {
      console.error("Error inserting application:", error);
    }

  },

  removeApplication: (from, applicationId) =>
    set((state) => {
      state[from] = state[from].filter(
        (app) => app.application_id !== applicationId
      );
      return { ...state };
    }),
  
  // TODO: Call the server to update the card position also?
  moveApplication: (from, to, applicationId, sourceIndex, destinationIndex) =>
    set((state) => {
      if (from === to) {
        // Reorder within the same stage
        state[to] = reorder(state[to], sourceIndex, destinationIndex);
      } else {
        // Move application to a different stage
        const movedApplication = state[from].find(
          (app) => app.application_id === applicationId
        );
        if (movedApplication) {
          // Remove from the old stage
          state[from] = state[from].filter(
            (app) => app.application_id !== applicationId
          );
          // Insert into the new stage at the destination index
          const updatedToList = Array.from(state[to]);
          updatedToList.splice(destinationIndex, 0, movedApplication);
          state[to] = updatedToList;
        }
      }
      return { ...state };
    }),



    updateApplication: (applicationId, updates) =>
      set((state) => {
        // Find the application across all stages
        for (const stage in state) {
          const applications = state[stage as ApplicationStage];
          const appIndex = applications.findIndex((app) => app.application_id === applicationId);
          if (appIndex !== -1) {
            // Update the application in place
            applications[appIndex] = { ...applications[appIndex], ...updates };
            // Todo: call the server to update the application
            break;
          }
        }
        return { ...state };
      }),
}));
