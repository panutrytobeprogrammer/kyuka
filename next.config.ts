import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  }
};

export default nextConfig;
