"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",        href: "/" },
  {
    label: "Collections",
    href: "/collections",
    sub: [
      { name: "Kanjivaram Silk",   href: "/collections?category=kanjivaram" },
      { name: "Banarasi Brocade",  href: "/collections?category=banarasi" },
      { name: "Pattu Heritage",    href: "/collections?category=pattu" },
      { name: "Cotton Handloom",   href: "/collections?category=cotton" },
      { name: "Bridal Collection", href: "/collections?category=bridal" },
    ],
  },
  { label: "Shop",        href: "/collections" },
  { label: "Lookbook",    href: "/lookbook" },
  { label: "Our Story",   href: "/about" },
  { label: "Visit Us",    href: "/contact" },
];

/* SVG lotus mark for logo */
function LotusArch({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="-5 -12 150 128"
      fill="none"
      className="overflow-visible"
    >
      <g stroke="#D9B26D" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M8,106 V64 C8,52 18,48 26,42 C36,35 50,35 58,27 C63,22 66,20 70,15 C74,20 77,22 82,27 C90,35 104,35 114,42 C122,48 132,52 132,64 V106 Z" />
      </g>
      <g fill="#D9B26D" stroke="#3A0615" strokeWidth="1">
        {/* Inner petal set */}
        <ellipse cx="70" cy="11" rx="3" ry="7" />
        <ellipse cx="70" cy="11" rx="3" ry="7" transform="rotate(72 70 15)" />
        <ellipse cx="70" cy="11" rx="3" ry="7" transform="rotate(144 70 15)" />
        <ellipse cx="70" cy="11" rx="3" ry="7" transform="rotate(216 70 15)" />
        <ellipse cx="70" cy="11" rx="3" ry="7" transform="rotate(288 70 15)" />
        <circle cx="70" cy="15" r="2.5" fill="#3A0615" />
      </g>
      <g fill="#D9B26D">
        <circle cx="34" cy="38" r="2.2" />
        <circle cx="106" cy="38" r="2.2" />
      </g>
    </svg>
  );
}

export function Navbar() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── MAIN HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "linear-gradient(180deg, #3A0615 0%, #4a0d20 100%)"
            : "linear-gradient(180deg, rgba(58,6,21,.95) 0%, rgba(92,15,39,.85) 100%)",
          borderBottom: "1px solid rgba(184,146,90,.25)",
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

        <div className="max-w-8xl mx-auto px-5 sm:px-8 lg:px-14 h-20 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Swavani — House of Silk">
            <LotusArch size={40} />
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: "var(--font-cinzel), Georgia, serif",
                  fontSize: "clamp(16px, 2.2vw, 22px)",
                  letterSpacing: ".2em",
                  fontWeight: 700,
                  color: "#F4E8D4",
                  transition: "color .3s",
                  lineHeight: 1,
                }}
                className="group-hover:text-[#D9B26D]"
              >
                SWAVANI
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "7px",
                  letterSpacing: ".32em",
                  textTransform: "uppercase",
                  color: "#D9B26D",
                  fontWeight: 600,
                  marginTop: "4px",
                }}
              >
                House of Silk &amp; Heritage
              </span>
            </div>
          </Link>

          {/* ── NAV LINKS ── */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-10">
            {navLinks.map((link) => (
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
                    fontWeight: 600,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#D9B26D",
                    textDecoration: "none",
                    transition: "color .25s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
                >
                  {link.label}
                  {link.sub && <ChevronDown size={10} className="opacity-60 transition-transform group-hover/nav:rotate-180" />}
                </Link>

                {/* Dropdown */}
                {link.sub && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          minWidth: "220px",
                          background: "linear-gradient(180deg, #3A0615, #5C0F27)",
                          border: "1px solid rgba(184,146,90,.35)",
                          boxShadow: "0 20px 60px rgba(58,6,21,.5)",
                          zIndex: 60,
                          padding: "8px",
                        }}
                      >
                        {/* Gold top line */}
                        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #D9B26D, transparent)", marginBottom: "6px" }} />
                        {link.sub.map((s) => (
                          <Link
                            key={s.name}
                            href={s.href}
                            className="block px-4 py-2.5 transition-all"
                            style={{
                              fontFamily: "var(--font-montserrat), sans-serif",
                              fontSize: "11px",
                              fontWeight: 500,
                              letterSpacing: ".1em",
                              textTransform: "uppercase",
                              color: "#F4E8D4",
                              textDecoration: "none",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.color = "#D9B26D";
                              (e.currentTarget as HTMLElement).style.background = "rgba(92,15,39,.6)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.color = "#F4E8D4";
                              (e.currentTarget as HTMLElement).style.background = "transparent";
                            }}
                          >
                            {s.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* ── ACTION ICONS ── */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 transition-colors"
              style={{ color: "#D9B26D" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
              aria-label="Search"
            >
              <Search size={19} />
            </button>
            <Link
              href="/wishlist"
              className="p-2 transition-colors"
              style={{ color: "#D9B26D" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
              aria-label="Wishlist"
            >
              <Heart size={19} />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 transition-colors"
              style={{ color: "#D9B26D" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
              aria-label="Cart"
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span
                  className="absolute top-1 right-1 flex items-center justify-center text-[9px] font-bold w-4 h-4 rounded-full"
                  style={{ background: "#D9B26D", color: "#3A0615" }}
                >
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 transition-colors"
              style={{ color: "#D9B26D" }}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
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
