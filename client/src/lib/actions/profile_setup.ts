"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { Json } from "@/lib/types/database.types"
import { redirect } from "next/navigation";

//console.log("***** BEGIN profile_setup.ts ******");

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

export async function userHasExistingProfile() : Promise<boolean>{
  //console.log("start of userHasExistingProfile() function");
  const userProfile = await getProfileForUser();
  return (userProfile) ? true: false;
} // end of userHasExistingProfile

export async function getUserId() : Promise<string|null> {
  //console.log("start of getUserId() function");
  const supabase = createSupabaseServer();
  const { data: {user}, error: userError } =  await supabase.auth.getUser();
  if (userError) {
      console.log("ERROR: " + userError);
      return null;
  }
  
  const userId = user?.id;
  
  if(userId) {
    return userId;
  }
  return null;
} // end of getUserId

//getProfileForUser gets profile for currently auth'd user
export async function getProfileForUser() : Promise<Json|null>{
  //console.log("start of getProfileForUser() function");
  const user_id = await getUserId();
  if(!user_id) {
    //console.log("No user_id: GetUserId() returned null");
    return null;
  }
  const supabase = createSupabaseServer();
    
  //query for profile by user_id
  const { data, error } = await supabase
    .from("profile")
    .select('*')
    .eq("user_id", user_id);

    if (error) {
      //console.log("ERROR: unable to fetch profile by userid");
      //console.log("error: "+ error);
      return null;
    }

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

  //console.log("start of getProfileByUserName() function");
  const supabase = createSupabaseServer();
    
  //query for profile by username
  const { data, error } = await supabase
    .from("profile")
    .select('*')
    .eq("username", username);

    if (error) {
      //console.log("ERROR: retrieving profile by username: "+ error);
      return null;
    }

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
  if (await userHasExistingProfile()) {
    //console.log("USER has an existing profile.")
    return {
      errors: {
        school: ["ERROR: User has an existing profile"],
      } 
    };
  }
  else {
    //console.log("USER doesn't have a profile");
    // Validate form data with Zod schema
    const validatedFields = ProfileSetupFormSchema.safeParse({
      name: formData.get("name"),
      username: formData.get("username"),
      school: formData.get("school"),
      avatar: formData.get("avatar"),
    });

    if (!validatedFields.success) {
      //console.log("ERROR: zod validation failed");
      return { errors: validatedFields.error.flatten().fieldErrors };
    }
    else {
      //console.log("Zod validation success, checking unique username");
      const supabase = createSupabaseServer();
      const { data: {user}, error: userError } =  await supabase.auth.getUser();
      if (userError) {
        //console.log("ERROR: no supabase user");
      }

      const { username, school, avatar } = validatedFields.data;
      
      const profileData = await getProfileByUserName(validatedFields.data.username);
      if(!profileData) { 
        //insert profile into supabase
        const userID = user?.id;
        //console.log("inserting user with user_id into DB: " + userID);
        const { error } = await supabase.from("profile").insert({
          user_id: userID,
          username,
          school,
          avatar,
        });

        if (error) {
          //console.log("insert profile error: "+ error);
          return error;
        }
        else {
          // Redirect to the dashboard after successful profile creation
          //console.log("Profile Created: redirecting to dashboard");
          redirect("/explore");
        }
      } // end of profile insertion
      else { // end of insert to supabase check
        // profile data exists, username taken
        //console.log("username " + username + " already exists. try another username");
        return {
          errors: {
            username: ["Username already exists, try another username"],
          }
        }
      } // end of else for existing username
    } // end of checking for unqiue username
  } // end else of zod validation
} // end createProfile