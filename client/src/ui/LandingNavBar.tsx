"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from "@mui/material";
import { customTheme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material";

/*
 * This Landing Navbar will be responsible for rendering the Navbar of the Landing Page
 */

export function LandingNavbar() {
  return (
    <nav
      style={{
        background: "white",
        height: "80px",
        width: "100%",
        display: "flex",
        zIndex: 1,
        position: "sticky",
        borderBottom: "5px solid #E0E4F2",
      }}
    >
      <div
        style={{
          height: "80px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Link
          href="/"
          style={{
            height: "80px",
            color: "#3C435C",
            position: "relative",
            right: "28%",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              height: "100px",
              width: "100px",
            }}
          >
            <Image
              src="/LandingPage-images/rat_1.png"
              height={100}
              width={100}
              alt="Squeakpeek Logo"
              style={{
                position: "relative",
                bottom: "10%",
                right: "15%",
              }}
            />
          </div>
          <Typography variant="h4">SqueakPeek</Typography>
        </Link>

        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            left: "29%",
            height: "80px",
            width: "500px",
          }}
        >
          <ul
            style={{
              display: "flex",
              gridTemplateColumns: "repeat(2, auto)",
              gridGap: "30px",
              listStyle: "none",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <li>
              <Link
                href="/about"
                style={{
                  color: "#3C435C",
                  textDecoration: "none",
                }}
              >
                <Typography>About Us</Typography>
              </Link>
            </li>

            <li>
              <Link
                href="/login"
                style={{
                  color: "#3C435C",
                  textDecoration: "none",
                }}
              >
                <Typography>Log In</Typography>
              </Link>
            </li>

            <li>
              <Button
                variant="contained"
                href="/signup"
                sx={{
                  backgroundColor: "#496FFF",
                  borderRadius: "8px",
                  padding: "10px 60px",
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: "#3C435C",
                  },
                }}
              >
                <Typography sx={{ color: "white" }}>Get Started</Typography>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
