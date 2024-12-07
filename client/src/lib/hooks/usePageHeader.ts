// app/lib/hooks/usePageHeader.ts
import { useEffect } from "react";

/**
 * Custom hook to set the page title and meta description dynamically.
 * @param title - The title to set for the page.
 * @param description - The meta description to set for the page.
 */
const usePageHeader = (title: string, description?: string) => {
  useEffect(() => {
    // Set the document title
    document.title = title;

    // Set the meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;

      if (!metaDescription) {
        // Create the meta description if it doesn't exist
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
};

export default usePageHeader;
