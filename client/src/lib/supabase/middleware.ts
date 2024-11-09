import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { trace, userHasExistingProfile } from "@/lib/actions/profile_setup"

trace("***** BEGIN middleware.ts ******");
trace("middleware.ts is always invoked!!!");

//allowed public paths
const publicPaths = ["/","/login", "/explore","/signup","/about"];

//whitelists auth'd user paths
const validUserPaths = ["/message", "/profile", "/thread", "/track", "/profile_setup"];

function isPublicPath(pathname: string){
  return publicPaths.includes(pathname);
}

function isAllowedUserPath(pathname: string){
  return validUserPaths.includes(pathname);
}

// refreshes expired Auth token
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  ); //end createServerClient

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally: return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  //get Supabase user
  const { data: { user } } = await supabase.auth.getUser();

  //simple pathname variable
  const pathname = request.nextUrl.pathname;

  console.log("TODO: Keep all auth users from accessing outside main");

  if (user){
    trace("user: " + user);
    trace("Is authenticated user");
    let hasUserProfile = await userHasExistingProfile();
    console.log("hasUserProfile: ", hasUserProfile);
    if (!(hasUserProfile)){
      const url = request.nextUrl.clone();
      if (url.pathname.indexOf("/profile_setup") < 0){
        url.pathname = "/profile_setup";
        trace("redirecting to /profile_setup: user has no profile");
        return NextResponse.redirect(url);
      }
    }
    
    //Task 1: Only allow authorized users to access
    //the pages under the (main) directory
    //...using whitelist strategy

    if(!(isAllowedUserPath(pathname)) && !(isPublicPath(pathname))) {
        const url = request.nextUrl.clone();
        url.pathname = "/explore";
        trace("redirecting to /explore: invalid path");
        return NextResponse.redirect(url);
    }
    else
    {

      // Task 3: Redirect authenticated users without a profile to /profile_setup
      //if (!(await getProfileForUser (user.id, supabase)) && pathname !== "/profile_setup") {
        //const url = request.nextUrl.clone();
        //url.pathname = "/profile_setup";
        //return NextResponse.redirect(url);
        //}

      // Task 4: Redirect any users accessing /profile_setup that already has a profile to /404
      //if (pathname === "/profile_setup") {
        //const url = request.nextUrl.clone();
        //url.pathname = "/404";
        //return NextResponse.rewrite(url);
        //}
    }

    // Task 5: Redirect auth users navigating to /message to /message/company first
    if (request.nextUrl.pathname === "/message") {
      const url = request.nextUrl.clone();
      url.pathname = "/message/company";
      return NextResponse.redirect(url);
    }
  }
  else
  {
    //Task 2: For authenticated users accessing the pages outside of (main)
    //automatically redirect them to the /explore route
    trace("NO AUTH USER: working here, line 112");
    trace("Restrict main to only auth users");
    //const publicPaths = ["/","/login", "/explore","/signup"];
    if(!isPublicPath(pathname)){
      trace("unauth'd user: Redirect to homepage");
      const url = request.nextUrl.clone();
      url.pathname = "/explore";
      return NextResponse.redirect(url); 
    }
  }

  return supabaseResponse;
} //end updateSession
