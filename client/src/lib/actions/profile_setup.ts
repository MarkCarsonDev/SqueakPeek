"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { Json } from "@/lib/types/database.types"

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
  console.log("TRACE: ", msg);
}

export async function returnError(error_msg: string){
  console.log("User has an existing profile");
  return {
    errors: {
      username: ["User has an existing profile"],
    } ,
    message: "WTF?: ",
  };
}

export async function userHasExistingProfile() : Promise<Boolean>{
  trace("start of userHasExistingProfile() function");
  const userId =  await getUserId();
  let userProfile = await getProfileForUser();
  return (userProfile) ? true: false;
}

//TODO: error handling for function
export async function getUser(): Promise<Json> {
  trace("start of getUser() function");
  const supabase = createSupabaseServer();
  const data =  await supabase.auth.getUser();

  const jsonDataStr = JSON.stringify(data, null, 2);
  let jsonData = JSON.parse(jsonDataStr);
  //console.log("EXTRACTED JSON DATA: ",jsonData);
  return jsonData;
}

export async function getUsername(){
  return trace("getUsername() not implemented")
  return "getUsername() not implemented"
}
//TODO add error handling
export async function getUserId() : Promise<String|null> {
  trace("start of getUserId() function");
  const supabase = createSupabaseServer();
  const {
    data:{user},
    error: userError,
  } =  await supabase.auth.getUser();
  const userId=user?.id;
  trace("userId: "+ userId);
  if(userId){
    return userId;
  }
  return null;
}

export async function getProfileForUser() : Promise<Json|null>{

  trace("start of getProfileForUser() function");
  const user_id = getUserId();
  const supabase = createSupabaseServer();
    
  //query for profile by user_id
  const { data } = await supabase
    .from("profile")
    .select('*')
    .eq("user_id", user_id);

    const profileDataStr = JSON.stringify(data, null, 2);
    console.log("profileDataStr: ", profileDataStr);
    let profileJson = JSON.parse(profileDataStr);
    console.log("profileJson: ", profileJson);
    return (profileJson && profileJson[0]) ? profileJson : null;
}
export async function getProfileByUserName(user_name: string) : Promise<Json|null>{

  trace("start of getProfileForUser() function");
  const user_id = getUserId();
  const supabase = createSupabaseServer();
    
  //query for profile by user_id
  const { data } = await supabase
    .from("profile")
    .select('*')
    .eq("user_name", user_name);

    const profileDataStr = JSON.stringify(data, null, 2);
    let profileJson = JSON.parse(profileDataStr);
    //console.log("JSON DATA: ",userJson);
    return profileJson[0] ? profileJson : null;
}

//Create profile
export async function createProfile(
  
  prevState: ProfileSetupState,
  formData: FormData

  //Begin of promise
): Promise<ProfileSetupState> {

  //TODO use previous state to update the name, avatar, and school that was input fields
  //for create profile where there username was already exists
  //console.log("Previous State: ", prevState);

  if (await userHasExistingProfile()){
    console.log("Client has an existing profile.")
    return {
      errors: {
        school: ["ERROR: User has an existing profile. Redirect to ???"],
      } 
    };
    
  }
  else{
      //Created profile boolean
      let createdProfile = false;

      // Validate form data with Zod schema
      const validatedFields = ProfileSetupFormSchema.safeParse({
        name: formData.get("name"),
        username: formData.get("username"),
        school: formData.get("school"),
        avatar: formData.get("avatar"),
      });

      if (!validatedFields.success)
      {
        console.log("ERROR: zod validation failed");
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Incorrect fields. Create Profile Failed",
        };
      }
      else
      {
        trace("Zod validation success, checking unique username");
        
        let user_profile = getProfileForUser();
        let user_id = getUserId();
        //console.log("DEBUG: user_profile: ", user_profile);
        const {username,school,avatar} = validatedFields.data;
        if(!getProfileByUserName(validatedFields.data.username))
        {
          //update the profile in Supabase
          const supabase = createSupabaseServer();
          const { error } = await supabase.from("profile").insert({
            userId: user_id,
            username,
            school,
            avatar,
          });
          if (error)
          {
            return { 
              errors: {
                school: ["Error Updating Profile @ line 129"],
              } ,
              message: "DEBUG: we need to catch username",
            };
          }
        else
        {
          // Redirect to the dashboard after successful profile creation
          console.log("TRACE: no error: redirecting to dashboard");
          createdProfile = true;
        }
        return {
          errors: {
            username: ["Return for Promise: FIX ME"],
          }
        };

        }
    }//endof existing profile check
  } //end of Promise
}//end createProfile