"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/data";
import toast from "react-hot-toast";

export interface CartItem extends Product {
  qty: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("swavani-cart");
      if (savedCart) setItems(JSON.parse(savedCart));
      const savedWish = localStorage.getItem("swavani-wishlist");
      if (savedWish) setWishlist(JSON.parse(savedWish));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("swavani-cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("swavani-wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const exists = items.find((i) => i.id === product.id);
    if (exists) {
      toast.success("Quantity updated in your bag!");
      setItems((prev) => prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + quantity } : i)));
    } else {
      toast.success(`${product.name} added to your bag! ✨`);
      setItems((prev) => [...prev, { ...product, qty: quantity }]);
    }
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.error("Item removed from your bag");
  };

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (id: string) => {
    const exists = wishlist.includes(id);
    if (exists) {
      toast("Removed from your wishlist", { icon: "🤍" });
      setWishlist((prev) => prev.filter((item) => item !== id));
    } else {
      toast.success("Saved to your wishlist! 💛");
      setWishlist((prev) => [...prev, id]);
    }
  };

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        count,
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
