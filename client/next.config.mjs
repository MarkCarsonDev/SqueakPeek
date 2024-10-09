/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configures the Google image when user is redirected
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
