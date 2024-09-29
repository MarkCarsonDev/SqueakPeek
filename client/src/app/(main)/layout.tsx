import { NavBar } from "@/ui/NavBar";
import { PageFooter } from "@/ui/PageFooter"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
