import { useState, useEffect } from "react";
import { generateCompanyLogo } from "../utils/generateCompanyLogo";

/**
 * Fetches the image logo of the company
 * @param companyName - Name of the company
 * @returns src url logo of the company
 */
export const useFetchCompanyLogo = (companyName: string) => {
  const [companyLogoURL, setCompanyLogoURL] = useState("");

  useEffect(() => {
    generateCompanyLogo(companyName).then((logoURL) => {
      setCompanyLogoURL(logoURL);
    });
  }, [companyName, setCompanyLogoURL]);

  return companyLogoURL;
};
