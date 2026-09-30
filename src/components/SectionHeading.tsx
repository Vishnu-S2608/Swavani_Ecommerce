"use client";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  tagline: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeading({ tagline, title, subtitle, light = false }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <p className={`font-vibes text-3xl mb-2 ${light ? "text-gold-300" : "text-gold-500"}`}>{tagline}</p>
      <h2 className={`font-cormorant text-4xl md:text-5xl font-bold mb-4 ${light ? "text-ivory-100" : "text-crimson-800"}`}>
        {title}
      </h2>
      <div className={`divider-gold max-w-xs mx-auto mb-4`}>
        <span className="text-gold-400 text-lg">✦</span>
      </div>
      {subtitle && (
        <p className={`font-outfit text-sm max-w-md mx-auto leading-relaxed ${light ? "text-ivory-300/70" : "text-crimson-700/60"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
