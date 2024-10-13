"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";
const SignUpFormSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

// Used for getting errors for each field during form validation
export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function createAccount(formData: FormData) {
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
