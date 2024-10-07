"use client";
//import { LandingNavbar } from "@/ui/LandingNavbar";
import "./LandingPage.css";
import Image from "next/image";
//import { TextCarousel } from "@/ui/TextCarousel";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export default function Home() {
  return (
    <div>
      {/* <LandingNavbar /> Cant be referrenced yet*/}

      {/*Section 1 Block*/}
      <div className="sec1-container">
        <div className="sec1-box">
          <div className="sec1-primary">
            <div className="sec1-text-wheel">
              <Typography variant="h4">
                This is a placeholder for the carousel text.
              </Typography>
              {/* <TextCarousel className="sec1-text-wheel" /> Cant be referenced yet */}
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
    </div>
  );
}
