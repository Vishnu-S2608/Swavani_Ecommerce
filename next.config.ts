import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1440],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
        source: "/cart",
        destination: "/collections",
        permanent: false,
      },
      {
        source: "/checkout",
        destination: "/collections",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
