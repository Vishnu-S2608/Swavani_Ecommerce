"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "p1",
    slug: "kanjivaram-crimson-zari",
    name: "Kanjivaram Crimson Zari",
    collection: "kanjivaram",
    price: 18500,
    compareAtPrice: 24000,
    fabric: "Pure Mulberry Silk",
    image: "/saree-1.jpg",
    image2: "/saree-2.jpg",
    badge: "New",
    badgeColor: "#0F5C63",
    stock: "in",
    isNew: true,
    featured: true,
  },
  {
    id: "p2",
    slug: "banarasi-royal-tanchoi",
    name: "Banarasi Royal Tanchoi",
    collection: "banarasi",
    price: 22000,
    compareAtPrice: null,
    fabric: "Silk Tanchoi Weave",
    image: "/saree-2.jpg",
    image2: "/saree-3.jpg",
    badge: "Heritage",
    badgeColor: "#2B2F6B",
    stock: "low",
    isNew: false,
    featured: true,
  },
  {
    id: "p3",
    slug: "pattu-peacock-heritage",
    name: "Pattu Peacock Heritage",
    collection: "pattu",
    price: 14200,
    compareAtPrice: 18000,
    fabric: "Pure Pattu Silk",
    image: "/saree-3.jpg",
    image2: "/saree-4.jpg",
    badge: "Sale",
    badgeColor: "#D98324",
    stock: "in",
    isNew: false,
    featured: true,
  },
  {
    id: "p4",
    slug: "bridal-zari-pallu",
    name: "Bridal Zari Pallu",
    collection: "bridal",
    price: 32000,
    compareAtPrice: null,
    fabric: "Grand Silk Brocade",
    image: "/saree-4.jpg",
    image2: "/saree-5.jpg",
    badge: "Bridal",
    badgeColor: "#C24B6B",
    stock: "in",
    isNew: true,
    featured: true,
  },
  {
    id: "p5",
    slug: "kanjivaram-emerald-temple",
    name: "Kanjivaram Emerald Temple",
    collection: "kanjivaram",
    price: 21500,
    compareAtPrice: 26000,
    fabric: "Pure Mulberry Silk",
    image: "/saree-5.jpg",
    image2: "/saree-1.jpg",
    badge: "New",
    badgeColor: "#0F5C63",
    stock: "in",
    isNew: true,
    featured: true,
  },
  {
    id: "p6",
    slug: "cotton-chanderi-booti",
    name: "Cotton Chanderi Booti",
    collection: "cotton",
    price: 6800,
    compareAtPrice: null,
    fabric: "Handwoven Chanderi",
    image: "/hero-editorial.jpg",
    image2: "/saree-2.jpg",
    badge: "Daily",
    badgeColor: "#1F6B4A",
    stock: "in",
    isNew: false,
    featured: true,
  },
];

function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function BestsellerGridMahira() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all",       label: "All" },
    { key: "kanjivaram", label: "Kanjivaram" },
    { key: "banarasi",   label: "Banarasi" },
    { key: "bridal",     label: "Bridal" },
    { key: "cotton",     label: "Cotton" },
  ];

  const filtered = activeFilter === "all" ? products : products.filter((p) => p.collection === activeFilter);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(72px, 9vw, 120px) 0",
        background: "linear-gradient(180deg, #F4E8D4 0%, #FBF5EA 100%)",
      }}
    >
      <div className="absolute inset-0 bg-paisley opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div style={{ width: "36px", height: "1px", background: "#B8925A" }} />
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600 }}>
                Featured Sarees
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cinzel), Georgia, serif",
                fontSize: "clamp(26px, 3.8vw, 44px)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#3A0615",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Most Coveted Silks
            </h2>
          </div>
          <Link
            href="/collections"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "10px",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#3A0615",
              textDecoration: "none",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7D1A38")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#3A0615")}
          >
            View Full Archive →
          </Link>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                padding: "8px 18px",
                border: "1px solid",
                cursor: "pointer",
                transition: "all .25s",
                borderColor: activeFilter === f.key ? "#3A0615" : "rgba(184,146,90,.4)",
                background: activeFilter === f.key ? "#3A0615" : "transparent",
                color: activeFilter === f.key ? "#D9B26D" : "#3A2A26",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group relative"
              style={{
                background: "#FBF5EA",
                border: "1px solid rgba(184,146,90,.28)",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(58,6,21,.09)",
                transition: "box-shadow .4s ease, transform .4s ease",
              }}
              onMouseEnter={(e) => {
                setHoveredId(product.id);
                (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 80px rgba(58,6,21,.22), 0 8px 30px rgba(184,146,90,.14)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                setHoveredId(null);
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(58,6,21,.09)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "380px" }}>
                {/* Main image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transition: "opacity .55s ease",
                    opacity: hoveredId === product.id ? 0 : 1,
                  }}
                >
                  <Image src={product.image} alt={product.name} fill className="object-cover" style={{ objectPosition: "center 15%" }} />
                </div>
                {/* Hover image (second look) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transition: "opacity .55s ease",
                    opacity: hoveredId === product.id ? 1 : 0,
                  }}
                >
                  <Image src={product.image2} alt={product.name + " - alternate"} fill className="object-cover" style={{ objectPosition: "center 15%" }} />
                </div>

                {/* Badge */}
                <div
                  className="absolute top-3 left-3 z-10"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    background: product.badgeColor,
                    color: "#FBF5EA",
                    padding: "4px 10px",
                  }}
                >
                  {product.badge}
                </div>

                {/* Low stock */}
                {product.stock === "low" && (
                  <div
                    className="absolute top-3 right-3 z-10"
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "#C24B6B",
                      background: "rgba(251,245,234,.9)",
                      border: "1px solid #C24B6B",
                      padding: "4px 10px",
                    }}
                  >
                    Low Stock
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 z-10 flex items-end justify-center pb-5 gap-3"
                  style={{
                    background: "linear-gradient(to top, rgba(58,6,21,.7) 0%, transparent 50%)",
                    opacity: hoveredId === product.id ? 1 : 0,
                    transition: "opacity .4s ease",
                  }}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="btn-silk"
                    style={{ padding: "10px 22px", fontSize: "10px" }}
                  >
                    View Details
                  </Link>
                  <button
                    className="w-10 h-10 flex items-center justify-center transition-all"
                    style={{
                      background: "rgba(58,6,21,.9)",
                      border: "1px solid rgba(217,178,109,.5)",
                      color: "#D9B26D",
                      cursor: "pointer",
                    }}
                    aria-label="Add to wishlist"
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F4E8D4")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#D9B26D")}
                  >
                    ♡
                  </button>
                </div>
              </div>

              {/* Card info */}
              <div className="p-5">
                <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, #B8925A, transparent)" }} />
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "9px",
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "#B8925A",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {product.fabric}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-cinzel), Georgia, serif",
                    fontSize: "15px",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "#3A0615",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#3A0615",
                      letterSpacing: ".04em",
                    }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "16px",
                        color: "#3A2A26",
                        opacity: 0.45,
                        textDecoration: "line-through",
                      }}
                    >
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
