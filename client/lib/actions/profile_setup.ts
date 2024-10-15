"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { redirect } from "next/navigation";

// Zod schema to validate the profile setup form
const ProfileSetupFormSchema = z.object({
  name: z.string(),
  username: z.string(),
  school: z.string().optional(),
  avatar: z.enum(["avatar1", "avatar2", "avatar3", "avatar4"]),
});

export type ProfileSetupState = {
  errors?: {
    name?: string[];
    username?: string[];
    school?: string[];
    avatar?: string[];
  };
  message?: string | null;
};

export async function createProfile(
  prevState: ProfileSetupState,
  formData: FormData
): Promise<ProfileSetupState> {
  console.log("createProfile");

  // Validate form data with Zod schema
  const validatedFields = ProfileSetupFormSchema.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    school: formData.get("school"),
    avatar: formData.get("avatar"),
  });

  if (!validatedFields.success) {
    console.log("validation failed");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Incorrect fields. Create Profile Failed",
    };
  }

  const { name, username, school, avatar } = validatedFields.data;
  console.log("avatar: ", avatar);
  const supabase = createSupabaseServer();

  // Retrieve the authenticated user to get the user ID
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log("User: ", user);

  if (userError) {
    console.log("Error retrieving user:", userError.message);
    return { message: "Error retrieving user information" };
  }

  // Ensure we have a valid user ID
  const userId = user?.id;
  if (!userId) {
    return { message: "User not authenticated" };
  }

  // TODO: Finish implementation to insert a profile
  // update the profile in Supabase
  const { error } = await supabase.from("profile").insert({
    user_id: userId,
    name,
    username,
    school,
    avatar,
  });

  if (error) {
    console.log("Error occurred creating profile:", error);
    return { message: "Database Error" };
  }

  // Redirect to the dashboard after successful profile creation
  redirect("/dashboard");
}
