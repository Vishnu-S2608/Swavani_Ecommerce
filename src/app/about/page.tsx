"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/data";
import {
  Gem,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Award,
  ArrowRight,
  MessageCircle,
  Compass,
} from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: Gem,
      title: "Pure Mulberry Silk",
      subtitle: "Unmatched Natural Luster",
      desc: "Sourced exclusively from certified hand-spun silk yarns. Each drape breathes with a luxurious natural sheen and featherweight softness that endures for decades.",
    },
    {
      icon: Sparkles,
      title: "Tested Zari Weaves",
      subtitle: "Opulent Heritage Detailing",
      desc: "Intricately hand-interlocked peacocks, temple borders, and floral jaal motifs woven with tested metallic gold and silver threads that retain their gleam across generations.",
    },
    {
      icon: HeartHandshake,
      title: "Direct Weaver Patronage",
      subtitle: "Fair-Trade Artisan Dignity",
      desc: "We work directly with multi-generational master weavers in Kanchipuram and beyond. Eliminating middlemen ensures dignified artisan compensation and honest pricing.",
    },
    {
      icon: ShieldCheck,
      title: "Silk Mark Guaranteed",
      subtitle: "100% Certified Authenticity",
      desc: "Every saree undergoes strict quality evaluation and carries the official Govt. of India Silk Mark seal, certifying pure natural silk and tested craftsmanship.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Thread Selection",
      desc: "Careful grading of mulberry silk skeins and natural dye formulation for enduring jewel tones.",
    },
    {
      num: "02",
      title: "Loom Preparation",
      desc: "Master artisans spend up to 10 days hand-threading hundreds of individual warp threads on the traditional pit loom.",
    },
    {
      num: "03",
      title: "Korvai Weaving",
      desc: "The body, contrast border, and rich zari pallu are interlocking-woven thread-by-thread by hand with two weavers.",
    },
    {
      num: "04",
      title: "Curated Finishing",
      desc: "Hand-knotted tassels, meticulous purity inspection, and luxury protective casing before safe doorstep dispatch.",
    },
  ];

  const regions = [
    {
      title: "Kanchipuram, Tamil Nadu",
      tagline: "The Sacred Temple Looms",
      desc: "Renowned for heavy contrast borders, ceremonial petni weaves, and regal architectural motifs.",
      image: "/products/1/DSC03770.jpg",
      badge: "Pure Soft Silk",
    },
    {
      title: "Heritage Soft Silks",
      tagline: "Contemporary Featherlight Drape",
      desc: "Crafted for effortless elegance, offering the richness of pure silk with modern day-long comfort.",
      image: "/products/5/DSC03798.jpg",
      badge: "Bridal & Festive",
    },
    {
      title: "Imperial Jewel Weaves",
      tagline: "Deep Jewel Tones & Antique Zari",
      desc: "Rich midnight blues, royal purples, and emerald greens kissed by antique gold buttas.",
      image: "/products/11/DSC03853.jpg",
      badge: "Artisan Heirloom",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#382E2E] font-montserrat">
      {/* ── Cinematic Hero Section ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0F1A13]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/heritage-fabric.jpg"
            alt="Handloom weaving heritage"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A13]/90 via-[#0F1A13]/60 to-[#0F1A13]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A13]/80 via-transparent to-[#0F1A13]/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#96742A]/20 border border-[#96742A]/40 mb-6"
          >
            <Compass size={14} className="text-[#D9B26D]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D9B26D]">
              Heritage · Patronage · Pure Handloom
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-semibold text-[#F4E8D4] leading-tight tracking-wide mb-6 uppercase"
          >
            The House of Swavani
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-cormorant text-2xl sm:text-3xl italic text-[#D9B26D] max-w-2xl mx-auto leading-relaxed"
          >
            &ldquo;A saree is not merely six yards of woven silk — it is a living heirloom of memory, tradition, and devotion.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* ── Brand Genesis & Story ── */}
      <section className="py-24 lg:py-32 bg-[#FBF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Overlapping Editorial Images */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#96742A]/20 bg-[#EBDCC5]/30">
                <Image
                  src="/products/15/DSC03892.jpg"
                  alt="Swavani Master Handloom Silk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>

              {/* Inset floating detail image */}
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-56 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <Image
                  src="/products/1/DSC03770.jpg"
                  alt="Intricate Zari Pallu Detail"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>

              {/* Artisan Seal Badge */}
              <div className="absolute top-6 left-6 bg-[#3E040E]/90 backdrop-blur-md text-[#F4E8D4] px-4 py-2.5 rounded-xl border border-[#96742A]/30 shadow-lg">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#D9B26D]">Established</p>
                <p className="font-cinzel text-lg font-bold leading-tight">Authentic Handloom</p>
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#96742A] block">
                  Who We Are
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-[#3E040E] uppercase tracking-wide leading-snug">
                  Preserving Centuries of Handloom Mastery
                </h2>
              </div>

              <div className="font-cormorant text-xl text-[#382E2E]/90 leading-relaxed space-y-4">
                <p>
                  House of Swavani was conceived with a singular devotion: to restore the sacred grandeur of authentic Indian handlooms into the modern woman&apos;s wardrobe.
                </p>
                <p>
                  In an era saturated with synthetic, machine-printed textiles, we choose the patient art of the pit loom. We partner directly with generational master artisans from Kanchipuram, Varanasi, and traditional weaving clusters across South India.
                </p>
                <p>
                  Every thread of pure mulberry silk is hand-reeled, naturally conditioned, and meticulously woven with tested gold and silver zari. When you drape a Swavani saree, you wear not just an ensemble, but a century of cultural heritage.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#96742A]/20">
                <div className="p-4 rounded-xl bg-[#EBDCC5]/30 border border-[#96742A]/20 text-center">
                  <p className="font-cinzel text-2xl sm:text-3xl font-bold text-[#3E040E]">100%</p>
                  <p className="text-[10px] font-semibold text-[#96742A] uppercase tracking-wider mt-1">
                    Silk Mark Certified
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#EBDCC5]/30 border border-[#96742A]/20 text-center">
                  <p className="font-cinzel text-2xl sm:text-3xl font-bold text-[#3E040E]">0%</p>
                  <p className="text-[10px] font-semibold text-[#96742A] uppercase tracking-wider mt-1">
                    Machine Replicated
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#EBDCC5]/30 border border-[#96742A]/20 text-center">
                  <p className="font-cinzel text-2xl sm:text-3xl font-bold text-[#3E040E]">Direct</p>
                  <p className="text-[10px] font-semibold text-[#96742A] uppercase tracking-wider mt-1">
                    Loom Patronage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Pillars of Pure Craftsmanship (Professional SVGs, Zero Emojis) ── */}
      <section className="py-24 bg-[#111A14] text-[#F4E8D4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D9B26D] block mb-2">
              Our Non-Negotiable Standards
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-semibold text-[#F4E8D4] uppercase tracking-wide">
              The Swavani Promise
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D9B26D] to-transparent mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-white/[0.03] border border-[#D9B26D]/20 hover:border-[#D9B26D]/50 hover:bg-white/[0.06] transition-all duration-300 flex flex-col group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#D9B26D]/10 border border-[#D9B26D]/30 flex items-center justify-center text-[#D9B26D] mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-[#F4E8D4] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-[#D9B26D] uppercase tracking-wider mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-[#F4E8D4]/70 leading-relaxed mt-auto">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The 4-Stage Loom Process ── */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#96742A] block mb-2">
              From Looms to Heirlooms
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-[#3E040E] uppercase tracking-wide">
              The Journey of Each Drape
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st) => (
              <div
                key={st.num}
                className="relative p-6 rounded-2xl bg-white border border-[#96742A]/20 shadow-sm"
              >
                <span className="font-cinzel text-4xl font-bold text-[#96742A]/25 block mb-4">
                  {st.num}
                </span>
                <h3 className="font-cinzel text-lg font-bold text-[#3E040E] uppercase mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-[#382E2E]/70 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Loom Regions Showcase ── */}
      <section className="py-24 bg-[#FBF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#96742A] block mb-2">
                Geographical Heritage
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-semibold text-[#3E040E] uppercase tracking-wide">
                Celebrated Weaving Traditions
              </h2>
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#3E040E] hover:text-[#96742A] transition-colors mt-4 md:mt-0"
            >
              <span>Explore All Sarees</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {regions.map((reg) => (
              <div
                key={reg.title}
                className="group rounded-2xl overflow-hidden bg-white border border-[#96742A]/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EBDCC5]/40">
                  <Image
                    src={reg.image}
                    alt={reg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-[#F4E8D4] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                    {reg.badge}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-cinzel text-lg font-bold text-[#3E040E] uppercase mb-1">
                    {reg.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#96742A] uppercase tracking-wider mb-3">
                    {reg.tagline}
                  </p>
                  <p className="text-xs text-[#382E2E]/70 leading-relaxed mb-6">
                    {reg.desc}
                  </p>
                  <Link
                    href="/collections"
                    className="mt-auto text-xs font-bold text-[#3E040E] hover:text-[#96742A] transition-colors inline-flex items-center gap-1.5 uppercase tracking-widest"
                  >
                    <span>View Weaves</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grand Luxury Final CTA ── */}
      <section className="relative py-28 overflow-hidden bg-[#0A120C] text-[#F4E8D4] text-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/hero-arch.jpg"
            alt="Swavani Architecture"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="w-12 h-12 rounded-full bg-[#D9B26D]/10 border border-[#D9B26D]/30 flex items-center justify-center text-[#D9B26D] mx-auto mb-6">
            <Award size={24} />
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-semibold text-[#F4E8D4] uppercase tracking-wide mb-6">
            Experience Pure Handloom Grace
          </h2>

          <p className="font-cormorant text-xl sm:text-2xl italic text-[#D9B26D] max-w-xl mx-auto mb-10 leading-relaxed">
            Whether curating your wedding trousseau or seeking an unforgettable heirloom, our saree concierge is at your service.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/collections"
              className="w-full sm:w-auto px-8 py-4 bg-[#D9B26D] text-[#1A050A] font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-xl"
            >
              Browse The Archive
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20House%20of%20Swavani%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20handloom%20sarees.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#D9B26D] text-[#D9B26D] hover:bg-[#D9B26D] hover:text-[#1A050A] font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
