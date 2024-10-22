import {create} from 'zustand';

interface Application {
    id: string;
    roleTitle: string;
    companyName: string;
    location: string;
    jobtype: string;
    dateApplied: string;
    jobURL: string;
}

interface JobStage {
    id: string;
    name: string;
    color: string;
    applications: Application[]; // array of applications from interface Application
}

interface TrackingApplicationStore {
    stages: JobStage[]; // array of job stages from interface JobStage
    addApplication: (stageId: string, application: Application) => void;
    moveApplication: (fromStageId: string, toStageId: string, applicationId: string) => void;
}

const TrackingApplicationStore = create<TrackingApplicationStore>((set) => ({
    // 5 stages of the job application process
    stages: [
        {
            id: "1",
            name: "Applied",
            color: "#769FCD",
            applications: [],
        },
        {
            id: "2",
            name: "Online Assessment",
            color: "#EB5B00",
            applications: [],
        },
        {
            id: "3",
            name: "Interviewing",
            color: "#F0A202",
            applications: [],
        },
        {
            id: "4",
            name: "Offer",
            color: "#2E7E33",
            applications: [],
        },
        {
            id: "5",
            name: "Rejected",
            color: "#C7253E",
            applications: [],
        },
    ],

    // Add an application to a specific stage (in 1 out of 5 stages)
    addApplication: (stageId: string, application: Application) =>
        set((state) => {
            const stage = state.stages.find((s) => s.id === stageId);
            if (stage) {
                stage.applications.push(application); // Add the application to the stage's applications array
            }
            return { ...state };
        }),

    // Move an application from one stage to another
    // Move an application from one stage to another
    moveApplication: (fromStageId: string, toStageId: string, applicationId: string) =>
        set((state) => {
            const sourceStage = state.stages.find((stage) => stage.id === fromStageId);
            const destinationStage = state.stages.find((stage) => stage.id === toStageId);

            if (!sourceStage || !destinationStage) return state;

            const applicationIndex = sourceStage.applications.findIndex((app) => app.id === applicationId);
            if (applicationIndex === -1) return state;

            const [movedApplication] = sourceStage.applications.splice(applicationIndex, 1);
            destinationStage.applications.push(movedApplication); // Add the moved application to the destination stage

            return { ...state };
        }),

    
}));


export default TrackingApplicationStore;