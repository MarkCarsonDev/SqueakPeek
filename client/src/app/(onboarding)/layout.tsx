import { LandingNavbar } from "@/ui/landingpage/LandingNavBar";
import { PageFooter } from "@/ui/PageFooter";

/**
 * This layout file affects files in the (onboarding) directory
 * The Landing navigation bar is set to render in each page under the (onboarding) directory
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNavbar />
      {children}
      <PageFooter />
    </>
  );
}
