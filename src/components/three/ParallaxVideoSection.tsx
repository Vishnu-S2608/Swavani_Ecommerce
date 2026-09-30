'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

/**
 * ParallaxVideoSection
 * Lazy-loads DepthParallaxVideo (ssr:false — no "window is not defined" errors).
 * Shows the poster image instantly while WebGL loads — no layout shift.
 * Overlay children (headline, CTAs, ornaments) sit above the video on z-10.
 */
const DepthParallaxVideo = dynamic(() => import('./DepthParallaxVideo'), {
  ssr: false,
  loading: () => null,
});

type Props = {
  mp4: string;
  webm?: string;
  poster: string;
  depth: string;
  strength?: number;
  className?: string;
  children?: ReactNode; // headline, buttons, ornaments
};

export default function ParallaxVideoSection({
  poster,
  children,
  className = '',
  ...video
}: Props) {
  return (
    <section className={`relative isolate overflow-hidden ${className}`}>
      {/* Poster shows instantly, stays behind while WebGL canvas loads */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* WebGL parallax canvas */}
      <div className="absolute inset-0 -z-10">
        <DepthParallaxVideo
          poster={poster}
          {...video}
          className="h-full w-full"
        />
      </div>
      {/* Overlay: headline, CTAs, etc. */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
