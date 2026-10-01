"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShieldCheck, Loader2, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { total, items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-redirect if cart empty
  useEffect(() => {
    if (items.length === 0 && !success) {
      router.push("/cart");
    }
  }, [items, success, router]);

  const finalTotal = total + (total >= 2999 ? 0 : 150);

  const handlePayment = () => {
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-[#2A3B24]/10 text-[#2A3B24] rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="font-cinzel text-4xl font-bold text-[#3E040E] mb-4 uppercase tracking-widest">Payment Successful!</h1>
        <p className="font-montserrat text-[#382E2E]/60 mb-8 max-w-md">
          Thank you for your order. Your exquisite Swavani sarees will be prepared and shipped shortly.
        </p>
        <Link href="/">
          <button className="px-8 py-3 bg-[#3E040E] text-[#FBF9F6] font-montserrat font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-black transition-colors">
            Return Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6] flex items-center justify-center py-20 px-4 sm:px-6 font-montserrat pt-32">
      <div className="max-w-3xl w-full">
        <Link href="/cart" className="inline-flex items-center gap-2 text-[#382E2E]/60 hover:text-[#96742A] mb-6 transition-colors text-sm font-semibold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#96742A]/20">
          {/* Header */}
          <div className="bg-[#3E040E] p-6 sm:p-8 text-[#FBF9F6] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <ShieldCheck size={120} />
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-semibold mb-2 uppercase tracking-widest">Secure Checkout</h2>
            <p className="text-[#FBF9F6]/70 text-xs tracking-wider">Powered by DemoPay SecureGateway™</p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-end mb-8 pb-6 border-b border-[#96742A]/10">
              <div>
                <p className="text-[#382E2E]/50 text-xs font-bold uppercase tracking-widest mb-1">Amount to pay</p>
                <p className="font-cinzel text-3xl sm:text-4xl font-bold text-[#3E040E]">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#382E2E]/50 text-xs font-bold uppercase tracking-widest">{items.length} items</p>
              </div>
            </div>

            {/* Payment form mock */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#3E040E] mb-2">Card Details</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#96742A]/80" size={20} />
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value="4242 4242 4242 4242"
                    readOnly
                    className="w-full pl-12 pr-4 py-3 sm:py-4 border border-[#96742A]/30 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-semibold text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#3E040E] mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value="12/26"
                    readOnly
                    className="w-full px-4 py-3 sm:py-4 border border-[#96742A]/30 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-semibold text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#3E040E] mb-2">CVV</label>
                  <input
                    type="text"
                    value="***"
                    readOnly
                    className="w-full px-4 py-3 sm:py-4 border border-[#96742A]/30 rounded-xl bg-[#FBF9F6] text-[#3E040E] font-semibold text-sm focus:outline-none text-center"
                  />
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-4 bg-[#3E040E] text-[#FBF9F6] font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${finalTotal.toLocaleString("en-IN")}`
                  )}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 text-[#382E2E]/40 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={14} />
                <span>256-bit SSL encrypted & secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
