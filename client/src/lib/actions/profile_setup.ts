"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { Json } from "@/lib/types/database.types"
import { redirect } from "next/navigation";

trace("***** BEGIN profile_setup.ts ******");

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

//trace utility function 
export async function trace(msg: string){
    console.log("TRACE: ", msg);
}

export async function userHasExistingProfile() : Promise<Boolean>{
  trace("start of userHasExistingProfile() function");
  let userProfile = await getProfileForUser();
  return (userProfile) ? true: false;
}

export async function getUser(): Promise<Json> {
  trace("start of getUser() function");
  const supabase = createSupabaseServer();
  const { data: {user}, error: userError } =  await supabase.auth.getUser();
  if (userError)
  {
      return { 
        errors: {
          school: ["Error: No user"],
        }
      }
  }
  const jsonDataStr = JSON.stringify(user, null, 2);
  let jsonData = JSON.parse(jsonDataStr);
  return jsonData;
}

export async function getUserId() : Promise<String|null> {
  trace("start of getUserId() function");
  const supabase = createSupabaseServer();
  const { data: {user}, error: userError } =  await supabase.auth.getUser();
  if (userError) {
      trace("ERROR: " + userError);
      return null;
  }
  
  const userId = user?.id;
  
  if(userId){
    return userId;
  }
  return null;
}

export async function getProfileForUser() : Promise<Json|null>{
  trace("start of getProfileForUser() function");
  const user_id = await getUserId();
  if(!user_id){
    trace("No user_id: GetUserId() returned null");
    return null;
  }
  const supabase = createSupabaseServer();
    
  //query for profile by user_id
  const { data, error } = await supabase
    .from("profile")
    .select('*')
    .eq("user_id", user_id);

    if (error) {
      trace("ERROR: unable to fetch profile by userid");
      console.log("error: ", error);
      return null;
    }

    const profileDataStr = JSON.stringify(data, null, 2);
    let profileJson = JSON.parse(profileDataStr);
    
    if (profileJson && profileJson[0]){
      return profileJson[0];
    }
    else {
      return null
    }
}
export async function getProfileByUserName(username: string) : Promise<Json|null>{

  trace("start of getProfileByUserName() function");
  const supabase = createSupabaseServer();
    
  //query for profile by username
  const { data, error } = await supabase
    .from("profile")
    .select('*')
    .eq("username", username);

    if (error){
      console.log("ERROR: retrieving profile by username: ", error);
      return null;
    }

    const profileDataStr = JSON.stringify(data, null, 2);
    let profileJson = JSON.parse(profileDataStr);

    if (profileJson && profileJson[0]){
      return profileJson[0];
    }
    else {
      return null
    }
}

//Create profile
export async function createProfile( prevState: ProfileSetupState, formData: FormData ): Promise<ProfileSetupState> {

  if (await userHasExistingProfile()){
    trace("USER has an existing profile.")
    return {
      errors: {
        school: ["ERROR: User has an existing profile"],
      } 
    };
  }
  
  else {
    trace("USER doesn't have a profile");
    // Validate form data with Zod schema
    const validatedFields = ProfileSetupFormSchema.safeParse({
      name: formData.get("name"),
      username: formData.get("username"),
      school: formData.get("school"),
      avatar: formData.get("avatar"),
    });

    if (!validatedFields.success) {
      trace("ERROR: zod validation failed");
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Incorrect fields. Create Profile Failed",
      };
    }
    else {
      trace("Zod validation success, checking unique username");
      const supabase = createSupabaseServer();
      const {
        data: {user},
        error: userError,
      } =  await supabase.auth.getUser();
      if (userError)
      {
          return { 
            errors: {
              school: ["Error: No user"],
            } ,
            message: "Where is this message?",
          };
      } else
      {
        trace("got logged in user ");
      }

      const { username, school, avatar } = validatedFields.data;
      
      trace("about to call getProfileByUserName");
      const profileData = await getProfileByUserName(validatedFields.data.username);
      if(!profileData) { 
        trace("INFO: no profile data found for username:" + username);
        //insert profile into supabase
        let userID = user?.id;
        trace("inserting user with user_id into DB " + userID);
        const { error } = await supabase.from("profile").insert({
          user_id: userID,
          username,
          school,
          avatar,
        });

        if (error) {
          console.log("insert profile error: ", error);
          return error;
        }
        else {
          // Redirect to the dashboard after successful profile creation
          console.log("Profile Created: redirecting to dashboard");
          redirect("/dashboard");
          
        } // end else for error
      }
      else { // end of insert to supabase check
        // profile data exists, username taken
        trace("username " + username + " already exists. try another username");
        return {
          errors: {
            username: ["ERROR: username ", username, " already exists. try another username"],
          }
        }
      } // end of else for existing username
    } // end of checking for unqiue username
  } // end else of zod validation
} // end createProfile