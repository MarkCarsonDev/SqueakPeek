NOTES:
//allowed public paths
const publicPaths = ["/","/login","/explore","/signup","/about"];

//whitelists auth'd user paths
const validUserPaths = ["/message", "/profile", "/thread", "/track", "/profile_setup"];

best testing order (unauth'd then auth):
    Middleware Task 1
    Middleware Task 5,
    Middleware Task 2,
    now auth'd...
    Middleware Task 3,
    Form Validation Task 1,
    Middleware Task 4,
    Form Validation Task 2

Form Validation Tests:
    Task 1: Check if username as been taken

        1. Input an existing username in signup
        2. should display an error that username is taken

    Task 2: Don't allow a user who has a profile to create another profile

        1. authenticate as a user that has a profile
        2. go to profile_setup page
        3. should be redirected to 404

Middleware
    Task 1: Only allow authorized users to access the pages under the (main) directory

        1. try to navigate to pages under main and onboarding
        2. login
        3. navigate to random character urls i.e.- /ajshdgkjasd
        4. navigate to known restricted urls: [auth, lib, ui, etc.]
        5. steps 1, 3, and 4 redirect you to explore

    Task 2: For authenticated users accessing the pages outside of (main), automatically redirect them to the /explore route

        1. see above in Task 1

    Task 3: For authenticated users WITHOUT a profile accessing ANY route. Automatically route them to profile_setup. This was implemented as preventing access to private route

        1. login as user without a profile
        2. navigate to any private page
        3. this should redirect you to profile_setup

    Task 4: For any users accessing the profile_setup with a profile, route them to a page not found

        1. login as user with a profile
        2. navigate to profile_setup
        3. this should redirect you to 404

    Task 5: For unauthenticated users accessing the pages under (main) render the create account model. This was implemented as sending them to explore. Explore page can be accessed by any user.

        1. use a fresh browser and don't login or signup
        2. navigate to restricted pages should be sent to explore
        3. navigate to all public pages