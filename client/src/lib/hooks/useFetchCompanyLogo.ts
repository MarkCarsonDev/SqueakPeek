import { useState, useEffect } from "react";
import { useMessage } from "../store/message";
import { generateCompanyLogo } from "../utils/generateCompanyLogo";

/**
 * Fetches the image logo of the company
 * @param companyName - Name of the company
 * @returns src url logo of the company
 */
export const useFetchCompanyLogo = (companyName: string) => {
  const [companyLogoURL, setCompanyLogoURL] = useState("");
  const { isPrivateConversation } = useMessage();

  useEffect(() => {
    if (!isPrivateConversation) {
      generateCompanyLogo(companyName).then((logoURL) => {
        setCompanyLogoURL(logoURL);
      });
    }
  }, [companyName, isPrivateConversation, setCompanyLogoURL]);

  return { companyLogoURL };
};
