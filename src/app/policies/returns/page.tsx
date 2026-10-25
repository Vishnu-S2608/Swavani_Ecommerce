import Link from "next/link";
import { RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchanges Policy — House of Swavani",
  description: "Read about House of Swavani 7-day exchange window, handloom authenticity, and replacement procedures.",
};

export default function ReturnsPolicyPage() {
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
          <span className="text-[#3E040E] font-bold">Returns &amp; Exchanges</span>
        </div>

        <div className="bg-white border border-[#96742A]/20 p-8 sm:p-12 shadow-sm rounded-lg">
          <div className="inline-block px-3 py-1 bg-[#96742A]/10 border border-[#96742A]/20 rounded-full text-[#96742A] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Artisan Commitment
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl text-[#3E040E] font-semibold mb-4 uppercase tracking-wide">
            Returns &amp; Exchanges Policy
          </h1>
          <p className="text-xs text-[#382E2E]/60 uppercase tracking-widest mb-8">
            Last Updated: October 2026 · Handcrafted Heirloom Guarantee
          </p>

          <div className="h-px bg-gradient-to-r from-[#96742A]/30 via-[#96742A]/10 to-transparent mb-8" />

          {/* Quick Notice */}
          <div className="p-4 bg-[#FBF9F6] border-l-4 border-[#96742A] rounded mb-10 text-xs sm:text-sm text-[#382E2E]/80">
            <p className="font-semibold text-[#3E040E] mb-1">
              Handloom Silk Authenticity Disclaimer
            </p>
            <p>
              Each House of Swavani saree is handwoven by master weavers. Slight slubs, unevenness in zari weft, or subtle color variances from digital screens are natural signatures of authentic handlooms, not manufacturing defects.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8 font-montserrat text-xs sm:text-sm leading-relaxed text-[#382E2E]/80">
            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#96742A]" />
                1. 7-Day Exchange Window
              </h3>
              <p>
                We offer an exchange within <strong>7 days from the date of confirmed delivery</strong> for any saree received with an unstitched blouse and with all original brand tags, Silk Mark tags, and packaging intact.
              </p>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle size={16} className="text-[#96742A]" />
                2. Eligibility for Replacement / Refund
              </h3>
              <p className="mb-2">
                A replacement or full refund is gladly provided under the following verifiable conditions:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#382E2E]/70">
                <li>You received a damaged or torn piece in transit.</li>
                <li>The saree received is entirely different from the order confirmed.</li>
                <li>Clear 360-degree unboxing video recorded from the sealed parcel state is provided.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider flex items-center gap-2">
                <RotateCcw size={16} className="text-[#96742A]" />
                3. Non-Eligible Items
              </h3>
              <p className="mb-2">
                For reasons of hygiene and bespoke craftsmanship, the following cannot be returned or exchanged:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#382E2E]/70">
                <li>Sarees with fall/pico already stitched, cut blouse pieces, or tailored alterations.</li>
                <li>Items without original tags or perfumes/stains detected.</li>
                <li>Custom dyed or made-to-order bespoke bridal sarees.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                4. How to Initiate an Exchange
              </h3>
              <p>
                Simply message our WhatsApp Concierge at <strong>+91 6381895890</strong> or email <strong>houseofswavani@gmail.com</strong> with your order details and unboxing video. Once approved, our team arranges reverse pickup or provides return shipping assistance.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-[#96742A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#382E2E]/60">Need help with an exchange request?</span>
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-widest text-[#96742A] hover:text-[#3E040E] transition-colors"
            >
              Contact Support Concierge →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
