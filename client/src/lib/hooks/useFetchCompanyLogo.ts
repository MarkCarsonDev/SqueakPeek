// src/lib/hooks/useFetchCompanyLogo.ts
import { useState, useEffect } from "react";
import { generateCompanyLogo } from "../utils/generateCompanyLogo";

/**
 * Fetches the image logo of the company
 * @param companyName - Name of the company
 * @returns src url logo of the company
 */
export const useFetchCompanyLogo = (companyName: string) => {
  const defaultLogo = "/default-logo.png"; // Path to default logo in the public folder
  const [companyLogoURL, setCompanyLogoURL] = useState<string>(defaultLogo);

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted components

    if (companyName) {
      generateCompanyLogo(companyName)
        .then((logoURL) => {
          if (isMounted && logoURL) {
            setCompanyLogoURL(logoURL);
          }
        })
        .catch((error) => {
          console.error("Error fetching company logo:", error);
          if (isMounted) {
            setCompanyLogoURL(defaultLogo); // Fallback to default logo on error
          }
        });
    } else {
      setCompanyLogoURL(defaultLogo); // Ensure default logo is set when no companyName
    }

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
  }, [companyName]);

  return companyLogoURL;
};
