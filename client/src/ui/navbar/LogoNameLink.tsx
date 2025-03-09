import Image from "next/image";
import Link from "next/link";
import { Typography, CardHeader, Chip } from "@mui/material";

export function LogoNameLink({ href = "/" }) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
      }}
    >
      <CardHeader
        avatar={
          <Image
            src="/general/website_logo.svg"
            height={60}
            width={60}
            alt="Squeakpeek Logo"
          />
        }
        title={<Typography variant="h4">SqueakPeek</Typography>}
        subheader={<Chip label="Beta" size="small" color="warning" />}
      />
    </Link>
  );
}
