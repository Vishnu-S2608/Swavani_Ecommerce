"use client";

import { useSyncExternalStore, useCallback } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "swavani_wishlist_ids";
const EVENT_NAME = "swavani-wishlist-change";

let cachedWishlist: string[] = [];
let cachedRaw = "";

function getWishlistSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedWishlist = JSON.parse(raw);
    }
  } catch {
    return [];
  }
  return cachedWishlist;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

const emptyList: string[] = [];
function getServerSnapshot(): string[] {
  return emptyList;
}

function getClientMounted(): boolean {
  return true;
}
function getServerMounted(): boolean {
  return false;
}

export function useWishlist() {
  const wishlist = useSyncExternalStore(subscribe, getWishlistSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(subscribe, getClientMounted, getServerMounted);

  const isWishlisted = useCallback(
    (id: string) => wishlist.includes(id),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (id: string, name?: string) => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY) || "[]";
        let current: string[] = [];
        try {
          current = JSON.parse(raw);
        } catch {
          current = [];
        }

        let updated: string[];
        if (current.includes(id)) {
          updated = current.filter((item) => item !== id);
          toast.success(name ? `Removed "${name}" from Wishlist` : "Removed from Wishlist", {
            icon: "🤍",
            duration: 2500,
          });
        } else {
          updated = [...current, id];
          toast.success(name ? `Added "${name}" to Wishlist` : "Added to Wishlist", {
            icon: "❤️",
            duration: 2500,
          });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event(EVENT_NAME));
      } catch {
        // Fallback
      }
    },
    []
  );

  return {
    wishlist,
    isWishlisted,
    toggleWishlist,
    count: wishlist.length,
    mounted,
  };
}
