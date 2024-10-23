// types.ts

// Define the structure of an Application
export interface Application {
    id: string;
    roleTitle: string;
    companyName: string;
    location: string; // Added location field
    jobtype: string;
    dateApplied: string;
    jobURL: string;
    status: string;
  }
  
  // Define the structure of a Stage, which holds a list of Applications
  export interface Stage {
    id: string;
    name: string;
    color: string;
    applications: Application[];
  }