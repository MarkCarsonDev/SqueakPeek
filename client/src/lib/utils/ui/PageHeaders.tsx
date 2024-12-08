"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sets custome metadata for each page
 */
export function PageHeaders() {
  const pathName = usePathname();

  // TODO: Feel free to the name of this function
  function setter(title: string, description?: string) {
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
        setter(
          "Explore Opportunities - Discover Entry-Level Roles",
          "Explore entry-level job opportunities, discover the application process, and connect with other applicants in company threads."
        );
        break;
    }
  }, [pathName]);
  return null;
}
