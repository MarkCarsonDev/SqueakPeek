import { Typography } from "@mui/material";
export function AboutMission() {
  return (
    <div
      style={{
        backgroundColor: "#E0E4F2",
        padding: "50px 0px",
        marginBottom: "30px",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          marginBottom: "20px",
        }}
        variant="h4"
      >
        We are a dedicated team of Computer Science students from California
        State University Long Beach, who understand firsthand the challenges of
        job searching and building professional connections.
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#496FFF",
        }}
        variant="h4"
      >
        Our mission is to empower your job search. 
      </Typography>
    </div>
  );
}
