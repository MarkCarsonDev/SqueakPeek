import { create } from 'zustand';
import { Application } from './Types';


// Define StageStore interface
interface StageStore {
  applications: Application[];
  addApplication: (application: Application) => void;
  removeApplication: (applicationId: string) => void;
}

// Create Zustand store for Rejected stage
export const InterviewingStore = create<StageStore>((set) => ({
  applications: [],

  // Add application to the stage
  addApplication: (application: Application) =>
    set((state) => ({
      applications: [...state.applications, application],
    })),

  // Remove application from the stage by ID
  removeApplication: (applicationId: string) =>
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== applicationId),
    })),
}));