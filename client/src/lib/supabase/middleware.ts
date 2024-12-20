import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { userHasExistingProfile } from "@/lib/actions/profile_setup"

// allowed public paths
const publicPaths = new Set(["/","/login","/signup","/about","/auth/callback", "/forgot_password", "/reset_password"]);

// whitelists auth'd user paths
const protectedPaths = new Set(["/message", "/explore", "/profile", "/thread", "/track", "/profile_setup", "/404"]);

// hasBasePaths for Set lookups
function hasBasePath(pathname: string, basePaths: Set<string>): boolean {
  const res = basePaths.has(pathname);
  return res
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
  
  //Auth user
  if (user) {

    // redirect authenticated users from home, login, and signup to explore
    if (pathname === "/" || pathname === "/signup" || pathname === "/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/explore";
      return NextResponse.redirect(url);
    }

    // Only allow authorized users to access the pages under the (main) directory using whitelist strategy
    if(!(hasBasePath(pathname, protectedPaths)) && !(hasBasePath(pathname, publicPaths)) && !(pathname.startsWith("/message"))) {
      const url = request.nextUrl.clone();
      //keep redirect from looping
      if (url.pathname.indexOf("/404") < 0) {
      url.pathname = "/404";
      return NextResponse.redirect(url);
      }
    }

    // Redirect authenticated users without a profile to /profile_setup
    const hasUserProfile = await userHasExistingProfile();
    const url = request.nextUrl.clone();
    if (!(hasUserProfile)) {

      //if not on profile_setup, redirect to profile_setup
      if (url.pathname.indexOf("/profile_setup") < 0) {
        if (!hasBasePath(pathname, publicPaths)){
          url.pathname = "/profile_setup";
          return NextResponse.redirect(url);
        }
      }
    } // end of handling of non auth'd users
    else {
      
      // Redirect any users accessing /profile_setup that already has a profile to /404
      if (pathname === "/profile_setup") {
        const url = request.nextUrl.clone();
        url.pathname = "/404";
        return NextResponse.redirect(url);
      }
      
      // Task 5: Redirect auth users navigating to /message to /message/company first
      if (pathname === "/message") {
        const url = request.nextUrl.clone();
        url.pathname = "/message/company";
        return NextResponse.redirect(url);
      }
    } // end handling of auth'd users
  }
  //non Auth'd users
  else {

    // For authenticated users accessing the pages outside of (main) automatically redirect them to the /401 route
    if(!hasBasePath(pathname, publicPaths)) {
      const url = request.nextUrl.clone();
      if (url.pathname.indexOf("/404") < 0) {
        url.pathname = "/404";
        return NextResponse.redirect(url); 
      }
    }
  }
  return supabaseResponse;
} // end updateSession