"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const collections = [
  {
    id: "01",
    name: "Kanjivaram",
    subtitle: "Pure Mulberry Silk",
    description: "Temple-border zari work, rich colour block weave — the queen of Indian silks. Each piece is a lifetime heirloom.",
    image: "/products/1/DSC03770.jpg",
    href: "/product/p1",
    accent: "#0F5C63",
    badge: "GI Certified",
  },
  {
    id: "02",
    name: "Sapphire Silks",
    subtitle: "Imperial Heritage",
    description: "Opulent pure silk weaves in peacock and royal jewel tones. Handcrafted on traditional looms.",
    image: "/products/11/DSC03853.jpg",
    href: "/product/p11",
    accent: "#2B2F6B",
    badge: "Royal Heritage",
  },
  {
    id: "03",
    name: "Pattu & Soft Silks",
    subtitle: "Heritage South Silk",
    description: "South Indian Pattu with rich geometric motifs, temple borders, and featherlight drape.",
    image: "/products/15/DSC03892.jpg",
    href: "/product/p15",
    accent: "#D98324",
    badge: "Handloom Mark",
  },
  {
    id: "04",
    name: "Bridal Trousseau",
    subtitle: "Sacred Ceremony Heirlooms",
    description: "Bespoke bridal silks — from auspicious marigold korvai silks to regal temple zari weaves.",
    image: "/products/5/DSC03798.jpg",
    href: "/product/p5",
    accent: "#C24B6B",
    badge: "Bespoke",
  },
];

export function CuratedShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Parallax bg shift
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { amount: 0.3, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F4E8D4 0%, #EDDCC0 60%, #F4E8D4 100%)",
        padding: "clamp(72px, 9vw, 120px) 0",
      }}
    >
      {/* Parallax kolam bg */}
      <motion.div
        className="absolute inset-0 bg-kolam opacity-60 pointer-events-none"
        style={{ y: bgY }}
      />

      {/* Border top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #B8925A, #D9B26D, #B8925A, transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, transparent, #B8925A)", transformOrigin: "left" }}
            />
            <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "#B8925A", fontWeight: 600 }}>
              Master Loom Curations
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ width: "48px", height: "1px", background: "linear-gradient(90deg, #B8925A, transparent)", transformOrigin: "right" }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
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
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.28 }}
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
          </motion.p>
        </div>

        {/* Collection grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, idx) => (
            <CollectionCard key={col.id} col={col} idx={idx} />
          ))}
        </div>

        {/* Browse all CTA */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/collections" className="btn-silk">
            Browse All Collections
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #B8925A, #D9B26D, #B8925A, transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />
    </section>
  );
}

function CollectionCard({ col, idx }: { col: typeof collections[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: idx * 0.13 }}
      className="group relative overflow-hidden"
      style={{
        background: "#FBF5EA",
        border: "1px solid rgba(184,146,90,.3)",
        boxShadow: "0 8px 40px rgba(58,6,21,.1)",
      }}
      whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(58,6,21,.18)" }}
    >
      <Link href={col.href} className="block w-full h-full text-inherit no-underline cursor-pointer">
        {/* Image */}
        <div ref={imgRef} className="relative overflow-hidden" style={{ height: "320px" }}>
          <motion.div style={{ y: imgY, height: "110%", position: "relative", top: "-5%" }}>
            <Image
              src={col.image}
              alt={col.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ objectPosition: "center 20%" }}
            />
          </motion.div>
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
            className="group-hover:text-[#96742A] transition-colors"
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
      </Link>
    </motion.div>
  );
}
