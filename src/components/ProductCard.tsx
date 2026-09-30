"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { clsx } from "clsx";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered,    setHovered]    = useState(false);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative bg-white rounded-2xl overflow-hidden hover-lift border-gold-glow"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200">
        {/* Main image */}
        <motion.div
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
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
            src={product.hoverImage}
            alt={`${product.name} alternate`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
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
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm transition-all"
          aria-label="Add to Wishlist"
        >
          <Heart
            size={16}
            className={clsx(
              "transition-colors duration-300",
              wishlisted ? "fill-crimson-500 text-crimson-500" : "text-crimson-700"
            )}
          />
        </motion.button>

        {/* Hover overlay actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-3 flex gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-crimson-700 text-ivory-100 text-xs font-outfit font-semibold rounded-xl hover:bg-crimson-600 transition-colors btn-gold-shimmer"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </motion.button>
          <Link
            href={`/product/${product.id}`}
            className="p-2.5 bg-white/90 text-crimson-700 rounded-xl hover:bg-gold-400 hover:text-crimson-800 transition-colors"
            aria-label="Quick view"
          >
            <Eye size={16} />
          </Link>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-[11px] font-outfit text-gold-500 uppercase tracking-widest mb-1">{product.fabric}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-cormorant text-lg font-semibold text-crimson-800 hover:text-crimson-600 transition-colors leading-tight mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-crimson-700/60 font-outfit mb-2">{product.subtitle}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? "fill-gold-400 text-gold-400" : "text-ivory-400"}
              />
            ))}
          </div>
          <span className="text-[11px] text-crimson-700/50 font-outfit">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-cormorant text-xl font-bold text-crimson-700">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.mrp > product.price && (
            <span className="text-sm text-crimson-700/40 line-through font-outfit">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
