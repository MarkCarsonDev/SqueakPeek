import { create } from 'zustand';
import { Application } from './Types';

interface StageStore {
  applications: Application[];
  addApplication: (application: Application) => void;
  removeApplication: (applicationId: string) => void;
}

export const useAppliedStore = create<StageStore>((set) => ({
  applications: [],
  addApplication: (application) => set((state) => ({ applications: [...state.applications, application] })),
  removeApplication: (applicationId) =>
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== applicationId),
    })),
}));