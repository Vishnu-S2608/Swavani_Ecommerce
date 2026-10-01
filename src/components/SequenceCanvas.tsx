'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';

export function SequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [scrollState, setScrollState] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 18,
    restDelta: 0.001
  });

  const frameCount = isMobile ? 60 : 120;
  // Map scroll 0..1 to frame index 1..frameCount
  const frameIndex = useTransform(springProgress, [0, 1], [1, frameCount]);

  useEffect(() => {
    const checkMobile = window.innerWidth < 768;
    setTimeout(() => setIsMobile(checkMobile), 0);

    const prefersReducedMotionValue = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(prefersReducedMotionValue);
    
    if (prefersReducedMotionValue) {
      // Just load the first frame if reduced motion
      const img = new Image();
      img.src = `/${checkMobile ? 'sequence-m' : 'sequence'}/frame_0001.jpg`;
      img.onload = () => {
        setLoaded(100);
      };
      setImages([img]);
      return;
    }

    const total = checkMobile ? 60 : 120;
    const folder = checkMobile ? 'sequence-m' : 'sequence';

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= total; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, '0');
      img.src = `/${folder}/frame_${paddedIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoaded(Math.round((loadedCount / total) * 100));
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const lastDrawnIndex = useRef(-1);
  const canvasSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false for better performance
    if (!ctx) return;

    let animationFrameId: number;
    let resizePending = true;

    const handleResize = () => {
      resizePending = true;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Get current frame based on scroll
      let index = Math.round(frameIndex.get()) - 1;
      if (index < 0) index = 0;
      if (index >= images.length) index = images.length - 1;

      const img = images[index];
      
      // Only redraw if index changed or window resized
      if (img && img.complete && (index !== lastDrawnIndex.current || resizePending)) {
        
        // Only trigger layout thrashing (getBoundingClientRect) on actual resize
        if (resizePending) {
          const dpr = window.devicePixelRatio || 1;
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          ctx.scale(dpr, dpr);
          ctx.imageSmoothingEnabled = true;
          canvasSizeRef.current = { width: rect.width, height: rect.height };
          resizePending = false;
        }

        // Object cover logic
        const imgRatio = img.width / img.height;
        const { width: rectWidth, height: rectHeight } = canvasSizeRef.current;
        const canvasRatio = rectWidth / rectHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
          drawHeight = rectHeight;
          drawWidth = rectHeight * imgRatio;
          offsetX = (rectWidth - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = rectWidth;
          drawHeight = rectWidth / imgRatio;
          offsetX = 0;
          offsetY = (rectHeight - drawHeight) / 2;
        }

        // Fill background instead of clearRect (since alpha: false)
        ctx.fillStyle = '#20030C';
        ctx.fillRect(0, 0, rectWidth, rectHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        lastDrawnIndex.current = index;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full h-[800vh] bg-[#20030C]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {loaded < 100 && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#20030C]">
            <div className="w-64 h-1 bg-silk-deep rounded overflow-hidden">
              <div 
                className="h-full bg-zari transition-all duration-300"
                style={{ width: `${loaded}%` }}
              />
            </div>
          </div>
        )}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover" 
        />

        {/* Overlays removed to reveal high-quality baked-in video text */}
        
        {/* Overlays can be mapped to scroll ranges via Framer Motion below or passed as children */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {!prefersReducedMotion && <OverlayText scrollProgress={scrollYProgress} activeSection={scrollState} />}
        </div>
      </div>
      
      {prefersReducedMotion && (
        <div className="relative z-20 pb-32">
          <ReducedMotionText />
        </div>
      )}
    </div>
  );
}

import { useMotionValueEvent, type MotionValue } from 'framer-motion';

function OverlayText({ scrollProgress, activeSection }: { scrollProgress: MotionValue<number>, activeSection?: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    if (latest < 0.15) setActiveIndex(0);
    else if (latest >= 0.15 && latest < 0.4) setActiveIndex(1);
    else if (latest >= 0.4 && latest < 0.65) setActiveIndex(2);
    else if (latest >= 0.65 && latest < 0.85) setActiveIndex(3);
    else setActiveIndex(4);
  });

  // 0–15% Hero
  const heroOpacity = useTransform(scrollProgress, [0, 0.1, 0.15, 0.2], [1, 1, 0, 0]);
  const heroY = useTransform(scrollProgress, [0, 0.15], [0, -50]);

  // 15–40% Unfolding
  const unfoldOpacity = useTransform(scrollProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const unfoldX = useTransform(scrollProgress, [0.15, 0.2, 0.35, 0.4], [-50, 0, 0, -50]);

  // 40–65% Pallu & border
  const palluOpacity = useTransform(scrollProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const palluX = useTransform(scrollProgress, [0.4, 0.45, 0.6, 0.65], [50, 0, 0, 50]);

  // 65–85% Fabric & feel
  const fabricOpacity = useTransform(scrollProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const fabricY = useTransform(scrollProgress, [0.65, 0.7, 0.8, 0.85], [50, 0, 0, -50]);

  // 85–100% Re-drape and CTA
  const ctaOpacity = useTransform(scrollProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollProgress, [0.85, 0.9], [50, 0]);

  return (
    <div className="w-full h-full relative max-w-7xl mx-auto px-6">
      
      {/* 1. Hero */}
      {activeIndex === 0 && (
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mt-32 text-center max-w-5xl px-8 py-12 md:px-16 md:py-16 flex flex-col items-center relative bg-[#20030C]/40 backdrop-blur-3xl backdrop-saturate-150 rounded-3xl mx-4 border border-white/20 shadow-[0_16px_40px_0_rgba(0,0,0,0.8)]"
          >
            {/* Liquid Edge Highlight */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3)' }} />

            {/* Indian Palace Jharokha Borders */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#D9B26D]/40 rounded-2xl pointer-events-none" />
            
            {/* Ornate Corners */}
            <svg className="absolute top-5 left-5 w-10 h-10 text-[#D9B26D] drop-shadow-md" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M 0 0 L 100 0 C 100 50, 50 100, 0 100 Z" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M 0 0 L 70 0 C 70 35, 35 70, 0 70 Z" stroke="currentColor" />
            </svg>
            <svg className="absolute top-5 right-5 w-10 h-10 text-[#D9B26D] drop-shadow-md" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'scaleX(-1)' }}>
              <path d="M 0 0 L 100 0 C 100 50, 50 100, 0 100 Z" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M 0 0 L 70 0 C 70 35, 35 70, 0 70 Z" stroke="currentColor" />
            </svg>
            <svg className="absolute bottom-5 left-5 w-10 h-10 text-[#D9B26D] drop-shadow-md" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'scaleY(-1)' }}>
              <path d="M 0 0 L 100 0 C 100 50, 50 100, 0 100 Z" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M 0 0 L 70 0 C 70 35, 35 70, 0 70 Z" stroke="currentColor" />
            </svg>
            <svg className="absolute bottom-5 right-5 w-10 h-10 text-[#D9B26D] drop-shadow-md" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'scale(-1, -1)' }}>
              <path d="M 0 0 L 100 0 C 100 50, 50 100, 0 100 Z" stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
              <path d="M 0 0 L 70 0 C 70 35, 35 70, 0 70 Z" stroke="currentColor" />
            </svg>

            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-montserrat text-[11px] md:text-sm tracking-[0.4em] uppercase text-[#D9B26D] mb-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-2"
            >
              PURITY • CRAFTSMANSHIP • HERITAGE
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-[#FBF9F6] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-wider"
            >
              AN INVITATION TO SPLENDOR
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="font-cormorant italic text-2xl md:text-3xl text-[#FBF9F6] mb-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-3xl leading-relaxed"
            >
              Authentic Kanchipuram & Banarasi silks, handpicked for moments that matter.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col gap-6 w-full sm:w-auto items-center mt-2 relative z-10"
            >
              <button className="bg-gradient-to-r from-[#B8925A] via-[#F1D9A0] to-[#B8925A] text-[#1A050A] px-14 py-4 rounded-full font-montserrat text-sm tracking-widest font-bold hover:scale-105 transition-transform duration-300 w-full sm:w-auto uppercase shadow-[0_4px_20px_rgba(217,178,109,0.4)] hover:shadow-[0_6px_25px_rgba(217,178,109,0.6)]">
                STEP INSIDE
              </button>
              <a href="#" className="font-montserrat text-xs font-semibold uppercase tracking-[0.25em] text-[#FBF9F6] hover:text-[#D9B26D] transition-colors underline underline-offset-8 decoration-[#D9B26D] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] self-center mt-2">
                The Autumn / Festive Edit
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* 2. Unfolding */}
      {activeIndex === 1 && (
        <motion.div 
          style={{ opacity: unfoldOpacity, x: unfoldX }}
          className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none pb-16 lg:pb-20"
        >
          <div className="text-center max-w-3xl px-6 flex flex-col items-center">
            <span className="font-montserrat text-[10px] md:text-xs tracking-[0.4em] uppercase text-zari mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              THE ART OF WEAVING
            </span>
            <h2 className="font-cinzel text-4xl md:text-6xl text-[#FBF9F6] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-wide">
              Woven Thread By Thread
            </h2>
            <p className="font-cormorant italic text-xl md:text-2xl text-[#FBF9F6] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-2xl leading-relaxed">
              Preserving the legacy of master artisans. Every motif tells a story of centuries-old craftsmanship.
            </p>
          </div>
        </motion.div>
      )}

      {/* 3. Pallu & Border */}
      {activeIndex === 2 && (
        <motion.div 
          style={{ opacity: palluOpacity, x: palluX }}
          className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none pb-16 lg:pb-20"
        >
          <div className="text-center max-w-3xl px-6 flex flex-col items-center">
            <span className="font-montserrat text-[10px] md:text-xs tracking-[0.4em] uppercase text-zari mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              INTRICATE DETAILS
            </span>
            <h2 className="font-cinzel text-4xl md:text-6xl text-[#FBF9F6] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-wide">
              Poetry in Zari
            </h2>
            <p className="font-cormorant italic text-xl md:text-2xl text-[#FBF9F6] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-2xl leading-relaxed">
              Masterpieces defined by their opulent pallus and precision-woven borders.
            </p>
          </div>
        </motion.div>
      )}

      {/* 4. Fabric & Feel */}
      {activeIndex === 3 && (
        <motion.div 
          style={{ opacity: fabricOpacity, y: fabricY }}
          className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none pb-16 lg:pb-20"
        >
          <div className="text-center max-w-3xl px-6 flex flex-col items-center">
            <span className="font-montserrat text-[10px] md:text-xs tracking-[0.4em] uppercase text-zari mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              TIMELESS ELEGANCE
            </span>
            <h2 className="font-cinzel text-4xl md:text-6xl text-[#FBF9F6] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-wide">
              The Bridal Heritage
            </h2>
            <p className="font-cormorant italic text-xl md:text-2xl text-[#FBF9F6] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-2xl leading-relaxed">
              Draped in tradition. Woven for eternity. Discover silks crafted for your most cherished day.
            </p>
          </div>
        </motion.div>
      )}

      {/* 5. Re-drape & CTA */}
      {activeIndex === 4 && (
        <motion.div 
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 flex flex-col items-start justify-center pointer-events-auto pl-8 md:pl-16 lg:pl-32"
        >
          <div className="text-left max-w-3xl px-6 flex flex-col items-start">
            <span className="font-montserrat text-[10px] md:text-xs tracking-[0.25em] font-semibold uppercase text-[#96742A] mb-4">
              HOUSE OF SWAVANI
            </span>
            <h2 className="font-cinzel font-semibold text-5xl md:text-6xl text-[#3E040E] mb-6 drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] tracking-wide">
              Wear The Tradition
            </h2>
            <p className="font-cormorant italic font-medium text-xl md:text-2xl text-[#382E2E] mb-12">
              Step into our world of heirloom silks.
            </p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-6 w-full mt-4">
              <button className="bg-[#FBF9F6] text-[#3A0615] px-12 py-3.5 rounded-full font-montserrat text-xs tracking-widest font-bold hover:bg-zari transition-colors duration-300 w-full sm:w-auto uppercase shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                VISIT THE STORE
              </button>
              
              <a href="https://wa.me/916381895890" target="_blank" rel="noopener noreferrer" className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FBF9F6] hover:text-zari transition-colors flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}

function ReducedMotionText() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-32 text-center flex flex-col items-center justify-center pt-[50vh]">
      <div>
        <h1 className="font-cinzel text-5xl md:text-7xl uppercase tracking-widest text-transparent bg-clip-text bg-cream-gradient mb-6 drop-shadow-lg">
          House of Swavani
        </h1>
        <p className="font-cormorant italic text-xl md:text-3xl text-cream-warm mb-4">
          Woven heritage, draped in gold.
        </p>
        <p className="font-montserrat text-cream/80 max-w-md mx-auto text-sm md:text-base">
          Handpicked silk sarees for weddings, festivals and every celebration in between.
        </p>
      </div>

      <div>
        <h2 className="font-cinzel text-4xl md:text-5xl text-cream-warm mb-6">Woven thread by thread.</h2>
        <p className="font-montserrat text-cream/70 mb-4 text-base md:text-lg">
          Silk and pure zari interlaced on the loom, crafted by master weavers.
        </p>
        <p className="font-montserrat text-cream/70 text-base md:text-lg">
          Every motif carries a story older than the machine.
        </p>
      </div>


      <div>
        <h2 className="font-cinzel text-4xl md:text-5xl text-cream-warm mb-6">The pallu. The border. The signature.</h2>
        <p className="font-montserrat text-cream/70 mb-4 text-base md:text-lg">
          A temple border in gold that frames every step.
        </p>
        <p className="font-montserrat text-cream/70 mb-4 text-base md:text-lg">
          Peacocks, paisleys and lotus motifs placed with a weaver&apos;s eye.
        </p>
        <p className="font-montserrat text-cream/70 text-base md:text-lg">
          Rich contrast between body and border — made to catch every light.
        </p>
      </div>

      <div>
        <h2 className="font-cinzel text-4xl md:text-5xl text-cream-warm mb-6">Feels like nothing else.</h2>
        <p className="font-montserrat text-cream/70 mb-4 text-base md:text-lg">
          Soft, breathable silk with weight in the fall and glow in the movement.
        </p>
        <p className="font-montserrat text-cream/70 text-base md:text-lg">
          Pleats that settle into perfect folds and stay that way through the whole celebration.
        </p>
      </div>

      <div>
        <h2 className="font-cinzel text-5xl md:text-7xl text-cream-warm mb-4">Wear the tradition.<br/>Own the moment.</h2>
        <p className="font-cormorant italic text-xl md:text-2xl text-cream mb-10">
          House of Swavani — sarees chosen with care, draped with pride.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="px-8 py-4 bg-transparent border border-zari text-zari hover:bg-zari hover:text-black transition-colors duration-300 font-montserrat uppercase tracking-widest text-sm relative group overflow-hidden shadow-zari">
            <div className="absolute inset-0 bg-zari-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
            Explore the Collection
          </button>
          
          <a href="#" className="font-montserrat text-cream underline decoration-zari/50 underline-offset-4 hover:decoration-zari transition-colors">
            Visit the store
          </a>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-center gap-2 sm:gap-3 font-montserrat text-cream/90 text-sm">
          <span>WhatsApp for styling & orders:</span>
          <a href="https://wa.me/916381895890" target="_blank" rel="noopener noreferrer" className="text-zari font-medium text-base hover:text-white transition-colors">
            +91 6381895890
          </a>
        </div>
      </div>
    </div>
  );
}
