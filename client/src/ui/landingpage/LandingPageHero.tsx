import Image from "next/image";
//import { TextCarousel } from "@/ui/TextCarousel";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export function LandingPageHero() {
  return (
    <div style={{
      height: "90vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "90%",
            backgroundColor: "white",
            border: "10px solid #E0E4F2",
            boxShadow: "#6d6d6d 0px 0px 10px",
            borderRadius: "20px",
            alignItems: "center",
            justifyContent: "center",
      }}>
        <div style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center", 
              justifyContent: "space-between",
              width: "80%",
        }}>
            <Typography variant="h4">
              This is a placeholder for the carousel text.
            </Typography>
            {/* <TextCarousel className="sec1-text-wheel" /> Cant be referenced yet */}

          <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "5%",
          }}>
            <Image
              src="/LandingPage-images/rat_1.png"
              width={300}
              height={300}
              alt="SqueakPeek Logo"
            />
            <Typography variant="h2" sx={{marginBottom: "2%"}}>SqueakPeek</Typography>
            <Typography variant="h5">Job hunting is hard,</Typography>
            <Typography variant="h5">we’re here to help.</Typography>
          </div>
        </div>

        <div style={{
              textAlign: "center",
              marginTop: "3%",
        }}>
          <Link href="/signup">
            <Typography variant="h5" sx={{ color: "#496FFF" }}>
              Get Started
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}
