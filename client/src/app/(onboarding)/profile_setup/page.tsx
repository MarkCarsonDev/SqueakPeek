"use client";
import { Button, Avatar, Typography } from "@mui/material";
import "/src/theme/global.css";
import "./profile_setup.css";
import { InputField } from "@/ui/InputField";
export default function ProfilePage() {
  const avatars = [
    "/LandingPage-images/rat_1.png",
    "/LandingPage-images/rat_1.png",
    "/LandingPage-images/rat_1.png",
    "/LandingPage-images/rat_1.png",
  ];
  return (
    <div className="main-container">
      <div className="profile-setup">
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
                border: "4px solid #E0E4F2",
                opacity: 0.85,
                ":hover": {
                  opacity: 1,
                },
              }}
              onClick={() => {
                // Handle avatar selection logic here
                console.log(`Avatar ${index + 1} selected`);
              }}
            />
          ))}
        </div>

        {/* Select Avatar Text */}
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

        {/* This is the InputField component */}
          <InputField
            fullWidth
            className="input-field"
            label="Full Name"
            placeholder="Enter your full name"
            variant="outlined"
            required
            sx={{ marginBottom: "20px", width: "100%" }}
          />
          <InputField
            fullWidth
            label="Username"
            placeholder="Enter your username"
            variant="outlined"
            required
            sx={{ marginBottom: "20px" }}
          />
          <InputField
            fullWidth
            label="School"
            placeholder="Enter your school"
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          />
          
        {/* Submit button */}
        <Button
            variant="contained"
            sx={{
              mt: 2,
              width: "200px",
              boxShadow: "none",
              backgroundColor: "#496FFF",
              alignSelf: "center",
              ":hover": {
                backgroundColor: "#3B5AC6",
                boxShadow: "none",
              },
            }}
          >
            Create Account
          </Button>

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
    </div>
  );
}
