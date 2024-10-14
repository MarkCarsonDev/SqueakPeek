import Image from "next/image";
import Link from "next/link";
import { Typography } from "@mui/material";

export function LogoNameLink({ href = "/"}) {
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
        src="/landingpage/logo.svg"
        height={100}
        width={100}
        alt="Squeakpeek Logo"
        style={{
          objectFit: "cover",
          objectPosition: "bottom",
          marginBottom: "5px",
          marginRight: "2px",
        }}
      />

      <Typography variant="h4">SqueakPeek</Typography>
    </Link>
  );
}
