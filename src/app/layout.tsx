import type { Metadata } from "next";
import "./globals.css";
import { cinzel, cormorant, montserrat } from "./fonts";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "House of Swavani — Premium Handwoven Indian Sarees",
  description:
    "A story woven in every thread. Discover timeless Kanjivaram, Banarasi, Pattu and Bridal sarees — each woven by master artisans and steeped in heritage.",
  keywords:
    "Indian sarees, Kanjivaram silk, Banarasi silk, handloom sarees, traditional sarees, bridal sarees, zari sarees, handwoven silk",
  openGraph: {
    title: "House of Swavani — Premium Handwoven Indian Sarees",
    description: "A story woven in every thread. The cinematic luxury saree experience.",
    type: "website",
  },
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body
        style={{ background: '#111a14', color: '#F4E8D4', margin: 0, padding: 0 }}
        className="antialiased font-montserrat"
      >
        <AuthProvider>
          <CartProvider>
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
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
