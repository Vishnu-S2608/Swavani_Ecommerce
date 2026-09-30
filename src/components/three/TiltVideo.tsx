'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import '@/app/tilt-video.css';

type Props = {
  mp4: string;
  webm?: string;
  poster: string;
  /** 'window' = react to cursor anywhere on page; 'self' = only within this card */
  scope?: 'window' | 'self';
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  className?: string;
  children?: ReactNode; // data-depth layers
};

export default function TiltVideo({
  mp4, webm, poster, scope = 'window', maxTilt = 7, className = '', children,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const target = scope === 'self' ? card : window;

    const onMove = (e: PointerEvent | MouseEvent) => {
      const { innerWidth: W, innerHeight: H } = window;
      const cx = 'clientX' in e ? e.clientX : 0;
      const cy = 'clientY' in e ? e.clientY : 0;
      const nx = (cx / W - 0.5) * 2;   // -1 … 1
      const ny = (cy / H - 0.5) * 2;
      const rx = (-ny * maxTilt).toFixed(2);
      const ry = (nx * maxTilt).toFixed(2);
      card.style.setProperty('--rx', `${rx}deg`);
      card.style.setProperty('--ry', `${ry}deg`);
      card.style.setProperty('--nx', nx.toFixed(3));
      card.style.setProperty('--ny', ny.toFixed(3));
      card.style.setProperty('--mx', `${((cx / W) * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${((cy / H) * 100).toFixed(1)}%`);
    };

    const onLeave = () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--nx', '0');
      card.style.setProperty('--ny', '0');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    };

    (target as EventTarget).addEventListener('pointermove', onMove as EventListener);
    if (scope === 'self') card.addEventListener('pointerleave', onLeave);
    else window.addEventListener('pointerleave', onLeave);

    return () => {
      (target as EventTarget).removeEventListener('pointermove', onMove as EventListener);
      if (scope === 'self') card.removeEventListener('pointerleave', onLeave);
      else window.removeEventListener('pointerleave', onLeave);
    };
  }, [scope, maxTilt]);

  return (
    <div className={`tv ${className}`}>
      <div ref={cardRef} className="tv-card">
        {/* Background: the video */}
        <div className="tv-back">
          <video
            className="tv-video"
            muted loop playsInline preload="metadata" poster={poster}
            autoPlay
          >
            {webm && <source src={webm} type="video/webm" />}
            <source src={mp4} type="video/mp4" />
          </video>
        </div>

        {/* Floating depth layers (children pass data-depth) */}
        <div className="tv-front">
          {children}
        </div>

        {/* Silk sheen glare */}
        <div className="tv-glare" />
      </div>
    </div>
  );
}
