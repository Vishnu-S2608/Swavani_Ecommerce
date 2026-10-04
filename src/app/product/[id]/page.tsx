"use client";
import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Heart, Truck, RotateCcw, Shield, Minus, Plus } from "lucide-react";
import { products, Product } from "@/lib/data";
import { getProductById } from "@/lib/firestore";
import { getCloudflareImageUrl } from "@/lib/cloudflare";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [qty, setQty] = useState(1);

  const staticMatch = products.find((p) => p.id === id);
  const [product, setProduct] = useState<Product | null>(staticMatch || null);

  useEffect(() => {
    getProductById(id).then((doc) => {
      if (doc) {
        setProduct({
          id: doc.id || id,
          name: doc.name,
          subtitle: doc.subtitle,
          price: doc.price,
          mrp: doc.mrp,
          image: doc.imageUrl,
          hoverImage: doc.hoverImageUrl,
          category: doc.category,
          fabric: doc.fabric,
          occasion: doc.occasion,
          colors: doc.colors || [],
          isNew: Boolean(doc.isNew),
          isBestseller: Boolean(doc.isBestseller),
          rating: doc.rating || 5,
          reviews: doc.reviews || 0,
          description: doc.description || "",
        });
      }
    }).catch((e) => {
      console.warn("Could not query Firestore for product", e);
    });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF9F6] pt-36 pb-20 flex flex-col items-center justify-center font-montserrat">
        <p className="text-xl font-cinzel text-[#3E040E] mb-2">Loading Saree Details…</p>
        <p className="text-sm text-[#382E2E]/60">Fetching from Swavani catalog</p>
      </div>
    );
  }

  const mainOptimized = getCloudflareImageUrl(product.image, { width: 1200, quality: 90 });
  const hoverOptimized = getCloudflareImageUrl(product.hoverImage || product.image, { width: 1200, quality: 90 });
  const images = [mainOptimized, hoverOptimized, mainOptimized, hoverOptimized];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-32 pb-20 font-montserrat text-[#382E2E]">
      {/* Breadcrumb - subtle at the top */}
      <div className="px-6 lg:px-12 py-4">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#382E2E]/50">
          <Link href="/" className="hover:text-[#96742A] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#96742A] transition-colors">Sarees</Link>
          <span>/</span>
          <span className="text-[#3E040E]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 relative">
          
          {/* Left: Images Section (Thumbnails + Main) */}
          <div className="w-full lg:w-[55%] flex flex-col-reverse lg:flex-row gap-4 lg:h-[75vh] lg:sticky lg:top-24">
            
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:w-20 flex-shrink-0 pb-2 lg:pb-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 aspect-[2/3] flex-shrink-0 transition-all ${
                    selectedImage === i ? "opacity-100 ring-1 ring-[#3E040E] ring-offset-2 ring-offset-[#FBF9F6]" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover object-top" sizes="80px" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 relative aspect-[2/3] md:aspect-auto bg-[#EBDCC5]"
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

          {/* Right: Product Info */}
          <div className="w-full lg:w-[45%] py-2 lg:pr-8">
            <div className="lg:sticky lg:top-32 self-start py-4 lg:pr-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  {/* Badge */}
                  {product.isNew && (
                    <span className="inline-block text-[#96742A] border border-[#96742A] text-[9px] font-bold px-3 py-1 uppercase tracking-[0.3em]">
                      Nouveau
                    </span>
                  )}
                  {/* Wishlist Icon */}
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className="p-2 transition-colors hover:text-[#96742A]"
                    aria-label="Add to wishlist"
                  >
                    <Heart size={20} className={wishlisted ? "fill-[#3E040E] text-[#3E040E]" : "text-[#382E2E]/60"} />
                  </button>
                </div>

                <h1 className="font-cinzel text-4xl lg:text-5xl font-semibold text-[#3E040E] leading-[1.1] mb-6 uppercase tracking-wider">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="mb-8">
                  <span className="font-montserrat text-2xl lg:text-3xl font-normal text-[#3E040E]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <p className="text-[10px] uppercase tracking-widest font-medium text-[#382E2E]/50 mt-2">
                    Taxes incluses. Livraison calculée au paiement.
                  </p>
                </div>

                {/* Decorative Divider */}
                <div className="h-px w-full bg-gradient-to-r from-[#96742A]/40 via-[#96742A]/10 to-transparent mb-8"></div>

                <p className="font-cormorant text-xl lg:text-2xl text-[#382E2E]/90 leading-relaxed mb-10 italic">
                  {product.description}
                </p>

                {/* Bullet points (Grid layout) */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
                  {[
                    { label: "Material", value: `100% ${product.fabric}` },
                    { label: "Occasion", value: product.occasion },
                    { label: "Length", value: "5.5m (with blouse piece)" },
                    { label: "Care", value: "Dry clean recommended" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em]">{item.label}</span>
                      <span className="font-cormorant text-lg text-[#3E040E]">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Color Swatches — from product data */}
                <div className="mb-8">
                  <p className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] mb-3">Available Colours</p>
                  <div className="flex gap-4">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        title={color}
                        className="relative w-10 h-10 rounded-full border-2 border-[#EBDCC5] hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-10">
                  <p className="text-[9px] font-bold text-[#382E2E]/50 uppercase tracking-[0.2em] mb-3">Quantity</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-[#96742A]/30 bg-transparent h-14 w-36 rounded-full overflow-hidden">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex-1 flex justify-center items-center text-[#3E040E]/60 hover:text-[#3E040E] hover:bg-[#96742A]/10 h-full transition-colors"><Minus size={16} /></button>
                      <span className="font-montserrat text-sm font-semibold text-[#3E040E] w-8 text-center">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="flex-1 flex justify-center items-center text-[#3E040E]/60 hover:text-[#3E040E] hover:bg-[#96742A]/10 h-full transition-colors"><Plus size={16} /></button>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#2A3B24]">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A3B24] opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2A3B24]"></span>
                      </span>
                      En stock
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(product, qty)}
                    className="flex-1 py-4 px-6 bg-[#3E040E] text-[#FBF9F6] font-montserrat font-semibold text-xs tracking-[0.2em] uppercase transition-colors hover:bg-black rounded-full"
                  >
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      addToCart(product, qty);
                      router.push('/checkout');
                    }}
                    className="flex-1 py-4 px-6 bg-transparent border border-[#3E040E] text-[#3E040E] font-montserrat font-semibold text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[#3E040E]/5 rounded-full"
                  >
                    Buy Now
                  </motion.button>
                </div>

                {/* Accordion / Trust Badges replacing simple text */}
                <div className="border-t border-[#96742A]/20 pt-8 mt-8 space-y-6">
                  {[
                    { icon: Truck,   title: "EXPRESS DELIVERY & RETURNS", desc: "Free delivery on orders above ₹2,999. Easy returns within 7 days." },
                    { icon: Shield,  title: "SECURE PAYMENT", desc: "All transactions are secured and encrypted. Pay via UPI, Cards or COD." },
                    { icon: RotateCcw, title: "AUTHENTICITY GUARANTEE", desc: "Every saree comes with a Silk Mark certificate ensuring 100% genuine silk." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="group cursor-pointer">
                      <div className="flex items-center justify-between text-[#3E040E] mb-2">
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-[#96742A]" />
                          <span className="text-[10px] font-bold tracking-widest uppercase">{title}</span>
                        </div>
                        <Plus size={14} className="text-[#382E2E]/40 group-hover:text-[#3E040E] transition-colors" />
                      </div>
                      <p className="text-[11px] text-[#382E2E]/70 pl-8 leading-relaxed max-w-sm hidden group-hover:block transition-all">{desc}</p>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-32 pt-20 border-t border-[#96742A]/20 mb-10">
            <h2 className="font-cinzel text-3xl md:text-4xl font-semibold text-[#3E040E] text-center mb-16 uppercase tracking-widest">
              Complétez Votre Style
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
