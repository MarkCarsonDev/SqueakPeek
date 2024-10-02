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
        background: "#FFFFFF",
        height: "80px",
        width: "100%",
        display: "grid",
        zIndex: 999,
        position: "sticky",
        top: 0,
        borderBottom: "5px solid #E0E4F2",
      }}
    >
      <div
        style={{
          height: "80px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "3rem",
            fontFamily: "'Droid Sans', sans-serif",
            color: "#3C435C",
            position: "absolute",
            left: "2%",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              height: "100px",
              width: "100px",
              backgroundImage: "url(/ratlogo.png)",
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
            position: "absolute",
            right: "3%",
            height: "70px",
            width: "500px",
            fontSize: "1.2rem",
            fontFamily: "'Droid Sans', sans-serif",
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
              position: "absolute",
              right: "5%",
            }}
          >
            <li>
              <Link
                href="/aboutus"
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
              <ThemeProvider theme={customTheme}>
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
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Typography sx={{ color: "#FFFFFF" }}>Get Started</Typography>
                </Button>
              </ThemeProvider>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}