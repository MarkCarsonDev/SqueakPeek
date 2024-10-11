"use client";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faChartLine,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { NavbarMenuDropdown } from "./NavbarMenuDropdown";
interface ILinks {
  name: string;
  href: string;
  icon: JSX.Element;
}
export function NavBar() {
  const links: ILinks[] = [
    {
      name: "Explore",
      href: "/explore",
      icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: "10%" }} />,
    },
    {
      name: "Message",
      href: "/message",
      icon: <FontAwesomeIcon icon={faMessage} style={{ marginRight: "10%" }}/>,
    },
    {
      name: "Threads",
      href: "/thread",
      icon: <FontAwesomeIcon icon={faChartLine} style={{ marginRight: "10%" }}/>,
    },
  ];
  const pathName = usePathname();

  return (
    // Navbar container
    <nav
      style={{
        background: "white",
        height: "80px",
        display: "flex",
        zIndex: 1,
        position: "sticky",
        borderBottom: "5px solid #E0E4F2",
        alignContent: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Container for logo and navigation links. Note: This is to align these element to left while the drop down is aligned to the right  */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Logo Section Note: Links to explore page because that will be our users homepage */}
        <Link
          href="/explore"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            marginLeft: "1%",
          }}
        >
          <Image
            src="/LandingPage-images/rat_1.png"
            height={100}
            width={100}
            alt="Squeakpeek Logo"
            style={{
              objectFit: "cover",
              objectPosition: "bottom",
              marginBottom: "5%",
              marginRight: "2%",
            }}
          />
          <Typography variant="h4">SqueakPeek</Typography>
        </Link>

        {/* Navigations links section Note: Similar to landingnavbar but has inlcuded FA icons */}

        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, auto)",
            gridGap: "30px",
            listStyle: "none",
            textAlign: "center",
          }}
        >
          {links.map((links) => (
            <li>
              <Link
                href={links.href}
                style={{
                  color: "#3C435C",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {links.icon}
                <Typography
                  sx={{
                    fontWeight: pathName === links.href ? "bold" : "normal",
                  }}
                >
                  {links.name}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Dropdown Section */}

      <NavbarMenuDropdown />
    </nav>
  );
}
