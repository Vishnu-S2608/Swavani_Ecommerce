"use client";
import React, { useEffect, useRef, useState } from "react";

export function CurtainIntro() {
  const [opened, setOpened] = useState(false);
  const [removed, setRemoved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Start curtain opening after a short delay
    const openTimer = setTimeout(() => {
      setOpened(true);
    }, 1000);

    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 2800);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Gold dust particles on background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
      maxAlpha: number;
      pulse: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.2,
        alpha: Math.random() * 0.5,
        maxAlpha: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * 0.02 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.pulse;

        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.pulse = -p.pulse;
        }

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `rgba(232, 200, 122, ${Math.max(0, p.alpha)})`);
        grad.addColorStop(0.5, `rgba(201, 163, 95, ${Math.max(0, p.alpha * 0.6)})`);
        grad.addColorStop(1, "rgba(201, 163, 95, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (removed) {
    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full opacity-60"
      />
    );
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full opacity-60"
      />
      {/* Curtain Layer */}
      <div
        id="curtains"
        className="fixed inset-0 z-[9999] flex pointer-events-none overflow-hidden"
      >
        {/* Left Curtain */}
        <div
          className={`w-1/2 h-full relative transition-transform duration-[1600ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            opened ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{
            background: "linear-gradient(105deg, #150802 0%, #1c0e05 40%, #0d1a0e 100%)",
            boxShadow: "inset -20px 0 40px rgba(0,0,0,0.8)",
          }}
        >
          {/* Fabric Folds */}
          <div className="absolute inset-0 flex opacity-40 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.4), rgba(201,163,95,0.06), rgba(0,0,0,0.4))",
                }}
              />
            ))}
          </div>
          {/* Gold seam trim */}
          <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-[#e8c87a] via-[#c9a35f] to-transparent shadow-[0_0_15px_#e8c87a]" />
        </div>

        {/* Center Glow Flare Line (fades on open) */}
        {!opened && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="w-[2px] h-[60vh] bg-gradient-to-b from-transparent via-[#e8c87a] to-transparent shadow-[0_0_30px_#e8c87a] animate-pulse" />
            <div className="absolute text-center">
              <span className="font-serif tracking-[0.35em] text-[#e8c87a] text-xs uppercase block mb-2 opacity-80">
                Woven In Pure Silk
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#f5ead8] tracking-widest drop-shadow-[0_0_20px_rgba(232,200,122,0.6)]">
                SWAVANI
              </h2>
            </div>
          </div>
        )}

        {/* Right Curtain */}
        <div
          className={`w-1/2 h-full relative transition-transform duration-[1600ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            opened ? "translate-x-full" : "translate-x-0"
          }`}
          style={{
            background: "linear-gradient(255deg, #150802 0%, #1c0e05 40%, #0d1a0e 100%)",
            boxShadow: "inset 20px 0 40px rgba(0,0,0,0.8)",
          }}
        >
          {/* Fabric Folds */}
          <div className="absolute inset-0 flex opacity-40 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  background:
                    "linear-gradient(to left, rgba(0,0,0,0.4), rgba(201,163,95,0.06), rgba(0,0,0,0.4))",
                }}
              />
            ))}
          </div>
          {/* Gold seam trim */}
          <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#e8c87a] via-[#c9a35f] to-transparent shadow-[0_0_15px_#e8c87a]" />
        </div>
      </div>
    </>
  );
}
