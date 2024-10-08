import { type NextRequest } from "next/server";
import { updateSession } from "@/../lib/supabase/middleware";

/**
 * Middleware that is incoked in every route in the project
 */
export async function middleware(request: NextRequest) {
  // return await updateSession(request); // TODO: add updateSession back after getting env files
}

export const config = {
  // TODO update matchers to only run pages that access Supabase
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
