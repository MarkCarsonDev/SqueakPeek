import { Typography } from "@mui/material/";
import "./styles.modules.css";
export default function Page() {
  return (
    <div
      className="border"
      style={{
        borderRadius: "15px",
      }}
    >
      <Typography className="bottom-pad" variant="h4">
        At SqueakPeek, we understand how challenging the job search process can
        be.
      </Typography>

      <Typography className="bottom-pad" variant="h6">
        From submitting applications to waiting for interviews, the journey
        often feels like navigating a black box. As a couple of college
        students, we knew it all too well.
      </Typography>
      <Typography className="bottom-pad" variant="h6">
        That’s why, in 2024, we began SqueakPeek to allow you to connect with
        other job applicants, share experiences, and track your progress every
        step of the way. Through message threads, you can communicate about
        opportunities, discuss interview insights, and feel more informed as you
        move forward in your career.
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
        }}
      >
        No more guessing. Just open communication to empower your job search.
      </Typography>
    </div>
  );
}
