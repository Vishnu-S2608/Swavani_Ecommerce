'use client';

import { useEffect, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

export function CurtainOpening({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const curtainsBox = curtainsRef.current;
    if (!container || !curtainsBox) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const P = 9;
    const DUR = reduce ? 0.01 : 3.2;
    const START = reduce ? 0 : 0.4;

    function makePath(xt: number, xtb: number, xb: number) {
      return `M${xt},0 L${xt},100 Q${(xt + xtb) / 2},150 ${xtb},262 C${xtb + (xb - xtb) * 0.1},500 ${xb - (xb - xtb) * 0.3},800 ${xb},1000`;
    }

    function buildAnim(from: string, to: string, lag: number) {
      return `<animate attributeName="d" dur="${DUR}s" begin="indefinite" data-at="${START + lag}" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".45 0 .2 1" values="${from};${to}"/>`;
    }

    function buildSide() {
      let out = '', shape = '';
      for (let i = 0; i < P; i++) {
        const t = i / (P - 1);
        const lag = (1 - t) * 0.35;
        const c = makePath(t * 503, t * 503, t * 503);
        const o = makePath(t * 350, 40 + 130 * t, t * 390);
        const last = i === P - 1;
        if (last) {
          shape = `<path fill="url(#cloth-grad)" d="${c} L0,1000 L0,0 Z">${buildAnim(`${c} L0,1000 L0,0 Z`, `${o} L0,1000 L0,0 Z`, 0)}</path>`;
        }
        out += `<path d="${c}" fill="none" stroke="rgba(255,150,130,.18)" stroke-width="${last ? 10 : 32}">${buildAnim(c, o, lag)}</path>`;
        out += `<path d="${c}" fill="none" stroke="${last ? '#e8b94a' : 'rgba(30,0,0,.6)'}" stroke-width="${last ? 5 : 6}">${buildAnim(c, o, lag)}</path>`;
      }
      // Tie-back ornament
      out += `<g style="opacity:0;animation:c-fade .6s ${START + 2.6}s ease forwards">
        <ellipse cx="170" cy="262" rx="14" ry="26" fill="#e8b94a" stroke="#9a6b12" stroke-width="3"/>
        <path d="M170,288 L170,346" stroke="#e8b94a" stroke-width="5"/>
        <ellipse cx="170" cy="354" rx="10" ry="15" fill="#e8b94a"/>
      </g>`;
      return shape + out;
    }

    function buildValance() {
      let g = '', r = '', lines = '';
      for (let k = 0; k < 12; k++) {
        const cx = (k + 0.5) * 1000 / 12;
        g += `<ellipse cx="${cx}" cy="82" rx="46" ry="28" fill="#e8b94a"/>`;
        r += `<ellipse cx="${cx}" cy="82" rx="42" ry="23" fill="#a30f1a"/>`;
      }
      for (let j = 1; j < 24; j++) {
        lines += `<line x1="${j * 1000 / 24}" x2="${j * 1000 / 24}" y1="0" y2="100" stroke="rgba(40,0,0,.4)" stroke-width="5"/>`;
      }
      return `${g}${r}<rect width="1000" height="82" fill="#8a0c17"/>${lines}<rect y="0" width="1000" height="12" fill="#e8b94a" opacity="0.9"/>`;
    }

    curtainsBox.innerHTML = `<svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" style="width:100%;height:100%;display:block">
      <defs>
        <linearGradient id="cloth-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c1121f"/>
          <stop offset=".5" stop-color="#9b0d18"/>
          <stop offset="1" stop-color="#5c050c"/>
        </linearGradient>
      </defs>
      <g>${buildSide()}</g>
      <g transform="translate(1000,0) scale(-1,1)">${buildSide()}</g>
      ${buildValance()}
    </svg>`;

    const svg = curtainsBox.firstChild as SVGSVGElement;
    if (svg) {
      svg.setCurrentTime?.(0);
      svg.querySelectorAll('animate').forEach((a) => {
        a.beginElementAt(parseFloat(a.getAttribute('data-at') || '0'));
      });
    }

    // Auto-dismiss: curtain opens ~3.6s, then logo shows for ~3s, then fade out
    const totalTime = reduce ? 200 : 7200;
    const timer = setTimeout(() => {
      container.style.transition = 'opacity 1.4s cubic-bezier(.4,0,.2,1)';
      container.style.opacity = '0';
      setTimeout(onComplete, 1400);
    }, totalTime);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at 50% 55%, #8a2230 0%, #4a0a14 45%, #1a0105 100%)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,500&display=swap');

        @keyframes c-fade { to { opacity: 1; } }
        @keyframes c-draw { to { stroke-dashoffset: 0; } }
        @keyframes c-star-fill { to { fill: rgba(232,185,74,.95); } }
        @keyframes c-rise {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes c-shine {
          from { background-position: 140% 0; }
          to   { background-position: -40% 0; }
        }
        @keyframes c-glow {
          0%,100% { filter: drop-shadow(0 0 6px rgba(232,185,74,.2)); }
          50%      { filter: drop-shadow(0 0 30px rgba(232,185,74,.85)); }
        }
        @keyframes c-spark {
          0%,100% { opacity:0; transform:translateY(0) scale(.3); }
          50%      { opacity:.9; transform:translateY(-22px) scale(1); }
        }
        @keyframes c-divider {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .c-outer { animation: c-draw 1.8s 1.0s cubic-bezier(.6,0,.2,1) forwards; }
        .c-inner { animation: c-draw 1.5s 1.4s cubic-bezier(.6,0,.2,1) forwards; }
        .c-star  { animation: c-draw 1.3s 1.9s ease forwards, c-star-fill 0.8s 3.1s ease forwards; }

        .c-logo-wrap {
          opacity: 0;
          animation: c-rise 1.0s 2.0s cubic-bezier(.2,.8,.2,1) forwards,
                     c-glow 2.8s 3.2s ease-in-out infinite;
        }
        .c-divider-line {
          width: clamp(60px, 14vw, 160px); height: 1px;
          background: linear-gradient(90deg, transparent, #e8b94a, transparent);
          transform-origin: center;
          opacity: 0;
          animation: c-divider 0.8s 2.8s ease forwards;
        }
        .c-brand {
          opacity: 0;
          animation: c-rise 0.9s 3.0s cubic-bezier(.2,.8,.2,1) forwards,
                     c-shine 2.6s 4.0s ease-in-out infinite alternate;
          font-family: 'Cinzel', Georgia, serif;
          font-size: clamp(22px, 4.5vw, 54px);
          font-weight: 700;
          letter-spacing: 0.22em;
          background: linear-gradient(110deg, #9a6b12 10%, #fff0b8 38%, #e8b94a 52%, #fff0b8 66%, #9a6b12 90%);
          background-size: 280% 100%;
          background-position: 140% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          white-space: nowrap;
          text-align: center;
        }
        .c-tagline {
          opacity: 0;
          animation: c-rise 0.9s 3.5s ease forwards;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: clamp(13px, 2.2vw, 20px);
          letter-spacing: 0.1em;
          color: #f3d98a;
          text-align: center;
        }
        .c-spark {
          position: absolute;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #fff0b8;
          box-shadow: 0 0 7px 2px #e8b94a;
          opacity: 0;
        }
      `}</style>

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 58%, transparent 38%, rgba(0,0,0,.6) 100%)',
      }} />

      {/* Sparks */}
      {Array.from({ length: 22 }, (_, i) => (
        <i key={i} className="c-spark" style={{
          left: `${4 + i * 4.2}%`,
          top: `${20 + Math.sin(i) * 35 + 20}%`,
          zIndex: 2,
          animation: `c-spark ${2.2 + (i % 5) * 0.5}s ${2.6 + (i % 7) * 0.45}s ease-in-out infinite`,
        } as React.CSSProperties} />
      ))}

      {/* Center content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 6,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(6px, 1.8vh, 20px)',
        padding: '0 5vw',
        pointerEvents: 'none',
      }}>
        {/* Ring + Star emblem */}
        <div className="c-logo-wrap">
          <svg
            viewBox="0 0 220 220"
            aria-hidden="true"
            style={{ width: 'clamp(80px, 16vmin, 140px)', display: 'block', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="c-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fff0b8" />
                <stop offset=".45" stopColor="#e8b94a" />
                <stop offset="1" stopColor="#9a6b12" />
              </linearGradient>
            </defs>
            <circle
              className="c-outer"
              cx="110" cy="110" r="100"
              transform="rotate(-90 110 110)"
              fill="none" stroke="url(#c-grad)" strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="629" strokeDashoffset="629"
            />
            <circle
              className="c-inner"
              cx="110" cy="110" r="70"
              transform="rotate(-90 110 110)"
              fill="none" stroke="url(#c-grad)" strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="440" strokeDashoffset="440"
            />
            <path
              className="c-star"
              d="M110 62 L122 96 L158 98 L130 120 L140 154 L110 134 L80 154 L90 120 L62 98 L98 96 Z"
              fill="none" stroke="url(#c-grad)" strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="420" strokeDashoffset="420"
            />
          </svg>
        </div>

        {/* Brand name */}
        <p className="c-brand">HOUSE OF SWAVANI</p>

        {/* Divider */}
        <div className="c-divider-line" />

        {/* Tagline */}
        <p className="c-tagline">Where Elegance Meets Tradition</p>
      </div>

      {/* Curtains injected via useEffect */}
      <div
        ref={curtainsRef}
        style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}
      />
    </div>
  );
}
