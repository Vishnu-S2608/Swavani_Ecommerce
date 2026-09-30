'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function ScrollytellingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500">
      <nav
        className="pointer-events-auto relative border border-zari/30 rounded-full px-3 py-1 flex items-center justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] max-w-3xl w-full gap-4 transition-all duration-500"
      >
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 -z-10 rounded-full pointer-events-none opacity-100"
          style={{ 
            backgroundImage: "url('/download (5).jpg')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }}
        />

        {/* Left: Logo */}
        <Link href="/" className="flex items-center group pl-2">
          <img 
            src="/swavani-logo-transparent.png" 
            alt="House of Swavani Logo" 
            className="h-10 md:h-12 lg:h-14 w-auto object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500 relative z-10" 
          />
        </Link>

        {/* Center: Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 font-montserrat text-[11px] md:text-xs tracking-widest text-[#F4E8D4] font-semibold mx-auto uppercase relative z-10">
          <Link href="/" className="hover:text-zari transition-colors drop-shadow-md">Home</Link>
          
          <Link href="/collections" className="hover:text-zari transition-colors drop-shadow-md">Shop</Link>
          
          {/* Collections Dropdown */}
          <div className="relative group cursor-pointer py-2">
            <span className="hover:text-zari transition-colors flex items-center gap-1.5 drop-shadow-md">
              Collections
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="border border-zari/30 rounded-2xl p-6 min-w-[240px] flex flex-col gap-4 shadow-xl relative overflow-hidden">
                <div 
                  className="absolute inset-0 -z-10 pointer-events-none"
                  style={{ 
                    backgroundImage: "url('/download (5).jpg')", 
                    backgroundSize: "cover", 
                    backgroundPosition: "center" 
                  }}
                />
                <div className="absolute inset-0 bg-black/20 -z-10" />
                <Link href="/collections" className="text-[#F4E8D4] hover:text-zari transition-colors flex items-center gap-2 drop-shadow-md">Ellampillai Silks</Link>
                <Link href="/collections" className="text-[#F4E8D4] hover:text-zari transition-colors flex items-center gap-2 drop-shadow-md">Kanjivaram Silks</Link>
                <Link href="/collections" className="text-[#F4E8D4] hover:text-zari transition-colors flex items-center gap-2 drop-shadow-md">Banarasi Brocade</Link>
                <Link href="/collections" className="text-[#F4E8D4] hover:text-zari transition-colors flex items-center gap-2 drop-shadow-md">Bridal Collection</Link>
              </div>
            </div>
          </div>

          <Link href="/about" className="hover:text-zari transition-colors drop-shadow-md">Our Story</Link>
          <Link href="/contact" className="hover:text-zari transition-colors drop-shadow-md">Visit Us</Link>
        </div>

        {/* Right: CTA Button */}
        <Link href="/collections" className="bg-[#F4E8D4] text-[#3A0615] hover:bg-white transition-colors rounded-full px-6 py-2 font-montserrat text-[11px] md:text-xs font-semibold tracking-widest shadow-md uppercase relative z-10">
          Explore
        </Link>
      </nav>
    </div>
  );
}
