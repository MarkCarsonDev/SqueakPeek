import Image from "next/image";
import Link from "next/link";
import { Typography } from "@mui/material";

export function LogoNameLink({ href = "/" }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        marginLeft: "10px",
      }}
    >
      <Image
        src="/general/website_logo.svg"
        height={60}
        width={60}
        alt="Squeakpeek Logo"
        style={{
          objectFit: "cover",
          objectPosition: "bottom",
          margin: "5px",
        }}
      />

      <Typography variant="h4">SqueakPeek</Typography>
    </Link>
  );
}
