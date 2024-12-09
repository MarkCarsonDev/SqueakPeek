"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sets custome metadata for each page
 */
export function PageHeaders() {
  const pathName = usePathname();

  // TODO: Feel free to the name of this function
  function header(title: string, description?: string) {
    document.title = title;

    // Set the meta description if provided
    if (description) {
      let metaDescription = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;

      if (!metaDescription) {
        // Create the meta description if it doesn't exist
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute("content", description);
    }
  }

  useEffect(() => {
    // TODO: Implement metadata for each route in our project
    switch (pathName) {
      case "/explore":
        // Set page title and meta description
        header(
          "Explore Opportunities - Discover Entry-Level Roles",
          "Explore entry-level job opportunities, discover the application process, and connect with other applicants in company threads."
        );
        break;
      case "/message/company":
        header(
          "Company Threads - Chat with Applicants",
          "Join company-specific threads to chat with other applicants, share insights, and discuss the application process."
        );
        break;
      case "/message/private":
        header(
          "Private Messages - Chat Privately with Applicants",
          "Send and receive private messages with other applicants to discuss opportunities, share insights, or network."
        );
        break;
      case "/profile":
        header(
          "Edit Profile - Personalize Your Account",
          "Edit your profile to personalize your account. Update your username, school, and avatar to create a unique profile."
        );
        break;
      case "/thread":
        header(
          "Thread - Discuss and Collaborate",
          "Join the discussion and collaborate with others in various threads. Share insights, ask questions, and connect with the community."
        );
        break;
      case "/track":
        header(
          "Track Applications - Manage Your Job Search",
          "Track your job applications efficiently across various stages. Manage your pipeline from applied to offer, and stay organized throughout your job search."
        );
        break;
      case "/about":
        header(
           "About Us - Meet Our Team",
           "Learn more about our mission and meet the talented team behind our project."
        );
        break;
      case "/login":
        header(
          "Login - Welcome Back", "Sign in to access your account"
        );
        break;
      case "/signup":
        header(
          "Sign Up - Create an Account", "Create a new account to get started"
        );
        break;
      case "/profile_setup":
        header(
          "Profile Setup - Complete Your Profile",
          "Complete your profile setup by selecting an avatar and filling out the details."
        )
        break;
      case "/":
        header(
          "Home", "Home"
        );
        break;
    }
  }, [pathName]);
  return null;
}
