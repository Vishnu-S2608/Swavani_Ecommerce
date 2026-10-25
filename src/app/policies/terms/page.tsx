import Link from "next/link";
import { FileText, Scale, Check, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — House of Swavani",
  description: "Terms and conditions governing the purchase and presentation of handcrafted silk sarees at House of Swavani.",
};

export default function TermsOfServicePage() {
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
          <span className="text-[#3E040E] font-bold">Terms of Service</span>
        </div>

        <div className="bg-white border border-[#96742A]/20 p-8 sm:p-12 shadow-sm rounded-lg">
          <div className="inline-block px-3 py-1 bg-[#96742A]/10 border border-[#96742A]/20 rounded-full text-[#96742A] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            House of Swavani Charter
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl text-[#3E040E] font-semibold mb-4 uppercase tracking-wide">
            Terms of Service
          </h1>
          <p className="text-xs text-[#382E2E]/60 uppercase tracking-widest mb-8">
            Last Updated: October 2026 · Governing Handloom Commerce in India
          </p>

          <div className="h-px bg-gradient-to-r from-[#96742A]/30 via-[#96742A]/10 to-transparent mb-8" />

          {/* Policy Sections */}
          <div className="space-y-8 font-montserrat text-xs sm:text-sm leading-relaxed text-[#382E2E]/80">
            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-[#96742A]" />
                1. General Provisions &amp; Acceptance
              </h3>
              <p>
                By accessing, browsing, or placing orders via the House of Swavani catalog (operated from Thoothukudi, Tamil Nadu), you agree to be bound by these Terms of Service. If you do not agree with any provision, please refrain from using this service.
              </p>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider flex items-center gap-2">
                <Shield size={16} className="text-[#96742A]" />
                2. Artisan Handloom Authenticity
              </h3>
              <p>
                All sarees showcased are authentic handwoven textiles produced by traditional Indian weavers. Each pure silk creation comes tagged with certified Silk Mark authenticity. Handcrafted textiles inherently display slight yarn tension variations, weave slubs, and hand-tasseled edges. Such attributes are testaments of manual craftsmanship and are celebrated by silk connoisseurs worldwide.
              </p>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider flex items-center gap-2">
                <Check size={16} className="text-[#96742A]" />
                3. Pricing &amp; Order Placement
              </h3>
              <p className="mb-2">
                Prices displayed are in Indian Rupees (₹ INR) and are inclusive of applicable GST. Because each handcrafted piece has limited availability:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#382E2E]/70">
                <li>Orders are confirmed on a first-come, first-served basis via our official WhatsApp Concierge.</li>
                <li>House of Swavani reserves the right to cancel or decline an order in the rare event of inventory exhaustion or pricing discrepancy.</li>
                <li>All shipments require recipient signature and verification upon delivery.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider flex items-center gap-2">
                <Scale size={16} className="text-[#96742A]" />
                4. Intellectual Property
              </h3>
              <p>
                All brand identity assets, including the House of Swavani emblem, product photography, editorial stories, and textile descriptions, are the intellectual property of House of Swavani. Unauthorized reproduction or commercial use without prior written consent is strictly prohibited.
              </p>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                5. Jurisdiction
              </h3>
              <p>
                Any dispute arising out of transactions, services, or catalog interactions shall be subject to the exclusive jurisdiction of the competent courts in Thoothukudi, Tamil Nadu, India.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-[#96742A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#382E2E]/60">Need clarification on our terms?</span>
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-widest text-[#96742A] hover:text-[#3E040E] transition-colors"
            >
              Contact Legal Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
