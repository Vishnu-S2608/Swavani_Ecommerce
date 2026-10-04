"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

const footerLinks = {
  collections: [
    { name: "Elampillai Silks", href: "/collections?category=elampillai" },
    { name: "Kanjivaram Silk", href: "/collections?category=kanjivaram" },
  ],
  info: [
    { name: "Our Story", href: "/about" },
    { name: "The Artisans", href: "/about#artisans" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "Visit Us", href: "/contact" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Admin Portal", href: "/admin/login" },
  ],
  policies: [
    { name: "Shipping Policy", href: "/policies/shipping" },
    { name: "Returns & Exchanges", href: "/policies/returns" },
    { name: "Privacy Policy", href: "/policies/privacy" },
    { name: "Terms of Service", href: "/policies/terms" },
    { name: "Care Instructions", href: "/policies/care" },
  ],
};



export function Footer() {
  const pathname = usePathname();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #3A0615 0%, #2a0510 100%)",
        backgroundImage: "url('/download (2).jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        color: "#F4E8D4",
      }}
    >
      {/* Deep silk overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(58,6,21,.92) 0%, rgba(42,5,16,.97) 100%)" }} />

      {/* Radial gold glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(217,178,109,.08), transparent 70%)" }} />

      {/* Top zari vine */}
      <div className="relative h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #D9B26D 30%, #F1D9A0 50%, #D9B26D 70%, transparent 100%)" }} />

      {/* Main footer grid */}
      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <img src="/swavani-logo-transparent.png" alt="Swavani Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain drop-shadow-xl" />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "15px",
                  fontStyle: "italic",
                  color: "rgba(244,232,212,.65)",
                  lineHeight: 1.7,
                  maxWidth: "36ch",
                  marginBottom: "20px",
                }}
              >
                Custodians of India&apos;s finest handwoven silks since 2024. Every saree carries the memory of the artisan who wove it.
              </p>
              <div className="space-y-2.5">
                {[
                  { Icon: MapPin, text: "15A Shanumuga puram, Thoothukudi - 628003" },
                  { Icon: Phone, text: "+91 6381895890" },
                  { Icon: Mail,  text: "houseofswavani@gmail.com" },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-start gap-2.5">
                    <Icon size={13} style={{ color: "#D9B26D", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "11px", color: "rgba(244,232,212,.65)", letterSpacing: ".04em" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div>
              <h4 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#D9B26D", fontWeight: 600, marginBottom: "14px" }}>Collections</h4>
              <ul className="space-y-2.5">
                {footerLinks.collections.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "11px", color: "rgba(244,232,212,.6)", textDecoration: "none", letterSpacing: ".06em", transition: "color .25s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(244,232,212,.6)")}
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#D9B26D", fontWeight: 600, marginBottom: "14px" }}>Boutique</h4>
              <ul className="space-y-2.5">
                {footerLinks.info.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "11px", color: "rgba(244,232,212,.6)", textDecoration: "none", letterSpacing: ".06em", transition: "color .25s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(244,232,212,.6)")}
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#D9B26D", fontWeight: 600, marginBottom: "14px" }}>Policies</h4>
              <ul className="space-y-2.5">
                {footerLinks.policies.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "11px", color: "rgba(244,232,212,.6)", textDecoration: "none", letterSpacing: ".06em", transition: "color .25s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(244,232,212,.6)")}
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative py-6 border-t" style={{ borderColor: "rgba(184,146,90,.15)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "10px", color: "rgba(244,232,212,.4)", letterSpacing: ".1em" }}>
            © {new Date().getFullYear()} House of Swavani. All rights reserved. Handcrafted with love in India.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/916381895890"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "9px", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(244,232,212,.5)", textDecoration: "none", transition: "color .25s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(244,232,212,.5)")}
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/house_of_swavani"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "9px", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(244,232,212,.5)", textDecoration: "none", transition: "color .25s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(244,232,212,.5)")}
            >
              Instagram
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 flex items-center justify-center transition-all"
              style={{
                border: "1px solid rgba(184,146,90,.35)",
                background: "rgba(58,6,21,.5)",
                color: "#D9B26D",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#D9B26D"; (e.currentTarget as HTMLElement).style.color = "#3A0615"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(58,6,21,.5)"; (e.currentTarget as HTMLElement).style.color = "#D9B26D"; }}
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
