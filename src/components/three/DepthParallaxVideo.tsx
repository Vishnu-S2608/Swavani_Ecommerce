'use client';

/**
 * True 3D-parallax video: a grayscale depth map (white = near, black = far) shifts each pixel of the
 * video by a different amount as the cursor moves, so foreground and background separate.
 *
 * Best for clips with a STATIC or very slow camera (floating silk, macro weave).
 * Needs:  npm i three   and   npm i -D @types/three
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Props = {
  mp4: string;
  webm?: string;
  poster: string;
  /** Grayscale depth image made from one frame of the video (same aspect ratio). */
  depth: string;
  /** How far near pixels shift. 0.01 subtle – 0.03 strong. Higher values stretch edges. */
  strength?: number;
  className?: string;
};

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0); // full-screen quad, no camera maths needed
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVideo;
  uniform sampler2D uDepth;
  uniform vec2 uMouse;      // -1 … 1
  uniform float uStrength;
  void main() {
    float d = texture2D(uDepth, vUv).r;                 // 0 far … 1 near
    vec2 shift = uMouse * (d - 0.5) * uStrength;        // near and far move in opposite directions
    gl_FragColor = texture2D(uVideo, clamp(vUv + shift, 0.0, 1.0));
  }
`;

export default function DepthParallaxVideo({
  mp4, webm, poster, depth, strength = 0.018, className = '',
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const video = videoRef.current;
    if (!host || !video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFallback(true);
      video.play().catch(() => {});
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    } catch {
      setFallback(true);
      video.play().catch(() => {});
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    host.appendChild(renderer.domElement);

    // Textures stay in default colour-space: shader passes colours straight through.
    const videoTex = new THREE.VideoTexture(video);
    videoTex.minFilter = THREE.LinearFilter;
    videoTex.magFilter = THREE.LinearFilter;
    videoTex.generateMipmaps = false;
    const depthTex = new THREE.TextureLoader().load(depth);

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uVideo: { value: videoTex },
        uDepth: { value: depthTex },
        uMouse: { value: new THREE.Vector2() },
        uStrength: { value: strength },
      },
      depthTest: false,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(geometry, material));
    const camera = new THREE.Camera();

    const resize = () => renderer.setSize(host.clientWidth, host.clientHeight, false);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // On pointer devices: track cursor. On touch: gentle automatic sway.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const target = new THREE.Vector2();
    const current = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      target.set(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      );
    };
    if (fine) window.addEventListener('pointermove', onMove);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) video.play().catch(() => {}); else video.pause();
    });
    io.observe(host);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (!fine) {
        const t = performance.now() / 1000;
        target.set(Math.sin(t * 0.4) * 0.6, Math.cos(t * 0.3) * 0.3);
      }
      current.lerp(target, 0.06); // silky easing
      (material.uniforms.uMouse.value as THREE.Vector2).copy(current);
      renderer.render(scene, camera);
    };
    video.play().catch(() => {});
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      geometry.dispose();
      material.dispose();
      videoTex.dispose();
      depthTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [depth, strength]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', background: '#3a0615' }}
    >
      {/* Hidden video feeds WebGL texture; shown only when WebGL is unavailable */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        style={
          fallback
            ? { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
            : { position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }
        }
      >
        {webm && <source src={webm} type="video/webm" />}
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}
