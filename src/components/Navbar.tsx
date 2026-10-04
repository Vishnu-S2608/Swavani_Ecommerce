"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string; sub?: { name: string; href: string }[] };

const leftLinks: NavLink[] = [
  { label: "Home",        href: "/" },
  { label: "Shop",        href: "/collections" },
];

const rightLinks: NavLink[] = [
  { label: "Our Story",    href: "/about" },
  { label: "Visit Us",     href: "/contact" },
];

const navLinks: NavLink[] = [...leftLinks, ...rightLinks];

export function Navbar() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      // On home page, we only show this navbar after scrolling past the hero (approx 85vh)
      const threshold = isHome ? window.innerHeight * 0.85 : 60;
      setScrolled(window.scrollY > threshold);
    };
    
    // Check immediately in case we load scrolled down
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Hide the global navbar completely if on home and not scrolled, 
  // because MahiraHeroBanner provides the initial top navbar.
  const isHidden = isHome && !scrolled;

  return (
    <>
      {/* ── MAIN HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHidden ? 'opacity-0 pointer-events-none translate-y-[-100%]' : 'opacity-100 pointer-events-auto translate-y-0'}`}
        style={{
          background: scrolled
            ? "linear-gradient(180deg, #3A0615 0%, #4a0d20 100%)"
            : "linear-gradient(180deg, rgba(58,6,21,.95) 0%, rgba(92,15,39,.85) 100%)",
          boxShadow: scrolled ? "0 4px 32px rgba(58,6,21,.55)" : "none",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        {/* Zari hairline at very top */}
        <div
          className="w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #D9B26D 30%, #F1D9A0 50%, #D9B26D 70%, transparent 100%)",
          }}
        />

        <div className="relative max-w-8xl mx-auto px-5 sm:px-8 lg:px-14 h-24 flex items-center justify-between">

          {/* ── LEFT SECTION (Mobile Menu) ── */}
          <div className="flex items-center gap-4 relative z-10">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 transition-colors"
              style={{ color: "#D9B26D" }}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* ── CENTERED NAV & LOGO ── */}
          <div className="flex items-center justify-center w-full absolute inset-0 z-0 pointer-events-none">
            <div className="hidden lg:flex items-center justify-end gap-10 xl:gap-14 w-1/3 pr-10 pointer-events-auto">
              {leftLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 group/nav"
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "#F4E8D4",
                      textDecoration: "none",
                      transition: "color .25s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center shrink-0 pointer-events-auto">
              <Link 
                href="/" 
                className="flex items-center justify-center relative z-10" 
                aria-label="Swavani — House of Silk"
              >
                <div id="main-nav-logo" className="premium-logo-container transition-transform duration-500 group-hover:scale-105">
                  <div className="premium-logo-base" />
                  <div className="premium-logo-shine" />
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center justify-start gap-10 xl:gap-14 w-1/3 pl-10 pointer-events-auto">
              {rightLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 group/nav"
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "#F4E8D4",
                      textDecoration: "none",
                      transition: "color .25s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT SECTION (Icons) ── */}
          <div className="flex items-center gap-4 lg:gap-7 xl:gap-10 relative z-10">
            <Link
              href="/cart"
              className="relative p-2 transition-colors"
              style={{ color: "#D9B26D" }}
              aria-label="Cart"
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D9B26D] text-[#3A0615] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Zari hairline at bottom */}
        <div
          className="w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(217,178,109,.4) 50%, transparent 100%)",
          }}
        />
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed left-0 top-0 bottom-0 w-80 z-50 flex flex-col"
              style={{
                background: "linear-gradient(135deg, #3A0615 0%, #5C0F27 50%, #3A0615 100%)",
                backgroundImage: "url('/download (2).jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRight: "1px solid rgba(184,146,90,.3)",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0" style={{ background: "rgba(58,6,21,.88)" }} />

              <div className="relative z-10 flex flex-col h-full p-6">
                <div className="flex items-center justify-between pb-5 mb-6" style={{ borderBottom: "1px solid rgba(184,146,90,.25)" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-cinzel)", fontSize: "20px", letterSpacing: ".2em", color: "#F4E8D4", fontWeight: 600 }}>
                      SWAVANI
                    </span>
                    <div style={{ fontSize: "8px", letterSpacing: ".3em", color: "#D9B26D", fontFamily: "var(--font-montserrat)", marginTop: "2px" }}>
                      HOUSE OF SILK &amp; HERITAGE
                    </div>
                  </div>
                  <button onClick={() => setMobileOpen(false)} style={{ color: "#D9B26D" }}>
                    <X size={22} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 transition-colors"
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        color: "#F4E8D4",
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(184,146,90,.12)",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-6" style={{ borderTop: "1px solid rgba(184,146,90,.2)" }}>
                  <div style={{ fontSize: "9px", letterSpacing: ".3em", color: "#D9B26D", fontFamily: "var(--font-montserrat)", textAlign: "center" }}>
                    SWAVANI // ESTD. 2024
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SEARCH MODAL ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/92 backdrop-blur-md z-50 flex items-start justify-center pt-28 px-4"
          >
            <div
              className="w-full max-w-2xl relative"
              style={{
                background: "linear-gradient(135deg, #3A0615, #5C0F27)",
                border: "1px solid rgba(184,146,90,.4)",
                boxShadow: "0 30px 80px rgba(58,6,21,.6)",
                padding: "28px",
              }}
            >
              {/* Gold top hairline */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-4 right-4 transition-colors"
                style={{ color: "#D9B26D" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
              >
                <X size={20} />
              </button>
              <p style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#D9B26D", marginBottom: "12px" }}>
                SEARCH THE ARCHIVE
              </p>
              <input
                autoFocus
                type="text"
                placeholder="Search Kanjivaram, Banarasi, Bridal Silk…"
                style={{
                  width: "100%",
                  background: "rgba(58,6,21,.7)",
                  border: "1px solid rgba(184,146,90,.35)",
                  padding: "14px 16px",
                  fontSize: "14px",
                  color: "#F4E8D4",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#D9B26D")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(184,146,90,.35)")}
              />
              <div className="flex flex-wrap gap-2 mt-4">
                <span style={{ fontSize: "11px", color: "rgba(244,232,212,.5)", fontFamily: "var(--font-montserrat)" }}>Popular:</span>
                {["Kanjivaram Crimson", "24K Zari Banarasi", "Bridal Silk", "Pattu Heritage"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/collections?search=${encodeURIComponent(tag)}`}
                    onClick={() => setSearchOpen(false)}
                    className="px-3 py-1 transition-all"
                    style={{
                      background: "rgba(58,6,21,.5)",
                      border: "1px solid rgba(184,146,90,.2)",
                      color: "#D9B26D",
                      fontSize: "10px",
                      letterSpacing: ".08em",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#D9B26D")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(184,146,90,.2)")}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
