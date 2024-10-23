import { SideNav } from "@/ui/messaging/SideNav";

/**
 * This layout file affects files in the message directory
 * The Sidebar is set to render in each page under the (main directory)
 */
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40% 60%",
      }}
    >
      <SideNav />
      {children}
    </div>
  );
}
