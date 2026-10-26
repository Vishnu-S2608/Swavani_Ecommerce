import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swavanistore.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "House of Swavani — Premium Handwoven Indian Sarees",
    template: "%s | House of Swavani",
  },
  description:
    "A story woven in every thread. Discover authentic Kanjivaram, Elampillai, Pure Soft Silk and Bridal sarees — each handwoven by master artisans and certified with Silk Mark purity.",
  keywords:
    "Indian sarees, Kanjivaram silk, Kanchipuram soft silk, Elampillai silks, handloom sarees, traditional bridal sarees, pure zari sarees, Silk Mark certified, South Indian sarees",
  openGraph: {
    title: "House of Swavani — Premium Handwoven Indian Sarees",
    description: "A story woven in every thread. Authentic South Indian silk sarees handcrafted by master artisans.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "House of Swavani",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "House of Swavani — Premium Handwoven Indian Sarees",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "House of Swavani — Premium Handwoven Indian Sarees",
    description: "A story woven in every thread. Authentic handwoven silk sarees with pure Silk Mark certification.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="font-cinzel font-cormorant font-montserrat"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body
        style={{ background: '#111a14', color: '#F4E8D4', margin: 0, padding: 0 }}
        className="antialiased font-montserrat"
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#3A0615",
              color: "#D9B26D",
              fontFamily: "var(--font-montserrat)",
              border: "1px solid rgba(217,178,109,.3)",
              fontSize: "12px",
              letterSpacing: ".08em",
            },
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
