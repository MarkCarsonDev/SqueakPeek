"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { redirect } from "next/navigation";

// zod schema
const ResetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  // check if passwords match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Used for getting errors for each field during form validation
export type ResetPasswordState = {
    errors?: {
      password?: string[];
      confirmPassword?: string[];
    };
    message?: string | null;
  };

export async function resetPassword (
    prevState: ResetPasswordState,
    formData: FormData
): Promise<ResetPasswordState> {

  // safeParse to async. get validated fields
  const validatedFields = ResetPasswordSchema.safeParse({
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

  // consts for password
  const { password } = validatedFields.data;

  // call supabase to reset password
  const supabase = createSupabaseServer();
  const { error } = await supabase.auth.updateUser({
    password: password
  });

  // error handling
  if (error) {

    // error message
    let errorMessage = error + "";
    errorMessage = errorMessage.replace("AuthApiError: ", "");
    
    return {
      errors: {
      } 
    };
  }
  // redirect after successful password reset
  redirect("/");
}