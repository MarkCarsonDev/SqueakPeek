import { Typography } from "@mui/material/";
import "./styles.modules.css";
import Link from "next/link";
export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="border"
        style={{
          borderRadius: "15px",
          padding: "25px",
          marginBottom: "20px",
          backgroundColor: "white",
        }}
      >
        <Typography
          className="bottom-pad"
          variant="h3"
          sx={{
            fontSize: 45,
          }}
        >
          At SqueakPeek, we understand how challenging the job search process
          can be.
        </Typography>

        <Typography className="bottom-pad" variant="h5">
          From submitting applications to waiting for interviews, the journey
          often feels like navigating a black box. As a couple of college
          students, we knew it all too well.
        </Typography>
        <Typography className="bottom-pad" variant="h5">
          That’s why, in 2024, we began SqueakPeek to allow you to connect with
          other job applicants, share experiences, and track your progress every
          step of the way. Through message threads, you can communicate about
          opportunities, discuss interview insights, and feel more informed as
          you move forward in your career.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          No more guessing. Just open communication to empower your job search.
        </Typography>
      </div>

      <Link
        href="#"
        style={{
          color: "#09556C",
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            color: "#09556C",
          }}
        >
          Get Started Today
        </Typography>
      </Link>
    </div>
  );
}
