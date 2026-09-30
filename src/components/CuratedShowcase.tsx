"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    id: "01",
    name: "Kanjivaram",
    subtitle: "Pure Mulberry Silk",
    description: "Temple-border zari work, rich colour block weave — the queen of Indian silks. Each piece is a lifetime heirloom.",
    image: "/saree-1.jpg",
    href: "/collections?category=kanjivaram",
    accent: "#0F5C63",   /* peacock */
    badge: "GI Certified",
  },
  {
    id: "02",
    name: "Banarasi",
    subtitle: "Imperial Brocade",
    description: "Opulent brocade woven on the looms of Varanasi for centuries. Resham, kinkhab and tissue weaves.",
    image: "/saree-2.jpg",
    href: "/collections?category=banarasi",
    accent: "#2B2F6B",   /* indigo */
    badge: "Royal Heritage",
  },
  {
    id: "03",
    name: "Pattu",
    subtitle: "Heritage Pattu Silk",
    description: "South Indian Pattu with rich geometric motifs, temple borders, and vibrant colour combinations.",
    image: "/saree-3.jpg",
    href: "/collections?category=pattu",
    accent: "#D98324",   /* saffron */
    badge: "Handloom Mark",
  },
  {
    id: "04",
    name: "Bridal",
    subtitle: "Trousseau & Heirloom",
    description: "Bespoke bridal silks — from grand Kanjivaram bridal sets to delicate Banarasi tissue for the mehndi ceremony.",
    image: "/saree-4.jpg",
    href: "/collections?category=bridal",
    accent: "#C24B6B",   /* rose */
    badge: "Bespoke",
  },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return visible;
}

export function CuratedShowcase() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F4E8D4 0%, #EDDCC0 60%, #F4E8D4 100%)",
        padding: "clamp(72px, 9vw, 120px) 0",
      }}
    >
      {/* Kolam pattern bg */}
      <div className="absolute inset-0 bg-kolam opacity-60 pointer-events-none" />

      {/* Indian arch pattern border top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B8925A, #D9B26D, #B8925A, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, transparent, #B8925A)" }} />
            <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600 }}>
              Master Loom Curations
            </span>
            <div style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, #B8925A, transparent)" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cinzel), Georgia, serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "#3A0615",
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            The Living Collections
          </h2>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontStyle: "italic",
              color: "#3A2A26",
              marginTop: "10px",
              opacity: 0.8,
            }}
          >
            Each weave tells a story that spans generations.
          </p>
        </div>

        {/* Collection grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, idx) => (
            <CollectionCard key={col.id} col={col} idx={idx} />
          ))}
        </div>

        {/* Browse all CTA */}
        <div className="flex justify-center mt-14">
          <Link href="/collections" className="btn-silk">
            Browse All Collections
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B8925A, #D9B26D, #B8925A, transparent)" }} />
    </section>
  );
}

function CollectionCard({ col, idx }: { col: typeof collections[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useReveal(ref as React.RefObject<HTMLElement | null>);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity .7s ease ${idx * 0.12}s, transform .7s ease ${idx * 0.12}s`,
        background: "#FBF5EA",
        border: "1px solid rgba(184,146,90,.3)",
        boxShadow: "0 8px 40px rgba(58,6,21,.1)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        <Image
          src={col.image}
          alt={col.name}
          fill
          className="object-cover"
          style={{
            transition: "transform .7s cubic-bezier(.76,0,.2,1)",
            objectPosition: "center 20%",
          }}
        />
        {/* Arch-mask overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-0"
          style={{ background: "linear-gradient(to top, rgba(58,6,21,.65) 0%, rgba(58,6,21,.15) 60%, transparent 100%)" }}
        />
        {/* Number badge */}
        <div
          className="absolute top-4 left-4 z-10"
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "13px",
            letterSpacing: ".14em",
            color: "#D9B26D",
            background: "rgba(58,6,21,.85)",
            border: "1px solid rgba(217,178,109,.35)",
            padding: "4px 10px",
            backdropFilter: "blur(8px)",
          }}
        >
          {col.id}
        </div>
        {/* Badge */}
        <div
          className="absolute top-4 right-4 z-10"
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "9px",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#F4E8D4",
            background: col.accent,
            padding: "4px 10px",
          }}
        >
          {col.badge}
        </div>
        {/* Hover CTA */}
        <Link
          href={col.href}
          className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-center gap-2 py-3 opacity-0 group-hover:opacity-100 transition-all duration-400"
          style={{
            background: "rgba(58,6,21,.92)",
            border: "1px solid rgba(217,178,109,.5)",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "10px",
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "#D9B26D",
            textDecoration: "none",
            transform: "translateY(8px)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
        >
          Explore {col.name} →
        </Link>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="mb-1 h-px" style={{ background: `linear-gradient(90deg, ${col.accent}, transparent)` }} />
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "9px",
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: col.accent,
            fontWeight: 600,
            marginBottom: "4px",
            marginTop: "10px",
          }}
        >
          {col.subtitle}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-cinzel), Georgia, serif",
            fontSize: "18px",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "#3A0615",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          {col.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#3A2A26",
          }}
        >
          {col.description}
        </p>
      </div>
    </div>
  );
}
