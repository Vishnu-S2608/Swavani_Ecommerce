"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { clsx } from "clsx";
import { getCloudflareImageUrl } from "@/lib/cloudflare";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered,    setHovered]    = useState(false);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const mainImage = getCloudflareImageUrl(product.image, { width: 600, quality: 85 });
  const hoverImage = getCloudflareImageUrl(product.hoverImage || product.image, { width: 600, quality: 85 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative bg-[#FBF9F6] overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Image container */}
        <div className="relative aspect-[2/3] overflow-hidden bg-ivory-200">
          {/* Main image */}
          <motion.div
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
          {/* Hover image */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={hoverImage}
              alt={`${product.name} alternate`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNew && (
              <span className="bg-crimson-600 text-ivory-100 text-[10px] font-outfit font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-gold-400 text-crimson-800 text-[10px] font-outfit font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                Bestseller
              </span>
            )}
            {discount > 0 && (
              <span className="bg-crimson-800 text-ivory-100 text-[10px] font-outfit font-bold px-2.5 py-1 rounded-full tracking-wider">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishlisted(!wishlisted);
            }}
            className="absolute top-3 right-3 p-2 bg-[#FBF9F6]/80 backdrop-blur-sm shadow-sm transition-all text-[#3E040E] hover:scale-110 active:scale-95 z-10"
            aria-label="Add to Wishlist"
          >
            <Heart
              size={16}
              className={clsx(
                "transition-colors duration-300",
                wishlisted ? "fill-[#3E040E] text-[#3E040E]" : "text-[#3E040E]"
              )}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5 flex flex-col flex-1">
          <p className="text-[10px] font-montserrat text-[#96742A] font-bold uppercase tracking-[0.2em] mb-1.5">{product.fabric}</p>
          <h3 className="font-cinzel text-base font-semibold text-[#3E040E] group-hover:text-[#96742A] transition-colors leading-tight mb-1.5 uppercase tracking-wide">
            {product.name}
          </h3>
          <p className="text-xs text-[#382E2E]/70 font-montserrat mb-3 line-clamp-1">{product.subtitle}</p>

          <div className="mt-auto">
            {/* Price */}
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-cormorant text-xl font-bold text-[#3E040E]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <span className="text-sm text-[#382E2E]/40 line-through font-montserrat">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
