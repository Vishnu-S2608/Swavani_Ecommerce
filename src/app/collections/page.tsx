"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/lib/data";
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
  const [category, setCategory] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [sort,     setSort]     = useState("new");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (occasion !== "All") list = list.filter((p) => p.occasion === occasion);
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "new")   list = list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sort === "lth")   list = list.sort((a, b) => a.price - b.price);
    if (sort === "htl")   list = list.sort((a, b) => b.price - a.price);
    if (sort === "rated") list = list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, occasion, sort, maxPrice]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h3 className="font-cormorant text-lg font-semibold text-crimson-800 mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-outfit transition-all ${
                category === c
                  ? "bg-crimson-700 text-ivory-100"
                  : "text-crimson-700/70 hover:bg-crimson-50 hover:text-crimson-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h3 className="font-cormorant text-lg font-semibold text-crimson-800 mb-3">Occasion</h3>
        <div className="space-y-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              onClick={() => setOccasion(o)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-outfit transition-all ${
                occasion === o
                  ? "bg-crimson-700 text-ivory-100"
                  : "text-crimson-700/70 hover:bg-crimson-50 hover:text-crimson-700"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-cormorant text-lg font-semibold text-crimson-800 mb-3">
          Price Range
          <span className="text-gold-500 ml-2 text-base">up to ₹{maxPrice.toLocaleString("en-IN")}</span>
        </h3>
        <input
          type="range"
          min={2000}
          max={30000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full accent-crimson-600"
        />
        <div className="flex justify-between text-xs text-crimson-700/50 font-outfit mt-1">
          <span>₹2,000</span>
          <span>₹30,000</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => { setCategory("All"); setOccasion("All"); setMaxPrice(30000); }}
        className="w-full py-2 border border-crimson-700/20 rounded-lg text-sm font-outfit text-crimson-700/60 hover:border-crimson-700 hover:text-crimson-700 transition-all"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-ivory-100 pt-6 pb-20">
      {/* Page header */}
      <div className="bg-crimson-900 py-16 bg-indian-pattern">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-vibes text-3xl text-gold-400 mb-2">Explore</p>
          <h1 className="font-cormorant text-5xl font-bold text-ivory-100 mb-3">Our Collections</h1>
          <p className="font-outfit text-sm text-ivory-300/70">
            {filtered.length} sarees crafted with tradition
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border border-gold-400/10">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <p className="font-outfit text-sm text-crimson-700/60">
                Showing <span className="font-semibold text-crimson-700">{filtered.length}</span> sarees
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-crimson-700/20 rounded-full text-sm font-outfit text-crimson-700 hover:bg-crimson-50"
                >
                  <SlidersHorizontal size={15} /> Filter
                </button>
                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-2 border border-crimson-700/20 rounded-full text-sm font-outfit text-crimson-700 bg-white focus:outline-none focus:border-crimson-700"
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
              className="grid grid-cols-2 md:grid-cols-3 gap-5"
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
                <p className="font-cormorant text-3xl text-crimson-700/40 mb-3">No sarees found</p>
                <p className="font-outfit text-sm text-crimson-700/30">Try adjusting your filters</p>
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
              className="fixed inset-0 bg-crimson-900/50 backdrop-blur-sm z-50"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-cormorant text-2xl font-bold text-crimson-800">Filters</h2>
                <button onClick={() => setFilterOpen(false)} className="text-crimson-700 p-2">
                  <X size={22} />
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
