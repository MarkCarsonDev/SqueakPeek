import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { userHasExistingProfile } from "@/lib/actions/profile_setup"

//TODO review explore redirect logic: redirected to profile_setup but url shows as explore

//debug utility function 
export async function debug(msg: string){
  console.log("DEBUG: ", msg);
}

debug("***** BEGIN middleware.ts ******");
debug("middleware.ts is always invoked!!!");

//allowed public paths
//TODO: rm test in prd stack
const publicPaths = ["/","/login", "/explore","/signup","/about"];

//whitelists auth'd user paths
const validUserPaths = ["/message", "/profile", "/thread", "/track", "/profile_setup"];

function hasBasePath(pathname: string, basepaths: string[]) {
  for (let i = 0; i < basepaths.length; i++) {
    if (pathname.indexOf(basepaths[i]) == 0) {
      return true;
    }
    return false
  }
}
function isPublicPath(pathname: string){
  return hasBasePath(pathname, publicPaths);
}

function isAllowedUserPath(pathname: string){
  return hasBasePath(pathname, validUserPaths);
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

  //get Supabase user
  const { data: { user } } = await supabase.auth.getUser();

  //simple pathname variable
  const pathname = request.nextUrl.pathname;

  debug("USER REQUEST PATHNAME: "+ pathname);

  if (user) {
    const userEmail = user?.email;
    debug("USER " + userEmail + " HAS AUTHENTICATED");
    
    //Task 1: Only allow authorized users to access the pages under the (main) directory
    //...using whitelist strategy
    if(!(isAllowedUserPath(pathname)) && !(isPublicPath(pathname))) {
      debug("User attempted to access a restricted path. Redirecting to /explore");
      debug("Task 1: Only allow authorized users to access the pages under the (main) directory");
      const url = request.nextUrl.clone();
      url.pathname = "/explore";
      return NextResponse.redirect(url);
    }

    // Task 3: Redirect authenticated users without a profile to /profile_setup
    let hasUserProfile = await userHasExistingProfile();
    const url = request.nextUrl.clone();
    debug("url: " + url);
    if (!(hasUserProfile)) {
      debug("Task 3: Redirect authenticated users without a profile to /profile_setup");
      debug("USER " + user?.email + " HAS NO PROFILE");
      debug("url.pathname.indexOf(/profile_setup): " + url.pathname.indexOf("/profile_setup"));
      
      //if not on profile_setup, redirect to profile_setup
      if (url.pathname.indexOf("/profile_setup") < 0) {
        if (!isPublicPath(pathname)){
          url.pathname = "/profile_setup";
          debug("redirecting to /profile_setup: user has no profile");
          return NextResponse.redirect(url);
        }
      }

      else {
        debug("user is trying to access: " + url.pathname);
        debug("User accessing profile_setup");
      }
    } // end of handling of non auth'd users
    else {
      // Task 4: Redirect any users accessing /profile_setup that already has a profile to /404
      debug("USER " + user?.email + " HAS PROFILE");
      if (pathname === "/profile_setup") {
        debug("Task 4: Redirect any users accessing /profile_setup that already has a profile to /404");
        debug("USER " + user?.email + " ALREADY HAS PROFILE, redirecting to 404");
        const url = request.nextUrl.clone();
        url.pathname = "/404";
        return NextResponse.rewrite(url);
      }
      // Task 5: Redirect auth users navigating to /message to /message/company first
      if (request.nextUrl.pathname === "/message") {
        const url = request.nextUrl.clone();
        url.pathname = "/message/company";
        return NextResponse.redirect(url);
      }
    } // end handling of auth'd users
  }
  else {
    debug("USER HAS NOT AUTHENTICATED");

    //Task 2: For authenticated users accessing the pages outside of (main)
    //automatically redirect them to the /explore route
    debug("Task 2: For authenticated users accessing the pages outside of (main) automatically redirect them to the /explore route");
    if(!isPublicPath(pathname)) {
      debug(pathname  + "is not a public path. Redirect to explore");
      const url = request.nextUrl.clone();
      url.pathname = "/explore";
      return NextResponse.redirect(url); 
    }
    else {
      debug(pathname  + " is a public path. Allowing access");
    }
  }
  return supabaseResponse;
} // end updateSession