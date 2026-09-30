"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Hero slide data (English — MD spec)
───────────────────────────────────────────── */
const heroSlides = [
  {
    image: "/saree-2.jpg",
    title: "Imperial Brocades,",
    goldTitle: "Grace in Motion.",
    tagline: "Royal Sapphire Blue · Antique 24K Zari · Collector Pieces",
    badge: "Tanchoi Royal · Artisan Weave",
    link: "/collections?category=handloom",
    objectPosition: "82% 16%",
  },
  {
    image: "/hero-model.jpg",
    title: "Royal Elegance,",
    goldTitle: "Woven in Gold & Silk.",
    tagline: "Kanjivaram Silk · Pure 24K Zari · GI Certified · High Tradition",
    badge: "Kanjivaram Silk · Pure Zari",
    link: "/collections?category=kanjivaram",
    objectPosition: "75% 25%",
  },
  {
    image: "/saree-1.jpg",
    title: "Bridal Heritage,",
    goldTitle: "Trousseau & Heirloom.",
    tagline: "Imperial Banarasi · Double Mulberry Weave · Pure 24K Gold",
    badge: "Bridal Heritage · Handloom Mark",
    link: "/collections?category=bridal",
    objectPosition: "80% 16%",
  },
  {
    image: "/saree-3.jpg",
    title: "Traditional Splendour,",
    goldTitle: "Light & Radiance.",
    tagline: "Patola Heritage Silk · Gold Geometric Motifs · Master Craft",
    badge: "Patola Royal · Silk Mark",
    link: "/collections",
    objectPosition: "80% 18%",
  },
  {
    image: "/hero-editorial.jpg",
    title: "Festive Drapes,",
    goldTitle: "Shimmer & Grace.",
    tagline: "Handwoven Chanderi · Gold Booti Motifs · Airy Silk",
    badge: "Pure Chanderi · Silk Mark",
    link: "/collections?category=cotton",
    objectPosition: "80% 20%",
  },
];

const slidesWithClone = [...heroSlides, heroSlides[0]];

/* Build the cusped arch SVG path */
function archFormula(x0: number, y0: number, r: number, xEnd: number, yb: number) {
  return (
    "M" + x0 + "," + yb +
    " L" + x0 + "," + (y0 + r) +
    " C" + x0 + "," + (y0 + r * 0.7) +
    " " + (x0 + r * 0.04) + "," + (y0 + r * 0.5) +
    " " + (x0 + r * 0.22) + "," + (y0 + r * 0.4) +
    " C" + (x0 + r * 0.32) + "," + (y0 + r * 0.26) +
    " " + (x0 + r * 0.5) + "," + y0 +
    " " + (x0 + r) + "," + y0 +
    " L" + xEnd + "," + y0
  );
}

/* ─────────────────────────────────────────────
   Trust strip items
───────────────────────────────────────────── */
const trustItems = [
  { icon: "✦", label: "Certified Handloom" },
  { icon: "◈", label: "Authentic Pure Silk" },
  { icon: "✿", label: "Free Shipping ₹5000+" },
  { icon: "❋", label: "Expert Support" },
];

export function IndraHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSub, setTypedSub] = useState("");
  const [typingPhase, setTypingPhase] = useState<"title" | "sub" | "done">("title");

  const heroRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeSlideIndex = currentSlide % heroSlides.length;

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((p) => p + 1);
  };
  const prevSlide = () => {
    setIsTransitioning(true);
    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(heroSlides.length);
      setTimeout(() => { setIsTransitioning(true); setCurrentSlide(heroSlides.length - 1); }, 20);
    } else {
      setCurrentSlide((p) => p - 1);
    }
  };
  const goToSlide = (idx: number) => { setIsTransitioning(true); setCurrentSlide(idx); };

  /* Infinite loop snapback */
  useEffect(() => {
    if (currentSlide === heroSlides.length) {
      const t = setTimeout(() => { setIsTransitioning(false); setCurrentSlide(0); }, 1150);
      return () => clearTimeout(t);
    }
  }, [currentSlide]);

  /* Auto-advance */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(nextSlide, 5500);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, currentSlide]);

  /* Typewriter for intro emblem */
  useEffect(() => {
    const fullTitle = "SWAVANI";
    const fullSub = "THE LIVING SILK BOUTIQUE";
    let ti = 0, si = 0;
    const t0 = setTimeout(() => {
      const t1 = setInterval(() => {
        if (ti < fullTitle.length) { setTypedTitle(fullTitle.slice(0, ti + 1)); ti++; }
        else {
          clearInterval(t1);
          setTypingPhase("sub");
          const t2 = setInterval(() => {
            if (si < fullSub.length) { setTypedSub(fullSub.slice(0, si + 1)); si++; }
            else { clearInterval(t2); setTypingPhase("done"); }
          }, 38);
        }
      }, 100);
    }, 350);
    const t3 = setTimeout(() => setIntroDone(true), 4800);
    return () => { clearTimeout(t0); clearTimeout(t3); };
  }, []);

  /* Arch SVG drawing algorithm */
  useEffect(() => {
    const hero = heroRef.current;
    const svg = svgRef.current;
    if (!hero || !svg) return;
    const NS = "http://www.w3.org/2000/svg";

    function draw() {
      if (!hero || !svg) return;
      const w = hero.clientWidth, h = hero.clientHeight;
      if (w === 0 || h === 0) return;

      const isMobile = w < 860;
      const L = isMobile ? 48 : 96;
      const T = 14;
      const R = Math.max(90, Math.min(210, w * 0.22));
      const k = w < 700 ? 0.78 : 1;
      const xEnd = w + 4;
      const yb = h + 4;

      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));

      let out = "";
      /* triple border: silk-deep outer, zari mid, zari inner hairline */
      out += `<path d="${archFormula(L - 9, T - 9, R + 9, xEnd, yb)}" fill="none" stroke="#3A0615" stroke-width="3.5"/>`;
      out += `<path d="${archFormula(L - 4, T - 4, R + 4, xEnd, yb)}" fill="none" stroke="#B8925A" stroke-width="3.5"/>`;
      out += `<path d="${archFormula(L + 12, T + 12, R - 10, xEnd, yb)}" fill="none" stroke="#D9B26D" stroke-width="1.2"/>`;

      /* Floral vine along arch */
      const o = Math.min(36, L * 0.4);
      const bx0 = L - o;
      const by0 = 6;
      const br = R + (T - 6) + o * 0.55;
      const bxEnd = bx0 + br * 2.1;
      const d = archFormula(bx0, by0, br, bxEnd, yb);
      out += `<path d="${d}" fill="none" stroke="#D9B26D" stroke-width="1.4" stroke-linecap="round"/>`;

      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      const len = p.getTotalLength();
      const vertLen = yb - (by0 + br);

      function at(s: number, kind: string, scale: number) {
        const a = p.getPointAtLength(s);
        const b = p.getPointAtLength(Math.min(len, s + 1));
        const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90;
        return `<use href="#${kind}" transform="translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${(ang).toFixed(1)}) scale(${scale})"/>`;
      }

      let g = "";
      const step = 42 * k;
      for (let s = 24; s < len - 6; s += step) g += at(s, "leafpair", (s < vertLen ? 0.95 : 0.8) * k);
      const gap = 190 * k;
      for (let s2 = 70 * k; s2 < vertLen - 10; s2 += gap) g += at(s2, "lotus", 1.05 * k);
      for (let s3 = 165 * k; s3 < vertLen - 10; s3 += gap) g += at(s3, "bloom", 1.15 * k);
      for (let s4 = vertLen + 20; s4 < len - 10; s4 += 64 * k) g += at(s4, "bloom", 0.95 * k);
      g += at(len - 2, "bloom", 1.1 * k);

      out += `<g fill="#D9B26D" stroke="#3A0615" stroke-width=".5">${g}</g>`;
      svg.innerHTML = out;
    }

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(hero);
    if (document.fonts?.ready) document.fonts.ready.then(draw);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* ── Global SVG Defs (shared across arch + emblem) ── */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <path id="petal" d="M0,0 C-7,-9 -7,-23 0,-34 C7,-23 7,-9 0,0Z" />
          <g id="lotus">
            <use href="#petal" transform="rotate(-62) scale(.72)" />
            <use href="#petal" transform="rotate(62) scale(.72)" />
            <use href="#petal" transform="rotate(-32) scale(.92)" />
            <use href="#petal" transform="rotate(32) scale(.92)" />
            <use href="#petal" />
            <path d="M-9,1 C-4,6 4,6 9,1 C5,-1 -5,-1 -9,1Z" />
          </g>
          <path id="leaf" d="M0,0 C-6,-5 -6,-15 0,-23 C6,-15 6,-5 0,0Z" />
          <g id="leafpair">
            <use href="#leaf" transform="rotate(-48)" />
            <use href="#leaf" transform="rotate(48)" />
          </g>
          <g id="bloom">
            <ellipse cx="0" cy="-5" rx="2.6" ry="5" />
            <ellipse cx="0" cy="-5" rx="2.6" ry="5" transform="rotate(72)" />
            <ellipse cx="0" cy="-5" rx="2.6" ry="5" transform="rotate(144)" />
            <ellipse cx="0" cy="-5" rx="2.6" ry="5" transform="rotate(216)" />
            <ellipse cx="0" cy="-5" rx="2.6" ry="5" transform="rotate(288)" />
            <circle r="2" fill="#3A0615" />
          </g>
        </defs>
      </svg>

      {/* ═══════════════════════════════════════════════════════
          1. SILK CURTAIN INTRO with Lotus Emblem + Typewriter
          ═══════════════════════════════════════════════════════ */}
      {!introDone && (
        <div
          id="intro"
          className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto"
          style={{ background: "#3A0615" }}
        >
          {/* Paisley background overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: "url('/fond ecrant rouge aestithique.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
          />

          {/* Left Curtain */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[50.3%] z-10"
            style={{
              background: "linear-gradient(112deg, rgba(0,0,0,.35) 0%, rgba(168,58,90,.3) 25%, rgba(0,0,0,.3) 50%, rgba(168,58,90,.3) 75%, rgba(0,0,0,.4) 100%), repeating-linear-gradient(90deg, rgba(0,0,0,.34) 0, rgba(0,0,0,0) 34px, rgba(255,170,190,.10) 62px, rgba(0,0,0,0) 90px, rgba(0,0,0,.34) 120px), linear-gradient(180deg, #7D1A38 0%, #5C0F27 45%, #3A0615 100%)",
              borderRight: "2px solid #3A0615",
              boxShadow: "1px 0 0 #B8925A, 10px 0 40px rgba(0,0,0,.7)",
              animation: "open-l 1.8s cubic-bezier(.76,0,.2,1) 2.8s forwards",
            }}
          />
          {/* Right Curtain */}
          <div
            className="absolute top-0 bottom-0 right-0 w-[50.3%] z-10"
            style={{
              background: "linear-gradient(248deg, rgba(0,0,0,.35) 0%, rgba(168,58,90,.3) 25%, rgba(0,0,0,.3) 50%, rgba(168,58,90,.3) 75%, rgba(0,0,0,.4) 100%), repeating-linear-gradient(90deg, rgba(0,0,0,.34) 0, rgba(0,0,0,0) 34px, rgba(255,170,190,.10) 62px, rgba(0,0,0,0) 90px, rgba(0,0,0,.34) 120px), linear-gradient(180deg, #7D1A38 0%, #5C0F27 45%, #3A0615 100%)",
              borderLeft: "2px solid #3A0615",
              boxShadow: "-1px 0 0 #B8925A, -10px 0 40px rgba(0,0,0,.7)",
              animation: "open-r 1.8s cubic-bezier(.76,0,.2,1) 2.8s forwards",
            }}
          />

          {/* Center Emblem */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 text-center"
            style={{ animation: "emblem-out .8s ease-in 2.7s forwards" }}
          >
            {/* Arch + Lotus SVG Emblem */}
            <svg viewBox="0 0 140 120" fill="none" className="w-44 sm:w-52 h-auto overflow-visible">
              <g stroke="#D9B26D" strokeLinejoin="round">
                <path
                  className="em-arch"
                  pathLength="1"
                  strokeWidth="1.8"
                  d="M8,116 V72 C8,60 18,56 26,50 C36,43 50,43 58,35 C63,30 66,28 70,23 C74,28 77,30 82,35 C90,43 104,43 114,50 C122,56 132,60 132,72 V116 Z"
                />
                <path
                  className="em-arch inner"
                  pathLength="1"
                  strokeWidth="0.9"
                  opacity=".8"
                  transform="translate(70 70) scale(.88) translate(-70 -70)"
                  d="M8,116 V72 C8,60 18,56 26,50 C36,43 50,43 58,35 C63,30 66,28 70,23 C74,28 77,30 82,35 C90,43 104,43 114,50 C122,56 132,60 132,72 V116 Z"
                />
              </g>
              <g className="em-lotus" fill="#D9B26D" stroke="#3A0615" strokeWidth="1">
                <use href="#lotus" transform="translate(70 24) scale(.62)" />
              </g>
              <g className="em-dots" fill="#D9B26D">
                <circle cx="34" cy="46" r="1.8" />
                <circle cx="106" cy="46" r="1.8" />
              </g>
            </svg>

            {/* Typewriter brand name */}
            <div className="min-h-[52px] flex items-center justify-center">
              <b
                style={{
                  fontFamily: "var(--font-cinzel), Georgia, serif",
                  fontSize: "clamp(26px, 5vw, 40px)",
                  letterSpacing: ".28em",
                  color: "#F4E8D4",
                  fontWeight: 600,
                }}
                className="inline-flex items-center"
              >
                <span>{typedTitle}</span>
                {typingPhase === "title" && (
                  <span className="inline-block w-[3px] h-8 ml-2 animate-pulse" style={{ background: "#D9B26D", boxShadow: "0 0 10px #D9B26D" }} />
                )}
              </b>
            </div>
            <div className="min-h-[20px] flex items-center justify-center">
              <small
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "10px",
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: "#D9B26D",
                  fontWeight: 600,
                }}
                className="inline-flex items-center"
              >
                <span>{typedSub}</span>
                {typingPhase === "sub" && (
                  <span className="inline-block w-[2px] h-3.5 ml-1 animate-pulse" style={{ background: "#D9B26D" }} />
                )}
              </small>
            </div>

            {/* Zari divider */}
            <div className="flex items-center gap-3 mt-1 w-48">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #D9B26D)" }} />
              <span style={{ color: "#D9B26D", fontSize: "14px" }}>✦</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #D9B26D, transparent)" }} />
            </div>
          </div>

          {/* Skip button */}
          <button
            onClick={() => setIntroDone(true)}
            type="button"
            className="absolute left-1/2 bottom-10 -translate-x-1/2 z-30 transition-opacity hover:opacity-70"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "10px",
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#D9B26D",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Skip Intro ✦
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          2. FULL ARCH HERO  (padded for sticky nav)
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="hero"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden"
        style={{
          minHeight: "clamp(580px, 90vh, 820px)",
          paddingTop: "80px",   /* navbar height offset */
          background:
            "linear-gradient(112deg, rgba(0,0,0,.28) 0%, rgba(168,58,90,0) 12%, rgba(168,58,90,.34) 24%, rgba(255,170,190,.16) 28%, rgba(168,58,90,0) 38%, rgba(0,0,0,.24) 50%, rgba(168,58,90,0) 60%, rgba(168,58,90,.28) 72%, rgba(0,0,0,.30) 100%), repeating-linear-gradient(90deg, rgba(0,0,0,.10) 0 1px, rgba(0,0,0,0) 1px 3px), linear-gradient(180deg, #7D1A38 0%, #5C0F27 45%, #3A0615 100%)",
        }}
      >
        {/* Arch SVG frame with lotus vine */}
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-[4]" aria-hidden="true" />

        {/* ── Carousel image fills the inner arch area ── */}
        <div
          className="absolute bottom-0 z-[1] overflow-hidden"
          style={{
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {/* Sliding track */}
          <div
            className="flex w-full h-full"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isTransitioning ? "transform 1.15s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
          >
            {slidesWithClone.map((s, idx) => (
              <div key={`${s.image}-${idx}`} className="w-full h-full min-w-full flex-shrink-0 relative overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                  style={{ objectPosition: s.objectPosition || "80% 20%" }}
                />
              </div>
            ))}
          </div>

          {/* Cream fade-in from left so text is readable */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: "linear-gradient(to right, #f6ecda 0%, rgba(246,236,218,.94) 22%, rgba(246,236,218,.70) 42%, rgba(246,236,218,.20) 66%, rgba(246,236,218,.04) 84%, transparent 100%)",
            }}
          />
          {/* Top/bottom vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: "linear-gradient(to bottom, rgba(246,236,218,.28) 0%, transparent 14%, transparent 84%, rgba(58,6,21,.22) 100%)",
            }}
          />

          {/* Collection badge */}
          <div
            className="absolute right-5 sm:right-8 bottom-7 z-20 flex items-center gap-2"
            style={{
              background: "rgba(58,6,21,.9)",
              border: "1px solid rgba(184,146,90,.55)",
              padding: "8px 16px",
              backdropFilter: "blur(10px)",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "10px",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "#F4E8D4",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#D9B26D" }} />
            <span>{heroSlides[activeSlideIndex].badge}</span>
          </div>
        </div>

        {/* ── Left text panel ── */}
        <div
          className="relative z-10 flex flex-col justify-center pointer-events-auto"
          style={{
            marginLeft: "clamp(96px, 11vw, 150px)",
            paddingLeft: "clamp(20px, 3vw, 40px)",
            paddingRight: "clamp(20px, 3vw, 40px)",
            paddingTop: "clamp(60px, 8vw, 100px)",
            paddingBottom: "clamp(60px, 7vw, 90px)",
            maxWidth: "580px",
            minHeight: "calc(clamp(580px, 90vh, 820px) - 80px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlideIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Collection label */}
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: "28px", height: "1px", background: "#B8925A" }} />
                <span style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "10px",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#B8925A",
                  fontWeight: 600,
                }}>
                  House of Swavani
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-cinzel), Georgia, serif",
                  fontSize: "clamp(28px, 3.4vw, 46px)",
                  lineHeight: 1.15,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  color: "#3A0615",
                  fontWeight: 700,
                  textShadow: "0 1px 2px rgba(246,236,218,.7)",
                  margin: 0,
                }}
              >
                {heroSlides[activeSlideIndex].title}
                <span style={{ color: "#9E7339", display: "block" }}>
                  {heroSlides[activeSlideIndex].goldTitle}
                </span>
              </h1>

              {/* Gold underline drawing */}
              <div className="mt-3 mb-5">
                <div style={{ width: "72px", height: "2px", background: "linear-gradient(90deg, #B8925A, #D9B26D, #B8925A)" }} />
              </div>

              <p
                style={{
                  maxWidth: "42ch",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "clamp(10.5px, 1.1vw, 12.5px)",
                  lineHeight: 1.7,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "#3A2A26",
                  textShadow: "0 1px 2px rgba(246,236,218,.6)",
                  marginBottom: "28px",
                }}
              >
                {heroSlides[activeSlideIndex].tagline}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href={heroSlides[activeSlideIndex].link}
                  className="btn-silk"
                  style={{ alignSelf: "flex-start" }}
                >
                  Explore Collection
                </Link>
                <Link
                  href="/collections"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "10px",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "#3A0615",
                    textDecoration: "none",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color .25s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#7D1A38")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#3A0615")}
                >
                  View All Sarees <span style={{ fontSize: "16px" }}>→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide arrows */}
        <div className="hidden sm:flex items-center gap-2 absolute right-6 top-[44%] -translate-y-1/2 z-20 flex-col">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-9 h-9 flex items-center justify-center transition-all"
            style={{
              borderRadius: "50%",
              border: "1px solid rgba(58,6,21,.35)",
              background: "rgba(246,236,218,.88)",
              color: "#3A0615",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#3A0615"; (e.currentTarget as HTMLElement).style.color = "#D9B26D"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(246,236,218,.88)"; (e.currentTarget as HTMLElement).style.color = "#3A0615"; }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-9 h-9 flex items-center justify-center transition-all"
            style={{
              borderRadius: "50%",
              border: "1px solid rgba(58,6,21,.35)",
              background: "rgba(246,236,218,.88)",
              color: "#3A0615",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#3A0615"; (e.currentTarget as HTMLElement).style.color = "#D9B26D"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(246,236,218,.88)"; (e.currentTarget as HTMLElement).style.color = "#3A0615"; }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Slide dots */}
        <div
          className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center gap-2.5 z-20"
          style={{
            background: "rgba(58,6,21,.78)",
            border: "1px solid rgba(184,146,90,.38)",
            borderRadius: "999px",
            padding: "8px 14px",
            backdropFilter: "blur(8px)",
          }}
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                height: "8px",
                borderRadius: "4px",
                width: activeSlideIndex === i ? "24px" : "8px",
                background: activeSlideIndex === i ? "#D9B26D" : "rgba(244,232,212,.35)",
                border: "none",
                cursor: "pointer",
                transition: "all .3s",
                boxShadow: activeSlideIndex === i ? "0 0 8px rgba(217,178,109,.7)" : "none",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. TRUST STRIP  (cream surface, zari accents)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          background: "linear-gradient(180deg, #EDDCC0 0%, #F4E8D4 100%)",
          borderTop: "1px solid rgba(184,146,90,.25)",
          borderBottom: "1px solid rgba(184,146,90,.25)",
          padding: "24px 0",
        }}
      >
        {/* Zari hairline top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #D9B26D 50%, transparent 100%)" }} />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#B8925A]/25">
            {trustItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 py-2 text-center">
                <span style={{ fontSize: "20px", color: "#B8925A" }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "10px",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "#3A2A26",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Zari hairline bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #D9B26D 50%, transparent 100%)" }} />
      </section>

      {/* Keyframes */}
      <style>{`
        @keyframes open-l  { to { transform: translateX(-105%); } }
        @keyframes open-r  { to { transform: translateX(105%); } }
        @keyframes draw    { to { stroke-dashoffset: 0; } }
        @keyframes lotus-bloom { to { transform: scale(1); } }
        @keyframes emblem-out {
          to { opacity: 0; transform: translate(-50%,-50%) scale(1.12); }
        }
        .em-arch {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: draw 1.5s cubic-bezier(.5,0,.2,1) .15s forwards;
        }
        .em-arch.inner { animation-delay: .55s; }
        .em-lotus {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: scale(0);
          animation: lotus-bloom .9s cubic-bezier(.2,.9,.3,1.2) 1s forwards;
        }
        .em-dots { opacity: 0; animation: fade-in .6s ease 1.3s forwards; }
        @keyframes fade-in { to { opacity: 1; } }
      `}</style>
    </div>
  );
}
