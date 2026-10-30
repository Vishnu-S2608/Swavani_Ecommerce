"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const mainImage = product.image || "/products/1/DSC03770.jpg";
  const hoverImage = product.hoverImage || mainImage;

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
        <div className="relative aspect-[2/3] overflow-hidden bg-[#F4E8D4]/20">
          {/* Main image */}
          <div className="absolute inset-0">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className={`object-cover object-top transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          {/* Hover image - loaded on interaction */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
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
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-5 flex flex-col flex-1">
          <p className="text-[9px] sm:text-[10px] font-montserrat text-[#96742A] font-bold uppercase tracking-[0.2em] mb-1">{product.fabric}</p>
          <h3 className="font-cinzel text-[13px] sm:text-base font-semibold text-[#3E040E] group-hover:text-[#96742A] transition-colors leading-tight mb-1 uppercase tracking-wide line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-[#382E2E]/70 font-montserrat mb-2 line-clamp-1">{product.subtitle}</p>

          <div className="mt-auto">
            {/* Price */}
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
              <span className="font-cormorant text-lg sm:text-xl font-bold text-[#3E040E]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-[#382E2E]/40 line-through font-montserrat">
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
