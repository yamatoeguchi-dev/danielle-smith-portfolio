import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pngfind.com",
      },
      {
        protocol: "https",
        hostname: "rdaniellesmith.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "media.nbcsandiego.com",
      },
    ],
  },
};


export default nextConfig;
