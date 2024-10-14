import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../types/database.types";
/**
 * To access Supabase from Client Components, which run in the browser.
 */
export function createSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
