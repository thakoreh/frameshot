import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/frameshot",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
