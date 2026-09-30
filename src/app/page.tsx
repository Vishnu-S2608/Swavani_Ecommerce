'use client';

import { SequenceCanvas } from '@/components/SequenceCanvas';
import { CuratedShowcase } from '@/components/CuratedShowcase';
import { EditorialStory } from '@/components/EditorialStory';
import { BespokeConsultation } from '@/components/BespokeConsultation';
import { InstagramSection } from '@/components/InstagramSection';
import { BrandShowcase } from '@/components/BrandShowcase';

export default function LandingPage() {
  return (
    <main className="bg-[#20030C] min-h-screen text-[#F4E8D4] selection:bg-[#D9B26D]/30 selection:text-[#F4E8D4]">
      {/* ── Scrollytelling Hero Sequence ── */}
      <SequenceCanvas />

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
