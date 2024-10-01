"use client";
import Link from "next/link";
import Image from "next/image";
import { Typography, Divider, Button } from "@mui/material";

/*
This Page Footer will be responsible for rendering the footer of all pages in the project
Except for the Login Page and Sign Up Page
*/

const images = [
  {
    src: "/x-logo/X-logo-black.png",
    alt: "X",
    route: "#",
  },
  {
    src: "/Instagram-logo/Instagram_Glyph_Black.svg",
    alt: "Instagram",
    route: "#",
  },
  {
    src: "/LinkedIn-logo/In-Black.png",
    alt: "LinkedIn",
    route: "#",
  },
  {
    src: "/Meta-logo/Meta-logo.png",
    alt: "Meta",
    route: "#",
  },
];

// Array for the left section with both text and route
const footerLinks = [
  { text: "Explore", route: "/explore" },
  { text: "About Us", route: "/about" },
  { text: "Contact", route: "/contact" },
];

export const PageFooter = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f6f8ff",
        padding: "20px 40px",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr", // Grid layout for equal distribution
        alignItems: "center", // Align vertically
        gridTemplateRows: "auto auto", // Two rows, one for main content, one for copyright
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        {footerLinks.map((link, index) => (
          <Link
            key={index}
            href={link.route}
            style={{
              margin: "0 40px",
              color: "#000",
              textDecoration: "none",
            }}
          >
            <Typography>{link.text}</Typography>
          </Link>
        ))}
      </div>

      {/* Center Section (Dividers and Title in Row) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gridColumn: "2 / 3", // Center column
          width: "100%",
        }}
      >
        <Divider
          style={{
            width: "100px", // Fixed width for the divider
            height: "1px", // Make sure the divider height is set correctly
            backgroundColor: "#ccc", // Divider color
            marginRight: "20px", // Space between divider and title
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
            width: "100px", // Fixed width for the divider
            height: "1px", // Make sure the divider height is set correctly
            backgroundColor: "#ccc", // Divider color
            marginLeft: "20px", // Space between title and divider
          }}
        />
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "100px", // Space between icons
        }}
      >
        {images.map((image, index) => (
          <Link key={index} href={image.route}>
            <Button
              sx={{
                minWidth: "auto", // Remove the default button minWidth
                padding: 0, // Remove padding around the icon
                backgroundColor: "transparent", // Remove any background color
                boxShadow: "none", // Remove default button shadow
                "&:hover": {
                  backgroundColor: "transparent", // Ensure no background on hover
                  opacity: 1, // Smooth opacity transition on hover
                },
                "&:focus": {
                  outline: "none", // Remove focus outline
                  boxShadow: "none", // Remove focus box shadow
                },
                opacity: 0.7,
                transition: "opacity 0.3s ease", // Smooth transition for opacity
              }}
            >
              <Image src={image.src} alt={image.alt} width={24} height={24} />
            </Button>
          </Link>
        ))}
      </div>

      {/* Copyright Section */}
      <Typography
        style={{
          gridColumn: "2 / 3", // Center the copyright text below the title
          fontSize: "0.875rem",
          color: "#555",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        © 2024 SQUEAKPEEK
      </Typography>
    </footer>
  );
};
