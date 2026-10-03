'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroBanner() {
  return (
    <section className="relative w-full h-screen flex items-end justify-center overflow-hidden bg-[#20030C] pb-24 md:pb-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-banner.jpg"
          alt="Swavani Hero Banner"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Button Overlay */}
      <div className="relative z-10 flex flex-col items-center px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/collections" className="inline-block bg-gradient-to-r from-[#B8925A] via-[#F1D9A0] to-[#B8925A] text-[#1A050A] px-12 py-4 rounded-full font-montserrat text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300 shadow-[0_4px_20px_rgba(217,178,109,0.4)]">
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
