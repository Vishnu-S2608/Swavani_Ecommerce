"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { products as staticProducts } from "@/lib/data";
import { SlidersHorizontal, X, Search, RotateCcw } from "lucide-react";

const CATEGORIES = ["All", "Silk Sarees", "Handloom", "Bridal", "Casual"];
const SORT_OPTIONS = [
  { label: "Newest First", value: "new" },
  { label: "Price: Low–High", value: "lth" },
  { label: "Price: High–Low", value: "htl" },
  { label: "Top Rated", value: "rated" },
];

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  resetFilters: () => void;
}

function FilterSidebar({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  resetFilters,
}: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div>
        <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-3">Search</h3>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#96742A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search weaves, silks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-montserrat bg-[#FBF9F6] border border-[#96742A]/30 text-[#3E040E] focus:outline-none focus:border-[#3E040E]"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-cinzel text-base font-semibold text-[#3E040E] mb-3">Category</h3>
        <div className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`block w-full text-left px-4 py-2 rounded-xl text-xs font-montserrat font-medium transition-all cursor-pointer ${
                category === c
                  ? "bg-[#3E040E] text-[#FBF9F6] shadow-sm font-semibold"
                  : "text-[#382E2E]/70 hover:bg-[#EBDCC5] hover:text-[#3E040E]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-cinzel text-base font-semibold text-[#3E040E]">Max Price</h3>
          <span className="text-[#96742A] text-sm font-cormorant font-bold">
            ₹{maxPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <input
          type="range"
          min={3000}
          max={40000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full accent-[#3E040E] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#382E2E]/50 font-montserrat mt-1">
          <span>₹3,000</span>
          <span>₹40,000</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full py-3 flex items-center justify-center gap-2 border border-[#96742A]/30 rounded-xl text-xs font-montserrat font-bold uppercase tracking-widest text-[#3E040E] hover:bg-[#3E040E] hover:text-[#FBF9F6] transition-all cursor-pointer"
      >
        <RotateCcw size={14} />
        Reset Filters
      </button>
    </div>
  );
}

function CollectionsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");

  const [category, setCategory] = useState(() => {
    if (!urlCategory) return "All";
    const lower = urlCategory.toLowerCase();
    if (lower.includes("silk") || lower.includes("kanjivaram") || lower.includes("banarasi") || lower.includes("pattu")) {
      return "Silk Sarees";
    } else if (lower.includes("bridal")) {
      return "Bridal";
    } else if (lower.includes("handloom") || lower.includes("elampillai")) {
      return "Handloom";
    } else if (lower.includes("casual")) {
      return "Casual";
    }
    const matched = CATEGORIES.find((c) => c.toLowerCase() === lower);
    return matched || "All";
  });

  const [sort, setSort] = useState("new");
  const [maxPrice, setMaxPrice] = useState(40000);
  const [searchQuery, setSearchQuery] = useState(() => urlSearch || "");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...staticProducts];

    // Category filter
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    // Price filter
    list = list.filter((p) => p.price <= maxPrice);

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === "new") {
      list = list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sort === "lth") {
      list = list.sort((a, b) => a.price - b.price);
    } else if (sort === "htl") {
      list = list.sort((a, b) => b.price - a.price);
    } else if (sort === "rated") {
      list = list.sort((a, b) => (b.rating ?? (b.isBestseller ? 5 : 4)) - (a.rating ?? (a.isBestseller ? 5 : 4)));
    }

    return list;
  }, [category, sort, maxPrice, searchQuery]);

  const resetFilters = () => {
    setCategory("All");
    setMaxPrice(40000);
    setSearchQuery("");
    setSort("new");
  };

  return (
    <div className="min-h-screen bg-[#F4E8D4] pt-32 pb-20 font-montserrat">
      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-[#382E2E]/50 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#F4E8D4] z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8 border-b border-[#96742A]/20 pb-4">
                  <h2 className="font-cinzel text-xl font-semibold text-[#3E040E] uppercase tracking-wider">Filters</h2>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="p-2 text-[#3E040E] hover:bg-[#EBDCC5] rounded-full transition-colors cursor-pointer"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  category={category}
                  setCategory={setCategory}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  resetFilters={resetFilters}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="py-12 border-b border-[#96742A]/20 bg-[#EBDCC5]/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-montserrat text-xs font-semibold tracking-[0.25em] text-[#96742A] uppercase mb-3">
            Handcrafted Loom Heritage
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-[#3E040E] mb-3 uppercase tracking-wider">
            Our Collections
          </h1>
          <p className="font-cormorant text-lg text-[#382E2E]/80 italic max-w-md mx-auto">
            {filtered.length} masterwork sarees woven with generational expertise
          </p>

          {/* Quick Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2 rounded-full text-xs font-montserrat tracking-widest uppercase transition-all cursor-pointer ${
                  category === c
                    ? "bg-[#3E040E] text-[#F4E8D4] shadow-md font-semibold"
                    : "bg-[#FBF9F6]/80 text-[#3E040E] border border-[#96742A]/30 hover:bg-[#3E040E] hover:text-[#F4E8D4]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex gap-10">
          {/* Main Grid Section */}
          <div className="flex-1">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap bg-[#FBF9F6] p-4 rounded-2xl border border-[#96742A]/20 shadow-sm">
              <p className="font-montserrat text-xs font-semibold text-[#382E2E]/70 uppercase tracking-widest">
                Showing <span className="text-[#3E040E] font-bold">{filtered.length}</span> sarees
                {category !== "All" && <span className="text-[#96742A] ml-1">in {category}</span>}
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setFilterOpen(true)}
                  className="px-4 py-2 flex items-center gap-2 bg-[#EBDCC5] border border-[#96742A]/30 rounded-full text-xs font-montserrat font-bold text-[#3E040E] uppercase tracking-widest hover:bg-[#D9B26D] transition-all shadow-sm cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                </button>

                {/* Sort dropdown */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-2 bg-white border border-[#96742A]/30 rounded-full text-xs font-montserrat font-bold text-[#3E040E] uppercase tracking-widest focus:outline-none focus:border-[#3E040E] shadow-sm cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <div className="text-4xl mb-4">🪡</div>
                <h3 className="font-cinzel text-xl font-semibold text-[#3E040E] mb-2 uppercase">
                  No Sarees Found
                </h3>
                <p className="font-montserrat text-xs text-[#382E2E]/60 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#3E040E] text-[#F4E8D4] rounded-full text-xs font-montserrat font-bold uppercase tracking-widest hover:bg-[#96742A] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4E8D4] pt-32 pb-20 flex items-center justify-center">
          <div className="text-[#3E040E] font-cinzel text-lg">Loading Collections...</div>
        </div>
      }
    >
      <CollectionsContent />
    </Suspense>
  );
}
