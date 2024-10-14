"use client";
import { useState } from "react";
import { Button, Avatar, Typography, Link } from "@mui/material";
import { InputField } from "@/ui/InputField";
import {ProfileSetupState,createProfile} from "../../../../lib/actions/profile_setup";
import { useFormState } from "react-dom"; // Assuming this is available for form state management
import "/src/theme/global.css";
import "./profile_setup.css";

export default function ProfilePage() {
  const initialState: ProfileSetupState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createProfile, initialState); // Use form state hook

  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    school: "",
    avatar: "", // Default to no avatar selected initially
  });

  const avatars = [
    "/LandingPage-images/rat_1.png",
    "/LandingPage-images/rat_1.png",
    "/LandingPage-images/rat_1.png",
    "/LandingPage-images/rat_1.png",
  ];

  // Handle avatar selection
  const handleAvatarSelect = (avatar: string) => {
    setProfileData((prev) => ({ ...prev, avatar }));
    console.log(`Selected Avatar: ${avatar}`);
  };

  return (
    <div className="main-container">
      <form action={formAction} className="profile-setup">
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Profile Setup
        </Typography>

        {/* Avatar Images sections */}
        <div className="avatar-container">
          {avatars.map((avatar, index) => (
            <Avatar
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              sx={{
                width: 80,
                height: 80,
                cursor: "pointer",
                margin: "0 10px",
                border:
                  profileData.avatar === `avatar${index + 1}`
                    ? "4px solid #496FFF" // Highlight selected avatar
                    : "4px solid #E0E4F2", // Default border for unselected avatars
                opacity: profileData.avatar === `avatar${index + 1}` ? 1 : 0.85,
                ":hover": {
                  opacity: 1,
                },
              }}
              onClick={() => handleAvatarSelect(`avatar${index + 1}`)} // Select avatar on click
            />
          ))}
        </div>

        <Typography
          variant="h6"
          sx={{ marginTop: "10px", marginBottom: "20px", fontWeight: "bold", alignSelf: "center" }}
        >
          Select an avatar
        </Typography>

        {/* Full Name */}
        <InputField
          fullWidth
          label="Full Name"
          placeholder="Enter your full name"
          variant="outlined"
          name="name"
          required
          value={profileData.name}
          onChange={(e) =>
            setProfileData({ ...profileData, name: e.target.value })
          }
          helperText={state.errors?.name?.[0]} // Display first name error
          sx={{ marginBottom: "15px" }}
        />

        {/* Username */}
        <InputField
          fullWidth
          label="Username"
          placeholder="Enter your username"
          variant="outlined"
          name="username"
          required
          value={profileData.username}
          onChange={(e) =>
            setProfileData({ ...profileData, username: e.target.value })
          }
          helperText={state.errors?.username?.[0]} // Display first username error
          sx={{ marginBottom: "15px" }}
        />

        {/* School */}
        <InputField
          fullWidth
          label="School"
          placeholder="Enter your school"
          variant="outlined"
          name="school"
          value={profileData.school}
          onChange={(e) =>
            setProfileData({ ...profileData, school: e.target.value })
          }
          helperText={state.errors?.school?.[0]} // Display first school error
          sx={{ marginBottom: "15px" }}
        />

        {/* Submit button */}
        <div className="button-links">
        <Link href="/dashboard">
          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 2,
              width: "200px",
              boxShadow: "none",
              alignSelf: "center",
              backgroundColor: "#496FFF",
              ":hover": {
                backgroundColor: "#3B5AC6",
                boxShadow: "none",
              },
            }}
          >
            Create Profile
          </Button>
        </Link>

        {/* Anonymity text */}
        <Typography
          variant="subtitle2"
          sx={{
            marginTop: "40px",
            textAlign: "center",
            color: "#6E7191",
          }}
        >
          Your anonymity is valued.
          <br />
          Information we collect will not be shared.
        </Typography>
        </div>
      </form>
    </div>
  );
}
