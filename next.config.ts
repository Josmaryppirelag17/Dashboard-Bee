import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "@dnd-kit/core",
      "@dnd-kit/sortable",
    ],
    webpackBuildWorker: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
