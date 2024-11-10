"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { Json } from "@/lib/types/database.types"
import { redirect } from "next/navigation";

let TRACE = false;

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

//utility function 
export async function trace(msg: string){
  if (TRACE){
    console.log("TRACE: ", msg);
  }
}

export async function userHasExistingProfile() : Promise<Boolean>{
  trace("start of userHasExistingProfile() function");
  let userProfile = await getProfileForUser();
  console.log("userProfile: ", userProfile);
  TRACE = false;
  return (userProfile) ? true: false;
}

export async function getUser(): Promise<Json> {
  trace("start of getUser() function");
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
  }
  const jsonDataStr = JSON.stringify(user, null, 2);
  let jsonData = JSON.parse(jsonDataStr);
  //console.log("EXTRACTED JSON DATA: ",jsonData);
  return jsonData;
}

export async function getUserId() : Promise<String|null> {
  trace("start of getUserId() function");
  const supabase = createSupabaseServer();
  const {
    data: {user},
    error: userError,
  } =  await supabase.auth.getUser();
  if (userError) {
      return null;
  }
  const userId = user?.id;
  trace("userId: "+ userId);
  if(userId){
    return userId;
  }
  return null;
}

export async function getProfileForUser() : Promise<Json|null>{
  TRACE = false;
  trace("start of getProfileForUser() function");
  const user_id = getUserId();
  if(!user_id){
    return null;
  }

  const supabase = createSupabaseServer();
    
  //query for profile by user_id
  TRACE = true;
  const { data, error} = await supabase
    .from("profile")
    .select('*')
    .eq("user_id", user_id);

    if (error) {
      console.log("getProfileForUser returning null: ", error);
      return null;
    }

    const profileDataStr = JSON.stringify(data, null, 2);
    trace("profileDataStr: " + profileDataStr);
    let profileJson = JSON.parse(profileDataStr);
    console.log("profileJson: ", profileJson);
    if (profileJson && profileJson[0]){
      return profileJson[0];
    }
    else {
      trace("No profile: return null");
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
      console.log("ERROR: retrieving profile by userId: ", error);
      return null;
    }

    const profileDataStr = JSON.stringify(data, null, 2);
    let profileJson = JSON.parse(profileDataStr);
    //console.log("JSON DATA: ", profileJson);
    if (profileJson && profileJson[0]){
      return profileJson[0];
    }
    else {
      trace("No profile: return null");
      return null
    }
}

let redirectDashboard = false;

//Create profile
export async function createProfile( prevState: ProfileSetupState, formData: FormData ): Promise<ProfileSetupState> {

  TRACE = true;

  if (await userHasExistingProfile()){
    console.log("USER has an existing profile.")
    TRACE = false;
    return {
      errors: {
        school: ["ERROR: User has an existing profile"],
      } 
    };
  }
  
  else {
    trace("USER doesn't have a profile");
    TRACE = false;
    // Validate form data with Zod schema
    const validatedFields = ProfileSetupFormSchema.safeParse({
      name: formData.get("name"),
      username: formData.get("username"),
      school: formData.get("school"),
      avatar: formData.get("avatar"),
    });

    if (!validatedFields.success) {
      console.log("ERROR: zod validation failed");
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
        console.log("user ", user);
      }

      const {username,school,avatar} = validatedFields.data;
      
      //TODO working here
      trace("about to call getProfileByUserName");
      const profileData = await getProfileByUserName(validatedFields.data.username);
      if(!profileData)
      { 
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
          redirectDashboard = true;
          return {
            errors: {
              school: ["Profile Created. redirect to dashboard"],
            }
          }
        } // end else for error

      } else {// end of insert to supabase check
        //nothing else to do, return promise
        trace("username " + username + " already exists. try another username");
        return {
          errors: {
            username: ["ERROR: username ", username, " already exists. try another username"],
          }
        }
      }
    } // end of checking for unqiue username
  } // end else of zod validation
} // end createProfile
if (redirectDashboard){
  redirect("/dashboard");
}