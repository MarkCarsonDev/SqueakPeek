import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { userHasExistingProfile } from "@/lib/actions/profile_setup"

console.log("***** BEGIN middleware.ts ******");
console.log("middleware.ts is always invoked!!!");

//looked into making these Sets but couldn't quite implement the references yet
//allowed public paths
const publicPaths = ["/","/login","/signup","/about","/auth/callback"];

//whitelists auth'd user paths
const protectedPaths = ["/message", "/explore", "/profile", "/thread", "/track", "/profile_setup"];

//may be a JavaScript way to do this easier with Sets... looking into it
function hasBasePath(pathname: string, basepaths: string[]) {
  for (let i = 0; i < basepaths.length; i++) {
    console.log("pathname: " + pathname);
    console.log("basepaths[i]" + basepaths[i]);
    if (pathname == "/")
      return true 
    if (basepaths[i] == "/") {continue}
    if (pathname.indexOf(basepaths[i]) == 0) {
      return true
    }
  }
  return false
}

//hasBasePath on publicPaths
function isPublicPath(pathname: string){
  return hasBasePath(pathname, publicPaths)
}

//hasBasePath on protectedPaths (protected paths)
function isAllowedUserPath(pathname: string){
  console.log("start of isAllowedUserPath");
  console.log("pathname: " + typeof(pathname));
  //TODO: should we keep Auth'd users off of signup?
  //if (pathname === "/signup"){
  //  console.log("RETURNING FALSE: pathname: signup " + pathname);
  //  return false
  // }
  return hasBasePath(pathname, protectedPaths);
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
  console.log("USER REQUEST PATHNAME: "+ pathname);
  
  //Auth user
  if (user) {
    const userEmail = user?.email;
    console.log("USER " + userEmail + " HAS AUTHENTICATED");
    
    //Task 1: Only allow authorized users to access the pages under the (main) directory using whitelist strategy
    if(!(isAllowedUserPath(pathname)) && !(isPublicPath(pathname))) {
      console.log("User attempted to access a restricted path. Redirecting to /404");
      console.log("Task 1: Only allow authorized users to access the pages under the (main) directory");
      const url = request.nextUrl.clone();
      if (url.pathname.indexOf("/404") < 0) {
        url.pathname = "/404";
        return NextResponse.redirect(url);
      }
    }

    // Task 3: Redirect authenticated users without a profile to /profile_setup
    const hasUserProfile = await userHasExistingProfile();
    const url = request.nextUrl.clone();
    console.log("url: " + url);
    if (!(hasUserProfile)) {
      console.log("Task 3: Redirect authenticated users without a profile to /profile_setup");
      console.log("USER " + user?.email + " HAS NO PROFILE");
      console.log("url.pathname.indexOf(/profile_setup): " + url.pathname.indexOf("/profile_setup"));
      
      //if not on profile_setup, redirect to profile_setup
      if (url.pathname.indexOf("/profile_setup") < 0) {
        if (!isPublicPath(pathname)){
          url.pathname = "/profile_setup";
          console.log("redirecting to /profile_setup: user has no profile");
          return NextResponse.redirect(url);
        }
      }
      else {
        console.log("user is trying to access: " + url.pathname);
        console.log("User accessing profile_setup");
      }
    } // end of handling of non auth'd users
    else {
      
      // Task 4: Redirect any users accessing /profile_setup that already has a profile to /404
      console.log("USER " + user?.email + " HAS PROFILE");
      if (pathname === "/profile_setup") {
        console.log("Task 4: Redirect any users accessing /profile_setup that already has a profile to /404");
        console.log("USER " + user?.email + " ALREADY HAS PROFILE, redirecting to 404");
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
    console.log("USER HAS NOT AUTHENTICATED");

    //Task 2: For authenticated users accessing the pages outside of (main)
    //automatically redirect them to the /404 route
    console.log("Task 2: For authenticated users accessing the pages outside of (main) automatically redirect them to the /404 route");
    if(!isPublicPath(pathname)) {
      const url = request.nextUrl.clone();
      if (url.pathname.indexOf("/404") < 0) {
        console.log(pathname  + " is not a public path. Redirect to 404");
        url.pathname = "/404";
        return NextResponse.redirect(url); 
      }
    }
    else {
      console.log(pathname  + " is a public path. Allowing access");
    }
  }
  return supabaseResponse;
} // end updateSession