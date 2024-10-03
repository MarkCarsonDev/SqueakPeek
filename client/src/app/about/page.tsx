import { AboutHero } from "@/ui/about/AboutHero";
import { Typography } from "@mui/material";
import { AboutProfile, IAboutProfile } from "@/ui/about/AboutProfile";
export default function Page() {
  const aboutProfiles: IAboutProfile[] = [
    {
      name: "Mekhi Hart Dela Cruz",
      role: "Lead",
      description:
        "Mekhi Hart has vast experience developing software from video games, mobile, and web. He also like to rock climb in his spare time.",
      linkedInURl: "https://www.linkedin.com/in/mekhihart-delacruz/",
      profilePic: "/profilepic-mekhi",
    },
  ];
  return (
    <div>
      <AboutHero />

      <Typography
        sx={{
          textAlign: "center",
          marginTop: "50px",
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
          textDecoration: "underline",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
        variant="h4"
      >
        Our mission is to empower your job search. 
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "bold",
        }}
        variant="h5"
      >
        The Team
      </Typography>

      <AboutProfile />
    </div>
  );
}
