import { create } from "zustand";
import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";
import { InsertApplication } from "@/lib/utils/Application/InsertApplication";
import { UpdateApplication } from "@/lib/utils/Application/UpdateApplication";
import { FetchApplication } from "@/lib/utils/Application/FetchApplication";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Profile } from "@/lib/store/profile";
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
  addApplication: (
    to: ApplicationStage,
    application: Application,
    profile: Profile
  ) => void;
  removeApplication: (from: ApplicationStage, applicationId: string) => void;
  moveApplication: (
    from: ApplicationStage,
    to: ApplicationStage,
    applicationId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  updateApplication: (
    applicationId: string,
    updates: Application,
    profile: Profile
  ) => void;

  fetchApplications: (profile: Profile) => void;
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

  addApplication: async (to, application, profile) => {
    const supabase = createSupabaseClient();

    // Call the InsertApplication function
    const result = await InsertApplication(supabase, profile, application);
    if (result && typeof result !== "string") {
      console.error("Error inserting application:", (result as PostgrestError).message);
      return result as PostgrestError;
    }

    if (result && typeof result === "string") {
      application.application_id = result;
    }
    
    set((state) => {
      const existingApplicationIndex = state[to].findIndex(
        (app) => app.application_id === application.application_id
      );

      if (existingApplicationIndex >= 0) {
        // Update existing application
        state[to][existingApplicationIndex] = application;
      } else {
        // Add new application
        state[to].push(application);
      }

      return { ...state };
    });
  },

  removeApplication: (from, applicationId) =>
    set((state) => {
      state[from] = state[from].filter(
        (app) => app.application_id !== applicationId
      );
      return { ...state };
    }),

  // TODO: Call the server to update the card position also?
  moveApplication: async (from, to, applicationId, sourceIndex, destinationIndex) => {
      const supabase = createSupabaseClient();
  
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
            state[to].splice(destinationIndex, 0, movedApplication);
          }
        }
  
        // Update the order field for all applications in the destination stage
        state[to].forEach((app, index) => {
          app.order = index;
        });
  
        return { ...state };
      });
  
      // Update the order field in the database
      set((state) => {
        const updates = state[to].map((app, index) => ({
          application_id: app.application_id,
          order: index,
        }));
  
        updates.forEach(async (update) => {
          await supabase
            .from("application")
            .update({ order: update.order })
            .eq("application_id", update.application_id);
        });
  
        return { ...state };
      });
    },

    updateApplication: async (applicationId, updates, profile) => {
      const supabase = createSupabaseClient();

      // Ensure profile is defined and has profile_id
    if (!profile || !profile.profile_id) {
      console.error("Profile is not defined or missing profile_id");
      return {
        message: "Profile is not defined or missing profile_id",
        details: "",
        hint: "",
        code: "profile_not_found",
      } as PostgrestError;
    }
  
      // Call the UpdateApplication function
      const error = await UpdateApplication(supabase, profile, applicationId, updates);
      if (error) {
        console.error("Error updating application:", error.message);
        return error;
      }
  
      set((state) => {
        // Find the application across all stages
        for (const stage in state) {
          const applications = state[stage as ApplicationStage];
          const appIndex = applications.findIndex(
            (app) => app.application_id === applicationId
          );
          if (appIndex !== -1) {
            // Update the application in place
            applications[appIndex] = { ...applications[appIndex], ...updates };
            break;
          }
        }
        return { ...state };
      });
    },

    fetchApplications: async (profile) => {
      const supabase = createSupabaseClient();
      const applications = await FetchApplication(supabase, profile);

      if (!applications) {
        console.error("Error fetching applications or no existing applications");
        return;
      }
      const groupedApplications = applications.reduce((acc, application) => {
        acc[application.status].push(application);
        return acc;
      }, {
        Applied: [],
        Rejected: [],
        "Online Assessment": [],
        Interviewing: [],
        Offer: [],
      } as Record<ApplicationStage, Application[]>);
  
      set(groupedApplications);

    },
}));
