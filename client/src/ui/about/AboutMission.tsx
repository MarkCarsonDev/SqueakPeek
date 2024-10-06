import { Typography } from "@mui/material";
export function AboutMission() {
  return (
    <div
      style={{
        backgroundColor: "#E0E4F2",
        padding: "50px",
        marginBottom: "30px",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          marginBottom: "20px",
        }}
        variant="h5"
      >
        We are a dedicated team of college students who understand firsthand the
        challenges of job searching and building professional connections.
        That’s why, in 2024, we began SqueakPeek to allow you to connect with
        other job applicants, share experiences, and track your progress every
        step of the way. Through message threads, you can communicate about
        opportunities, discuss interview insights, and feel more informed as you
        move forward in your career.
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
