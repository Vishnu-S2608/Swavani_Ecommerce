'use client';

import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { CurtainHeroBanner } from '@/components/CurtainHeroBanner';
import { CuratedShowcase } from '@/components/CuratedShowcase';
import { EditorialStory } from '@/components/EditorialStory';
import { BestsellerGridMahira } from '@/components/BestsellerGridMahira';
import { BespokeConsultation } from '@/components/BespokeConsultation';
import { InstagramSection } from '@/components/InstagramSection';
import { Footer } from '@/components/Footer';

/* Custom inertia cursor (desktop only) */
const CustomCursor = dynamic(
  () => import('@/components/cinematic/CustomCursor').then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      {/* ── 3D Custom Cursor ── */}
      <CustomCursor />

      {/* ── Fixed Navigation Bar ── */}
      <Navbar />

      <main className="bg-[#0A0604] min-h-screen text-[#F4E8D4] selection:bg-[#D9B26D]/30 selection:text-[#F4E8D4]">
        {/* ── 1. Hero: 3D Curtains Opening Video -> Reveals Hero Banner with 3D Cursor Moving Tilt ── */}
        <CurtainHeroBanner />

        {/* ── 2. Curated Authentic Saree Showcase ── */}
        <CuratedShowcase />

        {/* ── 3. Craftsmanship & Heritage Loom Story ── */}
        <EditorialStory />

        {/* ── 4. Royal Bestseller Grid ── */}
        <BestsellerGridMahira />

        {/* ── 5. Bespoke Video Consultation ── */}
        <BespokeConsultation />

        {/* ── 6. Instagram & Living Archive ── */}
        <InstagramSection />

        {/* ── 7. Luxury Footer ── */}
        <Footer />
      </main>
    </>
  );
}
