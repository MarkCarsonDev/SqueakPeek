import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { userHasExistingProfile } from "@/lib/actions/profile_setup"

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
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

    //simple pathname variable
    const pathname = request.nextUrl.pathname;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    // TODO: Commented for now since it's automatically redirecting to login page
    // const url = request.nextUrl.clone();
    // url.pathname = "/login";
    // return NextResponse.redirect(url);
  } else {
    // console.log("user: ", user);
    console.log("user logged authenticated");

    // redirect user to company route when first navigating to /message route
    if (request.nextUrl.pathname === "/message") {
      const url = request.nextUrl.clone();
      url.pathname = "/message/company";
      return NextResponse.redirect(url);
    }
    // Task 4: Redirect any users accessing /profile_setup that already has a profile to /404
    if (await userHasExistingProfile()) {
      console.log("USER " + user?.email + " HAS PROFILE");
      if (pathname === "/profile_setup") {
        console.log("Task 4: Redirect any users accessing /profile_setup that already has a profile to /404");
        console.log("USER " + user?.email + " ALREADY HAS PROFILE, redirecting to 404");
        const url = request.nextUrl.clone();
        url.pathname = "/404";
        return NextResponse.rewrite(url);
      }
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
