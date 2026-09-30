"use client";
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, Truck, RotateCcw, Shield, Minus, Plus } from "lucide-react";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const images = [product.image, product.hoverImage, product.image, product.hoverImage]; // Duplicating for demo to show 4 thumbnails
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F4E8D4] pt-36 pb-20 font-montserrat">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#382E2E]/60">
          <Link href="/" className="hover:text-[#3E040E] transition-colors">Home</Link>
          <span>&gt;</span>
          <Link href="/collections" className="hover:text-[#3E040E] transition-colors">Sarees</Link>
          <span>&gt;</span>
          <span className="text-[#3E040E]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
          {/* Images Section */}
          <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 aspect-[3/4] flex-shrink-0 transition-all ${
                    selectedImage === i ? "opacity-100 ring-1 ring-[#3E040E] ring-offset-2 ring-offset-[#F4E8D4]" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover object-top" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 relative aspect-[3/4] bg-[#EBDCC5]"
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* Product Info Section */}
          <div className="lg:sticky lg:top-32 self-start py-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              {product.isNew && (
                <span className="inline-block bg-[#3E040E] text-[#FBF9F6] text-[10px] font-bold px-3 py-1 mb-4 uppercase tracking-[0.2em]">
                  Nouveau
                </span>
              )}

              <h1 className="font-cinzel text-3xl md:text-4xl font-semibold text-[#3E040E] leading-tight mb-4 uppercase tracking-wide">
                {product.name}
              </h1>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 opacity-60">
                <div className="h-[1px] w-12 bg-[#96742A]"></div>
                <div className="text-[#96742A]">✨</div>
                <div className="h-[1px] w-12 bg-[#96742A]"></div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="font-montserrat text-2xl font-bold text-[#3E040E]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <p className="text-[11px] font-medium text-[#382E2E]/60 mt-1">
                  Taxes incluses. Livraison calculée à l'étape de paiement.
                </p>
              </div>

              <p className="font-cormorant text-lg text-[#382E2E] leading-relaxed mb-8">
                {product.description} Une pièce d'exception qui incarne la tradition indienne et l'élégance intemporelle.
              </p>

              {/* Bullet points */}
              <div className="space-y-3 mb-10 border-b border-[#96742A]/20 pb-10">
                {[
                  { label: "Matière", value: `100% ${product.fabric}` },
                  { label: "Couleur", value: product.color || "Bordeaux & Or" },
                  { label: "Longueur", value: "5.5 mètres (avec blouse assortie)" },
                  { label: "Entretien", value: "Nettoyage à sec uniquement" },
                  { label: "Origine", value: "Tissé à la main en Inde" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-cormorant text-[#382E2E]">
                    <span className="text-[#96742A] text-[10px]">❖</span>
                    <span className="font-medium text-[#382E2E]/70">{item.label} :</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Color Swatches */}
              <div className="mb-8">
                <p className="text-[10px] font-bold text-[#3E040E] uppercase tracking-widest mb-3">Couleur</p>
                <div className="flex gap-3">
                  <button className="w-8 h-8 rounded-full bg-[#5C1B1B] border-2 border-[#F4E8D4] ring-1 ring-[#3E040E] flex items-center justify-center">
                    <span className="text-[#F4E8D4] text-xs">✓</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-[#2A3B24] border-2 border-[#F4E8D4] ring-1 ring-transparent hover:ring-[#3E040E]/50"></button>
                </div>
              </div>

              {/* Quantity & Stock */}
              <div className="mb-8">
                <p className="text-[10px] font-bold text-[#3E040E] uppercase tracking-widest mb-3">Quantité</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-[#3E040E]/20 bg-transparent h-12 w-32">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex-1 flex justify-center text-[#3E040E]/60 hover:text-[#3E040E]"><Minus size={14} /></button>
                    <span className="font-montserrat text-sm font-semibold text-[#3E040E]">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="flex-1 flex justify-center text-[#3E040E]/60 hover:text-[#3E040E]"><Plus size={14} /></button>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#2A3B24]">
                    <span className="w-2 h-2 rounded-full bg-[#2A3B24]"></span>
                    En stock
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => addToCart(product)}
                  className="w-full py-4 bg-[#3E040E] text-[#FBF9F6] font-montserrat font-bold text-xs tracking-[0.2em] uppercase transition-colors hover:bg-black"
                >
                  Ajouter au Panier
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-transparent border border-[#3E040E] text-[#3E040E] font-montserrat font-bold text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[#3E040E]/5"
                >
                  Acheter Maintenant
                </motion.button>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="flex items-center gap-2 text-[10px] font-bold text-[#3E040E] uppercase tracking-widest hover:text-[#96742A] transition-colors mb-12"
              >
                <Heart size={14} className={wishlisted ? "fill-[#3E040E]" : ""} />
                Ajouter à ma liste d'envies
              </button>

              {/* Trust badges */}
              <div className="flex justify-between items-start border-t border-[#96742A]/20 pt-8">
                {[
                  { icon: Truck,      title: "LIVRAISON RAPIDE", desc: "Offerte dès 80€ d'achat" },
                  { icon: Shield,     title: "PAIEMENT SÉCURISÉ", desc: "CB, PayPal, Apple Pay" },
                  { icon: RotateCcw,  title: "RETOURS FACILES",   desc: "Sous 14 jours" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex flex-col gap-2 max-w-[120px]">
                    <div className="flex items-center gap-2 text-[#96742A]">
                      <Icon size={16} />
                      <span className="text-[9px] font-bold text-[#382E2E] tracking-wider">{title}</span>
                    </div>
                    <p className="text-[10px] text-[#382E2E]/60 pl-6 leading-tight">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-32 pt-16 border-t border-[#96742A]/20">
            <h2 className="font-cinzel text-3xl font-semibold text-[#3E040E] text-center mb-12 uppercase tracking-widest">You May Also Love</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
