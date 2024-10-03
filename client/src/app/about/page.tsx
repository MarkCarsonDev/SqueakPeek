import { AboutHero } from "@/ui/about/AboutHero";
import { Typography } from "@mui/material";
import { AboutProfile, IAboutProfile } from "@/ui/about/AboutProfile";
export default function Page() {
  const aboutProfiles: IAboutProfile[] = [
    {
      name: "Mekhi Hart Dela Cruz",
      role: "Lead",
      description:
        "Mekhi Hart is a Software Engineer at Netflix and has vast experience developing software from video games, mobile, and web. He also like to rock climb in his spare time.",
      linkedInURl: "https://www.linkedin.com/in/mekhihart-delacruz/",
      profilePic: "/about/profilepic_mekhi.png",
    },
    {
      name: "Mark Carson",
      role: "Full-Stack",
      description:
        "Mark Carson has a diverse background in full-stack development and machine learning applications. He spends time AFK playing piano and in the kitchen.",
      linkedInURl: "https://www.linkedin.com/in/markcarsondev/",
      profilePic: "/about/profilepic_mark.png",
    },
    {
      name: "David Serrano",
      role: "Frontend",
      description:
        "David Serrano is an aspiring software developer and or IT technician with a passion for fitness and a constant drive to learn and grow.",
      linkedInURl: "#", // TODO Add missing url
      profilePic: "/about/profilepic_mark.png", // TODO Add missing profile pic
    },
    {
      name: "Kate Steer",
      role: "Backend",
      description:
        "Kate Steer is a software developer with experience in database management and architecture, well as application design. In her free time, she enjoys creating music and reading.",
      linkedInURl: "https://www.linkedin.com/in/kate-steer-4149001a6/",
      profilePic: "/about/profilepic_kate.png",
    },
    {
      name: "Howie",
      role: "Frontend",
      description:
        "Hao Phan is a full stack developer with experience in IT and automated flow, with passion in web development. In his free time, he likes watching soccer and formula 1.",
      linkedInURl: "https://www.linkedin.com/in/hao-phan-b049b91aa/",
      profilePic: "/about/profilepic_howie.png",
    },
    {
      name: "Noah Daniels",
      role: "Backend",
      description:
        "Noah Daniels is a software developer, data analyst, and machine learning engineer, using his passion for mathematics and music alongside a strong work ethic to achieve his aims in a broad range of sciences and life goals.",
      linkedInURl: "https://www.linkedin.com/in/noah-daniels-07b5401a9/",
      profilePic: "/about/profilepic_mark.png", // TODO: Add missing profile pic
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
          marginBottom: "60px",
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
        }}
      >
        {aboutProfiles.map((profile) => (
          <div
            style={{
              margin: "20px",
            }}
          >
            <AboutProfile key={profile.name} {...profile} />
          </div>
        ))}
      </div>
    </div>
  );
}
