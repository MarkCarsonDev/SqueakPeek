import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { trace } from "@/lib/actions/profile_setup"

trace("***** BEGIN middleware.ts ******");

function isPublicPath(pathname: string){
  trace("start of isPublicPaths, pathname: " + pathname);
  const publicRoutes = ["/","/login", "/explore","/signup"];
  const testBool = publicRoutes.includes("/explore");
  trace("testBool: " + testBool);
  trace("publicRoutes: " + publicRoutes);
  return publicRoutes.includes(pathname);
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

  //variable for all routes under (main) & (onboarding)
  const mainRoutes = ["/message", "/profile", "/thread", "/track", "/about", "/profile_setup"];

  trace("middleware.ts is always invoked!!!")

  //TODO: Only authenticated users can use under main
  //if auth user
  console.log("TODO: Keep all auth users from accessing outside main");

  if (user){

    trace("Is authenticated user");

    // Task 2: For authenticated users accessing the pages outside of (main)
    // automatically redirect them to the /explore route 
    trace("Authenticated user is attempting to acccess " + pathname);
    if(!mainRoutes.includes(pathname) && pathname.indexOf("/explore") < 0)
    { 
      trace("Redirecting to /explore");
      const url = request.nextUrl.clone();
      url.pathname = "/explore";
      return NextResponse.redirect(url);
    }
    else
    {
      // Task 3: Redirect authenticated users without a profile to /profile_setup
      //if (!(await getProfile (user.id, supabase)) && pathname !== "/profile_setup") {
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
    trace("NO AUTH USER: working here, line 112");
    trace("Restrict main to only auth users");
    
    if(!isPublicPath(pathname)){
      trace("unauth'd user: Redirect to homepage");
      const url = request.nextUrl.clone();
      url.pathname = "/explore";
      return NextResponse.redirect(url); 
    }
  }

  return supabaseResponse;
} //end updateSession
