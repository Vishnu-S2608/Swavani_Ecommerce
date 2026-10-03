'use client';

import { useState, useEffect } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { CuratedShowcase } from '@/components/CuratedShowcase';
import { EditorialStory } from '@/components/EditorialStory';
import { BespokeConsultation } from '@/components/BespokeConsultation';
import { InstagramSection } from '@/components/InstagramSection';
import { BrandShowcase } from '@/components/BrandShowcase';
import { CurtainOpening } from '@/components/CurtainOpening';

export default function LandingPage() {
  const [showCurtain, setShowCurtain] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('swavani_curtain_shown')) {
      setShowCurtain(true);
    }
  }, []);

  const handleCurtainComplete = () => {
    sessionStorage.setItem('swavani_curtain_shown', 'true');
    setShowCurtain(false);
  };

  return (
    <main className="bg-[#20030C] min-h-screen text-[#F4E8D4] selection:bg-[#D9B26D]/30 selection:text-[#F4E8D4]">
      {showCurtain && <CurtainOpening onComplete={handleCurtainComplete} />}

      {/* ── Main Hero Image ── */}
      <HeroBanner />

      {/* ── Following Content ── */}
      <CuratedShowcase />
      <EditorialStory />
      <BespokeConsultation />
      <InstagramSection />
      
      {/* ── Final Brand Showcase before Footer ── */}
      <BrandShowcase />
    </main>
  );
}
