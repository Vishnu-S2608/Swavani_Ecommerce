"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Truck, RotateCcw, Shield, Minus, Plus, MessageCircle } from "lucide-react";
import { products, Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(1);

  const product =
    products.find(
      (p) =>
        p.id === id ||
        p.id.toLowerCase() === id.toLowerCase() ||
        p.id.replace(/^p/i, "") === id.replace(/^p/i, "")
    ) || products[0];

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.hoverImage || product.image];

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.occasion === product.occasion))
    .slice(0, 4);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleBuyNow = () => {
    const totalAmount = product.price * qty;
    const currentUrl = typeof window !== "undefined" ? window.location.href : `https://swavanistore.com/product/${product.id}`;

    const message = `*HOUSE OF SWAVANI — ORDER ENQUIRY*
━━━━━━━━━━━━━━━━━━━━
Hello Swavani Concierge, I would like to order this authentic handloom saree:

• *Saree:* ${product.name}
• *Price:* ₹${product.price.toLocaleString("en-IN")} each
• *Quantity:* ${qty}
• *Total Amount:* ₹${totalAmount.toLocaleString("en-IN")}
• *Fabric:* ${product.fabric}
• *Origin:* ${product.details?.origin || "Tamil Nadu, India"}
• *Product Link:* ${currentUrl}

Please confirm availability and share payment/delivery details. Thank you!`;

    const whatsappUrl = `https://wa.me/916381895890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-24 lg:pt-28 pb-20 font-montserrat text-[#382E2E]">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-3">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#382E2E]/50">
          <Link href="/" className="hover:text-[#96742A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#96742A] transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-[#3E040E] font-bold line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-2">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 relative items-start">
          {/* Left: Interactive Viewport-Fitted Gallery */}
          <div className="w-full lg:w-[54%]">
            <ProductGallery
              images={galleryImages}
              productName={product.name}
            />
          </div>

          {/* Right: Product Details & Actions */}
          <div className="w-full lg:w-[46%] py-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#96742A] text-[10px] font-bold tracking-[0.3em] uppercase">
                    {product.fabric} &nbsp;·&nbsp; {product.details?.origin || "Handloom India"}
                  </span>
                  {product.isNew && (
                    <span className="text-[9px] font-bold text-[#3E040E] uppercase tracking-widest bg-[#3E040E]/10 px-2 py-0.5 rounded">
                      New Arrival
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="text-[9px] font-bold text-[#96742A] uppercase tracking-widest bg-[#96742A]/10 px-2 py-0.5 rounded">
                      Bestseller
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="p-2 transition-colors hover:text-[#96742A]"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={22}
                    className={wishlisted ? "fill-[#3E040E] text-[#3E040E]" : "text-[#382E2E]/50"}
                  />
                </button>
              </div>

              <h1 className="font-cinzel text-3xl lg:text-4xl font-semibold text-[#3E040E] leading-tight mb-2 uppercase tracking-wide">
                {product.name}
              </h1>

              <p className="text-xs text-[#96742A] font-semibold tracking-wider uppercase mb-5 font-montserrat">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-montserrat text-3xl font-semibold text-[#3E040E]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.mrp > product.price && (
                  <span className="font-montserrat text-base text-[#382E2E]/40 line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-[#96742A]/10 text-[#96742A] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Save {discount}%
                  </span>
                )}
              </div>

              <p className="text-[10px] uppercase tracking-widest font-medium text-[#382E2E]/60 mb-6">
                Inclusive of all taxes &nbsp;·&nbsp; Free insured doorstep delivery across India
              </p>

              {/* Decorative Divider */}
              <div className="h-px w-full bg-gradient-to-r from-[#96742A]/40 via-[#96742A]/10 to-transparent mb-6"></div>

              {/* Description */}
              <p className="font-cormorant text-xl text-[#382E2E]/90 leading-relaxed mb-8 italic">
                &ldquo;{product.description}&rdquo;
              </p>

              {/* Specifications Grid */}
              <div className="bg-[#EBDCC5]/30 rounded-2xl p-6 border border-[#96742A]/20 mb-8">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#3E040E] mb-4">
                  Artisan Specifications
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] block mb-1">
                      Weave
                    </span>
                    <span className="font-semibold text-[#3E040E]">{product.details?.weave || "Handloom Silk"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] block mb-1">
                      Zari Details
                    </span>
                    <span className="font-semibold text-[#3E040E]">{product.details?.zari || "Tested Gold Zari"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] block mb-1">
                      Dimensions
                    </span>
                    <span className="font-semibold text-[#3E040E]">{product.details?.length || "5.5 metres"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] block mb-1">
                      Blouse Piece
                    </span>
                    <span className="font-semibold text-[#3E040E]">{product.details?.blouse || "0.8m Included"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] block mb-1">
                      Origin Looms
                    </span>
                    <span className="font-semibold text-[#3E040E]">{product.details?.origin || "Tamil Nadu, India"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] block mb-1">
                      Certification
                    </span>
                    <span className="font-semibold text-[#3E040E]">{product.details?.certification || "Silk Mark"}</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-[10px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] mb-3">
                  Quantity
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-[#96742A]/30 bg-white h-12 w-32 rounded-full overflow-hidden shadow-sm">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="flex-1 flex justify-center items-center text-[#3E040E]/60 hover:text-[#3E040E] hover:bg-[#96742A]/10 h-full transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-montserrat text-sm font-semibold text-[#3E040E] w-8 text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="flex-1 flex justify-center items-center text-[#3E040E]/60 hover:text-[#3E040E] hover:bg-[#96742A]/10 h-full transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#2A3B24]">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A3B24] opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2A3B24]"></span>
                    </span>
                    Ready to dispatch
                  </div>
                </div>
              </div>

              {/* Buy Now via WhatsApp CTA */}
              <div className="mb-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="w-full py-4 px-8 bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] hover:from-[#144A18] hover:to-[#144A18] text-[#FBF9F6] font-montserrat font-bold text-xs tracking-[0.2em] uppercase transition-all rounded-full shadow-xl flex items-center justify-center gap-3 border border-[#81C784]/30 cursor-pointer"
                >
                  <MessageCircle size={20} className="text-[#A5D6A7]" />
                  <span>Buy Now via WhatsApp</span>
                </motion.button>
                <p className="text-[10px] text-center text-[#382E2E]/60 uppercase tracking-widest mt-2 font-medium">
                  Direct weaver connection · Verified Silk Mark · Free doorstep delivery across India
                </p>
              </div>

              {/* Trust badges */}
              <div className="border-t border-[#96742A]/20 pt-8 space-y-4">
                {[
                  {
                    icon: Truck,
                    title: "EXPRESS DISPATCH & DELIVERY",
                    desc: "Free insured doorstep shipping across India. Dispatched within 24–48 hours.",
                  },
                  {
                    icon: Shield,
                    title: "GUARANTEED PURITY",
                    desc: "Govt. of India Silk Mark certified. Pure natural silk and tested zari.",
                  },
                  {
                    icon: RotateCcw,
                    title: "7-DAY EASY RETURNS & EXCHANGE",
                    desc: "Hassle-free exchange guarantee with full doorstep pickup support.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 p-3 rounded-xl bg-white/60 border border-[#96742A]/10">
                    <Icon size={18} className="text-[#96742A] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold tracking-widest text-[#3E040E] uppercase mb-0.5">
                        {title}
                      </h4>
                      <p className="text-[11px] text-[#382E2E]/70 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Sarees */}
        {related.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#96742A]/20">
            <div className="text-center mb-12">
              <p className="font-montserrat text-xs font-semibold tracking-[0.25em] text-[#96742A] uppercase mb-2">
                Handcrafted Pairings
              </p>
              <h2 className="font-cinzel text-3xl font-semibold text-[#3E040E] uppercase tracking-wider">
                Complementary Weaves
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
