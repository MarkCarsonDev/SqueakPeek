import Image from "next/image";
import { TextCarousel } from "@/ui/TextCarousel";
import { Typography } from "@mui/material";

export function LandingPageHero() {
  return (
    <div
      style={{
        height: "625px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          borderRadius: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TextCarousel />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src="/general/website_logo.svg"
              width={300}
              height={300}
              alt="SqueakPeek Logo"
              style={{ objectFit: "cover", objectPosition: "bottom" }}
            />
            <Typography
              variant="h4"
              sx={{ marginBottom: "5px", fontWeight: "bold" }}
            >
              Job hunting is hard...
            </Typography>
            <Typography variant="h5">That's why we’re here to help.</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
