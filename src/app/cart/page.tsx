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
      <div className="min-h-screen bg-ivory-100 flex flex-col items-center justify-center gap-6 py-20">
        <ShoppingBag size={64} className="text-crimson-700/20" />
        <h2 className="font-cormorant text-3xl text-crimson-800">Your cart is empty</h2>
        <p className="font-outfit text-sm text-crimson-700/50">Discover our beautiful collection of sarees</p>
        <Link href="/collections">
          <motion.span
            whileHover={{ scale: 1.03 }}
            className="inline-flex px-8 py-3 bg-crimson-700 text-ivory-100 font-outfit font-semibold text-sm rounded-full"
          >
            Shop Now
          </motion.span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/collections" className="text-crimson-700/50 hover:text-crimson-700 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-cormorant text-4xl font-bold text-crimson-800">Shopping Cart</h1>
          <span className="font-outfit text-sm text-crimson-700/50">({items.length} items)</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.08 }}
                layout
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-gold-400/10"
              >
                {/* Image */}
                <div className="relative w-24 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover object-top" sizes="96px" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] text-gold-500 font-outfit uppercase tracking-wider mb-0.5">{item.fabric}</p>
                      <h3 className="font-cormorant text-lg font-semibold text-crimson-800 leading-tight">{item.name}</h3>
                      <p className="text-xs text-crimson-700/50 font-outfit mt-0.5">{item.subtitle}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-crimson-700/30 hover:text-crimson-600 transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Qty */}
                    <div className="flex items-center gap-2 border border-crimson-700/20 rounded-full px-3 py-1.5">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="text-crimson-700 hover:text-crimson-500"
                        aria-label="Decrease qty"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-outfit font-semibold text-crimson-700">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-crimson-700 hover:text-crimson-500"
                        aria-label="Increase qty"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    {/* Price */}
                    <span className="font-cormorant text-xl font-bold text-crimson-700">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className="text-xs font-outfit text-crimson-700/40 hover:text-crimson-700 transition-colors underline underline-offset-2"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold-400/10 sticky top-24">
              <h2 className="font-cormorant text-2xl font-bold text-crimson-800 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 text-sm font-outfit">
                <div className="flex justify-between text-crimson-700/70">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-crimson-700/70">
                  <span>Shipping</span>
                  <span className={total >= 2999 ? "text-green-600" : "text-crimson-700"}>
                    {total >= 2999 ? "FREE" : "₹150"}
                  </span>
                </div>
                {total < 2999 && (
                  <p className="text-[11px] text-gold-500">
                    Add ₹{(2999 - total).toLocaleString("en-IN")} more for free shipping!
                  </p>
                )}
                <div className="border-t border-crimson-700/10 pt-3 flex justify-between font-bold text-crimson-800">
                  <span>Total</span>
                  <span className="font-cormorant text-xl">
                    ₹{(total + (total >= 2999 ? 0 : 150)).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-crimson-700/40" />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="w-full pl-8 pr-3 py-2.5 border border-crimson-700/20 rounded-lg text-sm font-outfit text-crimson-700 placeholder-crimson-700/30 focus:outline-none focus:border-crimson-600"
                  />
                </div>
                <button className="px-4 py-2.5 bg-ivory-200 text-crimson-700 text-sm font-outfit font-medium rounded-lg hover:bg-crimson-50 transition-colors border border-crimson-700/10">
                  Apply
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 bg-gold-gradient text-crimson-800 font-outfit font-bold text-sm rounded-full btn-gold-shimmer hover:shadow-gold transition-all"
              >
                Proceed to Checkout
              </motion.button>

              <p className="text-center text-[11px] text-crimson-700/40 font-outfit mt-4">
                🔒 Secure checkout · UPI · Cards · COD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
