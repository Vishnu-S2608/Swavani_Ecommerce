'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

export function CurtainOpeningV2({ onComplete }: Props) {
  const [play, setPlay] = useState(false);
  const [landed, setLanded] = useState(false);
  const ilRef = useRef<HTMLDivElement>(null);
  const nlRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlay(true);
      
      const il = ilRef.current;
      const nl = nlRef.current;
      if (il && nl) {
        // Trigger the logo translation earlier (at 1200ms instead of 1900ms)
        setTimeout(() => {
          const a = il.getBoundingClientRect();
          const b = nl.getBoundingClientRect();
          const dx = b.left + b.width / 2 - (a.left + a.width / 2);
          const dy = b.top + b.height / 2 - (a.top + a.height / 2);
          const s = b.width / a.width;
          
          const an = il.animate(
            [{ transform: 'translate(-50%, -50%) scale(1)' }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${s})` }],
            { duration: 800, easing: 'cubic-bezier(.7, 0, .3, 1)', fill: 'forwards' }
          );
          animRef.current = an;
          
          an.finished.then(() => {
            setLanded(true);
            setTimeout(() => {
              if (bgRef.current) {
                bgRef.current.style.opacity = '0';
              }
              setTimeout(onComplete, 500);
            }, 600); // Shorter hold after landed before completing
          }).catch(() => {});
        }, 1200);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animRef.current) animRef.current.cancel();
    };
  }, [onComplete]);

  return (
    <div ref={bgRef} className={`fixed inset-0 z-[9999] transition-opacity duration-500 ${play ? 'play' : ''} ${landed ? 'landed' : ''}`} style={{ '--logo': 'url(/swavani-logo-transparent.png)', '--ar': '3.1915', '--gold': '#d4a853', '--cream': '#f4e9d6', '--bg': '#0a1914' } as React.CSSProperties}>
      <style>{`
        .nav-intro { position:absolute; top:0; left:0; right:0; height: 96px; z-index:30; display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none; }
        #nl { width:clamp(180px, 22vw, 280px); aspect-ratio:var(--ar); opacity:0; }
        .play .nav-intro { animation:fade .5s 1.2s forwards; }
        body:has(.nav-intro) #main-nav-logo { opacity: 0 !important; }
        
        .cur { position:absolute; top:0; bottom:0; width:50.1%; z-index:20; background:linear-gradient(180deg, rgba(0,0,0,.45), transparent 22%, transparent 78%, rgba(0,0,0,.55)), repeating-linear-gradient(90deg, #26091a 0, #5e2234 2.2vw, #8a465d 3.5vw, #5e2234 4.8vw, #26091a 7vw); box-shadow: inset 0 0 50px rgba(0,0,0,0.8); }
        .cl { left:0; transform-origin:0 50%; border-right: 2px solid rgba(212, 168, 83, 0.4); }
        .cr { right:0; transform-origin:100% 50%; border-left: 2px solid rgba(212, 168, 83, 0.4); }
        .play .cur { animation:open 1.2s 1.3s cubic-bezier(.7,0,.2,1) forwards; }
        
        #il { position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:min(85vw, 650px); aspect-ratio:var(--ar); z-index:40; pointer-events:none; }
        .g { position:absolute; inset:0; background:var(--logo) center/contain no-repeat; opacity:0; filter: drop-shadow(0 0 15px rgba(212, 168, 83, 0.4)); }
        .g::after { content:""; position:absolute; inset:0; -webkit-mask:var(--logo) center/contain no-repeat; mask:var(--logo) center/contain no-repeat; background:linear-gradient(105deg, transparent 40%, rgba(255,255,255,.9) 50%, transparent 60%) 100% 0/250% 100% no-repeat; mix-blend-mode: overlay; }
        
        .play .g { animation:lin 0.8s 0.1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .play .g::after { animation:shine 1.2s 0.6s ease-in-out; }
        
        @keyframes fade { to { opacity:1; } }
        @keyframes open { to { transform:scaleX(0); visibility:hidden; } }
        @keyframes lin { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:none; } }
        @keyframes shine { to { background-position:0 0; } }
        
        @media(prefers-reduced-motion:reduce) { .cur, #il { display:none; } .nav-intro { opacity:1!important; } #nl { opacity:1; } }
      `}</style>

      <div className="nav-intro">
        <div id="nl" ref={nlRef} aria-label="House of Swavani" />
      </div>

      <div className="cur cl" />
      <div className="cur cr" />

      <div id="il" ref={ilRef}>
        <div className="g" />
      </div>
    </div>
  );
}
