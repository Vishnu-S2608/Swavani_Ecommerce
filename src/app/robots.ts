import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houseofswavani.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/favicon.ico",
          "/icon.png",
          "/icon-192.png",
          "/apple-icon.png",
          "/favicon-48x48.png",
          "/favicon-96x96.png",
          "/manifest.webmanifest",
        ],
        disallow: ["/api/"],
      },
      {
        userAgent: ["Googlebot-Image", "Google Favicon"],
        allow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
