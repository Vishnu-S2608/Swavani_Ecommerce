'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  duration: `${2 + Math.random() * 3}s`,
  size: `${1 + Math.random() * 2}px`,
  opacity: 0.3 + Math.random() * 0.5,
}));

export function CinematicLoader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'revealing'>('loading');
  const loaderRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleComplete = useCallback(() => {
    setPhase('revealing');
    const tl = gsap.timeline({ onComplete });
    tl.to(loaderRef.current, { opacity: 0, duration: 1.2, ease: 'power2.inOut' });
  }, [onComplete]);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(brandRef.current,
      { opacity: 0, y: 20, letterSpacing: '0.32em' },
      { opacity: 1, y: 0, letterSpacing: '0.18em', duration: 1.4, ease: 'power3.out', delay: 0.3 }
    );
    gsap.fromTo(textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.8 }
    );

    // Simulate asset loading
    let p = 0;
    const steps = [8, 15, 12, 18, 10, 14, 11, 9, 8];
    let stepIndex = 0;

    const advance = () => {
      if (stepIndex >= steps.length) {
        setProgress(100);
        setTimeout(handleComplete, 600);
        return;
      }
      p = Math.min(p + steps[stepIndex], 95);
      setProgress(p);
      stepIndex++;
      setTimeout(advance, 180 + Math.random() * 120);
    };
    setTimeout(advance, 400);
  }, [handleComplete]);

  return (
    <div ref={loaderRef} className="cine-loader" style={{ pointerEvents: phase === 'revealing' ? 'none' : 'auto' }}>
      {/* Floating textile particles */}
      <div className="cine-loader-particles">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              bottom: '-10px',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: '#D9B26D',
              opacity: p.opacity,
              animation: `float-up ${p.duration} ease-in ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
        }
      `}</style>

      {/* Brand name */}
      <div ref={brandRef} className="cine-loader-brand" style={{ opacity: 0 }}>
        SWAVANI
      </div>

      {/* Sub text */}
      <div ref={textRef} className="cine-loader-text" style={{ opacity: 0 }}>
        Weaving the story&hellip;
      </div>

      {/* Progress track */}
      <div className="cine-loader-track" style={{ width: 'clamp(200px, 30vw, 320px)' }}>
        <div
          className="cine-loader-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress number */}
      <span style={{
        fontFamily: 'var(--font-montserrat, monospace)',
        fontSize: '9px',
        letterSpacing: '0.2em',
        color: 'rgba(217,178,109,.4)',
        marginTop: '-8px',
      }}>
        {Math.round(progress).toString().padStart(3, '0')} / 100
      </span>

      {/* Decorative zari lines */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        transform: 'translateY(-50%)', pointerEvents: 'none',
      }}>
        {['-200px', '200px'].map((offset, i) => (
          <div key={i} style={{
            position: 'absolute', top: offset, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(217,178,109,.08), transparent)',
          }} />
        ))}
      </div>
    </div>
  );
}
