'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SareeJourney v2 — Scene-by-Scene Cinematic Scroll
 *
 * 9 discrete scenes stacked in a single sticky viewport.
 * GSAP ScrollTrigger + snap drives the film-reel effect:
 *   each scroll action advances exactly one scene.
 *
 * Scene 0: THE VOID         — Dark space, gold particles, SWAVANI
 * Scene 1: CURTAIN RISE     — curtains-opening.mp4 full screen
 * Scene 2: FIRST THREAD     — Single golden border strip appears
 * Scene 3: THE WEAVE        — 8 vertical strips reveal saree (loom effect)
 * Scene 4: FULL REVELATION  — Complete saree, center stage, dramatic hold
 * Scene 5: SILK IN MOTION   — Silk ribbon video, fabric flowing
 * Scene 6: THE SILHOUETTE   — Model emerges from shadow
 * Scene 7: TRANSFORMATION   — Model fully dressed
 * Scene 8: THE STORY        — Product name, price, CTA
 */

const NUM_SCENES = 9;
const STRIP_COUNT = 8; // columns for the weave reveal

export function SareeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>(Array(NUM_SCENES).fill(null));
  const stripRefs = useRef<(HTMLDivElement | null)[]>(Array(STRIP_COUNT).fill(null));
  const curtainVideoRef = useRef<HTMLVideoElement>(null);
  const silkVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Canvas ambient particles ────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; vy: number; r: number; a: number };
    const pts: P[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -(Math.random() * 0.4 + 0.15),
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.6 + 0.1,
    }));

    let alive = true;
    const draw = () => {
      if (!alive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.y += p.vy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,178,109,${p.a * 0.5})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    draw();
    return () => { alive = false; window.removeEventListener('resize', resize); };
  }, []);

  // ── GSAP scene-by-scene scroll driver ──────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = sceneRefs.current;

      // Set initial state — all hidden except scene 0
      scenes.forEach((s, i) => {
        if (!s) return;
        gsap.set(s, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 });
      });

      // Master timeline — 1 unit per scene transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${NUM_SCENES * 100}%`,
          scrub: 1.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (NUM_SCENES - 1),
            duration: { min: 0.25, max: 0.55 },
            delay: 0.05,
            ease: 'power2.inOut',
          },
          onUpdate(self) {
            // Play/pause videos based on their scene visibility
            const progress = self.progress;
            const activeScene = Math.round(progress * (NUM_SCENES - 1));
            if (curtainVideoRef.current) {
              if (activeScene === 1) curtainVideoRef.current.play().catch(() => {});
              else curtainVideoRef.current.pause();
            }
            if (silkVideoRef.current) {
              if (activeScene === 5) silkVideoRef.current.play().catch(() => {});
              else silkVideoRef.current.pause();
            }
          },
        },
      });

      // ── Define transitions for each scene pair ─────────────────
      // Cross-dissolve with slight scale for each transition
      for (let i = 0; i < NUM_SCENES - 1; i++) {
        const outScene = scenes[i];
        const inScene  = scenes[i + 1];
        const pos = i; // timeline position for this transition

        if (!outScene || !inScene) continue;

        // OUT: current scene fades/scales out
        const outEffect = getOutEffect(i);
        const inEffect  = getInEffect(i + 1);

        tl.to(outScene, { ...outEffect, duration: 0.6, ease: 'power2.inOut' }, pos);
        tl.set(outScene, { zIndex: 1 }, pos + 0.6);
        tl.set(inScene,  { zIndex: 2 }, pos);
        tl.fromTo(inScene, { autoAlpha: 0, ...inEffect.from }, { autoAlpha: 1, ...inEffect.to, duration: 0.6, ease: 'power2.out' }, pos);

        // Hold at scene i+1 for 0.4 units before next transition
        tl.to({}, { duration: 0.4 }, pos + 0.6);
      }

      // ── Scene 3: Weave reveal — stagger strips ──────────────────
      // Driven by the scene 2→3 transition
      const strips = stripRefs.current;
      gsap.set(strips, { scaleY: 0, transformOrigin: 'bottom center' });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${NUM_SCENES * 100}%`,
        scrub: 1.8,
        onUpdate(self) {
          // Scene 3 is at progress = 3/(NUM_SCENES-1) ≈ 0.375
          // Transition happens between 2/8 and 3/8
          const sceneProgress = self.progress * (NUM_SCENES - 1);
          const weaveProgress = gsap.utils.clamp(0, 1, (sceneProgress - 2.2) / 0.6);
          strips.forEach((strip, idx) => {
            if (!strip) return;
            const stripDelay = idx / STRIP_COUNT;
            const stripProgress = gsap.utils.clamp(0, 1, (weaveProgress - stripDelay * 0.5) / 0.5);
            // Alternate: odd strips reveal from bottom, even from top
            if (idx % 2 === 0) {
              strip.style.transform = `scaleY(${stripProgress})`;
              strip.style.transformOrigin = 'bottom center';
            } else {
              strip.style.transform = `scaleY(${stripProgress})`;
              strip.style.transformOrigin = 'top center';
            }
          });
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Cursor parallax for all scenes ──────────────────────────────
  useEffect(() => {
    const layers = document.querySelectorAll<HTMLElement>('[data-depth]');
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      pos.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pos.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    let raf = 0;
    const loop = () => {
      pos.tx += (pos.x - pos.tx) * 0.07;
      pos.ty += (pos.y - pos.ty) * 0.07;
      layers.forEach(el => {
        const depth = parseFloat(el.dataset.depth || '0');
        el.style.transform = `translate(${pos.tx * depth * -1}px, ${pos.ty * depth * -1}px)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Sticky cinematic viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0A0604' }}>

        {/* ══════════ SCENE 0: THE VOID ══════════ */}
        <div ref={el => { sceneRefs.current[0] = el; }} style={sceneStyle}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />
          {/* Radial glow */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(92,15,39,.18) 0%, transparent 70%)' }} />
          {/* Center content */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }} data-depth="4">
            {/* Thin top line */}
            <div style={{ width: '1px', height: '48px', background: 'linear-gradient(180deg, transparent, rgba(217,178,109,.5))', marginBottom: '32px' }} />
            <div className="scene-brand" style={{
              fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(52px, 7vw, 96px)',
              letterSpacing: '0.28em', color: '#D9B26D', fontWeight: 700, lineHeight: 1,
            }}>
              SWAVANI
            </div>
            <div style={{ height: '1px', width: 'clamp(120px, 20vw, 200px)', background: 'linear-gradient(90deg, transparent, #D9B26D, transparent)', margin: '24px 0' }} />
            <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '10px', letterSpacing: '0.44em', textTransform: 'uppercase', color: 'rgba(217,178,109,.55)' }}>
              House of Silk &amp; Heritage
            </div>
            {/* Scroll hint */}
            <div style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(217,178,109,.4)' }}>
                Scroll to begin
              </div>
              <div style={{ width: '1px', height: '36px', background: 'linear-gradient(180deg, rgba(217,178,109,.4), transparent)', animation: 'pulse-line 1.8s ease-in-out infinite' }} />
            </div>
          </div>
          {/* Corner ornaments */}
          {['top:24px;left:32px', 'top:24px;right:32px', 'bottom:24px;left:32px', 'bottom:24px;right:32px'].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', ...parseSideStyle(s),
              width: '32px', height: '32px',
              borderTop: i < 2 ? '1px solid rgba(217,178,109,.3)' : 'none',
              borderBottom: i >= 2 ? '1px solid rgba(217,178,109,.3)' : 'none',
              borderLeft: i % 2 === 0 ? '1px solid rgba(217,178,109,.3)' : 'none',
              borderRight: i % 2 === 1 ? '1px solid rgba(217,178,109,.3)' : 'none',
            }} />
          ))}
        </div>

        {/* ══════════ SCENE 1: CURTAIN RISE ══════════ */}
        <div ref={el => { sceneRefs.current[1] = el; }} style={sceneStyle}>
          <video ref={curtainVideoRef} src="/videos/curtains-opening.mp4" muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Dark top gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,2,1,.3) 0%, transparent 30%, transparent 70%, rgba(5,2,1,.5) 100%)' }} />
          {/* Scene label */}
          <div style={sceneLabel}>
            <div className="cine-sub">Act I · The Curtain Rises</div>
          </div>
          {/* Bottom text */}
          <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-cormorant, Georgia)', fontStyle: 'italic', fontSize: 'clamp(18px, 2.2vw, 26px)', color: 'rgba(244,232,212,.75)' }}>
              "A story woven in every thread."
            </div>
          </div>
        </div>

        {/* ══════════ SCENE 2: FIRST THREAD ══════════ */}
        <div ref={el => { sceneRefs.current[2] = el; }} style={sceneStyle}>
          <div style={{ position: 'absolute', inset: 0, background: '#0A0604' }} />
          {/* Single vertical border strip - shows just the saree edge */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: '12%', width: 'clamp(80px, 8vw, 120px)', overflow: 'hidden' }} data-depth="6">
            <Image src="/saree-1.jpg" alt="Saree border" fill sizes="120px"
              style={{ objectFit: 'cover', objectPosition: '95% 30%' }} />
            {/* Glow on left edge */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(217,178,109,.25) 0%, transparent 40%)' }} />
          </div>
          {/* Center text */}
          <div style={{ position: 'absolute', left: 'clamp(48px, 8vw, 120px)', top: '50%', transform: 'translateY(-50%)' }} data-depth="3">
            <div className="cine-sub" style={{ marginBottom: '20px' }}>Act II · First Thread</div>
            <h2 style={{ fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '.06em', color: '#F4E8D4', fontWeight: 700, maxWidth: '14ch', lineHeight: 1.15 }}>
              Every Kanjivaram<br />
              <span style={{ background: 'linear-gradient(135deg, #B8925A, #D9B26D, #F1D9A0, #D9B26D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                begins with one thread.
              </span>
            </h2>
            <div style={{ width: '60px', height: '1px', background: '#D9B26D', marginTop: '24px', opacity: .6 }} />
          </div>
          <div style={sceneLabel}><div className="cine-sub">02 / 09</div></div>
        </div>

        {/* ══════════ SCENE 3: THE WEAVE ══════════ */}
        <div ref={el => { sceneRefs.current[3] = el; }} style={sceneStyle}>
          <div style={{ position: 'absolute', inset: 0, background: '#0A0604' }} />
          {/* 8 vertical strips — each reveals independently via inline style (driven by onUpdate above) */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
            {Array.from({ length: STRIP_COUNT }, (_, i) => (
              <div key={i} ref={el => { stripRefs.current[i] = el; }}
                style={{
                  flex: 1, height: '100%', overflow: 'hidden', position: 'relative',
                  transform: 'scaleY(0)',
                  transformOrigin: i % 2 === 0 ? 'bottom center' : 'top center',
                }}
              >
                <Image src="/saree-1.jpg" alt="Saree weave" fill sizes="12.5vw"
                  style={{ objectFit: 'cover', objectPosition: `${(i / STRIP_COUNT) * 100}% 30%` }} />
              </div>
            ))}
          </div>
          {/* Overlay text */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '8%', background: 'linear-gradient(0deg, rgba(5,2,1,.7) 0%, transparent 40%)', zIndex: 3 }}>
            <div className="cine-sub" style={{ marginBottom: '12px' }}>Act III · The Weave</div>
            <div style={{ fontFamily: 'var(--font-cormorant, Georgia)', fontStyle: 'italic', fontSize: 'clamp(20px, 2.4vw, 28px)', color: 'rgba(244,232,212,.8)', textAlign: 'center' }}>
              Thread by thread. Woven by masters of Kanchipuram.
            </div>
          </div>
          <div style={sceneLabel}><div className="cine-sub">03 / 09</div></div>
        </div>

        {/* ══════════ SCENE 4: FULL REVELATION ══════════ */}
        <div ref={el => { sceneRefs.current[4] = el; }} style={sceneStyle}>
          <div style={{ position: 'absolute', inset: 0, background: '#0D0603' }} />
          {/* Full saree centered with gold frame */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 'min(72vw, 700px)', aspectRatio: '3/4', overflow: 'hidden',
            outline: '1px solid rgba(217,178,109,.4)',
            outlineOffset: '8px',
            boxShadow: '0 0 80px rgba(217,178,109,.12), 0 0 160px rgba(92,15,39,.4)',
          }} data-depth="8">
            <Image src="/saree-1.jpg" alt="Kanjivaram Crimson Zari saree" fill priority sizes="72vw"
              style={{ objectFit: 'cover', objectPosition: '50% 25%' }} />
            {/* Subtle inner vignette */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(5,2,1,.3) 100%)' }} />
          </div>
          {/* Name label — top */}
          <div style={{ position: 'absolute', top: '6%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <div className="cine-sub">Kanjivaram · Crimson Zari · Heritage Collection</div>
          </div>
          {/* Quote — bottom */}
          <div style={{ position: 'absolute', bottom: '6%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '.1em', color: '#D9B26D', fontWeight: 700 }}>
              THE SAREE.
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant, Georgia)', fontStyle: 'italic', fontSize: 'clamp(14px, 1.6vw, 18px)', color: 'rgba(244,232,212,.55)', marginTop: '8px' }}>
              Revealed in its full splendour.
            </div>
          </div>
          <div style={sceneLabel}><div className="cine-sub">04 / 09</div></div>
        </div>

        {/* ══════════ SCENE 5: SILK IN MOTION ══════════ */}
        <div ref={el => { sceneRefs.current[5] = el; }} style={sceneStyle}>
          <video ref={silkVideoRef} src="/videos/hero-silk.mp4" muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Color grade */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(92,15,39,.55) 0%, rgba(5,2,1,.2) 50%, rgba(3,2,1,.55) 100%)', mixBlendMode: 'multiply' }} />
          {/* Text — left center */}
          <div style={{ position: 'absolute', left: 'clamp(48px, 8vw, 120px)', top: '50%', transform: 'translateY(-50%)' }} data-depth="5">
            <div className="cine-sub" style={{ marginBottom: '20px' }}>Act V · Silk in Motion</div>
            <h2 style={{ fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(32px, 4.5vw, 60px)', letterSpacing: '.06em', color: '#F4E8D4', fontWeight: 700, lineHeight: 1.1, maxWidth: '12ch' }}>
              Pure<br />
              <span style={{ background: 'linear-gradient(135deg, #B8925A, #D9B26D, #F1D9A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Mulberry Silk.
              </span>
            </h2>
            <div style={{ height: '1px', width: '80px', background: 'rgba(217,178,109,.5)', margin: '24px 0' }} />
            <div style={{ fontFamily: 'var(--font-cormorant, Georgia)', fontStyle: 'italic', fontSize: 'clamp(16px, 1.8vw, 22px)', color: 'rgba(244,232,212,.7)', maxWidth: '32ch', lineHeight: 1.6 }}>
              Grade-A Mulberry silk. Certified by the<br />Handloom Mark Board of India.
            </div>
          </div>
          <div style={sceneLabel}><div className="cine-sub">05 / 09</div></div>
        </div>

        {/* ══════════ SCENE 6: THE SILHOUETTE ══════════ */}
        <div ref={el => { sceneRefs.current[6] = el; }} style={sceneStyle}>
          {/* Dark editorial — model barely visible */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="/saree-5.jpg" alt="Model" fill sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: '50% 15%', filter: 'brightness(0.35) saturate(0.6)' }} />
            {/* Golden halo from saree */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 70% at 60% 40%, rgba(217,178,109,.12) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,2,1,.5) 0%, transparent 30%, transparent 65%, rgba(5,2,1,.7) 100%)' }} />
          </div>
          {/* Text */}
          <div style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%', padding: '0 24px' }} data-depth="4">
            <div className="cine-sub" style={{ marginBottom: '16px' }}>Act VI · The Silhouette</div>
            <div style={{ fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '.1em', color: 'rgba(244,232,212,.8)', fontWeight: 700 }}>
              She carries the story.
            </div>
          </div>
          <div style={sceneLabel}><div className="cine-sub">06 / 09</div></div>
        </div>

        {/* ══════════ SCENE 7: TRANSFORMATION ══════════ */}
        <div ref={el => { sceneRefs.current[7] = el; }} style={sceneStyle}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="/hero-model.jpg" alt="Model wearing Kanjivaram Crimson Zari" fill sizes="100vw" priority
              style={{ objectFit: 'cover', objectPosition: '55% 10%', filter: 'brightness(0.82)' }} />
            {/* Warm editorial grade */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,2,1,.15) 0%, transparent 20%, transparent 65%, rgba(5,2,1,.6) 100%)' }} />
            {/* Left silk drape shadow */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,2,1,.6) 0%, transparent 30%)' }} />
          </div>
          {/* Left text panel */}
          <div style={{ position: 'absolute', left: 'clamp(36px, 6vw, 96px)', top: '50%', transform: 'translateY(-50%)' }} data-depth="5">
            <div className="cine-sub" style={{ marginBottom: '20px' }}>Act VII · The Transformation</div>
            <h2 style={{ fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(32px, 4.5vw, 58px)', letterSpacing: '.05em', color: '#F4E8D4', fontWeight: 700, lineHeight: 1.12, maxWidth: '14ch' }}>
              Wear the craft.<br />
              <span style={{ background: 'linear-gradient(135deg, #B8925A, #D9B26D, #F1D9A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Live the heritage.
              </span>
            </h2>
            <div style={{ height: '1px', width: '72px', background: 'rgba(217,178,109,.5)', margin: '24px 0' }} />
            <div style={{ fontFamily: 'var(--font-cormorant, Georgia)', fontStyle: 'italic', fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'rgba(244,232,212,.65)', maxWidth: '32ch', lineHeight: 1.65 }}>
              Four hundred years of craft. <br />Yours to wear, yours to treasure.
            </div>
          </div>
          <div style={sceneLabel}><div className="cine-sub">07 / 09</div></div>
        </div>

        {/* ══════════ SCENE 8: THE STORY ══════════ */}
        <div ref={el => { sceneRefs.current[8] = el; }} style={sceneStyle}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="/hero-editorial.jpg" alt="Editorial" fill sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: '50% 20%', filter: 'brightness(0.65)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,2,1,.88) 0%, rgba(5,2,1,.55) 40%, transparent 70%)' }} />
          </div>
          {/* Product card */}
          <div style={{ position: 'absolute', left: 'clamp(36px, 6vw, 96px)', top: '50%', transform: 'translateY(-50%)', maxWidth: '440px' }} data-depth="5">
            <div className="cine-sub" style={{ marginBottom: '20px' }}>Final Act · The Story</div>
            <h1 style={{ fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(28px, 3.5vw, 46px)', letterSpacing: '.06em', color: '#F4E8D4', fontWeight: 700, lineHeight: 1.15, marginBottom: '8px' }}>
              Kanjivaram<br />
              <span style={{ background: 'linear-gradient(135deg, #B8925A, #D9B26D, #F1D9A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Crimson Zari
              </span>
            </h1>
            <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '9px', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(217,178,109,.65)', marginBottom: '20px' }}>
              Pure Mulberry Silk · 24K Zari Gold Thread · GI Certified
            </div>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(217,178,109,.5), transparent)', marginBottom: '20px' }} />
            <div style={{ fontFamily: 'var(--font-cormorant, Georgia)', fontStyle: 'italic', fontSize: 'clamp(32px, 4vw, 48px)', color: '#D9B26D', marginBottom: '28px' }}>
              ₹18,500
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/collections" data-cursor="open"
                style={{
                  fontFamily: 'var(--font-montserrat)', fontSize: '9px', letterSpacing: '.2em',
                  textTransform: 'uppercase', color: '#0A0604', background: '#D9B26D',
                  padding: '14px 28px', textDecoration: 'none', display: 'block',
                  transition: 'background .25s',
                }}>
                Explore Collection
              </a>
              <a href="/collections" data-cursor="open"
                style={{
                  fontFamily: 'var(--font-montserrat)', fontSize: '9px', letterSpacing: '.2em',
                  textTransform: 'uppercase', color: '#D9B26D',
                  border: '1px solid rgba(217,178,109,.4)',
                  padding: '14px 28px', textDecoration: 'none', display: 'block',
                }}>
                Book a Consult →
              </a>
            </div>
          </div>
          {/* Scene dots progress */}
          <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
            {Array.from({ length: NUM_SCENES }, (_, i) => (
              <div key={i} style={{
                width: i === 8 ? '24px' : '6px', height: '6px', borderRadius: '3px',
                background: i === 8 ? '#D9B26D' : 'rgba(217,178,109,.25)',
                transition: 'all .3s',
              }} />
            ))}
          </div>
          <div style={sceneLabel}><div className="cine-sub">09 / 09 · Fin</div></div>
        </div>

        {/* ── Vignette overlay (always on) ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50,
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(5,2,1,.4) 100%)',
        }} />

        {/* ── Grain ── */}
        <div className="cine-grain" aria-hidden />

      </div>

      {/* ── Spacer ── */}
      <div style={{ height: `${NUM_SCENES * 100}vh` }} aria-hidden />

      <style>{`
        @keyframes pulse-line {
          0%, 100% { opacity: 0.5; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
        .scene-brand {
          animation: scene-brand-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes scene-brand-in {
          from { opacity: 0; letter-spacing: 0.44em; }
          to { opacity: 1; letter-spacing: 0.28em; }
        }
      `}</style>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const sceneStyle: React.CSSProperties = {
  position: 'absolute', inset: 0, visibility: 'hidden',
};

const sceneLabel: React.CSSProperties = {
  position: 'absolute', bottom: '32px', right: '32px',
};

/** Inline style string → object (only top/right/bottom/left used here) */
function parseSideStyle(str: string): React.CSSProperties {
  const out: Record<string, string> = {};
  str.split(';').forEach(part => {
    const [k, v] = part.split(':').map(s => s.trim());
    if (k && v) out[k] = v;
  });
  return out as React.CSSProperties;
}

/** How each scene exits */
function getOutEffect(sceneIdx: number): gsap.TweenVars {
  const effects: gsap.TweenVars[] = [
    { autoAlpha: 0, scale: 0.95 },           // 0 → 1
    { autoAlpha: 0, scale: 1.04 },           // 1 → 2
    { autoAlpha: 0, x: '-3%' },              // 2 → 3
    { autoAlpha: 0 },                        // 3 → 4
    { autoAlpha: 0, scale: 0.96 },           // 4 → 5
    { autoAlpha: 0, scale: 1.03 },           // 5 → 6
    { autoAlpha: 0 },                        // 6 → 7
    { autoAlpha: 0, scale: 0.97 },           // 7 → 8
    { autoAlpha: 0 },                        // 8 → (end)
  ];
  return effects[sceneIdx] ?? { autoAlpha: 0 };
}

/** How each scene enters */
function getInEffect(sceneIdx: number): { from: gsap.TweenVars; to: gsap.TweenVars } {
  const effects: { from: gsap.TweenVars; to: gsap.TweenVars }[] = [
    { from: { scale: 1.04 }, to: { scale: 1 } },         // 1
    { from: { x: '4%' },     to: { x: '0%' } },          // 2
    { from: {},               to: {} },                    // 3 (weave strips handle their own)
    { from: { scale: 1.08 }, to: { scale: 1 } },          // 4
    { from: { scale: 0.96 }, to: { scale: 1 } },          // 5
    { from: {},               to: {} },                    // 6
    { from: { scale: 1.06 }, to: { scale: 1 } },          // 7
    { from: { x: '-3%' },    to: { x: '0%' } },          // 8
  ];
  return effects[sceneIdx - 1] ?? { from: {}, to: {} };
}
