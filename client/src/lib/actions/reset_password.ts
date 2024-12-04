"use server";
import { z } from "zod";
import { createSupabaseServer } from "../supabase/server";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const sendPasswordResetEmail = async (
  state: { errors: { email?: string[] } | undefined; message: string },
  formData: FormData
): Promise<{ errors: { email?: string[] } | undefined; message: string }> => {
  const email = formData.get("email") as string | null;

  // Zod validation
  const parseResult = ForgotPasswordSchema.safeParse({ email });

  if (!parseResult.success) {
    const errors = parseResult.error.format();
    return {
      errors: { email: errors.email?._errors }, // Extract the error messages from Zod's format
      message: "Validation Error",
    };
  }

  // Safely extract validated email
  const validatedEmail = parseResult.data.email;

  const supabase = createSupabaseServer();

  try {
    await supabase.auth.resetPasswordForEmail(validatedEmail); // validatedEmail is guaranteed to be a string
    return {
      errors: undefined,
      message: "Password reset email sent successfully.",
    };
  } catch (error) {
    return {
      errors: { email: [error instanceof Error ? error.message : "An error occurred."] },
      message: "Error",
    };
  }
};

export const resetPassword = async (
  state: {
    errors: { newPassword?: string[]; confirmPassword?: string[] } | undefined;
    message: string;
  },
  formData: FormData
): Promise<{
  errors: { newPassword?: string[]; confirmPassword?: string[] } | undefined;
  message: string;
}> => {
  const newPassword = formData.get("newPassword") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;

  // Zod validation
  const parseResult = ResetPasswordSchema.safeParse({ newPassword, confirmPassword });

  if (!parseResult.success) {
    const errors = parseResult.error.format();
    return {
      errors: {
        newPassword: errors.newPassword?._errors,
        confirmPassword: errors.confirmPassword?._errors,
      }, // Extract the error messages from Zod's format
      message: "Validation Error",
    };
  }

  // Safely extract validated data
  const validatedData = parseResult.data;

  const supabase = createSupabaseServer();

  try {
    await supabase.auth.updateUser({ password: validatedData.newPassword }); // validatedData.newPassword is guaranteed to be a string
    return {
      errors: undefined,
      message: "Password reset successfully.",
    };
  } catch (error) {
    return {
      errors: { newPassword: [error instanceof Error ? error.message : "An error occurred."] },
      message: "Error",
    };
  }
};
