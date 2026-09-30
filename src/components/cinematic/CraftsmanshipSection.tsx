'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const details = [
  {
    id: 'zari',
    label: 'Zari Goldwork',
    headline: 'Threads of 24K gold\nwoven into eternity.',
    body: 'Each metre of border requires 6–8 hours of precise hand-weaving. The zari thread is drawn from pure 24-karat gold wrapped around a silk core — a 400-year-old tradition from Varanasi.',
    image: '/saree-2.jpg',
    pos: '60% 30%',
    align: 'left',
  },
  {
    id: 'pallu',
    label: 'The Pallu',
    headline: 'Where the story\nbegins.',
    body: 'The pallu — the decorative end of the saree — is the artisan\'s canvas. Each Swavani pallu takes three full days to complete, with motifs drawn from temple architecture and lotus mythology.',
    image: '/saree-3.jpg',
    pos: '40% 20%',
    align: 'right',
  },
  {
    id: 'body',
    label: 'Silk Body',
    headline: 'Pure mulberry silk.\nFour centuries of craft.',
    body: 'Grade-A mulberry silk from certified farms in Karnataka. Woven on traditional pit looms in Kanchipuram by master weavers who inherited their skill across generations.',
    image: '/saree-4.jpg',
    pos: '50% 40%',
    align: 'left',
  },
];

export function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each card reveals on scroll
      gsap.utils.toArray<HTMLElement>('.craft-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 48 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        // Image zoom on scroll progress
        const img = el.querySelector('.craft-img') as HTMLElement;
        if (img) {
          gsap.fromTo(img,
            { scale: 1.1 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      });

      // Section headline
      gsap.fromTo('.craft-section-headline',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.craft-section-headline',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: '#0A0604', padding: 'clamp(80px, 10vw, 140px) 0' }}
    >
      {/* Section intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 mb-20">
        <div className="craft-section-headline" style={{ maxWidth: '700px', opacity: 0 }}>
          <div className="cine-sub" style={{ marginBottom: '20px' }}>The Craft · Swavani Heritage</div>
          <h2 className="cine-headline" style={{ fontSize: 'clamp(30px, 4.5vw, 58px)', marginBottom: '24px' }}>
            Craftsmanship that<br />
            <span className="cine-headline-gold">outlives the maker.</span>
          </h2>
          <div className="cine-divider" style={{ width: '80px' }} />
        </div>
      </div>

      {/* Detail cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(60px, 8vw, 100px)' }}>
        {details.map((d) => (
          <div
            key={d.id}
            className="craft-card max-w-7xl mx-auto px-6 lg:px-14 w-full"
            style={{ opacity: 0 }}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${d.align === 'right' ? 'lg:direction-rtl' : ''}`}
              style={{ direction: d.align === 'right' ? 'rtl' : 'ltr' }}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative', aspectRatio: '4/3', overflow: 'hidden',
                  direction: 'ltr',
                }}
                data-cursor="explore"
              >
                <Image
                  src={d.image}
                  alt={d.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="craft-img"
                  style={{ objectFit: 'cover', objectPosition: d.pos, willChange: 'transform' }}
                />
                {/* Overlay label */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px',
                  background: 'linear-gradient(0deg, rgba(5,2,1,.7) 0%, transparent 100%)',
                }}>
                  <div className="cine-sub" style={{ color: 'rgba(217,178,109,.7)' }}>{d.label}</div>
                </div>
              </div>

              {/* Text */}
              <div style={{ direction: 'ltr', padding: 'clamp(16px, 3vw, 48px)' }}>
                <div className="cine-sub" style={{ marginBottom: '20px' }}>{d.label}</div>
                <h3
                  className="cine-headline"
                  style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', marginBottom: '24px', whiteSpace: 'pre-line' }}
                >
                  {d.headline}
                </h3>
                <div className="cine-divider" style={{ width: '60px', marginBottom: '24px' }} />
                <p className="cine-body" style={{ maxWidth: '48ch', marginBottom: '32px' }}>
                  {d.body}
                </p>
                <a
                  href="/collections"
                  data-cursor="open"
                  style={{
                    fontFamily: 'var(--font-montserrat)', fontSize: '10px',
                    letterSpacing: '.22em', textTransform: 'uppercase',
                    color: '#D9B26D', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    borderBottom: '1px solid rgba(217,178,109,.3)', paddingBottom: '4px',
                    transition: 'border-color .3s, letter-spacing .3s',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(217,178,109,.9)';
                    (e.target as HTMLElement).style.letterSpacing = '.28em';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.borderColor = 'rgba(217,178,109,.3)';
                    (e.target as HTMLElement).style.letterSpacing = '.22em';
                  }}
                >
                  Explore the craft →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
