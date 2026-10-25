import Link from "next/link";
import { Lock, EyeOff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — House of Swavani",
  description: "House of Swavani privacy commitments under Information Technology Act 2000 and SPDI Rules.",
};

export default function PrivacyPolicyPage() {
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
          <span className="text-[#3E040E] font-bold">Privacy Policy</span>
        </div>

        <div className="bg-white border border-[#96742A]/20 p-8 sm:p-12 shadow-sm rounded-lg">
          <div className="inline-block px-3 py-1 bg-[#96742A]/10 border border-[#96742A]/20 rounded-full text-[#96742A] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            Legal &amp; Data Security
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl text-[#3E040E] font-semibold mb-4 uppercase tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#382E2E]/60 uppercase tracking-widest mb-8">
            Last Updated: October 2026 · IT Act 2000 &amp; SPDI Rules Compliant
          </p>

          <div className="h-px bg-gradient-to-r from-[#96742A]/30 via-[#96742A]/10 to-transparent mb-8" />

          {/* Quick Notice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="p-4 bg-[#FBF9F6] border border-[#96742A]/15 rounded flex items-start gap-3">
              <EyeOff className="text-[#96742A] shrink-0 mt-1" size={20} />
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#3E040E] mb-1">
                  Zero Data Selling
                </h2>
                <p className="text-xs text-[#382E2E]/70">
                  We never monetize, rent, or trade your contact info or browsing history with advertisers.
                </p>
              </div>
            </div>
            <div className="p-4 bg-[#FBF9F6] border border-[#96742A]/15 rounded flex items-start gap-3">
              <Lock className="text-[#96742A] shrink-0 mt-1" size={20} />
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#3E040E] mb-1">
                  Strictly Confidential
                </h2>
                <p className="text-xs text-[#382E2E]/70">
                  Information shared over WhatsApp Concierge is used solely to fulfill your order.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8 font-montserrat text-xs sm:text-sm leading-relaxed text-[#382E2E]/80">
            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                1. Information We Collect
              </h3>
              <p className="mb-2">
                House of Swavani collects only the minimal information required to provide you an unparalleled boutique shopping experience:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#382E2E]/70">
                <li><strong>Contact Information:</strong> Your name, delivery address, phone number, and email address shared for shipping and dispatch notifications.</li>
                <li><strong>Order History &amp; Preferences:</strong> Saree selections, color preferences, and consultation requests.</li>
                <li><strong>Technical Data:</strong> Anonymized site usage statistics and cookies to ensure seamless navigation on mobile and desktop.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                2. How We Use Your Information
              </h3>
              <p className="mb-2">
                Your data is exclusively utilized for:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#382E2E]/70">
                <li>Processing, packing, and dispatching your handloom saree orders.</li>
                <li>Sending courier tracking updates and delivery coordination via WhatsApp or SMS.</li>
                <li>Assisting with bespoke bridal consultations and customer care inquiries.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                3. Third-Party Disclosures
              </h3>
              <p>
                We do not disclose your personal data to external entities, except strictly necessary logistics providers (such as Bluedart, Delhivery, DTDC) for the sole purpose of delivering your parcel to your address.
              </p>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                4. Data Retention &amp; Your Rights
              </h3>
              <p>
                You retain complete rights to request inspection, modification, or deletion of your contact records from our concierge system at any time by messaging our support line or emailing <strong>houseofswavani@gmail.com</strong>.
              </p>
            </section>

            <section>
              <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-2 uppercase tracking-wider">
                5. Grievance Officer
              </h3>
              <p>
                In compliance with the Information Technology Act 2000 and rules made thereunder:
                <br />
                <strong>Grievance Officer:</strong> Vishnu S, House of Swavani
                <br />
                <strong>Address:</strong> 15A Shanumuga puram, Thoothukudi - 628003, Tamil Nadu, India
                <br />
                <strong>Email:</strong> houseofswavani@gmail.com
              </p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-[#96742A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#382E2E]/60">Have concerns regarding your privacy?</span>
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-widest text-[#96742A] hover:text-[#3E040E] transition-colors"
            >
              Contact Legal Grievance →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
