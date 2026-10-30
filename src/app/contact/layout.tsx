import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houseofswavani.com";

export const metadata: Metadata = {
  title: "Visit Our Boutique & Contact Us — Thoothukudi | House of Swavani",
  description:
    "Visit the House of Swavani boutique at 15A Shanmugapuram, Thoothukudi, or reach out on WhatsApp (+91 6381895890) for bridal inquiries, custom orders, and personal saree styling.",
  keywords: [
    "House of Swavani contact",
    "House of Swavani Thoothukudi",
    "silk saree shop Thoothukudi",
    "buy pure silk sarees Tamil Nadu",
    "House of Swavani WhatsApp",
    "bridal saree consultation",
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Visit Our Boutique & Contact Us | House of Swavani",
    description:
      "Visit our flagship boutique in Thoothukudi or connect via WhatsApp for bespoke saree consultations.",
    url: `${siteUrl}/contact`,
    siteName: "House of Swavani",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Visit House of Swavani Boutique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Our Boutique & Contact Us | House of Swavani",
    description: "Visit our flagship boutique in Thoothukudi or connect via WhatsApp.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
