"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
import { redirect } from "next/navigation";

//TODO add form validation here. Assuming the forms are valid for now
const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// TODO: Make this a 'FormState' rather than having to create this type for every single form
export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

// Logs in through the email provider from Supabase
export async function loginAccount(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  console.log("createAccount");

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // form validation fails
  if (!validatedFields.success) {
    // add error meesages
    return {
      errors: validatedFields.error.flatten().fieldErrors, // returns error for each field
      message: "Incorrect Fields. Login Failed",
    };
  }

  const { email, password } = validatedFields.data;

  // call supabase to create account
  const supabase = createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.log("Error loging in: ", error);
    return { message: "Login Failed" };
  }

  redirect("/explore");
}
