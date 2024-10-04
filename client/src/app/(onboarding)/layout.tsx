import { LandingNavbar } from "@/ui/LandingNavBar";

/**
 * This layout file affects files in the (main) directory
 * The navigation bar is set to render in each page under the (main directory)
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
}
