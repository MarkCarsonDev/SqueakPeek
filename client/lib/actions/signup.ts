"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
const SignUpFormSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export async function createAccount(formData: FormData) {
  //TODO add form validation here. Assuming the forms are valid for now
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // form validation fails
  if (!validatedFields.success) {
    // add error meesages
    return {
      errors: "", // errors for each field
      message: "", // one message describing the failutre
    };
  }

  const { email, password, confirmPassword } = validatedFields.data;

  // call supabase to create account
  const supabase = createSupabaseServer();
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
}
