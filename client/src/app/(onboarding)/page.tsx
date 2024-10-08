import "./LandingPage.css";
import { LandingPageHero } from "@/ui/landingpage/LandingPageHero";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <LandingPageHero />
      {/*Section 2 Block*/}
      <div className="sec2-container">
      <div className="sec2-text-box">
          <Typography variant="h3">Talk to other applicants</Typography>

          <Typography variant="body1">
            Engage with company thread to ask questions and support fellow
            applicants
          </Typography>
        </div>
        <div className="sec2-image">
        <Image
          src="/LandingPage-images/rat_2.png"
          width={600}
          height={300}
          alt="Two rats speaking"
        />
        </div>
      </div>

      {/*Section 3 Block*/}
      <div className="sec3-container">
        <div className="sec3-image">
        <Image
          src="/LandingPage-images/rat_1.png"
          width={400}
          height={400}
          alt="Rat looking up"
        />
        </div>
        <div className="sec3-text-box">
          <Typography variant="h3">Track your applications</Typography>

          <Typography variant="body1">
            Streamline your job search with ease using our tracking board
          </Typography>
        </div>
      </div>

      {/*Section 4 Block*/}
      <div className="sec4-container">
        <div className="sec4-text-box">
          <Typography variant="h3">Gain Insight</Typography>

          <Typography variant="body1">
            View helpful stats about job openings with a single glance.
          </Typography>
        </div>
        <div className="sec4-image">
          <Image
            src="/LandingPage-images/rat_3.png"
            width={400}
            height={400}
            alt="Rat looking at star"
          />
        </div>
      </div>
    </div>
  );
}