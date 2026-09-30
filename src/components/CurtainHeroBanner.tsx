'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/app/tilt-video.css';

export function CurtainHeroBanner() {
  const [videoEnded, setVideoEnded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  // Cursor interpolation state (smooth lerping for 3D tilt)
  const mouseState = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    windowW: 1920,
    windowH: 1080,
  });

  const handleVideoComplete = useCallback(() => {
    setVideoEnded(true);
  }, []);

  // 1. Video playback & duration tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay compliant with muted and playsInline
    video.play().catch(() => {});

    const onTimeUpdate = () => {
      // Trigger smooth reveal right as the video completes its full movement (~7.85s of 8.0s)
      if (video.duration && video.currentTime >= video.duration - 0.2) {
        handleVideoComplete();
      }
    };

    const onEnded = () => {
      handleVideoComplete();
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    // Fallback: 8s video failsafe
    const fallbackTimer = setTimeout(() => {
      handleVideoComplete();
    }, 8500);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      clearTimeout(fallbackTimer);
    };
  }, [handleVideoComplete]);

  // 2. Cursor-driven 3D Tilt Logic ("3d coursore moving")
  useEffect(() => {
    const updateDimensions = () => {
      mouseState.current.windowW = window.innerWidth;
      mouseState.current.windowH = window.innerHeight;
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const onPointerMove = (e: PointerEvent) => {
      const W = mouseState.current.windowW || window.innerWidth;
      const H = mouseState.current.windowH || window.innerHeight;
      mouseState.current.targetX = Math.max(-1, Math.min(1, (e.clientX / W - 0.5) * 2));
      mouseState.current.targetY = Math.max(-1, Math.min(1, (e.clientY / H - 0.5) * 2));
    };

    const onPointerLeave = () => {
      mouseState.current.targetX = 0;
      mouseState.current.targetY = 0;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);

    const maxTilt = 7.0; // Refined physical 3D tilt degrees

    // Smooth RAF loop with 0.08 lerp for silky inertia
    const loop = () => {
      const state = mouseState.current;
      state.currentX += (state.targetX - state.currentX) * 0.08;
      state.currentY += (state.targetY - state.currentY) * 0.08;

      if (cardRef.current) {
        const rx = (-state.currentY * maxTilt).toFixed(2);
        const ry = (state.currentX * maxTilt).toFixed(2);
        const mx = (((state.currentX + 1) / 2) * 100).toFixed(1);
        const my = (((state.currentY + 1) / 2) * 100).toFixed(1);

        cardRef.current.style.setProperty('--rx', `${rx}deg`);
        cardRef.current.style.setProperty('--ry', `${ry}deg`);
        cardRef.current.style.setProperty('--nx', state.currentX.toFixed(3));
        cardRef.current.style.setProperty('--ny', state.currentY.toFixed(3));
        cardRef.current.style.setProperty('--mx', `${mx}%`);
        cardRef.current.style.setProperty('--my', `${my}%`);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative w-full pt-20 sm:pt-24 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-10 flex flex-col items-center justify-center overflow-hidden bg-[#0A0604]">
      {/* ── 3D Cursor-Driven Card Container (Tilt & Glare) ── */}
      <div className="tv w-full max-w-[1520px] mx-auto">
        <div
          ref={cardRef}
          className="tv-card w-full relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#D9B26D]/35 bg-[#0A0604] aspect-[16/10] sm:aspect-[2.2/1] lg:aspect-[2.5/1]"
        >
          {/* ══════════════════════════════════════════════════════════════
              LAYER 1: The 3D Curtains Opening Video
              Plays completely with 3D cursor moving
              ══════════════════════════════════════════════════════════════ */}
          <div
            className={`absolute inset-0 bg-[#0A0604] transition-opacity duration-1000 ease-in-out ${
              videoEnded ? 'opacity-0 pointer-events-none z-0' : 'opacity-100 z-20'
            }`}
          >
            <video
              ref={videoRef}
              src="/curtains-intro.mp4"
              className="tv-video w-full h-full object-cover object-center"
              muted
              playsInline
              autoPlay
              preload="auto"
            />
          </div>

          {/* ══════════════════════════════════════════════════════════════
              LAYER 2: The Hero Banner Image (hero-banner.jpg)
              Revealed once the video completes its movement
              ══════════════════════════════════════════════════════════════ */}
          <Link
            href="/collections"
            className={`absolute inset-0 block cursor-pointer transition-opacity duration-1000 ease-in-out ${
              videoEnded ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
            aria-label="Découvrir la collection Swavani"
          >
            <Image
              src="/hero-banner.jpg"
              alt="Swavani - Premium Ellampillai Silk Sarees"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1520px) 100vw, 1520px"
            />
          </Link>

          {/* Interactive Silk Sheen Glare following 3D cursor */}
          <div className="tv-glare pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
