"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { Json } from "@/lib/types/database.types"
import { redirect } from "next/navigation";

// Zod schema to validate the profile setup form
const ProfileSetupFormSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    school: z.string().optional(),
    avatar: z.enum(["avatar1", "avatar2", "avatar3", "avatar4"]),
  });

//Session SetupState
export type ProfileSetupState = {
  errors?: {
    name?: string[];
    username?: string[];
    school?: string[];
    avatar?: string[];
  };
  message?: string | null;
};

// check if user has existing profile
export async function userHasExistingProfile() : Promise<boolean>{
  const userProfile = await getProfileForUser();
  return (userProfile) ? true: false;
} // end of userHasExistingProfile

// get user_id from Supabase
export async function getUserId() : Promise<string|null> {
  const supabase = createSupabaseServer();
  const { data: {user}, error: userError } =  await supabase.auth.getUser();
  if (userError) {
      return null;
  }
  const userId = user?.id;
  if(userId) {
    return userId;
  }
  return null;
} // end of getUserId

// gets profile for currently auth'd user
export async function getProfileForUser() : Promise<Json|null>{
  const user_id = await getUserId();
  if(!user_id) {
    return null;
  }
  const supabase = createSupabaseServer();
    
  //query for profile by user_id
  const { data, error } = await supabase
    .from("profile")
    .select('*')
    .eq("user_id", user_id);

    if (error) {
      return null;
    }

    // parsing
    const profileDataStr = JSON.stringify(data, null, 2);
    const profileJson = JSON.parse(profileDataStr);
    
    if (profileJson && profileJson[0]) {
      return profileJson[0];
    }
    else {
      return null
    }
} // end of getProfileForUser

export async function getProfileByUserName(username: string) : Promise<Json|null>{
  const supabase = createSupabaseServer();
    
  //query for profile by username
  const { data, error } = await supabase
    .from("profile")
    .select('*')
    .eq("username", username);

    if (error) {
      return null;
    }
    
    // parsing
    const profileDataStr = JSON.stringify(data, null, 2);
    const profileJson = JSON.parse(profileDataStr);

    if (profileJson && profileJson[0]) {
      return profileJson[0];
    }
    else {
      return null
    }
} // end of getProfileByUserName

export async function createProfile( prevState: ProfileSetupState, formData: FormData ): Promise<ProfileSetupState> {
  // error handling for user with existing profile
  if (await userHasExistingProfile()) {
    return {
      errors: {
        school: ["ERROR: User has an existing profile"],
      } 
    };
  }
  else {
    // Validate form data with Zod schema
    const validatedFields = ProfileSetupFormSchema.safeParse({
      name: formData.get("name"),
      username: formData.get("username"),
      school: formData.get("school"),
      avatar: formData.get("avatar"),
    });

    // zod error handling
    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }
    else {
      // get user from supabase
      const supabase = createSupabaseServer();
      const { data: {user}, error: userError } =  await supabase.auth.getUser();
      const { username, school, avatar } = validatedFields.data;
      
      //error handling for profile data
      const profileData = await getProfileByUserName(validatedFields.data.username);
      if(!profileData) { 
      
        //insert profile into supabase
        const userID = user?.id;
        const { error } = await supabase.from("profile").insert({
          user_id: userID,
          username,
          school,
          avatar,
        });

        if (error) {
          return error;
        }
        
        else {

          // Redirect to the explore after successful profile creation
          redirect("/explore");
        }
      } // end of profile insertion
      else {

        // profile data exists, username taken
        return {
          errors: {
            username: ["Username already exists, try another username"],
          }
        }
      } // end of else for existing username
    } // end of checking for unqiue username
  } // end else of zod validation
} // end createProfile