import { Typography } from "@mui/material";

/**
 * This will render a large rat asset with text.
 * Asset for this component is still being made
 */
export function AboutHero() {
  //TODO: Add rat asset here later
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: 150,
      }}
    >
      <Typography variant="h3">SqueakPeek</Typography>
    </div>
  );
}
