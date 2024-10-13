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

  //function to open menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //closes menu when called
  const handleClose = () => {
    setAnchorEl(null);
  };

  // router to push to profile page
  const router = useRouter();

  // funciton to push to profile page
  const pushToProfile = () => {
    router.push("/profile");
  };

  // Dummy function to handle login logic
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignContent: "center",
        marginRight: "15px",
      }}
    >
      {/* IconButton Section Note: Image should be replaced in future with users avatar choice*/}
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ border: "solid 3px #e0e4f2" }}
        size="small"
      >
        {/* This will be replaced */}
        <Image
          src={"/LandingPage-images/rat_1.png"}
          height={40}
          width={40}
          alt="Avatar icon"
          style={{
            objectFit: "cover",
            objectPosition: "bottom",
            marginBottom: "5px",
            marginRight: "2px",
          }}
        />
      </IconButton>

      {/* Menu open arrow */}
      <FontAwesomeIcon
        icon={open ? faChevronUp : faChevronDown}
        style={{ marginLeft: "8px", color: "#e0e4f2" }}
      />

      {/* Menu Note: Styling is handled using the Paper root*/}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "#959DA533 0px 8px 24px",
            border: "solid 2px #e0e4f2",
          },
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{
          vertical: -5,
          horizontal: 0,
        }}
      >
        {/* List of menu items */}

        {/* Profile menu item. onclick fucntions both close the dropdown menu and push to profile page */}
        <MenuItem
          onClick={() => {
            handleClose();
            pushToProfile();
          }}
        >
          <Typography variant="body1">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
            Profile
          </Typography>
        </MenuItem>

        {/* Logout menu item. onclick function include closing the menu "note may not be necessary" and a function to handle the logout logic */}
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          <Typography variant="body1">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ marginRight: "5px" }}
            />
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
