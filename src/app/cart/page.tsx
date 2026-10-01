"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, X, Plus, Minus, ArrowLeft, Tag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQty, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] flex flex-col items-center justify-center gap-6 py-20 text-[#382E2E]">
        <ShoppingBag size={64} className="text-[#96742A]/40" />
        <h2 className="font-cinzel text-3xl text-[#3E040E] font-semibold tracking-wide">Your cart is empty</h2>
        <p className="font-montserrat text-sm text-[#382E2E]/60">Discover our beautiful collection of sarees</p>
        <Link href="/collections">
          <motion.span
            whileHover={{ scale: 1.03 }}
            className="inline-flex px-8 py-3 bg-[#3E040E] text-[#FBF9F6] font-montserrat font-bold text-xs tracking-[0.2em] uppercase rounded-full mt-4"
          >
            Shop Now
          </motion.span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6] py-32 font-montserrat text-[#382E2E]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-[#96742A]/20 pb-6">
          <Link href="/collections" className="text-[#382E2E]/50 hover:text-[#96742A] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-cinzel text-3xl lg:text-4xl font-semibold text-[#3E040E] uppercase tracking-widest">Shopping Cart</h1>
          <span className="font-montserrat text-sm text-[#382E2E]/50 font-medium">({items.length} items)</span>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
          {/* Cart Items */}
          <div className="space-y-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.08 }}
                layout
                className="bg-white rounded-2xl p-4 lg:p-6 flex flex-col sm:flex-row gap-6 shadow-sm border border-[#96742A]/10 relative group"
              >
                {/* Image */}
                <div className="relative w-full sm:w-28 aspect-[3/4] sm:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-[#EBDCC5]">
                  <Image src={item.image} alt={item.name} fill className="object-cover object-top" sizes="112px" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-[#96742A] font-bold uppercase tracking-[0.2em] mb-1.5">{item.fabric}</p>
                      <Link href={`/product/${item.id}`} className="hover:text-[#96742A] transition-colors">
                        <h3 className="font-cinzel text-xl font-semibold text-[#3E040E] leading-tight mb-1">{item.name}</h3>
                      </Link>
                      <p className="text-xs text-[#382E2E]/60 italic font-cormorant">{item.subtitle}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#382E2E]/30 hover:text-[#3E040E] transition-colors p-2 bg-[#FBF9F6] rounded-full sm:opacity-0 sm:group-hover:opacity-100 flex-shrink-0"
                      aria-label="Remove"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
                    {/* Qty */}
                    <div className="flex items-center gap-1 border border-[#96742A]/20 rounded-full h-10 w-28 bg-[#FBF9F6]">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="flex-1 flex justify-center text-[#3E040E]/60 hover:text-[#3E040E]"
                        aria-label="Decrease qty"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[#3E040E]">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="flex-1 flex justify-center text-[#3E040E]/60 hover:text-[#3E040E]"
                        aria-label="Increase qty"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    {/* Price */}
                    <span className="font-montserrat text-lg font-semibold text-[#3E040E]">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="pt-4 flex justify-end">
              <button
                onClick={clearCart}
                className="text-xs font-bold text-[#382E2E]/40 hover:text-[#3E040E] uppercase tracking-widest transition-colors underline underline-offset-4"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full">
            <div className="bg-white rounded-3xl p-8 shadow-md border border-[#96742A]/20 sticky top-32">
              <h2 className="font-cinzel text-2xl font-semibold text-[#3E040E] mb-8 uppercase tracking-widest border-b border-[#96742A]/10 pb-4">Order Summary</h2>

              <div className="space-y-4 mb-8 text-sm font-medium">
                <div className="flex justify-between text-[#382E2E]/70">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="text-[#3E040E]">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#382E2E]/70">
                  <span>Shipping</span>
                  <span className={total >= 2999 ? "text-[#2A3B24] font-bold uppercase tracking-widest text-[10px]" : "text-[#3E040E]"}>
                    {total >= 2999 ? "Free" : "₹150"}
                  </span>
                </div>
                {total < 2999 && (
                  <p className="text-[10px] text-[#96742A] font-bold uppercase tracking-widest mt-1">
                    Add ₹{(2999 - total).toLocaleString("en-IN")} more for free shipping!
                  </p>
                )}
                
                <div className="h-px w-full bg-gradient-to-r from-[#96742A]/30 via-[#96742A]/10 to-transparent my-4"></div>
                
                <div className="flex justify-between items-center font-bold text-[#3E040E]">
                  <span className="uppercase tracking-widest text-xs">Total</span>
                  <span className="font-montserrat text-2xl">
                    ₹{(total + (total >= 2999 ? 0 : 150)).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-8">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#96742A]" />
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="w-full pl-10 pr-4 py-3 border border-[#96742A]/30 rounded-full text-xs font-semibold text-[#3E040E] placeholder-[#382E2E]/30 focus:outline-none focus:border-[#96742A] bg-[#FBF9F6]"
                  />
                </div>
                <button className="px-6 py-3 bg-[#EBDCC5] text-[#3E040E] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#96742A] hover:text-white transition-colors">
                  Apply
                </button>
              </div>

              <Link href="/checkout" className="block w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#3E040E] text-[#FBF9F6] font-bold text-xs tracking-[0.2em] uppercase rounded-full hover:bg-black transition-colors"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>

              <div className="flex flex-col items-center mt-6 pt-6 border-t border-[#96742A]/10">
                <p className="text-center text-[9px] text-[#382E2E]/50 font-bold uppercase tracking-widest">
                  🔒 Secure checkout
                </p>
                <div className="flex gap-3 mt-3 opacity-60">
                  <span className="text-xs font-bold">UPI</span>
                  <span className="text-xs font-bold">·</span>
                  <span className="text-xs font-bold">CARDS</span>
                  <span className="text-xs font-bold">·</span>
                  <span className="text-xs font-bold">COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
