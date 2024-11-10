"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { redirect } from "next/navigation";

// add form validation here
// error validation from signup.tsx
/**
    //     const formErrors = { email: "", password: "", confirmPassword: "" };
  //     let isValid = true;

  //     if (!email) {
  //       formErrors.email = "Email is required";
  //       isValid = false;
  //     }

  //     if (!password) {
  //       formErrors.password = "Password is required";
  //       isValid = false;
  //     }

  //     if (password !== confirmPassword) {
  //       formErrors.confirmPassword = "Passwords do not match";
  //       isValid = false;
  //     } else if (!confirmPassword) {
  //       formErrors.confirmPassword = "Confirm password is required";
  //       isValid = false;
  //     }
 */

//TODO add form validation here. Assuming the forms are valid for now
const SignUpFormSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
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
    console.log("error occured creating account: ", error);
    return { message: "Database Error" };
  }

  redirect("/profile_setup");
}
