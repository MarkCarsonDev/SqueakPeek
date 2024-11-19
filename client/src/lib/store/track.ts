import { create } from "zustand";
import { Database } from "@/lib/types/database.types";
import { InsertApplication } from "@/lib/utils/Application/InsertApplication";
import { UpdateApplication } from "@/lib/utils/Application/UpdateApplication";
import { FetchApplication } from "@/lib/utils/Application/FetchApplication";
import { RemoveApplication} from "@/lib/utils/Application/RemoveApplication";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Profile } from "@/lib/store/profile";
import { PostgrestError } from "@supabase/supabase-js";
export type ApplicationStage =
  | "Applied"
  | "Rejected"
  | "Online Assessment"
  | "Interviewing"
  | "Offer";

export type Application = Database["public"]["Tables"]["application"]["Row"] & { thread_id: string | null };
interface TrackState {
  Applied: Application[];
  Rejected: Application[];
  "Online Assessment": Application[];
  Interviewing: Application[];
  Offer: Application[];
  searchQuery: string; 
  setSearchQuery: (query: string) => void; 
  addApplication: (
    to: ApplicationStage,
    application: Application,
    profile: Profile
  ) => Promise<{ success: boolean; message: string }>;
  removeApplication: (from: ApplicationStage, application: Application, profile: Profile) => Promise<{ success: boolean; message: string }>;
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
  ) => Promise<{ success: boolean; message: string }>;

   fetchApplications: (profile: Profile) => Promise<{ data: Application[] | null; error: PostgrestError | null }>;
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

  // Search Filter
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  addApplication: async (to, application, profile): Promise<{success: boolean; message: string}> => {   
    // Call the InsertApplication function
    const {data, error} = await InsertApplication(profile, application);
    if (error) {
      return { success: false, message: error.message };
    }

    if (data) {
      application.application_id = data.application_id;
      application.thread_id = data.thread_id;
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
    return { success: true, message: "Application added successfully!" };
  },

  removeApplication: async (from, application, profile): Promise<{success: boolean; message: string}> => {
    // Call the supabase function to remove the application
    const error = await RemoveApplication(profile, application.application_id);
    if (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
    
    set((state) => {
      state[from] = state[from].filter(
        (app) => app.application_id !== application.application_id
      );
      return { ...state };
    });
    
    return { success: true, message: "Application removed successfully" };
  },


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

    updateApplication: async (applicationId, updates, profile): Promise<{success: boolean; message: string}> => {
      // Ensure profile is defined and has profile_id
    if (!profile || !profile.profile_id) {
      console.error("Profile is not defined or missing profile_id");
      return {
        success: false,
        message: "Profile is not defined or missing profile_id",
      };
    }
     // Exclude thread_id from updates
     const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key]) => key !== "thread_id")
    );
  
      // Call the UpdateApplication function
    const { data, error } = await UpdateApplication(profile, applicationId, filteredUpdates);
    if (error) {
      console.error("Error updating application:", error.message);
      return { success: false, message: "Failed to update application." };
    }

    if (data) {
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
    };
    return { success: true, message: "Application updated successfully!" };
    },

  fetchApplications: async (profile) => {
    if (!profile) {
      console.error("Profile is required to fetch applications");
      return { data: null, error: null };
    }
    const { data, error } = await FetchApplication(profile);
    if (error) {
      console.error("Error fetching applications:", error.message);
      return { data: null, error };
    }

    if (!data) {
      console.error("No applications found");
      return { data: null, error: null };
    }
    // console.log(data.thread_id);
    const groupedApplications = data.reduce<Record<ApplicationStage, Application[]>>((acc, application) => {
      acc[application.status].push(application);
      return acc;
    }, {
      Applied: [],
      Rejected: [],
      "Online Assessment": [],
      Interviewing: [],
      Offer: [],
    });

    set(groupedApplications);
    console.log(groupedApplications);
    return { data, error: null };
  },

}));
