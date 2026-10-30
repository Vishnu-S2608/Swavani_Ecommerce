"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
} from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  const safeImages = images && images.length > 0 ? images : ["/products/1/DSC03770.jpg"];
  const currentImage = safeImages[selectedIndex] || safeImages[0];

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  }, [safeImages.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  }, [safeImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setLightboxZoom(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <>
      <div className="w-full flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 lg:sticky lg:top-24 h-fit">
        {/* Thumbnails Strip */}
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto shrink-0 pb-1 sm:pb-0 sm:max-h-[660px] scrollbar-thin">
          {safeImages.map((imgSrc, idx) => {
            const isActive = selectedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`group relative w-14 h-[72px] sm:w-[72px] sm:h-24 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 bg-[#F4E8D4]/40 ${
                  isActive
                    ? "border-[#3E040E] shadow-[0_0_12px_rgba(62,4,14,0.3)] scale-[1.04] ring-2 ring-[#96742A]/40"
                    : "border-[#96742A]/20 opacity-70 hover:opacity-100 hover:border-[#96742A]/60"
                }`}
                aria-label={`View angle ${idx + 1}`}
              >
                <Image
                  src={imgSrc}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  sizes="80px"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-[#3E040E]/10 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Stage Image Container - Clean View without hover zoom */}
        <div className="flex-1 flex flex-col">
          <div
            onClick={() => {
              setIsLightboxOpen(true);
              setLightboxZoom(1);
            }}
            className="relative w-full h-[380px] sm:h-[500px] lg:h-[calc(100vh-160px)] lg:max-h-[660px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-[#96742A]/25 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#EAE2D5] select-none cursor-pointer group"
            title="Click to view full screen"
          >
            {/* The Main Image - Static and Crisp */}
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-2 sm:p-3">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full relative flex items-center justify-center"
              >
                <div className="w-full h-full relative">
                  <Image
                    src={currentImage}
                    alt={productName}
                    fill
                    className="object-contain object-center drop-shadow-md"
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
              </motion.div>
            </div>

            {/* Navigation Chevrons — always visible on mobile, hover-only on desktop */}
            {safeImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-[#3E040E]/70 hover:text-[#3E040E] transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-125 z-10 drop-shadow-md cursor-pointer bg-white/60 sm:bg-transparent rounded-full"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#3E040E]/70 hover:text-[#3E040E] transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-125 z-10 drop-shadow-md cursor-pointer bg-white/60 sm:bg-transparent rounded-full"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-8 sm:h-8" />
                </button>
              </>
            )}
          </div>

          {/* Quick Caption Under Image */}
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.15em] text-[#382E2E]/60 mt-2 px-1 gap-2">
            <span className="shrink-0">Angle {selectedIndex + 1} of {safeImages.length}</span>
            <span className="text-[#96742A] flex items-center gap-1 text-right">
              <span className="w-1.5 h-1.5 rounded-full bg-[#96742A] inline-block animate-pulse shrink-0" />
              <span className="hidden sm:inline">100% Authentic Handloom Shots</span>
              <span className="sm:hidden">Authentic Handloom</span>
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Luxury Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Modal Top Bar */}
            <div
              className="flex items-center justify-between text-white z-20 pb-3 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="font-cinzel text-base sm:text-lg font-semibold text-[#D9B26D] tracking-wide">
                  {productName}
                </h3>
                <p className="text-[11px] text-white/60 uppercase tracking-widest font-montserrat">
                  Angle {selectedIndex + 1} of {safeImages.length}
                </p>
              </div>

              {/* Zoom & Close controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setLightboxZoom((z) => Math.max(1, z - 0.5))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                <span className="text-xs font-mono px-2 py-1 bg-white/10 rounded-md">
                  {Math.round(lightboxZoom * 100)}%
                </span>
                <button
                  onClick={() => setLightboxZoom((z) => Math.min(3.5, z + 0.5))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  onClick={() => setLightboxZoom(1)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setLightboxZoom(1);
                  }}
                  className="p-2 rounded-full bg-white/20 hover:bg-[#3E040E] text-white transition-colors ml-2 cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div
              className="relative flex-1 flex items-center justify-center overflow-hidden my-3 cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                drag={lightboxZoom > 1}
                dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
                className="relative max-w-full max-h-[75vh] w-auto h-[75vh] aspect-[2/3] flex items-center justify-center transition-transform duration-200"
                style={{
                  transform: `scale(${lightboxZoom})`,
                }}
              >
                <Image
                  src={currentImage}
                  alt={productName}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>

              {/* Prev / Next Buttons in Lightbox */}
              {safeImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                      setLightboxZoom(1);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors backdrop-blur-md cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                      setLightboxZoom(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors backdrop-blur-md cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {/* Modal Bottom Thumbnail Strip */}
            <div
              className="flex items-center justify-center gap-3 pt-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {safeImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setLightboxZoom(1);
                  }}
                  className={`relative w-14 h-18 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedIndex === idx
                      ? "border-[#D9B26D] scale-110 shadow-lg"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                    sizes="60px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
