const initialData = {
    jobs: {
      'job-1': { 
        id: 'job-1', 
        status: "Applied", 
        roleTitle: "Software Engineer", 
        companyName: "Google", 
        location: "Los Angeles, CA", 
        dateApplied: "2024-10-10", 
        url: "https://google.com" 
      },
      'job-2': { 
        id: 'job-2', 
        status: "Applied", 
        roleTitle: "Data Analyst", 
        companyName: "Google", 
        location: "Mountain View, CA", 
        dateApplied: "2024-10-12", 
        url: "https://google.com" 
      },
      'job-3': { 
        id: 'job-3', 
        status: "Applied", 
        roleTitle: "Frontend Developer", 
        companyName: "Facebook", 
        location: "Menlo Park, CA", 
        dateApplied: "2024-10-15", 
        url: "https://facebook.com" 
      },
      'job-4': { 
        id: 'job-4', 
        status: "Applied", 
        roleTitle: "Backend Engineer", 
        companyName: "Amazon", 
        location: "Seattle, WA", 
        dateApplied: "2024-10-18", 
        url: "https://amazon.com" 
      },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Applied Jobs',
        jobIds: ['job-1', 'job-2', 'job-3', 'job-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'Interviewing',
        jobIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Offer',
        jobIds: [],
      },
      'column-4': {
        id: 'column-4',
        title: 'Rejected',
        jobIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
  };
  
  export default initialData;