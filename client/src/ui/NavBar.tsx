"use client";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faUser} from "@fortawesome/free-solid-svg-icons";

export function NavBar() {
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
        alignContent: "center"
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          marginLeft: "1%"
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            display: "flex",
            gridTemplateColumns: "repeat(4, auto)",
            gridGap: "30px",
            listStyle: "none",
            textAlign: "center",
          }}
        >
          <li>
            <Link
              href="/explore"
              style={{
                color: "#3C435C",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ marginRight: "10%" }}
              />
              <Typography
                sx={{
                  fontWeight: pathName === "/explore" ? "bold" : "normal",
                }}
              >
                Explore
              </Typography>
            </Link>
          </li>

          <li>
            <Link
              href="/message"
              style={{
                color: "#3C435C",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faMessage}
                style={{ marginRight: "10%" }}
              />
              <Typography
                sx={{
                  fontWeight: pathName === "/message" ? "bold" : "normal",
                }}
              >
                Message
              </Typography>
            </Link>
          </li>

          <li>
            <Link
              href="/track"
              style={{
                color: "#3C435C",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faChartLine}
                style={{ marginRight: "10%" }}
              />
              <Typography
                sx={{
                  fontWeight: pathName === "/track" ? "bold" : "normal",
                }}
              >
                Track
              </Typography>
            </Link>
          </li>

          <li>
            <Link
              href="/profile"
              style={{
                color: "#3C435C",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: "10%" }}
              />
              <Typography
                sx={{
                  fontWeight: pathName === "/profile" ? "bold" : "normal",
                }}
              >
                Profile
              </Typography>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
