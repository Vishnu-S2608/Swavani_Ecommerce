"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { products as fallbackProducts, Product } from "@/lib/data";
import { getActiveProducts } from "@/lib/firestore";
import { SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = ["All", "Silk Sarees", "Handloom", "Bridal", "Casual"];
const OCCASIONS  = ["All", "Wedding", "Festival", "Bridal", "Casual"];
const SORT_OPTIONS = [
  { label: "Newest First",    value: "new" },
  { label: "Price: Low–High", value: "lth" },
  { label: "Price: High–Low", value: "htl" },
  { label: "Top Rated",       value: "rated" },
];

export default function CollectionsPage() {
  const [productList, setProductList] = useState<Product[]>(fallbackProducts);
  const [category, setCategory] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [sort,     setSort]     = useState("new");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    getActiveProducts()
      .then((docs) => {
        if (docs && docs.length > 0) {
          const mapped: Product[] = docs.map((d) => ({
            id: d.id || "",
            name: d.name,
            subtitle: d.subtitle,
            price: d.price,
            mrp: d.mrp,
            image: d.imageUrl,
            hoverImage: d.hoverImageUrl,
            category: d.category,
            fabric: d.fabric,
            occasion: d.occasion,
            colors: d.colors || [],
            isNew: Boolean(d.isNew),
            isBestseller: Boolean(d.isBestseller),
            rating: d.rating || 5,
            reviews: d.reviews || 0,
            description: d.description || "",
          }));
          setProductList(mapped);
        }
      })
      .catch((err) => {
        console.warn("Using offline fallback catalog products", err);
      });
  }, []);

  const filtered = useMemo(() => {
    let list = [...productList];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (occasion !== "All") list = list.filter((p) => p.occasion === occasion);
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "new")   list = list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sort === "lth")   list = list.sort((a, b) => a.price - b.price);
    if (sort === "htl")   list = list.sort((a, b) => b.price - a.price);
    if (sort === "rated") list = list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [productList, category, occasion, sort, maxPrice]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="font-cinzel text-lg font-semibold text-[#3E040E] mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-montserrat transition-all ${
                category === c
                  ? "bg-[#3E040E] text-[#FBF9F6] shadow-sm"
                  : "text-[#382E2E]/70 hover:bg-[#EBDCC5] hover:text-[#3E040E]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h3 className="font-cinzel text-lg font-semibold text-[#3E040E] mb-3">Occasion</h3>
        <div className="space-y-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              onClick={() => setOccasion(o)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-montserrat transition-all ${
                occasion === o
                  ? "bg-[#3E040E] text-[#FBF9F6] shadow-sm"
                  : "text-[#382E2E]/70 hover:bg-[#EBDCC5] hover:text-[#3E040E]"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-cinzel text-lg font-semibold text-[#3E040E] mb-3">
          Price Range
          <span className="text-[#96742A] ml-2 text-base font-cormorant font-medium">up to ₹{maxPrice.toLocaleString("en-IN")}</span>
        </h3>
        <input
          type="range"
          min={2000}
          max={30000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full accent-[#3E040E]"
        />
        <div className="flex justify-between text-xs text-[#382E2E]/50 font-montserrat mt-1">
          <span>₹2,000</span>
          <span>₹30,000</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => { setCategory("All"); setOccasion("All"); setMaxPrice(30000); }}
        className="w-full py-3 border border-[#96742A]/30 rounded-xl text-xs font-montserrat font-bold uppercase tracking-widest text-[#3E040E] hover:bg-[#3E040E] hover:text-[#FBF9F6] transition-all"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4E8D4] pt-36 pb-20 font-montserrat">
      {/* Page header */}
      <div className="py-12 border-b border-[#96742A]/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-montserrat text-sm font-semibold tracking-[0.25em] text-[#96742A] uppercase mb-4">Explore</p>
          <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-[#3E040E] mb-4 uppercase tracking-wider">Our Collections</h1>
          <p className="font-cormorant text-lg text-[#382E2E]/80">
            {filtered.length} sarees crafted with tradition
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-[#FBF9F6] rounded-2xl p-8 shadow-sm border border-[#96742A]/20">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
              <p className="font-montserrat text-xs font-semibold text-[#382E2E]/60 uppercase tracking-widest">
                Showing <span className="text-[#3E040E]">{filtered.length}</span> sarees
              </p>
              <div className="flex items-center gap-4">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-6 py-2.5 bg-[#FBF9F6] border border-[#96742A]/30 rounded-full text-xs font-montserrat font-bold text-[#3E040E] uppercase tracking-widest hover:bg-[#EBDCC5]"
                >
                  <SlidersHorizontal size={14} /> Filter
                </button>
                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-5 py-2.5 bg-[#FBF9F6] border border-[#96742A]/30 rounded-full text-xs font-montserrat font-bold text-[#3E040E] uppercase tracking-widest focus:outline-none focus:border-[#3E040E] shadow-sm cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
            >
              <AnimatePresence>
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-cinzel text-xl text-[#3E040E]">No sarees found matching your filters.</p>
                <button onClick={() => { setCategory("All"); setOccasion("All"); setMaxPrice(30000); }} className="mt-4 text-[#96742A] underline font-montserrat text-sm hover:text-[#3E040E]">Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#3E040E]/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#F4E8D4] shadow-2xl z-[70] p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-8 border-b border-[#96742A]/20 pb-4">
                <h2 className="font-cinzel text-xl font-semibold text-[#3E040E]">Filters</h2>
                <button onClick={() => setFilterOpen(false)} className="p-2 text-[#3E040E]/60 hover:text-[#3E040E] bg-[#EBDCC5] rounded-full">
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
