export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  mrp: number;
  image: string;
  hoverImage: string;
  category: string;
  fabric: string;
  occasion: string;
  colors: string[];
  isNew: boolean;
  isBestseller: boolean;
  rating: number;
  reviews: number;
  description: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Crimson Kanjivaram Silk",
    subtitle: "Royal Zari Weave",
    price: 12999,
    mrp: 18999,
    image: "/saree-1.jpg",
    hoverImage: "/hero-model.jpg",
    category: "Silk Sarees",
    fabric: "Kanjivaram Silk",
    occasion: "Wedding",
    colors: ["#8B0000", "#D4AF37"],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 248,
    description: "A masterpiece of Kanjivaram weaving, adorned with traditional gold zari motifs and a heavy silk texture that drapes gracefully.",
  },
  {
    id: "p2",
    name: "Emerald Banarasi Silk",
    subtitle: "Heritage Gold Brocade",
    price: 9499,
    mrp: 14999,
    image: "/saree-1.jpg",
    hoverImage: "/saree-1.jpg",
    category: "Silk Sarees",
    fabric: "Banarasi Silk",
    occasion: "Festival",
    colors: ["#1a5c2a", "#D4AF37"],
    isNew: true,
    isBestseller: false,
    rating: 4.8,
    reviews: 182,
    description: "Rich emerald green Banarasi silk with intricate gold brocade weaving — a timeless treasure from the looms of Varanasi.",
  },
  {
    id: "p3",
    name: "Royal Blue Kanjivaram",
    subtitle: "Pearl Gold Pallu",
    price: 11499,
    mrp: 16999,
    image: "/saree-2.jpg",
    hoverImage: "/saree-2.jpg",
    category: "Silk Sarees",
    fabric: "Kanjivaram Silk",
    occasion: "Wedding",
    colors: ["#003580", "#D4AF37"],
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviews: 317,
    description: "Majestic royal blue Kanjivaram adorned with pearl-hued gold zari, perfect for grand celebrations and royal occasions.",
  },
  {
    id: "p4",
    name: "Maroon Patola Silk",
    subtitle: "Ikat Geometric Art",
    price: 8999,
    mrp: 13499,
    image: "/saree-3.jpg",
    hoverImage: "/saree-3.jpg",
    category: "Handloom",
    fabric: "Patola Silk",
    occasion: "Festival",
    colors: ["#6B0000", "#F0D080"],
    isNew: false,
    isBestseller: false,
    rating: 4.7,
    reviews: 94,
    description: "Traditional Patola double-ikat weaving from Gujarat — each saree a unique artwork of geometric symmetry and vibrant color.",
  },
  {
    id: "p5",
    name: "Golden Bridal Kanjivaram",
    subtitle: "Temple Border Bridal",
    price: 24999,
    mrp: 35999,
    image: "/saree-4.jpg",
    hoverImage: "/saree-4.jpg",
    category: "Bridal",
    fabric: "Kanjivaram Silk",
    occasion: "Bridal",
    colors: ["#C9963F", "#8B0000"],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviews: 89,
    description: "The pinnacle of bridal luxury — a golden Kanjivaram with deep crimson temple borders and heavy zari embellishment.",
  },
  {
    id: "p6",
    name: "Blue Chanderi Elegance",
    subtitle: "Sheer Silver Weave",
    price: 4999,
    mrp: 7499,
    image: "/saree-5.jpg",
    hoverImage: "/saree-5.jpg",
    category: "Casual",
    fabric: "Chanderi Silk",
    occasion: "Casual",
    colors: ["#ADD8E6", "#C0C0C0"],
    isNew: true,
    isBestseller: false,
    rating: 4.6,
    reviews: 156,
    description: "Light-as-air Chanderi silk with delicate silver thread florals — effortless elegance for everyday occasions.",
  },
];

export const categories = [
  { id: "silk", label: "Silk Sarees", image: "/saree-1.jpg", count: 120 },
  { id: "handloom", label: "Handloom", image: "/saree-3.jpg", count: 85 },
  { id: "bridal", label: "Bridal", image: "/saree-4.jpg", count: 48 },
  { id: "casual", label: "Casual", image: "/saree-5.jpg", count: 97 },
  { id: "printed", label: "Printed", image: "/saree-2.jpg", count: 73 },
];

export const heroSlides = [
  {
    id: 1,
    tagline: "New Arrival",
    title: "Timeless Elegance,\nEternal Tradition",
    subtitle: "Explore the finest handwoven sarees from master artisans across India",
    cta: "Explore Collection",
    image: "/hero-model.jpg",
    bg: "/hero-arch.jpg",
  },
  {
    id: 2,
    tagline: "Bridal Collection",
    title: "Dressed in Dreams,\nWoven in Gold",
    subtitle: "Make your special day unforgettable with our exquisite bridal sarees",
    cta: "View Bridal",
    image: "/saree-4.jpg",
    bg: "/hero-arch.jpg",
  },
  {
    id: 3,
    tagline: "Heritage Weaves",
    title: "Six Yards of\nPure Heritage",
    subtitle: "Banarasi, Kanjivaram, Patola — authentic weaves from India's finest looms",
    cta: "Shop Now",
    image: "/saree-1.jpg",
    bg: "/hero-arch.jpg",
  },

];
