"use client";
import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

/*
This Page Footer will be responsible for rendering the footer of all pages in the project
Except for the Login Page and Sign Up Page
*/

interface ILinks {
  href: string;
  title: string;
}
export const PageFooter = () => {
  const links: ILinks[] = [
    {
      href: "/about",
      title: "About",
    },
    {
      href: "/contact",
      title: "Contact",
    },
  ];
  return (
    <footer
      style={{
        display: "flex",
        padding: "35px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            alt="company logo"
            src={"/general/website_logo.svg"}
            width={50}
            height={50}
          />
          <Typography
            style={{
              paddingLeft: "10px",
            }}
            variant="h5"
          >
            SqueakPeek
          </Typography>
        </div>
        <Typography
          variant="caption"
          style={{
            paddingTop: "5px",
          }}
        >
          ©  2024 SqueakPeek. All rights reserved.
        </Typography>
      </div>
      <div
        style={{
          marginLeft: "auto",
          paddingRight: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {links.map((link) => (
          <Link
            style={{
              textDecoration: "none",
              color: "#3C435C",
              paddingLeft: "15px",
            }}
            href={link.href}
            key={link.title}
          >
            <Typography>{link.title}</Typography>
          </Link>
        ))}
      </div>
    </footer>
  );
};
