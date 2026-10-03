'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export function ScrollytellingNavbar() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return <ScrollytellingNavbarContent />;
}

function ScrollytellingNavbarContent() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      // Auto-hide navbar when scrolling down, show when scrolling up
      setVisible(y < lastY || y < 120);
      setLastY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingTop: scrolled ? '12px' : '24px', transition: 'padding-top 0.4s ease' }}
        >
          <motion.nav
            className="pointer-events-auto relative border rounded-full px-3 py-1 flex items-center justify-between max-w-3xl w-full gap-4"
            animate={{
              borderColor: scrolled ? 'rgba(217,178,109,0.5)' : 'rgba(217,178,109,0.25)',
              boxShadow: scrolled
                ? '0 12px 48px -8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)'
                : '0 10px 40px -10px rgba(0,0,0,0.5)',
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Background layer — transitions from image to glassy */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full pointer-events-none overflow-hidden"
              animate={{ opacity: scrolled ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundImage: "url('/download (5).jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Glass blur layer that appears on scroll */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full pointer-events-none backdrop-blur-xl backdrop-saturate-150"
              animate={{ opacity: scrolled ? 1 : 0, backgroundColor: scrolled ? 'rgba(26,5,10,0.75)' : 'transparent' }}
              transition={{ duration: 0.5 }}
            />

            {/* Left: Logo */}
            <Link href="/" className="flex items-center group pl-2">
              <motion.img
                src="/swavani-logo-transparent.png"
                alt="House of Swavani Logo"
                className="h-10 md:h-12 lg:h-14 w-auto object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] relative z-10"
                whileHover={{ scale: 1.07 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              />
            </Link>

            {/* Center: Links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 font-montserrat text-[11px] md:text-xs tracking-widest text-[#F4E8D4] font-semibold mx-auto uppercase relative z-10">
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/collections' },
                { label: 'Our Story', href: '/about' },
                { label: 'Visit Us', href: '/contact' },
              ].map((link) => (
                <motion.div key={link.href} className="relative group">
                  <Link href={link.href} className="hover:text-[#D9B26D] transition-colors drop-shadow-md">
                    {link.label}
                  </Link>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: '#D9B26D', scaleX: 0, transformOrigin: 'center' }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 relative z-10 pr-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/cart" className="relative p-2 text-[#F4E8D4] hover:text-[#D9B26D] transition-colors drop-shadow-md block">
                  <ShoppingBag size={18} />
                  <AnimatePresence>
                    {count > 0 && (
                      <motion.span
                        key={count}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                        className="absolute top-1 right-0 flex items-center justify-center text-[9px] font-bold w-4 h-4 rounded-full bg-[#D9B26D] text-[#3A0615]"
                      >
                        {count}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/collections"
                  className="bg-[#F4E8D4] text-[#3A0615] hover:bg-[#D9B26D] transition-colors rounded-full px-5 py-2 font-montserrat text-[11px] md:text-xs font-semibold tracking-widest shadow-md uppercase"
                >
                  Explore
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
