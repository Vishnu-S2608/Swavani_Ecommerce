import React from 'react';

export function BrandShowcase() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-start overflow-hidden bg-[#1A050A]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: "url('/hero-editorial.jpg')", 
          backgroundSize: "cover",
          backgroundPosition: "bottom center", // Anchor to bottom to show the girl's face and saree
        }}
      />

      {/* Subtle vignette/darkening to ensure text pops */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-start text-center px-6 md:px-12 w-full h-full flex-grow pt-24 md:pt-32 lg:pt-40">
        
        {/* Tamil / Eyebrow Text */}
        <span className="font-montserrat text-sm md:text-base text-[#FBF9F6] mb-4 tracking-[0.2em] drop-shadow-md">
          (ஹவுஸ் ஆஃப் ஸ்வவணி)
        </span>

        {/* Main Brand Title */}
        <h2 className="font-cinzel text-5xl md:text-7xl lg:text-[7rem] text-[#FBF9F6] mb-8 tracking-[0.15em] uppercase drop-shadow-2xl">
          Swavani
        </h2>

        {/* Description Text */}
        <p className="font-cormorant text-lg md:text-2xl text-[#FBF9F6] max-w-4xl leading-[1.8] drop-shadow-md font-medium tracking-wide">
          A royal vision in silk—this handwoven masterpiece in dual-toned hues is woven with intricate pure zari. Featuring traditional motifs on the body, a striking temple border, and a pallu adorned with floral vines and diamond patterns—this is tradition reimagined. The perfect blend of depth, detail, and timeless grace.
        </p>

      </div>

      {/* Footer / Website Link at the bottom of the section */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pb-4">
        <a 
          href="https://www.swavani.in" 
          className="font-montserrat text-[9px] md:text-[11px] uppercase tracking-[0.6em] text-[#FBF9F6] hover:text-zari transition-colors drop-shadow-md font-semibold"
        >
          W W W . S W A V A N I . I N
        </a>
      </div>
    </section>
  );
}
