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
    </div>
  );
}
