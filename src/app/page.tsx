'use client';

import { useState, useSyncExternalStore } from 'react';
import { MahiraHeroBanner } from '@/components/MahiraHeroBanner';
import { CuratedShowcase } from '@/components/CuratedShowcase';
import { EditorialStory } from '@/components/EditorialStory';
import { BespokeConsultation } from '@/components/BespokeConsultation';
import { InstagramSection } from '@/components/InstagramSection';
import { BrandShowcase } from '@/components/BrandShowcase';
import { CurtainOpeningV2 } from '@/components/CurtainOpeningV2';

function subscribe() {
  return () => {};
}

function getCurtainSnapshot() {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem("swavani_curtain_shown");
}

export default function LandingPage() {
  const shouldShowInitial = useSyncExternalStore(subscribe, getCurtainSnapshot, () => false);
  const [curtainDismissed, setCurtainDismissed] = useState(false);

  const showCurtain = shouldShowInitial && !curtainDismissed;

  const handleCurtainComplete = () => {
    setCurtainDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("swavani_curtain_shown", "true");
    }
  };

  return (
    <main className="bg-[#111a14] min-h-screen text-[#F4E8D4] selection:bg-[#D9B26D]/30 selection:text-[#F4E8D4]">
      {showCurtain && <CurtainOpeningV2 onComplete={handleCurtainComplete} />}

      {/* ── Mahira-pattern cinematic hero (integrated navbar + hero) ── */}
      <MahiraHeroBanner />

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
