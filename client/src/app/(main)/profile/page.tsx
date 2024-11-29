"use client";
import "@/app/(main)/profile/profile.css";
import { InputField } from "@/ui/InputField";
import { useEffect, useState, useMemo } from "react";
import { Button, Avatar, Typography } from "@mui/material";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useProfile } from "@/lib/store/profile";
import { useRouter } from "next/navigation";
import { SearchDropdown } from "@/ui/track/SearchDropdown";
import { schools } from "@/lib/data/schools";

export default function Page() {
  //Router Creation
  const router = useRouter();

  // Creates Supabase Client
  const supabase = useMemo(() => createSupabaseClient(), []);
  //Avatar data
  const avatars: {
    profile: string;
    avatarType: "avatar1" | "avatar2" | "avatar3" | "avatar4";
  }[] = [
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

  //Gets user profile using useProfile function
  const { profile } = useProfile();
  const [profileData, setProfileData] = useState<
    | {
        profile_id: string;
        username: string | null;
        avatar: "avatar1" | "avatar2" | "avatar3" | "avatar4";
        school: string | null;
      }[]
    | null
  >(null);

  // Creates chosenAvatar, username, school, and Profile ID Constants
  const [chosenAvatar, setAvatar] = useState<
    "avatar1" | "avatar2" | "avatar3" | "avatar4" | undefined
  >(undefined);
  const [profileUsername, setUsername] = useState<string | null>(null);
  const [profileSchool, setSchool] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);

  // checks if profile is null then calls fetchUserprofile
  useEffect(() => {
    if (profile && profile.profile_id) {
      fetchUserProfile(profile);
    }
  }, [profile?.profile_id]);

  // Checks if data is not null then sets username, school, and avater to values from profile table
  useEffect(() => {
    if (profileData && profileData.length > 0) {
      setUsername(profileData[0].username);
      setSchool(profileData[0].school);
      setAvatar(profileData[0].avatar);
      setProfileId(profileData[0].profile_id);
    }
  }, [profileData]);

  // Fetches user profile data
  async function fetchUserProfile(user: typeof profile) {
    if (!user) return; // return if user is null
    try {
      // Query the profile table using the user's profile_id
      const { data, error } = await supabase
        .from("profile")
        .select("profile_id, username, avatar, school")
        .eq("profile_id", user.profile_id);

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfileData(data);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }

  //Update profile table with new data using their profile ID
  const handleSubmit = async () => {
    if (profileUsername !== null && profileId) {
      const { data, error } = await supabase
        .from("profile")
        .update({
          username: profileUsername,
          school: profileSchool,
          avatar: chosenAvatar,
        })
        .eq("profile_id", profileId);

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        console.log("Profile updated successfully:", data);
        router.back()
      }
    } else {
      console.warn("Profile username or profile ID is missing.");
    }
  };

  return (
    <div className="profile_page_container">
      <form onSubmit={handleSubmit}>
        <div className="edit_profile">
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            Edit Profile
          </Typography>

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
                      ? "4px solid #496FFF" 
                      : "4px solid #E0E4F2", 
                  opacity: avatarType === chosenAvatar ? 1 : 0.85,
                  ":hover": {
                    opacity: 1,
                  },
                }}
                onClick={() => setAvatar(avatarType)} 
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

          {/* Username */}
          <InputField
            fullWidth
            label="Username"
            placeholder="Enter your username"
            variant="outlined"
            name="username"
            required
            defaultValue={profileUsername}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: "15px" }}
          />

          {/* School */}
          <SearchDropdown
            label="School Name"
            placeholder="Enter your school name"
            options = {schools} // Static options if API failed
            apiEndpoint="http://universities.hipolabs.com/search"
            queryKey="name"
            value={profileSchool || ""}
            onValueChange={(newValue) =>
              setSchool(newValue || "")
            }
            useApi={true} // Enable API integration
            style={{ marginBottom: "10px" }}
          />
          {/* Button container */}
          <div className="button-links">
            <Button
              className="borderline"
              variant="outlined"
              onClick={() => router.back()}
              sx={{
                mt: 2,
                width: "200px",
                boxShadow: "none",
                borderRadius: "8px",
                ":hover": {
                  backgroundColor: "#3B5AC6",
                  boxShadow: "none",
                  color: "white",
                },
              }}
            >
              Cancel
            </Button>

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
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
