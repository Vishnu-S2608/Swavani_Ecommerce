'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1, name: 'Kanjivaram Crimson Zari', collection: 'Bridal Heritage',
    fabric: 'Pure Mulberry Silk', price: '₹18,500', badge: 'Bestseller',
    image: '/saree-1.jpg', pos: '50% 30%',
    desc: 'Grand Kanjivaram with 24K zari work — for your most auspicious day.',
  },
  {
    id: 2, name: 'Banarasi Royal Tanchoi', collection: 'Heritage Weaves',
    fabric: 'Silk Tanchoi Weave', price: '₹22,000', badge: 'New Arrival',
    image: '/saree-2.jpg', pos: '60% 20%',
    desc: 'A royal composition of silk and gold — crafted by master weavers of Varanasi.',
  },
  {
    id: 3, name: 'Pattu Peacock Heritage', collection: 'Temple Collection',
    fabric: 'Pure Pattu Silk', price: '₹14,200', badge: 'Heritage',
    image: '/saree-3.jpg', pos: '40% 20%',
    desc: 'Temple-inspired motifs woven on the finest Kanjivaram base — timeless elegance.',
  },
  {
    id: 4, name: 'Chanderi Botanical Zari', collection: 'Festive Edition',
    fabric: 'Chanderi Cotton Silk', price: '₹8,900', badge: 'Limited',
    image: '/saree-4.jpg', pos: '50% 40%',
    desc: 'Lightweight luxury for festive days — botanical zari on sheer Chanderi.',
  },
];

export function CollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.collection-headline',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.collection-headline', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.utils.toArray<HTMLElement>('.coll-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 56 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
        );
      });

      // Horizontal scroll band
      const band = document.querySelector('.coll-band-inner') as HTMLElement;
      if (band) {
        gsap.to(band, {
          x: () => -(band.scrollWidth - window.innerWidth + 96),
          ease: 'none',
          scrollTrigger: {
            trigger: '.coll-band',
            start: 'top top',
            end: () => `+=${band.scrollWidth - window.innerWidth + 96}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#0A0604' }}>

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14" style={{ paddingTop: 'clamp(80px, 10vw, 120px)', paddingBottom: '60px' }}>
        <div className="collection-headline" style={{ opacity: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="cine-sub" style={{ marginBottom: '16px' }}>The Collection · Swavani 2025</div>
            <h2 className="cine-headline" style={{ fontSize: 'clamp(28px, 4vw, 52px)', maxWidth: '18ch' }}>
              Most coveted<br />
              <span className="cine-headline-gold">silks.</span>
            </h2>
          </div>
          <Link
            href="/collections"
            data-cursor="open"
            style={{
              fontFamily: 'var(--font-montserrat)', fontSize: '10px', letterSpacing: '.22em',
              textTransform: 'uppercase', color: '#D9B26D', textDecoration: 'none',
              borderBottom: '1px solid rgba(217,178,109,.4)', paddingBottom: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            View Full Archive →
          </Link>
        </div>
      </div>

      {/* ── Horizontal scroll band ── */}
      <div className="coll-band" style={{ overflow: 'hidden' }}>
        <div className="coll-band-inner" style={{ display: 'flex', gap: '2px', paddingLeft: '48px', paddingRight: '48px', willChange: 'transform' }}>
          {products.map((p, i) => (
            <div
              key={p.id}
              className="coll-card"
              data-cursor="view"
              style={{
                flex: '0 0 clamp(280px, 30vw, 420px)',
                opacity: 0,
                position: 'relative',
                cursor: 'none',
              }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  height: 'clamp(400px, 60vh, 620px)',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: p.pos,
                    transform: hovered === p.id ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.76,0,0.2,1)',
                  }}
                />
                {/* Gradient */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(0deg, rgba(5,2,1,.7) 0%, transparent 50%)',
                }} />
                {/* Badge */}
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: 'rgba(5,2,1,.8)', border: '1px solid rgba(217,178,109,.4)',
                  padding: '5px 12px',
                  fontFamily: 'var(--font-montserrat)', fontSize: '8px',
                  letterSpacing: '.2em', textTransform: 'uppercase', color: '#D9B26D',
                }}>
                  {p.badge}
                </div>
              </div>

              {/* Info */}
              <div style={{
                padding: '20px 0 28px',
                borderBottom: '1px solid rgba(217,178,109,.12)',
              }}>
                <div className="cine-sub" style={{ fontSize: '8px', marginBottom: '8px', color: 'rgba(217,178,109,.6)' }}>
                  {p.fabric}
                </div>
                <div style={{
                  fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(14px, 1.6vw, 18px)',
                  letterSpacing: '.05em', color: '#F4E8D4', fontWeight: 700, marginBottom: '6px',
                }}>
                  {p.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-cormorant, Georgia)', fontStyle: 'italic',
                  fontSize: 'clamp(13px, 1.4vw, 16px)', color: 'rgba(244,232,212,.55)',
                  marginBottom: '16px',
                }}>
                  {p.desc}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-cormorant, Georgia)', fontStyle: 'italic',
                    fontSize: 'clamp(20px, 2.2vw, 26px)', color: '#D9B26D',
                  }}>
                    {p.price}
                  </div>
                  <Link
                    href="/collections"
                    data-cursor="open"
                    style={{
                      fontFamily: 'var(--font-montserrat)', fontSize: '8px',
                      letterSpacing: '.18em', textTransform: 'uppercase', color: '#F4E8D4',
                      textDecoration: 'none', padding: '8px 16px',
                      border: '1px solid rgba(244,232,212,.2)',
                      opacity: hovered === p.id ? 1 : 0,
                      transition: 'opacity .3s, border-color .3s',
                    }}
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div
        style={{
          textAlign: 'center', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 48px)',
          background: 'linear-gradient(180deg, #0A0604 0%, #130806 50%, #0A0604 100%)',
        }}
      >
        <div className="cine-sub" style={{ marginBottom: '24px' }}>1200+ Master Weavers · 5 Heritage Collections</div>
        <h2
          className="cine-headline"
          style={{
            fontSize: 'clamp(32px, 5vw, 64px)', marginBottom: '40px',
            maxWidth: '16ch', margin: '0 auto 40px',
          }}
        >
          Wear a piece of<br />
          <span className="cine-headline-gold">living history.</span>
        </h2>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/collections"
            data-cursor="open"
            className="btn-zari"
            style={{ fontSize: '10px', letterSpacing: '.2em', padding: '18px 40px', textDecoration: 'none' }}
          >
            Explore Collection
          </Link>
          <Link
            href="/collections"
            data-cursor="open"
            className="btn-silk"
            style={{ fontSize: '10px', letterSpacing: '.2em', padding: '18px 40px', textDecoration: 'none' }}
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
