11/8:
    lib/actions/profile_setup.ts tasks:

    Tasks:
        Task 1: Check if username as been taken
        
        Task 2: Don't allow a user who has a profile to create another profile

    lib/supabase/middleware.ts tasks:

    original tasks:
        Task 1: Only allow authorized users to access the pages under the (main) directory
        
        Task 2: For authenticated users accessing the pages outside of (main), automatically redirect them to the /explore route

        Task 3: For authenticated users WITHOUT a profile accessing the ANY route. Automatically route them to profile_setup

        Task 4: For any users accessing the profile_setup with a profile, route them to a page not found

        Task 5: For unauthenticated users accessing the pages under (main) render the create account model. Explore page can be accessed by any user