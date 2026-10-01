"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export function BrandShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { amount: 0.3, once: true });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Parallax layers for depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10px", "-40px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 0.55, 0.55, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-start overflow-hidden bg-[#1A050A]"
    >
      {/* Background Image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: bgY,
          backgroundImage: "url('/hero-editorial.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          scale: 1.15,
        }}
      />

      {/* Vignette overlay with scroll-based opacity */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          opacity: overlayOpacity,
          background: "linear-gradient(to b, rgba(0,0,0,0.7) 0%, rgba(26,5,10,0.3) 40%, rgba(26,5,10,0.4) 60%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* Additional decorative gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

      {/* Content Container */}
      <motion.div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-start text-center px-6 md:px-12 w-full h-full flex-grow pt-24 md:pt-32 lg:pt-40"
        style={{ y: textY }}
      >
        {/* Tamil Eyebrow */}
        <motion.span
          className="font-montserrat text-sm md:text-base text-[#FBF9F6] mb-4 tracking-[0.2em] drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          (ஹவுஸ் ஆஃப் ஸ்வவணி)
        </motion.span>

        {/* Main Brand Title with word-by-word reveal */}
        <motion.h2
          className="font-cinzel text-5xl md:text-7xl lg:text-[7rem] text-[#FBF9F6] mb-8 tracking-[0.15em] uppercase drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={contentInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          Swavani
        </motion.h2>

        {/* Animated gold divider */}
        <motion.div
          className="mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={contentInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          style={{
            width: "200px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #D9B26D, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Description */}
        <motion.p
          className="font-cormorant text-lg md:text-2xl text-[#FBF9F6] max-w-4xl leading-[1.8] drop-shadow-md font-medium tracking-wide"
          initial={{ opacity: 0, y: 28 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.45 }}
        >
          A royal vision in silk—this handwoven masterpiece in dual-toned hues is woven with intricate pure zari. Featuring traditional motifs on the body, a striking temple border, and a pallu adorned with floral vines and diamond patterns—this is tradition reimagined. The perfect blend of depth, detail, and timeless grace.
        </motion.p>

        {/* Floating decorative elements */}
        <motion.div
          className="mt-12 flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.span
            style={{ color: "#D9B26D", fontSize: "18px" }}
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            ✦
          </motion.span>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #D9B26D)" }} />
          <span style={{ fontFamily: "var(--font-montserrat)", fontSize: "9px", letterSpacing: ".4em", textTransform: "uppercase", color: "#D9B26D", fontWeight: 600 }}>
            EST. IN KANCHIPURAM
          </span>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #D9B26D, transparent)" }} />
          <motion.span
            style={{ color: "#D9B26D", fontSize: "18px" }}
            animate={{ rotate: [0, -360] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            ✦
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Footer link at bottom */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={contentInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <motion.a
          href="https://www.swavani.in"
          className="font-montserrat text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-[#FBF9F6] transition-colors drop-shadow-md font-semibold"
          whileHover={{ color: "#D9B26D", letterSpacing: "0.7em" }}
          transition={{ duration: 0.3 }}
        >
          W W W . S W A V A N I . I N
        </motion.a>
      </motion.div>
    </section>
  );
}
