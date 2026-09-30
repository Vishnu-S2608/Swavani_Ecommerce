import type { Metadata } from "next";
import "./globals.css";
import "./cinematic.css";
import { cinzel, cormorant, montserrat } from "./fonts";
import { CartProvider } from "@/context/CartContext";
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

import { ScrollytellingNavbar } from "@/components/ScrollytellingNavbar";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable}`}
    >
      <body
        style={{ background: '#20030C', color: '#F4E8D4', margin: 0, padding: 0 }}
        className="antialiased font-montserrat"
      >
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
          <ScrollytellingNavbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
