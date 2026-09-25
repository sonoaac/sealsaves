import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the root: a stray lockfile higher up the tree confuses root detection.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
