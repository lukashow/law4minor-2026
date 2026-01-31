import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.law4minor.org",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/avatar/**",
      },
      {
        protocol: "https",
        hostname: "lh7-rt.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
