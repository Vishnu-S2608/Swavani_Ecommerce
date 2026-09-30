"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const weaveStats = [
  { num: "1200+", label: "Master Weavers" },
  { num: "5",     label: "Heritage Collections" },
  { num: "24K",   label: "Pure Zari Thread" },
  { num: "100%",  label: "Authentic Silk Mark" },
];

export function InteractiveLoom() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(72px, 9vw, 120px) 0",
        // Uses the velvet red background image
        backgroundImage: "url('/download (2).jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Silk deep overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(58,6,21,.85) 0%, rgba(92,15,39,.70) 50%, rgba(58,6,21,.90) 100%)" }}
      />

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {weaveStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                style={{
                  fontFamily: "var(--font-cinzel), Georgia, serif",
                  fontSize: "clamp(32px, 5vw, 52px)",
                  letterSpacing: ".06em",
                  fontWeight: 700,
                  background: "linear-gradient(100deg, #B8925A, #F1D9A0 45%, #B8925A)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "6px",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "10px",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "rgba(244,232,212,.7)",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Zari divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D)" }} />
          <span style={{ color: "#D9B26D", fontSize: "18px" }}>✦</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #D9B26D, transparent)" }} />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div style={{ width: "36px", height: "1px", background: "#D9B26D" }} />
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#D9B26D", fontWeight: 600 }}>
                Zari &amp; Loom Anatomy
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-cinzel), Georgia, serif",
                fontSize: "clamp(26px, 3.8vw, 42px)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#F4E8D4",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "20px",
              }}
            >
              The Art of<br />Zari Weaving
            </h2>

            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(16px, 2vw, 19px)",
                fontStyle: "italic",
                color: "rgba(244,232,212,.78)",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}
            >
              Real zari is 24-karat gold thread wrapped around a silk core. A single metre of richly zari-worked border requires hours of delicate hand-interlocking — a skill passed down within weaving families for generations.
            </p>

            <div className="space-y-4">
              {[
                { term: "Pallu",   def: "The decorative end section of the saree, heavily worked with zari motifs." },
                { term: "Border",  def: "The longitudinal edge that frames the body of the saree — defines the collection style." },
                { term: "Body",    def: "The main field of the saree, often with butis (small motifs) or a plain weave." },
              ].map((item) => (
                <div
                  key={item.term}
                  className="flex gap-4"
                  style={{
                    borderLeft: "2px solid rgba(217,178,109,.35)",
                    paddingLeft: "16px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "12px",
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "#D9B26D",
                        fontWeight: 600,
                      }}
                    >
                      {item.term}
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "15px",
                        color: "rgba(244,232,212,.7)",
                        lineHeight: 1.55,
                        marginTop: "3px",
                      }}
                    >
                      {item.def}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/about" className="btn-zari">
                Our Story &amp; Artisans →
              </Link>
            </div>
          </div>

          {/* Image with arch mask */}
          <div
            className="relative overflow-hidden"
            style={{
              borderTopLeftRadius: "clamp(80px, 12vw, 160px)",
              border: "1px solid rgba(217,178,109,.35)",
              boxShadow: "0 30px 90px rgba(58,6,21,.6)",
              height: "clamp(380px, 55vw, 600px)",
            }}
          >
            <Image
              src="/hero-arch.jpg"
              alt="Indian arch doorway — Swavani boutique heritage"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(58,6,21,.3) 0%, transparent 30%, transparent 70%, rgba(58,6,21,.4) 100%)" }}
            />
            {/* Caption overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{ background: "linear-gradient(to top, rgba(58,6,21,.85) 0%, transparent 100%)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "16px",
                  fontStyle: "italic",
                  color: "#F4E8D4",
                }}
              >
                Every cusped arch is a reminder that beauty is always framed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
