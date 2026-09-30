"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Award } from "lucide-react";

export function HeroMahira() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen bg-[#0a130d] text-[#f5ead8] flex flex-col justify-between pt-16 sm:pt-20 pb-0 overflow-hidden">
      {/* Background Room Atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/room-dark.jpg"
          alt="Royal Indian Palace Background"
          fill
          className="object-cover object-center opacity-25 filter blur-[1px] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a130d]/85 via-[#0a130d]/65 to-[#0a130d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,163,95,0.12)_0%,transparent_75%)]" />
      </div>

      {/* ── Left Vertical Rail ── */}
      <div className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center gap-3 pointer-events-none [writing-mode:vertical-lr] rotate-180">
        <span className="text-[10px] tracking-[0.35em] text-[#e8c87a]/60 uppercase font-mono">
          ESTD. 2026 // CHENNAI, INDIA
        </span>
        <span className="h-10 w-[1px] bg-[#c9a35f]/30" />
      </div>

      {/* ── Right Vertical Rail ── */}
      <div className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center gap-3 pointer-events-none [writing-mode:vertical-lr]">
        <span className="h-10 w-[1px] bg-[#c9a35f]/30" />
        <span className="text-[10px] tracking-[0.35em] text-[#e8c87a]/60 uppercase font-mono">
          HANDLOOM SILK // GI CERTIFIED
        </span>
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full my-auto py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Royal Typography & Story */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow with gold accent line */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#c9a35f]/10 border border-[#c9a35f]/30 rounded-full mb-5">
              <Sparkles size={12} className="text-[#e8c87a]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#e8c87a] font-medium font-mono">
                Tradition Meets Tomorrow
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#f5ead8] tracking-tight mb-5">
              Woven in <span className="italic text-[#e8c87a] font-light">Gold</span>,<br />
              Draped in <span className="bg-gradient-to-r from-[#e8c87a] via-[#f5ead8] to-[#c9a35f] bg-clip-text text-transparent font-medium">Royalty</span>.
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-sm sm:text-base text-[#f5ead8]/75 leading-relaxed max-w-xl mb-8 font-light">
              Experience the unmatched luxury of authentic handwoven Kanjivaram, Banarasi, and Chanderi sarees. Crafted with pure 24K gold zari and certified Mulberry silk by generational master artisans.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="/collections"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#0a130d] bg-gradient-to-r from-[#e8c87a] via-[#c9a35f] to-[#d4af37] shadow-[0_4px_20px_rgba(201,163,95,0.3)] hover:shadow-[0_4px_28px_rgba(232,200,122,0.5)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Collections
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#e8c87a] border border-[#c9a35f]/50 hover:border-[#e8c87a] hover:bg-[#c9a35f]/15 transition-all duration-300"
              >
                The Artisan Heritage
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-[#c9a35f]/25 w-full max-w-lg">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#e8c87a] font-medium">350+</span>
                <span className="text-[10px] sm:text-[11px] text-[#f5ead8]/60 uppercase tracking-wider block mt-0.5">Master Weavers</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#e8c87a] font-medium">100%</span>
                <span className="text-[10px] sm:text-[11px] text-[#f5ead8]/60 uppercase tracking-wider block mt-0.5">Silk Mark Certified</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#e8c87a] font-medium">12K+</span>
                <span className="text-[10px] sm:text-[11px] text-[#f5ead8]/60 uppercase tracking-wider block mt-0.5">Brides Draped</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Framed Editorial Arch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center pt-4"
          >
            {/* Ambient Gold Glow Halo */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#c9a35f]/25 to-[#e8c87a]/15 filter blur-3xl pointer-events-none animate-pulse" />

            {/* Arch Frame */}
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] aspect-[3/4] p-3 rounded-t-[150px] border border-[#c9a35f]/40 bg-[#0f1d15]/70 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              {/* Inner Arch */}
              <div className="relative w-full h-full rounded-t-[140px] overflow-hidden border border-[#e8c87a]/30">
                <Image
                  src="/hero-editorial.jpg"
                  alt="House of Swavani Bridal Saree Editorial"
                  fill
                  className="object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a130d] via-transparent to-transparent opacity-50" />

                {/* Corner Lotus Icon */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#0a130d]/70 border border-[#c9a35f]/50 flex items-center justify-center text-[#e8c87a]">
                  <Sparkles size={14} />
                </div>
              </div>

              {/* Floating Badge 1: GI Certified */}
              <div className="absolute -bottom-3 left-4 bg-[#0a130d]/95 border border-[#c9a35f]/70 px-3.5 py-2 shadow-2xl backdrop-blur-md flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#c9a35f]/20 border border-[#e8c87a]/50 flex items-center justify-center text-[#e8c87a] shrink-0">
                  <ShieldCheck size={15} />
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-[#e8c87a] tracking-wider leading-none">GI Certified</h4>
                  <p className="text-[9px] text-[#f5ead8]/70 mt-0.5">Kanchipuram Silk</p>
                </div>
              </div>

              {/* Floating Badge 2: 24K Gold Zari */}
              <div className="absolute top-10 -right-3 sm:-right-5 bg-[#0a130d]/95 border border-[#c9a35f]/70 px-3.5 py-2 shadow-2xl backdrop-blur-md flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#c9a35f]/20 border border-[#e8c87a]/50 flex items-center justify-center text-[#e8c87a] shrink-0">
                  <Award size={15} />
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-[#e8c87a] tracking-wider leading-none">24K Gold Zari</h4>
                  <p className="text-[9px] text-[#f5ead8]/70 mt-0.5">Tested Silver & Gold</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom Marquee Ticker ── */}
      <div className="relative z-10 w-full border-t border-[#c9a35f]/20 bg-[#060c08] py-2.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-xs uppercase tracking-[0.25em] text-[#e8c87a]/85 font-mono">
              <span>✦ KANJIVARAM BRIDAL SILKS</span>
              <span className="text-[#c9a35f]/40">//</span>
              <span>✦ BANARASI TANCHOI & BROCADE</span>
              <span className="text-[#c9a35f]/40">//</span>
              <span>✦ ROYAL CHANDERI WEAVES</span>
              <span className="text-[#c9a35f]/40">//</span>
              <span>✦ ORGANZA TISSUE COUTURE</span>
              <span className="text-[#c9a35f]/40">//</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
