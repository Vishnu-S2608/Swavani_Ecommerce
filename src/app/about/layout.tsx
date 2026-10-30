import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houseofswavani.com";

export const metadata: Metadata = {
  title: "Our Heritage & Master Weavers — The House of Swavani",
  description:
    "Discover the story of House of Swavani. Preserving centuries of South Indian handloom mastery through direct weaver patronage, pure mulberry silk, and 100% Silk Mark certified purity.",
  keywords: [
    "about House of Swavani",
    "handloom weaving heritage",
    "Kanchipuram master weavers",
    "ethical silk saree brand",
    "Silk Mark certified sarees",
    "direct weaver patronage Tamil Nadu",
    "pure mulberry silk sarees story",
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "Our Heritage & Master Weavers | House of Swavani",
    description:
      "A saree is not merely six yards of woven silk — it is a living heirloom of memory, tradition, and devotion.",
    url: `${siteUrl}/about`,
    siteName: "House of Swavani",
    images: [
      {
        url: "/heritage-fabric.jpg",
        width: 1200,
        height: 630,
        alt: "The House of Swavani Handloom Weaving Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Heritage & Master Weavers | House of Swavani",
    description:
      "Preserving centuries of South Indian handloom mastery through direct weaver patronage.",
    images: ["/heritage-fabric.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
