import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  devIndicators: {
    position: "bottom-right",
  },
  async redirects() {
    return [
      {
        source: "/:prefix+/admin/login",
        destination: "/admin/login",
        permanent: false,
      },
      {
        source: "/:prefix+/admin",
        destination: "/admin",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
