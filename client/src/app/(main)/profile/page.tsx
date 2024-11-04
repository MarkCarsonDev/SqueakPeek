"use client"
import "@/app/(main)/profile/profile.css"
import { InputField } from "@/ui/InputField";
import { useEffect, useState, useMemo} from "react";
import { Button, Avatar, Typography } from "@mui/material";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useProfile } from "@/lib/store/profile";



export default function Page() {

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

  //Gets profile data using useProfile function
  const { profile } = useProfile(); 
  const [profileData, setProfileData] = useState<
    { profile_id: string; username: string | null; email: string | null; avatar: "avatar1" | "avatar2" | "avatar3" | "avatar4"; school: string | null; }[] | null
  >(null);

  // Creates Supabase Client
  const supabase = useMemo(() => createSupabaseClient(), []);

  // Creats chosenAvatar, username 
  const [chosenAvatar, setAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [school, setSchool] = useState<string | null>(null);

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
    }
  }, [profileData]);

  // Fetches user profile data
  async function fetchUserProfile(user: typeof profile) {
    if (!user) return; // return if user is null
    try {
      // Query the profile table using the user's profile_id
      const { data, error } = await supabase
        .from("profile")
        .select("profile_id, username, email, avatar, school")
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


  return (



    <div className="profile_page_container">
      <div className="edit_profile">
        
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

        {/* Username */}
        <InputField
          fullWidth
          label="Username"
          placeholder="Enter your username"
          variant="outlined"
          name="username"
          required
          defaultValue={username} // Display first username error
          sx={{ marginBottom: "15px" }}
        />

        {/* School */}
        <InputField
          fullWidth
          label="School"
          placeholder="Enter your school"
          variant="outlined"
          name="school"
          defaultValue={school} // Display first school error
          sx={{ marginBottom: "15px" }}
        />
      </div>
    </div>
  );

}

