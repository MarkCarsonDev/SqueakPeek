"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function sendPasswordResetEmail(prevState, formData: FormData) {
  const validated = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, message: "Invalid email" };
  }

  const supabase = createSupabaseServer();
  const { error } = await supabase.auth.api.resetPasswordForEmail(validated.data.email);

  if (error) {
    return { errors: { email: [error.message] }, message: "Failed to send reset email." };
  }

  return { message: "Password reset email sent successfully!" };
}

const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function resetPassword(prevState, formData: FormData) {
  const validated = ResetPasswordSchema.safeParse({
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, message: "Invalid fields" };
  }

  const supabase = createSupabaseServer();
  const { error } = await supabase.auth.api.updateUser({
    password: validated.data.newPassword,
  });

  if (error) {
    return { errors: { newPassword: [error.message] }, message: "Failed to reset password." };
  }

  return { message: "Password reset successfully!" };
}
