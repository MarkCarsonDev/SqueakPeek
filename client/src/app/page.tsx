//import { LandingNavbar } from "@/ui/LandingNavbar";
import "./LandingPage.css";
import Image from "next/image";
import { Typography } from "@mui/material";
import { LandingPageHero } from "@/ui/landingpage/LandingPageHero";

export default function Home() {
  return (
    <div>
      {/* <LandingNavbar /> Cant be referrenced yet*/}
    <LandingPageHero />
    </div>
  );
}
