"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";

// ─── Shared Variants ────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.13 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut", delay: i * 0.12 },
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Animated Section Wrapper ────────────────────────────────────────────────
export function AnimatedSection({
  children,
  className,
  variants = fadeUp,
  amount = 0.15,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  amount?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Parallax Wrapper ────────────────────────────────────────────────────────
export function ParallaxSection({
  children,
  speed = 0.12,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ─── Staggered Text Reveal ───────────────────────────────────────────────────
export function RevealText({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5, once });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.07,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Gold Line Divider with animation ────────────────────────────────────────
export function GoldDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #D9B26D, transparent)",
        transformOrigin: "center",
      }}
      className={className}
    />
  );
}
