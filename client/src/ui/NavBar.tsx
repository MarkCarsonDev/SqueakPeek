import { Typography } from "@mui/material";
import Link from "next/link";

interface ILinks {
  name: string;
  href: string;
}
export function NavBar() {
  const links: ILinks[] = [
    {
      name: "Explore",
      href: "/explore",
    },
    {
      name: "Message",
      href: "/message",
    },
    {
      name: "Track",
      href: "/track",
    },
    {
      name: "Profile",
      href: "/profile",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {links.map((link) => (
        <Link key={link.name} href={link.href}>
          <Typography variant="body1">{link.name}</Typography>
        </Link>
      ))}
    </div>
  );
}
