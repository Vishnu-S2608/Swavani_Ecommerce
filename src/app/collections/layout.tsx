import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houseofswavani.com";

export const metadata: Metadata = {
  title: "Handcrafted Silk Sarees Collection — Kanjivaram, Bridal & Soft Silks",
  description:
    "Explore House of Swavani's curated collection of 100% Silk Mark certified sarees. Featuring pure Kanjivaram soft silks, Elampillai weaves, temple borders, and opulent wedding pattu sarees.",
  keywords: [
    "pure silk sarees collection",
    "buy Kanjivaram silk saree online",
    "bridal silk sarees",
    "Kanchipuram soft silk sarees",
    "Elampillai silks collection",
    "traditional handloom sarees",
    "wedding pattu sarees",
    "pure zari border sarees",
    "Silk Mark certified sarees India",
    "House of Swavani collections",
  ],
  alternates: {
    canonical: `${siteUrl}/collections`,
  },
  openGraph: {
    title: "Handcrafted Silk Sarees Collection | House of Swavani",
    description:
      "22 masterwork sarees woven with generational expertise. Authentic pure soft silks and bridal drapes certified with Silk Mark purity.",
    url: `${siteUrl}/collections`,
    siteName: "House of Swavani",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "House of Swavani — Masterwork Silk Sarees Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Silk Sarees Collection | House of Swavani",
    description:
      "Authentic pure soft silks, Elampillai handlooms, and bridal drapes certified with Silk Mark purity.",
    images: ["/og-image.jpg"],
  },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
