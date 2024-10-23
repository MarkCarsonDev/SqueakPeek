import { Typography, Tabs, Tab } from "@mui/material";

/**
 * Allows the user to navigate between company threads or private messages in the message page
 */
export function SideNav() {
  return (
    <div>
      {" "}
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
    </div>
  );
}
