"use client";
import { LandingNavbar } from "@/ui/LandingNavBar"
import "./LandingPage.css";
import Image from "next/image";
import { TextCarousel } from "@/ui/TextCarousel";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export default function Home() {
  return (
    <div>
      <LandingNavbar />

      {/*Section 1 Block*/}
      <div className="sec1-container">
        <div className="sec1-box">
          <div className="sec1-primary">
            <div className="sec1-text-wheel">
              <TextCarousel />
            </div>

            <div className="sec1-logo-box">
              <Image
                className="sec1-main-logo"
                src="/LandingPage-images/rat_1.png"
                width={300}
                height={300}
                alt="SqueakPeek Logo"
              />
              <Typography variant="h2">SqueakPeek</Typography>
              <Typography variant="h4">Job hunting is hard,</Typography>
              <Typography variant="h4">we’re here to help.</Typography>
            </div>
          </div>

          <div className="sec1-Link">
            <Link href="/signup">
              <Typography variant="h5" sx={{ color: "#496FFF" }}>
                Get Started
              </Typography>
            </Link>
          </div>
        </div>
      </div>

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
