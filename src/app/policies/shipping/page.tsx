import Link from "next/link";
import { Truck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy — House of Swavani",
  description: "Learn about House of Swavani express pan-India insured delivery, packaging, and dispatch timelines.",
};

export default function ShippingPolicyPage() {
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
          <span className="text-[#3E040E] font-bold">Shipping Policy</span>
        </div>

        <div className="bg-white border border-[#96742A]/20 p-8 sm:p-12 shadow-sm rounded-lg">
          <div className="inline-block px-3 py-1 bg-[#96742A]/10 border border-[#96742A]/20 rounded-full text-[#96742A] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            House of Swavani Logistics
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl text-[#3E040E] font-semibold mb-4 uppercase tracking-wide">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs text-[#382E2E]/60 uppercase tracking-widest mb-8">
            Last Updated: October 2026 · Compliant with E-Commerce Standards
          </p>

          <div className="h-px bg-gradient-to-r from-[#96742A]/30 via-[#96742A]/10 to-transparent mb-8" />

          {/* Quick Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="p-4 bg-[#FBF9F6] border border-[#96742A]/15 rounded flex items-start gap-3">
              <Truck className="text-[#96742A] shrink-0 mt-1" size={20} />
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#3E040E] mb-1">
                  Complimentary Pan-India Shipping
                </h2>
                <p className="text-xs text-[#382E2E]/70">
                  Zero delivery fees on all authentic handloom silk saree orders across India.
                </p>
              </div>
            </div>
            <div className="p-4 bg-[#FBF9F6] border border-[#96742A]/15 rounded flex items-start gap-3">
              <ShieldCheck className="text-[#96742A] shrink-0 mt-1" size={20} />
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#3E040E] mb-1">
                  100% Insured Transit
                </h2>
                <p className="text-xs text-[#382E2E]/70">
                  Tamper-evident, weather-sealed luxury packaging with full transit insurance.
                </p>
              </div>
            </div>
          </div>

          {/* Body Sections */}
          <div className="space-y-8 font-montserrat text-xs sm:text-sm leading-relaxed text-[#382E2E]/80">
            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                1. Dispatch &amp; Processing Timelines
              </h3>
              <p>
                Every handwoven saree undergoes rigorous artisan quality inspection and protective muslin packing prior to dispatch. Ready-to-ship sarees are dispatched within <strong>24 to 48 business hours</strong> from our boutique in Thoothukudi, Tamil Nadu. Orders confirmed on Sundays or national holidays are dispatched on the next working business day.
              </p>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                2. Estimated Delivery Time
              </h3>
              <p className="mb-3">
                Transit times depend on your destination via our courier partners (Bluedart, Delhivery, DTDC):
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#382E2E]/70">
                <li><strong>Metro Cities (Chennai, Bengaluru, Mumbai, Delhi, Hyderabad):</strong> 2–4 business days.</li>
                <li><strong>Tier II &amp; Tier III Cities:</strong> 3–6 business days.</li>
                <li><strong>North-East &amp; Remote Locations:</strong> 5–7 business days.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                3. Tracking Your Consignment
              </h3>
              <p>
                Once handed over to the courier partner, an automated tracking ID and live tracking link will be shared with you via WhatsApp and SMS. Our concierge team proactively monitors the consignment until safely delivered to your doorstep.
              </p>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                4. Inspection upon Delivery
              </h3>
              <p>
                We advise customers to verify that the external tamper-proof seal is undamaged upon receiving the parcel. In the unlikely event of visible transit tampering or severe damage to the outer packaging, please take a photograph and notify our WhatsApp Concierge immediately.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-[#96742A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#382E2E]/60">Have questions about an ongoing shipment?</span>
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-widest text-[#96742A] hover:text-[#3E040E] transition-colors"
            >
              Contact Shipping Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
