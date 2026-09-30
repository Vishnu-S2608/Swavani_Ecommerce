'use client';

import { useEffect, useRef } from 'react';

type CursorLabel = 'EXPLORE' | 'VIEW' | 'OPEN' | '';

/**
 * Premium custom cursor with smooth inertia.
 * - Small precise dot tracks cursor exactly (RAF)
 * - Large ring follows with lag (lerp factor 0.12)
 * - Label appears on hover targets
 * - Disappears on touch devices via CSS
 */
export function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);

  // Current ring position (lerped)
  const ringPos   = useRef({ x: -100, y: -100 });
  // Target (exact cursor position)
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMove = (e: PointerEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterExplore = () => {
      document.body.classList.add('cursor-explore');
      if (labelRef.current) labelRef.current.textContent = 'EXPLORE';
    };
    const onEnterView = () => {
      document.body.classList.add('cursor-view');
      if (labelRef.current) labelRef.current.textContent = 'VIEW';
    };
    const onEnterOpen = () => {
      document.body.classList.add('cursor-open');
      if (labelRef.current) labelRef.current.textContent = 'OPEN';
    };
    const onLeave = () => {
      document.body.classList.remove('cursor-explore', 'cursor-view', 'cursor-open');
    };

    // Attach hover listeners to matching elements
    const attachListeners = () => {
      document.querySelectorAll('[data-cursor="explore"]').forEach(el => {
        el.addEventListener('pointerenter', onEnterExplore);
        el.addEventListener('pointerleave', onLeave);
      });
      document.querySelectorAll('[data-cursor="view"]').forEach(el => {
        el.addEventListener('pointerenter', onEnterView);
        el.addEventListener('pointerleave', onLeave);
      });
      document.querySelectorAll('button, a, [data-cursor="open"]').forEach(el => {
        el.addEventListener('pointerenter', onEnterOpen);
        el.addEventListener('pointerleave', onLeave);
      });
    };

    // RAF loop: dot follows exactly, ring lerps
    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${targetPos.current.x}px - 50%), calc(${targetPos.current.y}px - 50%))`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform =
          `translate(${targetPos.current.x + 16}px, ${targetPos.current.y + 16}px)`;
      }

      const lerp = 0.12;
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%))`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove);
    attachListeners();
    rafRef.current = requestAnimationFrame(loop);

    // Re-attach when DOM changes (new elements rendered)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      document.body.classList.remove('cursor-explore', 'cursor-view', 'cursor-open');
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}   className="cine-cursor-dot"   />
      <div ref={ringRef}  className="cine-cursor-ring"  />
      <div ref={labelRef} className="cine-cursor-label" />
    </>
  );
}
