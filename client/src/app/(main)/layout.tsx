import { NavBar } from "@/ui/navbar/NavBar";
import { createSupabaseServer } from "../../lib/supabase/server";
import InitProfile from "../../lib/store/initProfile";

/**
 * This layout file affects files in the (main) directory
 * The navigation bar is set to render in each page under the (main directory)
 */
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <NavBar />
      {children}
      <InitProfile user={data.user} />
    </>
  );
}
