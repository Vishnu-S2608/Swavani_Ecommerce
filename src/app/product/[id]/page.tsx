"use client";
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart, Share2, ChevronDown, Truck, RotateCcw, Shield } from "lucide-react";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // All hooks must run unconditionally before any early return
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const images = [product.image, product.hoverImage];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const accordions = [
    { id: "description",  label: "Description",       content: product.description },
    { id: "care",         label: "Care Instructions", content: "Dry clean only. Store in a muslin cloth. Avoid direct sunlight. Use a cool iron on reverse side." },
    { id: "shipping",     label: "Shipping & Returns", content: "Free shipping on orders above ₹2,999. Delivery within 3–5 business days. Easy 15-day return policy for unworn items." },
    { id: "artisan",      label: "Artisan Note",       content: "This saree is handwoven by master weavers using centuries-old techniques. Minor variations in pattern are a mark of authentic handloom craftsmanship." },
  ];

  return (
    <div className="min-h-screen bg-ivory-100 pb-20">
      {/* Breadcrumb */}
      <div className="bg-ivory-200 py-3 border-b border-gold-400/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-xs font-outfit text-crimson-700/50">
          <Link href="/" className="hover:text-crimson-700">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-crimson-700">Collections</Link>
          <span>/</span>
          <span className="text-crimson-700">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-gold-400 shadow-gold" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover object-top" sizes="64px" />
                </motion.button>
              ))}
            </div>

            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card-3d bg-ivory-200"
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Badge */}
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-crimson-600 text-ivory-100 text-xs font-outfit font-bold px-3 py-1.5 rounded-full">
                  -{discount}% OFF
                </div>
              )}
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 self-start">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[11px] font-outfit bg-gold-400/10 text-gold-600 px-3 py-1 rounded-full uppercase tracking-wider border border-gold-400/20">
                  {product.fabric}
                </span>
                <span className="text-[11px] font-outfit bg-crimson-700/10 text-crimson-700 px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.occasion}
                </span>
                {product.isNew && (
                  <span className="text-[11px] font-outfit bg-crimson-600 text-ivory-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    New
                  </span>
                )}
              </div>

              <h1 className="font-cormorant text-3xl md:text-4xl font-bold text-crimson-800 leading-tight mb-1">
                {product.name}
              </h1>
              <p className="font-outfit text-sm text-crimson-700/60 mb-4">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-gold-400 text-gold-400" : "text-ivory-400"} />
                  ))}
                </div>
                <span className="text-sm text-crimson-700/60 font-outfit">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-cormorant text-4xl font-bold text-crimson-700">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-lg text-crimson-700/40 line-through font-outfit">
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-green-600 font-outfit font-medium">
                      Save ₹{(product.mrp - product.price).toLocaleString("en-IN")}
                    </span>
                  </>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-outfit text-sm text-crimson-700/70">Quantity:</span>
                <div className="flex items-center gap-3 border border-crimson-700/20 rounded-full px-4 py-2">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="text-crimson-700 font-bold hover:text-crimson-500 w-4 text-center"
                  >−</button>
                  <span className="font-outfit text-sm font-semibold text-crimson-700 w-6 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="text-crimson-700 font-bold hover:text-crimson-500 w-4 text-center"
                  >+</button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-crimson-700 text-ivory-100 font-outfit font-semibold text-sm rounded-full hover:bg-crimson-600 transition-all btn-gold-shimmer"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-3.5 bg-gold-gradient text-crimson-800 font-outfit font-bold text-sm rounded-full hover:shadow-gold transition-all btn-gold-shimmer"
                >
                  Buy Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`p-3.5 rounded-full border transition-all ${
                    wishlisted
                      ? "bg-crimson-600 border-crimson-600 text-ivory-100"
                      : "border-crimson-700/20 text-crimson-700 hover:border-crimson-600"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} className={wishlisted ? "fill-current" : ""} />
                </motion.button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Truck,      label: "Free Shipping", sub: "Above ₹2,999" },
                  { icon: RotateCcw,  label: "Easy Returns",  sub: "15-Day Policy" },
                  { icon: Shield,     label: "Secure Pay",    sub: "100% Safe" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center text-center p-3 bg-ivory-200 rounded-xl border border-gold-400/10">
                    <Icon size={18} className="text-gold-500 mb-1" />
                    <p className="text-[11px] font-outfit font-semibold text-crimson-700">{label}</p>
                    <p className="text-[10px] text-crimson-700/50 font-outfit">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Accordions */}
              <div className="space-y-2">
                {accordions.map((acc) => (
                  <div key={acc.id} className="border border-crimson-700/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-ivory-200 transition-colors"
                    >
                      <span className="font-outfit font-medium text-sm text-crimson-800">{acc.label}</span>
                      <ChevronDown
                        size={16}
                        className={`text-crimson-700/60 transition-transform ${openAccordion === acc.id ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openAccordion === acc.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-sm font-outfit text-crimson-700/70 leading-relaxed"
                      >
                        {acc.content}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-cormorant text-3xl font-bold text-crimson-800 text-center mb-8">You May Also Love</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
