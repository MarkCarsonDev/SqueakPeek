import { NavBar } from "@/ui/navbar/NavBar";

/**
 * This layout file affects files in the (main) directory
 * The navigation bar is set to render in each page under the (main directory)
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
