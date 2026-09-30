"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

const occasions = [
  {
    key: "wedding",
    label: "Wedding",
    icon: "✦",
    description: "Grand Kanjivaram & Banarasi silks for your most auspicious day.",
    image: "/saree-4.jpg",
    accent: "#C24B6B",
    href: "/collections?occasion=wedding",
  },
  {
    key: "festival",
    label: "Festival",
    icon: "❋",
    description: "Vibrant pattu and silk sarees to celebrate every festive moment.",
    image: "/saree-1.jpg",
    accent: "#D98324",
    href: "/collections?occasion=festival",
  },
  {
    key: "office",
    label: "Office",
    icon: "◈",
    description: "Refined cotton Chanderi and lightweight silks for professional elegance.",
    image: "/hero-editorial.jpg",
    accent: "#0F5C63",
    href: "/collections?occasion=office",
  },
  {
    key: "daily",
    label: "Daily Wear",
    icon: "✿",
    description: "Comfortable handwoven cotton sarees for graceful everyday dressing.",
    image: "/saree-3.jpg",
    accent: "#1F6B4A",
    href: "/collections?occasion=daily",
  },
];

const testimonials = [
  {
    quote: "I wore my Swavani Kanjivaram at my daughter's wedding. Every guest stopped to ask where it was from — the zari work is extraordinary.",
    name: "Priya Venkataraman",
    role: "Bridal Customer, Chennai",
    image: "/saree-2.jpg",
  },
  {
    quote: "The saree arrived beautifully packaged and the quality surpassed everything I imagined. The weave is so precise you can feel the artisan's touch.",
    name: "Lakshmi Krishnamurthy",
    role: "Heritage Collection, Bangalore",
    image: "/saree-5.jpg",
  },
  {
    quote: "Swavani is the only place I trust for gifting sarees to family abroad. The authenticity certificates make it truly special.",
    name: "Meenakshi Sundaram",
    role: "Gift Purchase, Singapore",
    image: "/saree-1.jpg",
  },
];

export function Sections() {
  const [activeOccasion, setActiveOccasion] = useState("wedding");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const active = occasions.find((o) => o.key === activeOccasion) || occasions[0];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          OCCASION PICKS  (Indigo section)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "clamp(72px, 9vw, 120px) 0",
          backgroundImage: "url('/download (5).jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(58,6,21,.80) 0%, rgba(92,15,39,.68) 50%, rgba(58,6,21,.84) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div style={{ width: "36px", height: "1px", background: "#D9B26D" }} />
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#D9B26D", fontWeight: 600 }}>
                Shop By Occasion
              </span>
              <div style={{ width: "36px", height: "1px", background: "#D9B26D" }} />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cinzel), Georgia, serif",
                fontSize: "clamp(26px, 3.8vw, 42px)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#F4E8D4",
                fontWeight: 700,
              }}
            >
              Dressed for Every Moment
            </h2>
          </div>

          {/* Tabs + content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {occasions.map((occ) => (
                  <button
                    key={occ.key}
                    onClick={() => setActiveOccasion(occ.key)}
                    className="text-left transition-all"
                    style={{
                      padding: "16px 20px",
                      border: `1px solid ${activeOccasion === occ.key ? occ.accent : "rgba(217,178,109,.2)"}`,
                      background: activeOccasion === occ.key ? `${occ.accent}22` : "rgba(0,0,0,.25)",
                      cursor: "pointer",
                      borderLeft: `3px solid ${activeOccasion === occ.key ? occ.accent : "transparent"}`,
                    }}
                  >
                    <div style={{ fontSize: "18px", marginBottom: "4px" }}>{occ.icon}</div>
                    <div style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "13px", letterSpacing: ".1em", textTransform: "uppercase", color: "#F4E8D4", fontWeight: 600 }}>
                      {occ.label}
                    </div>
                  </button>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(16px, 2vw, 19px)",
                  fontStyle: "italic",
                  color: "rgba(244,232,212,.8)",
                  lineHeight: 1.65,
                  marginBottom: "24px",
                }}
              >
                {active.description}
              </p>
              <a
                href={active.href}
                className="btn-zari"
                style={{ display: "inline-block" }}
              >
                Shop {active.label} Sarees
              </a>
            </div>

            <div
              className="relative overflow-hidden"
              style={{
                borderTopRightRadius: "clamp(80px, 12vw, 150px)",
                border: `1px solid ${active.accent}55`,
                boxShadow: `0 20px 70px rgba(58,6,21,.5), 0 0 40px ${active.accent}30`,
                transition: "box-shadow .5s ease",
                height: "clamp(360px, 50vw, 520px)",
              }}
            >
              <Image
                src={active.image}
                alt={active.label + " sarees"}
                fill
                className="object-cover transition-opacity duration-500"
                style={{ objectPosition: "center 20%" }}
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(43,47,107,.5) 100%)" }} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS  (cream surface)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "clamp(72px, 9vw, 120px) 0",
          background: "linear-gradient(180deg, #FBF5EA 0%, #F4E8D4 100%)",
        }}
      >
        <div className="absolute inset-0 bg-kolam opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div style={{ width: "36px", height: "1px", background: "#B8925A" }} />
            <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600 }}>
              Real Brides & Patrons
            </span>
            <div style={{ width: "36px", height: "1px", background: "#B8925A" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cinzel), Georgia, serif",
              fontSize: "clamp(26px, 3.8vw, 40px)",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "#3A0615",
              fontWeight: 700,
              marginBottom: "48px",
            }}
          >
            Words of Silk
          </h2>

          {/* Testimonial card */}
          <div
            style={{
              background: "#FBF5EA",
              border: "1px solid rgba(184,146,90,.3)",
              padding: "clamp(32px, 5vw, 56px)",
              boxShadow: "0 16px 60px rgba(58,6,21,.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative arch top */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{ width: "120px", height: "2px", background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }}
            />
            <span style={{ fontSize: "48px", color: "#B8925A", opacity: 0.3, lineHeight: 1, display: "block", marginBottom: "16px" }}>&ldquo;</span>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(18px, 2.4vw, 24px)",
                fontStyle: "italic",
                color: "#3A2A26",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}
            >
              {testimonials[activeTestimonial].quote}
            </p>
            <div className="h-px mb-5" style={{ background: "linear-gradient(90deg, transparent, #B8925A, transparent)" }} />
            <div>
              <div style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "13px", letterSpacing: ".12em", textTransform: "uppercase", color: "#3A0615", fontWeight: 600 }}>
                {testimonials[activeTestimonial].name}
              </div>
              <div style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", color: "#B8925A", marginTop: "3px", fontWeight: 500 }}>
                {testimonials[activeTestimonial].role}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: activeTestimonial === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: activeTestimonial === i ? "#3A0615" : "rgba(184,146,90,.4)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all .3s",
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
