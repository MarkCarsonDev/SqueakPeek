"use client";
import Link from "next/link";
import Image from "next/image";
import { Typography, Divider } from "@mui/material";

/*
This Page Footer will be responisble for rendering the footer of all pages in the project
Except for the Login Page and Sign Up Page
*/

export const PageFooter = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f9f9fc",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <Link
          href="#"
          style={{ margin: "0 40px", color: "#000", textDecoration: "none" }}
        >
          <Typography>Explore</Typography>
        </Link>
        <Link
          href="#"
          style={{ margin: "0 40px", color: "#000", textDecoration: "none" }}
        >
          <Typography>About Us</Typography>
        </Link>
        <Link
          href="#"
          style={{ margin: "0 40px", color: "#000", textDecoration: "none" }}
        >
          <Typography>Contact</Typography>
        </Link>
      </div>

      {/* Center Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          right: "15px",
        }}
      >
        <Divider
          style={{
            flexGrow: 1,
            backgroundColor: "#ccc",
            width: "20px",
            height: "1px",
            margin: "0 20px",
          }}
        />
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            textAlign: "center",
          }}
        >
          SqueakPeek
        </Typography>
        <Divider
          style={{
            flexGrow: 1,
            backgroundColor: "#ccc",
            width: "20px",
            height: "1px",
            margin: "0 20px",
          }}
        />
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="#">
          <Image
            src="/x-logo/X-logo-black.png"
            alt="X"
            width={24}
            height={24}
            style={{
              margin: "0 40px",
              opacity: 0.7,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          />
        </Link>
        <Link href="#">
          <Image
            src="/Instagram-logo/Instagram_Glyph_Black.svg"
            alt="Instagram"
            width={24}
            height={24}
            style={{
              margin: "0 40px",
              opacity: 0.7,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          />
        </Link>
        <Link href="#">
          <Image
            src="/LinkedIn-logo/In-Black.png"
            alt="LinkedIn"
            width={24}
            height={24}
            style={{
              margin: "0 40px",
              opacity: 0.7,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          />
        </Link>
        <Link href="#">
          <Image
            src="/Meta-logo/Meta-logo.png"
            alt="Meta"
            width={24}
            height={24}
            style={{
              margin: "0 40px",
              opacity: 0.7,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          />
        </Link>
      </div>

      {/* Copyright Section */}
      <Typography
        style={{
          fontSize: "0.875rem",
          color: "#555",
          width: "100%",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        © 2024 SQUEAKPEEK
      </Typography>
    </footer>
  );
};
