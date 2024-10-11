"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
/*
 * This Landing Navbar will be responsible for rendering the Navbar of the Landing Page
 */

export function LandingNavbar() {
  const pathName = usePathname();
  return (
    <nav
      style={{
        background: "white",
        height: "80px",
        display: "flex",
        zIndex: 1,
        position: "sticky",
        borderBottom: "5px solid #E0E4F2",
        alignContent: "center",
        justifyContent: "space-between"
      }}
    >
      
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            marginLeft: "10px"
          }}
        >
            <Image
              src="/LandingPage-images/rat_1.png"
              height={100}
              width={100}
              alt="Squeakpeek Logo"
              style={{ objectFit: 'cover', objectPosition: 'bottom', marginBottom: "5%", marginRight: "2%"}}
            />

          <Typography variant="h4">SqueakPeek</Typography>
        </Link>

        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
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
                <Typography
                  sx={{
                    fontWeight: pathName === "/about" ? "bold" : "normal",
                  }}
                >
                  About Us
                </Typography>
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
                <Typography
                  sx={{
                    fontWeight: pathName === "/login" ? "bold" : "normal",
                  }}
                >
                  Log In
                </Typography>
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
    </nav>
  );
}
