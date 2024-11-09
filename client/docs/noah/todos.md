11/8:
    lib/actions/profile_setup.ts tasks:

    original tasks:
        Task 1: Check if username as been taken
        (was completed, rearrange the logic into functions is in progress)
        
        Task 2: Don't allow a user who has a profile to create another profile

    subtasks:
    1. refine the logic into functions

    2. we want to check if a profile exists and import a function into
    lib/supabase/middleware.ts for redirection logic

    3. use previous state to update the name, avatar, and school that was input fields for create profile where there username was already exists

    4. add error handling to our newly created functions

    5. clean up the file and add comments

    lib/supabase/middleware.ts tasks:

    original tasks:
        Task 1: Only allow authorized users to access the pages under the (main) directory
        
        Task 2: For authenticated users accessing the pages outside of (main), automatically redirect them to the /explore route

        Task 3: For authenticated users WITHOUT a profile accessing the ANY route. Automatically route them to profile_setup

        Task 4: For any users accessing the profile_setup, route them to a page not found

        Task 5: For unauthenticated users accessing the pages under (main) render the create account modal. Explore page can be accessed by any user

        -create logic to redirect / rewrites the paths to satisfy above rules


        middleware psuedo
        if (auth user){
            if (outside of pages under (main) and (onboarding)) {
                send to explore
            }
            else if (auth user does not have a profile)
            {
                send to profile_setup
            }
            else if (auth user has a profile)
            {
                profile_setup rewrites to 404
            } 
        }
        else if (!auth user)
        {
            if (outside of pages under (main) and (onboarding)) {
                send to explore
            }
            else
            {
                send to login OR signup
            }
        }