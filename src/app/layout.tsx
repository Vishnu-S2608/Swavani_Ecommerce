import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.houseofswavani.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3A0615" },
    { media: "(prefers-color-scheme: dark)", color: "#111a14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "House of Swavani — Premium Handwoven Indian Silk Sarees",
    template: "%s | House of Swavani",
  },
  description:
    "A story woven in every thread. Discover 100% Silk Mark certified authentic Kanjivaram soft silk, Elampillai weaves, pure zari bridal and festive sarees handcrafted by master artisans.",
  keywords: [
    "House of Swavani",
    "Swavani",
    "Swavani sarees",
    "House of Swavani sarees",
    "pure silk sarees",
    "Kanjivaram silk sarees",
    "Kanchipuram soft silk sarees",
    "Elampillai silks",
    "handloom sarees",
    "bridal silk sarees",
    "wedding pattu sarees",
    "pure zari sarees",
    "Silk Mark certified sarees",
    "South Indian sarees",
    "pure mulberry silk sarees",
    "traditional wedding sarees",
    "korvai weaving saree",
    "Thoothukudi silk saree store",
    "Indian sarees online",
    "handcrafted heritage sarees",
  ],
  authors: [{ name: "House of Swavani", url: siteUrl }],
  creator: "House of Swavani",
  publisher: "House of Swavani",
  category: "Shopping",
  classification: "Handwoven Indian Silk Sarees & Luxury Ethnic Wear",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "House of Swavani — Premium Handwoven Indian Silk Sarees",
    description:
      "A story woven in every thread. Authentic South Indian silk sarees handcrafted by master artisans and certified with Silk Mark purity.",
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
    title: "House of Swavani — Premium Handwoven Indian Silk Sarees",
    description:
      "A story woven in every thread. Authentic handwoven silk sarees with pure Silk Mark certification.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "House of Swavani",
        alternateName: ["Swavani", "House of Swavani Saree Boutique"],
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icon.png`,
          caption: "House of Swavani Logo",
        },
        image: `${siteUrl}/og-image.jpg`,
        sameAs: [
          "https://www.instagram.com/houseofswavani",
          "https://wa.me/916381895890",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+916381895890",
          contactType: "customer service",
          areaServed: ["IN", "US", "GB", "SG", "MY", "AE"],
          availableLanguage: ["English", "Tamil"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "House of Swavani",
        alternateName: "Swavani",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/collections?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ClothingStore",
        "@id": `${siteUrl}/#store`,
        name: "House of Swavani",
        image: `${siteUrl}/og-image.jpg`,
        url: siteUrl,
        telephone: "+916381895890",
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "15A Shanmugapuram",
          addressLocality: "Thoothukudi",
          addressRegion: "Tamil Nadu",
          postalCode: "628001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 8.798323,
          longitude: 78.1488893,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "20:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "11:00",
            closes: "18:00",
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className="font-cinzel font-cormorant font-montserrat"
    >
      <head>
        {/* Explicit Google Favicon discovery links */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />

        {/* Structured Data (Schema.org JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        style={{ background: '#F4E8D4', color: '#382E2E', margin: 0, padding: 0 }}
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
