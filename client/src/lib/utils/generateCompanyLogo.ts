// This file contains utility functions to generate company logos
// which also take care of comany with multiple words.
export async function generateCompanyLogo(companyName: string): Promise<string> {
    const domain = companyName.replace(/\s+/g, '').toLowerCase();
    const possibleExtensions = ['com', 'net', 'org', 'io', 'co', 'gov'];
    const defaultLogo = '/landingpage/insight.svg'; // Relative path to the public folder in Next.js

    for (const ext of possibleExtensions) {
        const imageURL = `https://cdn.brandfetch.io/${domain}.${ext}/w/512/h/512/400?c=1idFo73gafU3boEDPib`;
        try {
            const response = await fetch(imageURL);
            if (response.ok) {
                return imageURL;
            }
        } catch (error) {
            console.error(`Error fetching image for ${companyName}: ${error}`);
        }
    }

    console.warn(`Falling back to default logo for ${companyName}`);
    return defaultLogo;
}
