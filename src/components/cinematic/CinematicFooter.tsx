'use client';

import Link from 'next/link';

export function CinematicFooter() {
  return (
    <footer
      style={{
        background: '#030201',
        borderTop: '1px solid rgba(217,178,109,.12)',
        padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px) clamp(32px, 4vw, 56px)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top: brand + nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-cinzel, Georgia)', fontSize: 'clamp(24px, 3vw, 36px)',
              letterSpacing: '.18em', color: '#D9B26D', fontWeight: 700, marginBottom: '8px',
            }}>
              SWAVANI
            </div>
            <div style={{
              fontFamily: 'var(--font-montserrat)', fontSize: '9px', letterSpacing: '.22em',
              textTransform: 'uppercase', color: 'rgba(244,232,212,.4)',
            }}>
              House of Silk &amp; Heritage
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', gap: 'clamp(24px, 4vw, 48px)', flexWrap: 'wrap' }}>
            {['Collections', 'Lookbook', 'Our Story', 'Consult', 'Visit Us'].map(link => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(' ', '-')}`}
                data-cursor="open"
                style={{
                  fontFamily: 'var(--font-montserrat)', fontSize: '9px', letterSpacing: '.2em',
                  textTransform: 'uppercase', color: 'rgba(244,232,212,.5)',
                  textDecoration: 'none', transition: 'color .3s',
                }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#D9B26D'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(244,232,212,.5)'}
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>

        {/* Zari divider */}
        <div className="cine-divider" style={{ marginBottom: '32px' }} />

        {/* Bottom: copyright + WhatsApp */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{
            fontFamily: 'var(--font-montserrat)', fontSize: '8px', letterSpacing: '.16em',
            textTransform: 'uppercase', color: 'rgba(244,232,212,.25)',
          }}>
            © 2025 Swavani · House of Silk &amp; Heritage · All Rights Reserved
          </div>
          <a
            href="https://wa.me/919999999999"
            data-cursor="open"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-montserrat)', fontSize: '9px', letterSpacing: '.18em',
              textTransform: 'uppercase', color: 'rgba(217,178,109,.6)', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <span style={{ fontSize: '14px' }}>✆</span> WhatsApp Enquiry
          </a>
        </div>
      </div>
    </footer>
  );
}
