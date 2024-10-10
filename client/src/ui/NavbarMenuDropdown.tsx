"use client";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export function NavbarMenuDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const pushToProfile = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignContent: "center",
        marginRight: "1%",
      }}
    >
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ border: "solid 3px #e0e4f2" }}
        size="small"
      >
        <Image
          src={"/LandingPage-images/rat_1.png"}
          height={40}
          width={40}
          alt="Avatar icon"
          style={{
            objectFit: "cover",
            objectPosition: "bottom",
            marginBottom: "5%",
            marginRight: "2%",
          }}
        />
      </IconButton>
      <FontAwesomeIcon
        icon={open ? faChevronUp : faChevronDown}
        style={{ marginLeft: "8px", color: "#e0e4f2" }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ border: "solid 3px #e0e4f2" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: -5,
          horizontal: -20,
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            pushToProfile();
          }}
        >
          <Typography variant="body1">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "10%" }} />
            Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          <Typography variant="body1">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ marginRight: "5%" }}
            />
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
