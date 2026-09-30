"use client";
import React from "react";
import Image from "next/image";

const galleryImages = [
  { src: "/saree-1.jpg", alt: "Kanjivaram silk saree — crimson zari", span: "row-span-2" },
  { src: "/saree-2.jpg", alt: "Banarasi brocade — royal blue", span: "" },
  { src: "/hero-model.jpg", alt: "Bridal silk editorial", span: "" },
  { src: "/saree-3.jpg", alt: "Pattu heritage silk", span: "row-span-2" },
  { src: "/saree-4.jpg", alt: "Bridal zari pallu", span: "" },
  { src: "/saree-5.jpg", alt: "Occasion silk saree", span: "" },
];

export function InstagramSection() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          GALLERY / LOOKBOOK TEASER  (cream surface)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "clamp(72px, 9vw, 120px) 0",
          background: "linear-gradient(180deg, #F4E8D4 0%, #EDDCC0 100%)",
        }}
      >
        <div className="absolute inset-0 bg-paisley opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B8925A, #D9B26D, #B8925A, transparent)" }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div style={{ width: "36px", height: "1px", background: "#B8925A" }} />
                <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600 }}>
                  The Lookbook
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cinzel), Georgia, serif",
                  fontSize: "clamp(26px, 3.8vw, 42px)",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "#3A0615",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                Silk in Real Life
              </h2>
            </div>
            <a
              href="/lookbook"
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
              Open Lookbook →
            </a>
          </div>

          {/* Masonry-ish gallery */}
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "auto",
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group cursor-pointer ${img.span}`}
                style={{
                  height: img.span ? "clamp(300px, 40vw, 480px)" : "clamp(140px, 20vw, 230px)",
                  border: "1px solid rgba(184,146,90,.25)",
                  transition: "transform .4s ease, box-shadow .4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 60px rgba(58,6,21,.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" style={{ objectPosition: "center 20%" }} />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
                  style={{ background: "rgba(58,6,21,.55)" }}
                >
                  <span style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "10px",
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "#D9B26D",
                    fontWeight: 600,
                    border: "1px solid rgba(217,178,109,.5)",
                    padding: "8px 18px",
                    background: "rgba(58,6,21,.5)",
                  }}>
                    View →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #B8925A, #D9B26D, #B8925A, transparent)" }} />
      </section>

      {/* ═══════════════════════════════════════════════════════
          VISIT STORE / WHATSAPP CTA  (silk surface, damask bg)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: "clamp(72px, 9vw, 120px) 0",
          backgroundImage: "url('/fond ecrant rouge aestithique.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(58,6,21,.88) 0%, rgba(92,15,39,.78) 50%, rgba(58,6,21,.92) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          {/* Arch SVG emblem */}
          <div className="flex justify-center mb-8">
            <svg viewBox="0 0 100 80" fill="none" className="w-20 h-auto">
              <path
                d="M5,78 V48 C5,38 12,34 18,29 C25,23 35,23 40,17 C44,13 46,11 50,8 C54,11 56,13 60,17 C65,23 75,23 82,29 C88,34 95,38 95,48 V78 Z"
                stroke="#D9B26D"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M5,78 V48 C5,38 12,34 18,29 C25,23 35,23 40,17 C44,13 46,11 50,8 C54,11 56,13 60,17 C65,23 75,23 82,29 C88,34 95,38 95,48 V78 Z"
                stroke="#B8925A"
                strokeWidth="0.8"
                fill="none"
                opacity="0.6"
                transform="translate(50 44) scale(.88) translate(-50 -44)"
              />
              <g fill="#D9B26D" stroke="#3A0615" strokeWidth="0.8">
                <ellipse cx="50" cy="5" rx="2.5" ry="5" />
                <ellipse cx="50" cy="5" rx="2.5" ry="5" transform="rotate(72 50 8)" />
                <ellipse cx="50" cy="5" rx="2.5" ry="5" transform="rotate(144 50 8)" />
                <ellipse cx="50" cy="5" rx="2.5" ry="5" transform="rotate(216 50 8)" />
                <ellipse cx="50" cy="5" rx="2.5" ry="5" transform="rotate(288 50 8)" />
                <circle cx="50" cy="8" r="2" fill="#3A0615" />
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{ width: "36px", height: "1px", background: "#D9B26D" }} />
            <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#D9B26D", fontWeight: 600 }}>
              Visit the Boutique
            </span>
            <div style={{ width: "36px", height: "1px", background: "#D9B26D" }} />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-cinzel), Georgia, serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "#F4E8D4",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Come, Feel the Silk
          </h2>

          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(17px, 2.2vw, 22px)",
              fontStyle: "italic",
              color: "rgba(244,232,212,.78)",
              lineHeight: 1.65,
              marginBottom: "12px",
            }}
          >
            Nothing compares to holding real silk in your hands. Visit our boutique to explore the full archive, consult with our curators, and choose your heirloom.
          </p>

          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "11px",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#D9B26D",
              marginBottom: "40px",
            }}
          >
            {/* TODO: replace with real address */}
            123 Silk Bazaar Road, Kanchipuram 631502 &nbsp;·&nbsp; Mon–Sat 10am–7pm
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://wa.me/919999999999?text=Hello%20Swavani%2C%20I%20would%20like%20to%20enquire%20about%20your%20saree%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-zari flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire on WhatsApp
            </a>
            <a
              href="/contact"
              className="btn-silk"
            >
              Visit Us / Get Directions
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />
      </section>
    </>
  );
}
