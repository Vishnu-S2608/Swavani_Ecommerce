"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Sourcing the Silk",
    text: "Pure mulberry silk cocoons are sourced from certified farms in Karnataka and Tamil Nadu — only grade-A threads are chosen.",
  },
  {
    num: "02",
    title: "Dyeing the Thread",
    text: "Natural dyes and vibrant mineral pigments are applied at the thread level so colour remains vivid across decades.",
  },
  {
    num: "03",
    title: "Setting the Loom",
    text: "Each motif pattern is hand-set on the Jacquard loom — a process that may take two to three days for complex temple borders.",
  },
  {
    num: "04",
    title: "The Zari Weave",
    text: "Real 24K gold-wrapped thread (zari) is interlocked by the weaver's hand in a rhythm that cannot be mechanised.",
  },
];

export function EditorialStory() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: "clamp(80px, 10vw, 130px) 0",
        // Uses the uploaded damask texture + deep silk overlay
        backgroundImage: "url('/download (3).jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Deep silk overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(58,6,21,.88) 0%, rgba(92,15,39,.75) 50%, rgba(58,6,21,.92) 100%)",
        }}
      />

      {/* Gold vine border lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image side */}
          <div className="relative">
            <div
              className="relative overflow-hidden"
              style={{
                borderTopLeftRadius: "clamp(80px, 12vw, 160px)",
                border: "1px solid rgba(217,178,109,.35)",
                boxShadow: "0 30px 90px rgba(58,6,21,.6)",
              }}
            >
              <Image
                src="/heritage-fabric.jpg"
                alt="Weaver at handloom — Swavani Craft Story"
                width={600}
                height={700}
                className="w-full object-cover"
                style={{ height: "clamp(400px, 55vw, 620px)", objectPosition: "center 25%" }}
              />
              {/* Cream arch overlay top */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(58,6,21,.4) 0%, transparent 30%, transparent 75%, rgba(58,6,21,.5) 100%)" }}
              />
            </div>

            {/* Floating quote card */}
            <div
              className="absolute -bottom-6 -right-4 sm:right-8 max-w-[240px]"
              style={{
                background: "linear-gradient(135deg, #3A0615, #5C0F27)",
                border: "1px solid rgba(217,178,109,.4)",
                padding: "20px 22px",
                boxShadow: "0 16px 48px rgba(58,6,21,.5)",
              }}
            >
              <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, #D9B26D, transparent)" }} />
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "15px",
                  fontStyle: "italic",
                  color: "#F4E8D4",
                  lineHeight: 1.55,
                  marginBottom: "10px",
                }}
              >
                "Each saree holds the memory of hands that wove light into silk."
              </p>
              <span
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "9px",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#D9B26D",
                  fontWeight: 600,
                }}
              >
                — House of Swavani
              </span>
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div style={{ width: "36px", height: "1px", background: "#D9B26D" }} />
              <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#D9B26D", fontWeight: 600 }}>
                The Swavani Legacy
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
                marginBottom: "16px",
              }}
            >
              Craft, Heritage &<br />Living Tradition
            </h2>

            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(16px, 2vw, 19px)",
                fontStyle: "italic",
                color: "rgba(244,232,212,.75)",
                lineHeight: 1.65,
                marginBottom: "32px",
              }}
            >
              For over a century, the looms of Kanchipuram and Varanasi have hummed with the rhythm of creation. Swavani is the custodian of that timeless craft — connecting master weavers directly with those who value heritage over fast fashion.
            </p>

            {/* Weaving process steps */}
            <div className="space-y-4">
              {steps.map((step, i) => (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  className="w-full text-left transition-all"
                  style={{
                    background: activeStep === i ? "rgba(217,178,109,.12)" : "rgba(58,6,21,.45)",
                    border: `1px solid ${activeStep === i ? "rgba(217,178,109,.5)" : "rgba(217,178,109,.15)"}`,
                    padding: "14px 18px",
                    cursor: "pointer",
                    borderLeft: activeStep === i ? "3px solid #D9B26D" : "3px solid transparent",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      style={{
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "11px",
                        letterSpacing: ".14em",
                        color: "#D9B26D",
                        fontWeight: 700,
                        flexShrink: 0,
                        paddingTop: "2px",
                      }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-cinzel), Georgia, serif",
                          fontSize: "13px",
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          color: "#F4E8D4",
                          fontWeight: 600,
                          marginBottom: activeStep === i ? "6px" : "0",
                        }}
                      >
                        {step.title}
                      </h4>
                      {activeStep === i && (
                        <p
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontSize: "15px",
                            color: "rgba(244,232,212,.78)",
                            lineHeight: 1.6,
                          }}
                        >
                          {step.text}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Silk Mark */}
            <div className="flex items-center gap-4 mt-10">
              <div
                className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                style={{
                  border: "1px solid rgba(217,178,109,.45)",
                  background: "rgba(58,6,21,.6)",
                }}
              >
                <span style={{ fontSize: "24px" }}>✦</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "12px", letterSpacing: ".14em", color: "#D9B26D", fontWeight: 600, textTransform: "uppercase" }}>
                  Silk Mark Certified
                </div>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "14px", color: "rgba(244,232,212,.7)", fontStyle: "italic", marginTop: "2px" }}>
                  Government of India — Guaranteed Pure Silk
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
