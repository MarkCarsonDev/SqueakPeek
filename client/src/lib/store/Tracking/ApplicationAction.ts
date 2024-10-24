// src/lib/store/Tracking/ApplicationAction.ts

// Define the Application interface directly in this file
export interface Application {
    id: string;
    roleTitle: string;
    companyName: string;
    location: string;
    jobtype: string;
    dateApplied: string;
    jobURL: string;
  }
  
  // // Function to add an application to the store
  // export const addApplicationToStore = (
  //   stageStore: { addApplication: (app: Application) => void },
  //   application: Application
  // ) => {
  //   stageStore.addApplication(application);
  // };
  
  // // Function to move an application between stores (stages)
  // export const moveApplicationBetweenStores = (
  //   sourceStore: { removeApplication: (appId: string) => void },
  //   destinationStore: { addApplication: (app: Application) => void },
  //   applicationId: string,
  //   application: Application
  // ) => {
  //   sourceStore.removeApplication(applicationId);
  //   destinationStore.addApplication(application);
  // };