'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Animation variants ──────────────────────────────────── */
const fadeUp = (delay = 0, duration = 0.9) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

const fadeIn = (delay = 0, duration = 0.8) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay, duration, ease: 'easeOut' },
  },
});

const lineExpand = (delay = 0) => ({
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

/* ─── Component ───────────────────────────────────────────── */
export function MahiraHeroBanner() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    // Ken-burns: subtle slow zoom on the background
    const bg = sectionRef.current?.querySelector<HTMLDivElement>('.mhb-bg');
    if (bg) {
      bg.animate(
        [
          { transform: 'scale(1.0) translateX(0%)' },
          { transform: 'scale(1.06) translateX(-1%)' },
        ],
        { duration: 14000, fill: 'forwards', easing: 'ease-out' }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex flex-col"
      style={{ background: '#111a14' }}
    >
      {/* ── Background image (ken-burns) ── */}
      <div className="mhb-bg absolute inset-0 z-0 will-change-transform">
        <Image
          src="/hero-bg-swavani.jpg"
          alt="Swavani — Silk heritage saree"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_center] sm:object-[70%_center] md:object-center"
        />

        {/* Extra mobile darkening for text readability over the background */}
        <div className="absolute inset-0 bg-[#0A120C]/40 sm:hidden" />

        {/* Cinematic overlays — matching deep forest-green / dark atmosphere */}
        {/* Left vignette + text-readable dark area */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(10,18,12,.92) 0%, rgba(10,18,12,.72) 38%, rgba(10,18,12,.1) 62%, transparent 80%)',
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,18,12,.85) 0%, rgba(10,18,12,.3) 35%, transparent 65%)',
          }}
        />
        {/* Top vignette (for navbar readability) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,18,12,.55) 0%, transparent 25%)',
          }}
        />
      </div>

      {/* ── Gold dust particles ── */}
      {mounted && (
        <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="mhb-particle absolute rounded-full"
              style={{
                width: `${1.5 + (i % 3) * 0.8}px`,
                height: `${1.5 + (i % 3) * 0.8}px`,
                background: '#D9B26D',
                opacity: 0.35 + (i % 4) * 0.1,
                left: `${3 + i * 5.2}%`,
                top: `${10 + Math.sin(i * 1.3) * 55 + 10}%`,
                boxShadow: '0 0 6px 1px rgba(217,178,109,0.4)',
                animation: `mhb-float ${3 + (i % 5) * 0.8}s ${i * 0.45}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes mhb-float {
          from { transform: translateY(0px) scale(1); opacity: 0.35; }
          to   { transform: translateY(-18px) scale(1.3); opacity: 0.7; }
        }
        @keyframes mhb-shine {
          from { background-position: 140% 0; }
          to   { background-position: -40% 0; }
        }
      `}</style>

      {/* ── Content layer ── */}
      <div className="relative z-10 flex flex-col flex-1">

        {/* ─── Integrated Navbar ─── */}
        <MahiraNavbarOverlay />

        {/* ─── Hero text block — positioned lower-left, matching video ─── */}
        <div className="flex-1 flex items-end pb-16 sm:pb-20 md:pb-24">
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex items-end justify-between">

            {/* Left: main text content */}
            <div className="max-w-[520px] space-y-4 md:space-y-5">

              {/* Eyebrow + rule */}
              <motion.div
                variants={fadeIn(0.3)}
                initial="hidden"
                animate="show"
                className="flex items-center gap-3"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                    fontSize: 'clamp(9px, 1.1vw, 11px)',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    color: '#D9B26D',
                    textTransform: 'uppercase',
                  }}
                >
                  Tradition Meets Tomorrow
                </span>
                <motion.div
                  variants={lineExpand(0.5)}
                  initial="hidden"
                  animate="show"
                  className="h-px flex-1 origin-left"
                  style={{
                    background: 'linear-gradient(90deg, #D9B26D, rgba(217,178,109,0))',
                    maxWidth: '80px',
                  }}
                />
              </motion.div>

              {/* H1 — large italic serif, two lines */}
              <motion.h1
                variants={fadeUp(0.45)}
                initial="hidden"
                animate="show"
                style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", Georgia, serif)',
                  fontSize: 'clamp(44px, 7.5vw, 96px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.05,
                  color: '#F4E8D4',
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                More Than<br />Fashion
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp(0.65)}
                initial="hidden"
                animate="show"
                style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", Georgia, serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(15px, 1.8vw, 20px)',
                  color: 'rgba(244,232,212,0.75)',
                  letterSpacing: '0.02em',
                  margin: 0,
                }}
              >
                A story in every drape.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={fadeUp(0.82)}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-3 pt-1"
              >
                <MhbButton href="/collections" primary>
                  Explore Collections
                </MhbButton>
              </motion.div>
            </div>

            {/* Right: vertical rotated editorial text */}
            <motion.div
              variants={fadeIn(1.1)}
              initial="hidden"
              animate="show"
              className="hidden lg:flex flex-col items-center gap-3 pb-4 shrink-0"
              style={{ alignSelf: 'flex-end' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                  fontSize: '8px',
                  fontWeight: 400,
                  letterSpacing: '0.32em',
                  color: 'rgba(244,232,212,0.55)',
                  writingMode: 'vertical-rl',
                  textTransform: 'uppercase',
                  textOrientation: 'mixed',
                  lineHeight: 1.6,
                }}
              >
                A Heritage Woven For Tomorrow
              </span>
              <div
                className="w-px"
                style={{
                  height: '60px',
                  background: 'linear-gradient(to bottom, rgba(217,178,109,0.5), transparent)',
                }}
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Outlined CTA button ───────────────────────────────────── */
function MhbButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link href={href} className="group/btn inline-flex items-center gap-2" style={{ textDecoration: 'none' }}>
      <span
        className="inline-flex items-center gap-2 transition-all duration-300"
        style={{
          fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
          fontSize: 'clamp(9px, 1.1vw, 11px)',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: primary ? '#1a120a' : '#F4E8D4',
          background: primary
            ? 'linear-gradient(110deg, #9a6b12 0%, #F1D9A0 45%, #D9B26D 55%, #9a6b12 100%)'
            : 'transparent',
          backgroundSize: primary ? '280% 100%' : undefined,
          backgroundPosition: primary ? '140% 0' : undefined,
          border: primary ? 'none' : '1px solid rgba(244,232,212,0.45)',
          padding: '10px 22px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.35s cubic-bezier(.22,1,.36,1)',
        }}
        onMouseEnter={(e) => {
          if (primary) {
            (e.currentTarget as HTMLElement).style.backgroundPosition = '-40% 0';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(217,178,109,0.4)';
          } else {
            (e.currentTarget as HTMLElement).style.background = 'rgba(244,232,212,0.08)';
            (e.currentTarget as HTMLElement).style.borderColor = '#D9B26D';
            (e.currentTarget as HTMLElement).style.color = '#D9B26D';
          }
        }}
        onMouseLeave={(e) => {
          if (primary) {
            (e.currentTarget as HTMLElement).style.backgroundPosition = '140% 0';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          } else {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,232,212,0.45)';
            (e.currentTarget as HTMLElement).style.color = '#F4E8D4';
          }
        }}
      >
        {children}
        <ArrowRight />
      </span>
    </Link>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
      <path
        d="M1 5h14M10 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const mobileNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/collections' },
  { label: 'Our Story', href: '/about' },
  { label: 'Visit Us', href: '/contact' },
];

/* ─── Integrated transparent navbar ─────────────────────────── */
function MahiraNavbarOverlay() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    <nav
      className="relative flex items-center justify-between px-6 sm:px-10 lg:px-16 py-0 shrink-0"
      style={{ height: '96px' }}
      aria-label="Main navigation"
    >
      {/* ── LEFT SECTION (Mobile Menu) ── */}
      <div className="flex items-center gap-1 sm:gap-2 relative z-10">
        <button
          className="lg:hidden p-2 transition-colors"
          style={{ color: 'rgba(244,232,212,0.85)' }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#D9B26D')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(244,232,212,0.85)')}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round"/>
            <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round"/>
            <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── CENTERED NAV & LOGO ── */}
      <div className="flex items-center justify-center w-full absolute inset-0 z-0 pointer-events-none">
        <div className="hidden lg:flex items-center justify-end gap-10 xl:gap-14 w-1/3 pr-10 pointer-events-auto">
          {[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/collections' }
          ].map((item) => (
            <NavLink key={item.label} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>
        
        <div className="flex justify-center shrink-0 pointer-events-auto">
          <Link href="/" className="flex flex-col items-center group relative z-10" aria-label="Swavani Home">
            <div id="main-nav-logo" className="premium-logo-container transition-transform duration-500 group-hover:scale-105">
              <div className="premium-logo-base" />
              <div className="premium-logo-shine" />
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-start gap-10 xl:gap-14 w-1/3 pl-10 pointer-events-auto">
          {[
            { label: 'Our Story', href: '/about' },
            { label: 'Visit Us', href: '/contact' },
          ].map((item) => (
            <NavLink key={item.label} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>


    </nav>

    {/* ── Mobile drawer ── */}
    <AnimatePresence>
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <motion.div
            className="fixed left-0 top-0 bottom-0 z-[61] w-72 flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              background: 'linear-gradient(160deg, #0e1a10 0%, #1a2b1f 60%, #111a14 100%)',
              borderRight: '1px solid rgba(217,178,109,0.2)',
            }}
          >
            {/* Gold top hairline */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #D9B26D, transparent)' }} />

            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-5 mb-5" style={{ borderBottom: '1px solid rgba(217,178,109,0.18)' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)', fontSize: '18px', letterSpacing: '0.2em', color: '#F4E8D4', fontWeight: 600 }}>SWAVANI</span>
                  <div style={{ fontSize: '7px', letterSpacing: '0.3em', color: '#D9B26D', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', marginTop: '3px', textTransform: 'uppercase' }}>House of Silk &amp; Heritage</div>
                </div>
                <button onClick={() => setMobileOpen(false)} style={{ color: '#D9B26D', padding: '4px' }} aria-label="Close menu">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-0.5">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 transition-colors"
                    style={{
                      fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#F4E8D4',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(217,178,109,0.1)',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#D9B26D')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#F4E8D4')}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="mt-auto pt-6" style={{ borderTop: '1px solid rgba(217,178,109,0.15)' }}>
                <div style={{ fontSize: '8px', letterSpacing: '0.3em', color: '#D9B26D', fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)', textAlign: 'center', textTransform: 'uppercase' }}>
                  SWAVANI // ESTD. 2024
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-montserrat, Montserrat, sans-serif)',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#F4E8D4',
        textDecoration: 'none',
        transition: 'color 0.25s',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#D9B26D')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#F4E8D4')}
    >
      {children}
    </Link>
  );
}

function NavIconBtn({ href, label, className = '', children }: { href: string; label: string; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`p-2 block transition-colors ${className}`}
      style={{ color: 'rgba(244,232,212,0.8)' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#D9B26D')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(244,232,212,0.8)')}
    >
      {children}
    </Link>
  );
}
