"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const team = [
    { name: "Swavani Meenakshi",  role: "Founder & Creative Director",  image: "/saree-4.jpg" },
    { name: "Rajan Krishnamurthy", role: "Master Weaver Partnership Head", image: "/saree-2.jpg" },
    { name: "Priya Lakshmi",       role: "Styling & Curation Lead",       image: "/saree-5.jpg" },
  ];

  const values = [
    { icon: "🌿", title: "Sustainable",  desc: "We partner only with weavers who follow ethical, eco-friendly practices." },
    { icon: "🤝", title: "Artisan-First", desc: "Fair wages and long-term partnerships with master weavers across India." },
    { icon: "✨", title: "Authentic",     desc: "Every saree is certified handmade — no machine replication ever." },
    { icon: "💛", title: "Inclusive",     desc: "Sarees for every woman, every occasion, every budget." },
  ];

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Hero */}
      <div ref={heroRef} className="relative h-[60vh] overflow-hidden bg-[#1A050A]">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image src="/saree-4.jpg" alt="About Swavani" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-montserrat text-sm tracking-[0.25em] text-[#96742A] uppercase font-semibold mb-4 drop-shadow-md"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-cinzel text-5xl md:text-7xl font-semibold text-[#FBF9F6] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          >
            House of Swavani
          </motion.h1>
        </div>
      </div>

      {/* Story Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/hero-arch.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // Parallax effect
          }}
        />
        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-black/30 backdrop-blur-sm p-8 md:p-16 rounded-3xl border border-[#96742A]/20 shadow-2xl"
          >
            <p className="font-montserrat text-sm tracking-[0.25em] text-[#96742A] mb-6 uppercase font-bold drop-shadow-md">Who We Are</p>
            <p className="font-cormorant text-2xl md:text-4xl font-medium text-[#FBF9F6] leading-relaxed mb-12 italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              &ldquo;We believe every woman deserves to feel like royalty in a saree that tells her story.&rdquo;
            </p>
            <div className="space-y-6 font-cormorant text-xl text-[#FBF9F6] leading-relaxed text-center max-w-2xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <p>
                House of Swavani was born from a deep love for India&apos;s most sacred textile tradition — the saree. Founded with a vision to make authentic, handcrafted sarees accessible to every woman, we work directly with master weavers from Kanjivaram, Varanasi, Patan, and beyond.
              </p>
              <p>
                Each saree in our collection is sourced with meticulous care — we visit the looms, meet the artisans, and understand the story behind every thread before it reaches you.
              </p>
              <p className="text-[#96742A] italic font-medium">
                We are not just a store. We are a bridge between centuries of artisanal wisdom and the modern woman who seeks beauty with meaning.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-crimson-900 bg-indian-pattern">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-vibes text-3xl text-gold-400 mb-2">What We Stand For</p>
            <h2 className="font-cormorant text-4xl font-bold text-ivory-100">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 border border-gold-400/20 rounded-2xl hover:border-gold-400/50 transition-all"
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-cormorant text-xl font-semibold text-gold-400 mb-2">{v.title}</h3>
                <p className="text-xs text-ivory-300/60 font-outfit leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-ivory-200">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-vibes text-3xl text-gold-500 mb-2">The Faces Behind</p>
            <h2 className="font-cormorant text-4xl font-bold text-crimson-800">Our Team</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="text-center group"
              >
                <div className="relative w-48 h-56 mx-auto mb-4 rounded-2xl overflow-hidden shadow-card-3d">
                  <Image src={member.image} alt={member.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" sizes="192px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-crimson-900/50 to-transparent" />
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-crimson-800">{member.name}</h3>
                <p className="text-xs text-gold-500 font-outfit mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ivory-100 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-vibes text-3xl text-gold-500 mb-3">Ready to Find Your Saree?</p>
          <h2 className="font-cormorant text-4xl font-bold text-crimson-800 mb-6">Begin Your Journey</h2>
          <Link href="/collections">
            <motion.span
              whileHover={{ scale: 1.03 }}
              className="inline-flex px-10 py-4 bg-crimson-gradient text-ivory-100 font-outfit font-bold text-sm rounded-full btn-gold-shimmer hover:shadow-crimson transition-all"
            >
              Shop Our Collections
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
