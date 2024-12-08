import { createSupabaseClient } from "@/lib/supabase/client"; // Client-side Supabase initialization

// Function to send the reset password email
export const sendPasswordResetEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  
  const supabase = createSupabaseClient(); // Create the client using your method
  
  const { error } = await supabase.auth.resetPasswordForEmail(email); // Correct API call

  if (error) {
    return { message: `Error: ${error.message}` };
  }

  return { message: "Password reset email sent successfully!" };
};
