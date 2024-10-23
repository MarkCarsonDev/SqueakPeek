import { Typography, Tabs, Tab } from "@mui/material";

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
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
        }}
      >
        Messages
      </Typography>
      <Typography>
        Talk to other applicants in the process, or talk privately
      </Typography>
      <Tabs>
        <Tab href="company" label="Company Threads"></Tab>
        <Tab href="private" label="Private Messages"></Tab>
      </Tabs>
      {children}
    </>
  );
}
