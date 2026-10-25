import Link from "next/link";
import { Sparkles, Sun, Droplets, Wind } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saree Care Instructions — House of Swavani",
  description: "Preserve the luster, zari brilliance, and longevity of your authentic handwoven silk sarees.",
};

export default function CareInstructionsPage() {
  const tips = [
    {
      icon: Droplets,
      title: "Dry Clean Exclusively",
      desc: "Pure mulberry silk, soft silk, and tested gold zari should always be dry cleaned by a specialist silk cleaner. Never machine wash or soak handloom sarees at home.",
    },
    {
      icon: Wind,
      title: "Breathable Muslin Storage",
      desc: "Wrap your saree in a pure unbleached cotton or muslin cloth. This prevents moisture buildup, protects zari embroidery from tarnishing, and allows natural silk fibers to breathe.",
    },
    {
      icon: Sun,
      title: "Avoid Direct Sunlight",
      desc: "Never air or dry silk in direct afternoon sun, which can fade plant-based and rich mineral dyes. Air dry your saree in a well-ventilated, shaded indoor space.",
    },
    {
      icon: Sparkles,
      title: "Periodical Refolding",
      desc: "Every 4–6 months, unfold the saree, air it for a few hours, and refold along different lines. This prevents permanent creases from stressing fine zari threads.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-28 pb-20 text-[#382E2E]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#382E2E]/50 mb-6">
          <Link href="/" className="hover:text-[#96742A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Policies</span>
          <span>/</span>
          <span className="text-[#3E040E] font-bold">Care Instructions</span>
        </div>

        <div className="bg-white border border-[#96742A]/20 p-8 sm:p-12 shadow-sm rounded-lg">
          <div className="inline-block px-3 py-1 bg-[#96742A]/10 border border-[#96742A]/20 rounded-full text-[#96742A] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Heirloom Preservation Guide
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl text-[#3E040E] font-semibold mb-4 uppercase tracking-wide">
            Caring for Your Handloom Silk
          </h1>
          <p className="text-xs text-[#382E2E]/60 uppercase tracking-widest mb-8">
            How to cherish and maintain your heirloom silk across generations
          </p>

          <div className="h-px bg-gradient-to-r from-[#96742A]/30 via-[#96742A]/10 to-transparent mb-8" />

          {/* Grid of Care Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {tips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.title} className="p-6 bg-[#FBF9F6] border border-[#96742A]/15 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#96742A]/10 flex items-center justify-center text-[#96742A] mb-4">
                    <Icon size={20} />
                  </div>
                  <h2 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#3E040E] mb-2">
                    {tip.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#382E2E]/75 leading-relaxed font-montserrat">
                    {tip.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Additional Guidance */}
          <div className="space-y-6 font-montserrat text-xs sm:text-sm leading-relaxed text-[#382E2E]/80 border-t border-[#96742A]/15 pt-8">
            <h3 className="font-cinzel text-base font-semibold text-[#3E040E] uppercase tracking-wider">
              Ironing &amp; Scent Etiquette
            </h3>
            <p>
              When pressing silk, always iron on the reverse side using medium-low heat or with a soft cotton pressing cloth between the iron and the fabric. Never use steam directly over zari work.
            </p>
            <p>
              Avoid spraying perfumes, deodorants, or hairsprays directly onto silk or zari. Apply your fragrance prior to draping and allow it to dry completely.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-[#96742A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#382E2E]/60">Have a specific fabric or zari preservation question?</span>
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-widest text-[#96742A] hover:text-[#3E040E] transition-colors"
            >
              Ask Our Weaving Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
