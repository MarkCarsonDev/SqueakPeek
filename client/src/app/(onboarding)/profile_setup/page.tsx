"use client";
import { useState } from "react";
import { Button, Avatar, Typography } from "@mui/material";
import { InputField } from "@/ui/InputField";
import {
  ProfileSetupState,
  createProfile,
} from "../../../lib/actions/profile_setup";
import { useFormState } from "react-dom"; // Assuming this is available for form state management
import "./profile_setup.css";
import { SearchDropdown } from "@/ui/track/SearchDropdown";
import { schools } from "@/lib/data/schools";

export default function ProfilePage() {
  const initialState: ProfileSetupState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createProfile, initialState); // Use form state hook
  const [chosenAvatar, setAvatar] = useState("");
  const [profileSchool, setSchool] = useState("");

  // TODO: Change with the real profile assets
  const avatars = [
    {
      profile: "/landingpage/track.svg",
      avatarType: "avatar1",
    },

    {
      profile: "/landingpage/insight.svg",
      avatarType: "avatar2",
    },
    {
      profile: "/landingpage/message.svg",
      avatarType: "avatar3",
    },
    {
      profile: "/landingpage/track.svg",
      avatarType: "avatar4",
    },
  ];

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
          {avatars.map(({ profile, avatarType }) => (
            <Avatar
              key={avatarType}
              src={profile}
              sx={{
                width: 80,
                height: 80,
                cursor: "pointer",
                margin: "0 10px",
                border:
                  avatarType === chosenAvatar
                    ? "4px solid #496FFF" // Highlight selected avatar
                    : "4px solid #E0E4F2", // Default border for unselected avatars
                opacity: avatarType === chosenAvatar ? 1 : 0.85,
                ":hover": {
                  opacity: 1,
                },
              }}
              onClick={() => setAvatar(avatarType)} // Select avatar on click
            />
          ))}
        </div>

        <Typography
          variant="h6"
          sx={{
            marginTop: "10px",
            marginBottom: "20px",
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Select an avatar
        </Typography>
        {/* Hidden input field for avatar */}
        <input type="hidden" name="avatar" value={chosenAvatar} />
        {/* Full Name */}
        <InputField
          fullWidth
          label="Full Name"
          placeholder="Enter your full name"
          variant="outlined"
          name="name"
          required
          helperText={state.errors?.name} // Display first name error
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
          helperText={state.errors?.username} // Display first username error
          sx={{ marginBottom: "15px" }}
        />

        {/* School */}
        <SearchDropdown
            label="School"
            placeholder="Enter your school"
            name="school"
            options = {schools} // Use static school data if API failed
            apiEndpoint="http://universities.hipolabs.com/search"
            queryKey="name"
            value={profileSchool ?? ""}
            onValueChange={(newValue) => setSchool(newValue ?? "")}
            helperText={state.errors?.school} // Display first school error
            fullWidth
            useApi={true} // Enable API integration
            style={{ marginBottom: "10px" }}
          />

        {/* Button container */}
        <div className="button-links">
          <Button
            className="borderline"
            variant="contained"
            type="submit"
            sx={{
              mt: 2,
              width: "200px",
              boxShadow: "none",
              backgroundColor: "#496FFF",
              borderRadius: "8px",
              ":hover": {
                backgroundColor: "#3B5AC6",
                boxShadow: "none",
              },
            }}
          >
            Create Profile
          </Button>
        </div>

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
      </form>
    </div>
  );
}
