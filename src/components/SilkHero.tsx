'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SilkHero – integrates:
 *   - hero-silk.mp4  → depth-parallax WebGL (silk ribbon floating, static camera)
 *   - curtains-opening.mp4 → tilt 3D intro overlay (camera push-in, no depth parallax per guide)
 *
 * Placement guide (section 5.1):
 *   Keep the left third of the video calm for text (arch panel + headline).
 */

const DepthParallaxVideo = dynamic(
  () => import('@/components/three/DepthParallaxVideo'),
  { ssr: false, loading: () => null },
);

const heroSlides = [
  {
    title: 'Royal Elegance,',
    goldTitle: 'Woven in Gold & Silk.',
    tagline: 'Kanjivaram Silk · Pure 24K Zari · GI Certified · High Tradition',
    badge: 'Kanjivaram Silk · Pure Zari',
    link: '/collections?category=kanjivaram',
  },
  {
    title: 'Imperial Brocades,',
    goldTitle: 'Grace in Motion.',
    tagline: 'Royal Sapphire Blue · Antique 24K Zari · Collector Pieces',
    badge: 'Tanchoi Royal · Artisan Weave',
    link: '/collections?category=handloom',
  },
  {
    title: 'Bridal Heritage,',
    goldTitle: 'Trousseau & Heirloom.',
    tagline: 'Imperial Banarasi · Double Mulberry Weave · Pure 24K Gold',
    badge: 'Bridal Heritage · Handloom Mark',
    link: '/collections?category=bridal',
  },
];

const trustItems = [
  { icon: '✦', label: 'Certified Handloom' },
  { icon: '◈', label: 'Authentic Pure Silk' },
  { icon: '✿', label: 'Free Shipping ₹5000+' },
  { icon: '❋', label: 'Expert Support' },
];

export function SilkHero() {
  const [slide, setSlide] = useState(0);
  const [curtainsDone, setCurtainsDone] = useState(false);
  const [curtainsPlaying, setCurtainsPlaying] = useState(true);
  const curtainVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Auto-advance slides
  useEffect(() => {
    if (!curtainsDone) return;
    const id = setInterval(() => setSlide((p) => (p + 1) % heroSlides.length), 5500);
    return () => clearInterval(id);
  }, [curtainsDone]);

  // When curtains video ends, reveal the depth-parallax hero
  useEffect(() => {
    const v = curtainVideoRef.current;
    if (!v) return;
    const onEnd = () => setCurtainsDone(true);
    v.addEventListener('ended', onEnd);
    // Safety: after 5s force reveal regardless
    const t = setTimeout(() => setCurtainsDone(true), 5200);
    return () => { v.removeEventListener('ended', onEnd); clearTimeout(t); };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════
          CURTAINS OPENING VIDEO — tilt 3D, plain (camera push-in per guide)
          Plays once then transitions to the silk depth-parallax hero
          ═══════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 z-[9999] transition-opacity duration-1000"
        style={{
          opacity: curtainsDone ? 0 : 1,
          pointerEvents: curtainsDone ? 'none' : 'auto',
        }}
      >
        <video
          ref={curtainVideoRef}
          src="/videos/curtains-opening.mp4"
          muted
          playsInline
          preload="auto"
          autoPlay
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onEnded={() => setCurtainsDone(true)}
        />
        {/* Skip button */}
        <button
          onClick={() => setCurtainsDone(true)}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontSize: '10px',
            letterSpacing: '.22em',
            textTransform: 'uppercase',
            color: '#D9B26D',
            background: 'none',
            border: '1px solid rgba(217,178,109,.4)',
            padding: '8px 20px',
            cursor: 'pointer',
          }}
        >
          Skip Intro ✦
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════
          DEPTH-PARALLAX HERO — silk ribbon floating video
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="hero"
        className="relative overflow-hidden"
        style={{ minHeight: 'clamp(580px, 90vh, 820px)', paddingTop: '80px' }}
      >
        {/* WebGL depth-parallax background — hero-silk.mp4
            TODO depth map: generate public/videos/hero-silk-depth.png
            using: python scripts/make-depth-map.py public/videos/hero-silk-poster.jpg
         */}
        <div className="absolute inset-0 z-[1]">
          <DepthParallaxVideo
            mp4="/videos/hero-silk.mp4"
            poster="/videos/hero-silk-poster.jpg"
            depth="/videos/hero-silk-depth.png"  // TODO: generate depth map
            strength={0.018}
            className="w-full h-full"
          />
        </div>

        {/* Silk maroon left panel + arch SVG overlay (z-[4] per IndraHero) */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #5C0F27 0%, rgba(92,15,39,.97) 10%, rgba(92,15,39,.88) 22%, rgba(58,6,21,.60) 42%, rgba(58,6,21,.12) 62%, transparent 82%)',
          }}
        />

        {/* ── Lotus vine border (left column) ── */}
        <div
          className="absolute top-0 bottom-0 z-[3] pointer-events-none"
          style={{
            left: 0,
            width: 'clamp(48px, 6.5vw, 96px)',
            background: 'linear-gradient(180deg, #7D1A38 0%, #5C0F27 45%, #3A0615 100%)',
            borderRight: '1px solid rgba(184,146,90,.5)',
          }}
        >
          {/* Vine SVG  */}
          <svg viewBox="0 0 60 800" className="w-full h-full" preserveAspectRatio="none">
            <line x1="30" y1="0" x2="30" y2="800" stroke="#D9B26D" strokeWidth="1" opacity="0.6" />
            {[60, 140, 220, 310, 400, 490, 580, 670, 760].map((y) => (
              <g key={y} fill="#D9B26D" stroke="#3A0615" strokeWidth="0.6">
                <ellipse cx="30" cy={y - 8} rx="5" ry="9" />
                <ellipse cx="30" cy={y - 8} rx="5" ry="9" transform={`rotate(72 30 ${y - 8})`} />
                <ellipse cx="30" cy={y - 8} rx="5" ry="9" transform={`rotate(144 30 ${y - 8})`} />
                <ellipse cx="30" cy={y - 8} rx="5" ry="9" transform={`rotate(216 30 ${y - 8})`} />
                <ellipse cx="30" cy={y - 8} rx="5" ry="9" transform={`rotate(288 30 ${y - 8})`} />
                <circle cx="30" cy={y - 8} r="2.5" fill="#3A0615" />
                <line x1="20" y1={y + 4} x2="40" y2={y + 4} stroke="#D9B26D" strokeWidth="0.8" opacity="0.5" />
              </g>
            ))}
          </svg>
        </div>

        {/* ── Text panel ── */}
        <div
          className="relative z-[5] flex flex-col justify-center"
          style={{
            marginLeft: 'clamp(96px, 11vw, 150px)',
            paddingLeft: 'clamp(20px, 3vw, 40px)',
            paddingRight: 'clamp(20px, 3vw, 40px)',
            paddingTop: 'clamp(60px, 8vw, 100px)',
            paddingBottom: 'clamp(60px, 7vw, 90px)',
            maxWidth: '560px',
            minHeight: 'calc(clamp(580px, 90vh, 820px) - 80px)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: '28px', height: '1px', background: '#B8925A' }} />
                <span style={{
                  fontFamily: 'var(--font-montserrat), sans-serif',
                  fontSize: '10px', letterSpacing: '.22em', textTransform: 'uppercase',
                  color: '#B8925A', fontWeight: 600,
                }}>
                  House of Swavani
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-cinzel), Georgia, serif',
                fontSize: 'clamp(28px, 3.4vw, 46px)',
                lineHeight: 1.15, letterSpacing: '.04em', textTransform: 'uppercase',
                color: '#F4E8D4', fontWeight: 700, margin: 0,
              }}>
                {heroSlides[slide].title}
                <span style={{ color: '#D9B26D', display: 'block' }}>
                  {heroSlides[slide].goldTitle}
                </span>
              </h1>

              <div className="mt-3 mb-5">
                <div style={{ width: '72px', height: '2px', background: 'linear-gradient(90deg, #B8925A, #D9B26D, #B8925A)' }} />
              </div>

              <p style={{
                maxWidth: '42ch',
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontSize: 'clamp(10.5px, 1.1vw, 12.5px)',
                lineHeight: 1.7, letterSpacing: '.12em', textTransform: 'uppercase',
                color: 'rgba(244,232,212,.80)', marginBottom: '28px',
              }}>
                {heroSlides[slide].tagline}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Link href={heroSlides[slide].link} className="btn-silk">
                  Explore Collection
                </Link>
                <Link
                  href="/collections"
                  style={{
                    fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '10px',
                    letterSpacing: '.18em', textTransform: 'uppercase',
                    color: '#F4E8D4', textDecoration: 'none', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  View All Sarees <span style={{ fontSize: '16px' }}>→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide dots */}
          <div className="flex items-center gap-2.5 mt-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                style={{
                  height: '8px', borderRadius: '4px',
                  width: slide === i ? '24px' : '8px',
                  background: slide === i ? '#D9B26D' : 'rgba(244,232,212,.25)',
                  border: 'none', cursor: 'pointer', transition: 'all .3s',
                  boxShadow: slide === i ? '0 0 8px rgba(217,178,109,.7)' : 'none',
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Collection badge bottom-right */}
        <div
          className="absolute right-5 sm:right-8 bottom-7 z-[5]"
          style={{
            background: 'rgba(58,6,21,.9)', border: '1px solid rgba(184,146,90,.55)',
            padding: '8px 16px', backdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#F4E8D4',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D9B26D' }} />
          <span>{heroSlides[slide].badge}</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST STRIP
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(180deg, #EDDCC0 0%, #F4E8D4 100%)',
          borderTop: '1px solid rgba(184,146,90,.25)',
          borderBottom: '1px solid rgba(184,146,90,.25)',
          padding: '24px 0', position: 'relative',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #D9B26D, transparent)' }} />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#B8925A]/25">
            {trustItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 py-2 text-center">
                <span style={{ fontSize: '20px', color: '#B8925A' }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-montserrat), sans-serif',
                  fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase',
                  color: '#3A2A26', fontWeight: 600,
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #D9B26D, transparent)' }} />
      </section>
    </div>
  );
}
