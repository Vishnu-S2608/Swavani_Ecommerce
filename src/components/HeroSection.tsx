"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { heroSlides } from "@/lib/data";

// Gold particle component
function GoldParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute w-1.5 h-1.5 rounded-full bg-gold-400 opacity-70"
      style={style}
    />
  );
}

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY    = useTransform(scrollYProgress, [0, 1], ["0%",   "30%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%",   "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variants: any = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textVariants: any = {
    hidden: { opacity: 0, y: 40 },
    show:   (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
  };

  // Particle positions (static to avoid hydration mismatch)
  const particles = [
    { top: "15%", left: "8%",  animationDelay: "0s",    animationDuration: "3.5s" },
    { top: "25%", left: "15%", animationDelay: "0.8s",  animationDuration: "4s" },
    { top: "10%", left: "75%", animationDelay: "1.2s",  animationDuration: "3.8s" },
    { top: "30%", left: "85%", animationDelay: "0.4s",  animationDuration: "4.2s" },
    { top: "60%", left: "5%",  animationDelay: "1.8s",  animationDuration: "3.2s" },
    { top: "70%", left: "90%", animationDelay: "2.2s",  animationDuration: "4.5s" },
    { top: "45%", left: "3%",  animationDelay: "2.8s",  animationDuration: "3.7s" },
    { top: "55%", left: "92%", animationDelay: "1.5s",  animationDuration: "4.1s" },
  ];

  const slide = heroSlides[current];

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-crimson-900">
      {/* Background parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AnimatePresence custom={direction} mode="sync">
          <motion.div
            key={`bg-${current}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.bg}
              alt="Hero background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-crimson-900/90 via-crimson-800/60 to-crimson-900/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-crimson-900/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Indian pattern overlay */}
      <div className="absolute inset-0 bg-indian-pattern opacity-20 pointer-events-none" />

      {/* Gold particles */}
      {particles.map((p, i) => (
        <GoldParticle
          key={i}
          style={{
            top: p.top,
            left: p.left,
            animation: `particleRain ${p.animationDuration} ${p.animationDelay} linear infinite`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text side */}
          <motion.div style={{ y: textY, opacity }} className="text-left">
            <AnimatePresence mode="wait">
              <motion.div key={`text-${current}`}>
                {/* Tag */}
                <motion.div
                  custom={0}
                  variants={textVariants}
                  initial="hidden"
                  animate="show"
                  className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/30 rounded-full px-4 py-1.5 mb-6"
                >
                  <Sparkles size={14} className="text-gold-400" />
                  <span className="text-gold-300 text-xs font-outfit tracking-widest uppercase">
                    {slide.tagline}
                  </span>
                </motion.div>

                {/* Main title */}
                <motion.h1
                  custom={1}
                  variants={textVariants}
                  initial="hidden"
                  animate="show"
                  className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-bold text-ivory-100 leading-[1.1] mb-6 whitespace-pre-line"
                >
                  {slide.title}
                </motion.h1>

                {/* Divider */}
                <motion.div
                  custom={2}
                  variants={textVariants}
                  initial="hidden"
                  animate="show"
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="h-px w-16 bg-gold-400" />
                  <span className="text-gold-400 text-lg">✦</span>
                  <div className="h-px w-16 bg-gold-400" />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  custom={3}
                  variants={textVariants}
                  initial="hidden"
                  animate="show"
                  className="font-outfit text-base text-ivory-200/80 leading-relaxed mb-8 max-w-sm"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  custom={4}
                  variants={textVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-wrap gap-4"
                >
                  <Link href="/collections">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-gradient text-crimson-800 font-outfit font-bold text-sm rounded-full btn-gold-shimmer hover:shadow-gold-hover transition-all duration-300"
                    >
                      {slide.cta}
                    </motion.span>
                  </Link>
                  <Link href="/about">
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold-400/50 text-gold-300 font-outfit font-medium text-sm rounded-full hover:bg-gold-400/10 hover:border-gold-400 transition-all duration-300"
                    >
                      Our Story
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Model image side */}
          <div className="relative hidden lg:flex justify-center items-end h-full pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`model-${current}`}
                initial={{ opacity: 0, scale: 0.9, x: 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -60 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-[380px] h-[500px] animate-float"
              >
                {/* Glowing ring behind model */}
                <div className="absolute inset-0 rounded-[2rem] bg-gold-400/10 blur-3xl scale-110" />
                <Image
                  src={slide.image}
                  alt={slide.tagline}
                  fill
                  className="object-cover object-top rounded-[2rem] shadow-card-3d"
                  priority
                  sizes="380px"
                />
                {/* Floating price tag */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -left-8 top-1/3 glass-crimson rounded-xl p-3 shadow-crimson"
                >
                  <p className="text-[10px] text-gold-400/70 font-outfit uppercase tracking-wider">Starting from</p>
                  <p className="text-xl font-cormorant font-bold text-gold-300">₹4,999</p>
                </motion.div>
                {/* Floating rating tag */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
                  className="absolute -right-8 top-2/3 glass-crimson rounded-xl p-3 shadow-crimson"
                >
                  <p className="text-[10px] text-gold-400/70 font-outfit uppercase tracking-wider">Rated</p>
                  <p className="text-xl font-cormorant font-bold text-gold-300">4.9 ⭐</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={() => goTo((current - 1 + heroSlides.length) % heroSlides.length)}
          className="p-2 rounded-full border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === current ? "w-8 bg-gold-400" : "w-2 bg-gold-400/30"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo((current + 1) % heroSlides.length)}
          className="p-2 rounded-full border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-1"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold-400/0 via-gold-400/60 to-gold-400/0" />
        <span className="text-[10px] text-gold-400/50 font-outfit uppercase tracking-widest rotate-90 origin-center mt-2">Scroll</span>
      </motion.div>
    </section>
  );
}
