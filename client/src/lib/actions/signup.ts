"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { redirect } from "next/navigation";

const SignUpFormSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  }); // form validation if confirm password does not equal password

// Used for getting errors for each field during form validation
export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

// Creates an account though the email provider from Supabase
export async function createAccount(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  console.log("createAccount: Signing up");

  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // form validation fails
  if (!validatedFields.success) {
    // add error meesages
    return {
      errors: validatedFields.error.flatten().fieldErrors, // returns error for each field
      message: "Incorrect Fields. Sign Up Failed",
    };
  }

  const { email, password } = validatedFields.data;

  // call supabase to create account
  const supabase = createSupabaseServer();
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    let errorMessage = error + "";
    errorMessage = errorMessage.replace("AuthApiError: ", "") + ": Please choose another email";
    console.log("errorMessage: ", errorMessage);
    
    return {
      errors: {
        email: [errorMessage],
      } 
    };
  }
  redirect("/profile_setup");
}