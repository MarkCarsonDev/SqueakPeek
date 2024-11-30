import "./LandingPage.css";
import { LandingPageHero } from "@/ui/landingpage/LandingPageHero";
import { Typography } from "@mui/material";
import Image from "next/image";

export const metadata = {
  title: "Home",
  description:
    "Home.",
};

export default function Home() {
  return (
    <div>
      <LandingPageHero />
      {/*Section 2 Block*/}
      <div className="sec2-container">
        <div className="sec2-text-box">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2%",
            }}
          >
            Talk to other applicants
          </Typography>

          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              width: "60%",
            }}
          >
            Engage with company threads to ask questions and support fellow
            applicants
          </Typography>
        </div>
        <Image
          src="/landingpage/message.svg"
          width={450}
          height={450}
          alt="Two rats speaking"
          style={{
            marginRight: "5%",
          }}
        />
      </div>

      {/*Section 3 Block*/}
      <div className="sec3-container">
        <Image
          src="/landingpage/track.svg"
          width={450}
          height={450}
          alt="Rat looking up"
          style={{
            marginLeft: "8.5%",
            objectFit: "cover",
            objectPosition: "bottom",
          }}
        />
        <div className="sec3-text-box">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2%",
            }}
          >
            Track your applications
          </Typography>

          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              width: "65%",
            }}
          >
            Streamline your job search with ease using our tracking board
          </Typography>
        </div>
      </div>

      {/*Section 4 Block*/}
      <div className="sec4-container">
        <div className="sec4-text-box">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2%",
            }}
          >
            Gain Insight
          </Typography>

          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              width: "65%",
            }}
          >
            View helpful stats about job openings with a single glance.
          </Typography>
        </div>
        <Image
          src="/landingpage/insight.svg"
          width={450}
          height={450}
          alt="Rat looking at star"
          style={{
            marginRight: "10%",
            objectFit: "cover",
            objectPosition: "bottom",
          }}
        />
      </div>
    </div>
  );
}
