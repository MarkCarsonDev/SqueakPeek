import { create } from "zustand";
import { Tables } from "../types/database.types";

type Profile = Tables<"profile">; // type of profile based of the database

// state of the hook
interface ProfileState {
  profile: Profile | null;
  initializeProfile: (profile: Profile) => void; // initializes profile once user signs in or creates an account
}

// hook that will be access in UI components
export const useProfile = create<ProfileState>()((set) => ({
  profile: null,
  initializeProfile: (profile) => set(() => ({ profile })),
}));
