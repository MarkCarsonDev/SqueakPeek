"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function NavBar() {
  const pathName = usePathname();

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
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            height: "80px",
            color: "#3C435C",
            position: "relative",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            left: "1%",
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
            height: "80px",
            width: "500px",
          }}
        >
          <ul
            style={{
              display: "flex",
              gridTemplateColumns: "repeat(4, auto)",
              gridGap: "30px",
              listStyle: "none",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <li>
              <Link
                href="/explore"
                style={{
                  color: "#3C435C",
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: pathName === "/explore" ? "bold" : "normal",
                    display: "flex"
                  }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: "1%"}}/>Explore
                </Typography>
              </Link>
            </li>

            <li>
              <Link
                href="/message"
                style={{
                  color: "#3C435C",
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: pathName === "/message" ? "bold" : "normal",
                  }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: "1%"}}/>Message
                </Typography>
              </Link>
            </li>

            <li>
              <Link
                href="/thread"
                style={{
                  color: "#3C435C",
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: pathName === "/thread" ? "bold" : "normal",
                  }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: "1%"}}/>Thread
                </Typography>
              </Link>
            </li>

            <li>
              <Link
                href="/track"
                style={{
                  color: "#3C435C",
                  textDecoration: "none",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: pathName === "/track" ? "bold" : "normal",
                  }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: "1%"}}/>Tracking
                </Typography>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
