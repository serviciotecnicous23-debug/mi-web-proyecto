/**
 * FlameLogoSVG — Animated SVG isotipo for "Avivando el Fuego"
 *
 * Three-layer flame design:
 *   1. Outer flame  — deep crimson → amber gradient, subtle glow filter
 *   2. Inner flame  — golden → near-white gradient, slightly transparent
 *   3. Hot core     — pure white dot, simulates the flame's hottest point
 *
 * GSAP drives an organic "breathing" loop on each layer with staggered
 * timing so the layers feel alive. Respects prefers-reduced-motion.
 */

import { useEffect, useId, useRef } from 'react';
import gsap from 'gsap';

interface FlameLogoSVGProps {
  /** Tailwind size class, e.g. "w-8 h-8" or "w-20 h-20" */
  className?: string;
  /** Pass false to render the static SVG (e.g. inside <img> tags) */
  animate?: boolean;
}

export function FlameLogoSVG({ className = 'w-8 h-8', animate = true }: FlameLogoSVGProps) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const outerRef = useRef<SVGPathElement>(null);
  const innerRef = useRef<SVGPathElement>(null);
  const coreRef  = useRef<SVGCircleElement>(null);
  const glowRef  = useRef<SVGPathElement>(null);   // duplicate outer path for glow layer

  // El logo se dibuja varias veces en la misma página (menú, menú del teléfono, pie):
  // cada uno con sus propios identificadores de degradado y brillo, sin repetirlos.
  const id = useId();
  const outerGrad = `af-outer-grad-${id}`;
  const innerGrad = `af-inner-grad-${id}`;
  const outerGlow = `af-outer-glow-${id}`;
  const coreGlow  = `af-core-glow-${id}`;

  useEffect(() => {
    if (!animate) return;
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // ── Outer flame: slow upward "sway" + scale breathe ──────────────
      gsap.to(outerRef.current, {
        scaleY: 1.06,
        scaleX: 0.97,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '50% 95%',
      });

      // ── Glow duplicate: pulses opacity for a halo effect ─────────────
      gsap.to(glowRef.current, {
        opacity: 0.35,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4,
      });

      // ── Inner flame: slightly faster, independent phase ───────────────
      gsap.to(innerRef.current, {
        scaleY: 1.09,
        opacity: 0.6,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '50% 90%',
        delay: 0.2,
      });

      // ── Hot core: fast flicker, simulates candle-core intensity ───────
      gsap.to(coreRef.current, {
        r: 2.2,
        opacity: 0.55,
        duration: 0.85,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.6,
      });

    }, svgRef); // scope all tweens to the SVG element

    return () => ctx.revert();
  }, [animate]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 40 52"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Avivando el Fuego — llama"
    >
      <defs>
        {/* ── Outer flame gradient: base red → amber → gold tip ── */}
        <linearGradient id={outerGrad} x1="30%" y1="100%" x2="20%" y2="0%">
          <stop offset="0%"   stopColor="#b91c1c" />   {/* deep crimson  */}
          <stop offset="30%"  stopColor="#ea580c" />   {/* burnt orange  */}
          <stop offset="65%"  stopColor="#f97316" />   {/* vivid orange  */}
          <stop offset="100%" stopColor="#fbbf24" />   {/* warm amber    */}
        </linearGradient>

        {/* ── Inner flame gradient: orange → ivory ── */}
        <linearGradient id={innerGrad} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="#fb923c" />
          <stop offset="60%"  stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fffbeb" />
        </linearGradient>

        {/* ── Blurred glow layer behind the outer flame ── */}
        <filter id={outerGlow} x="-60%" y="-40%" width="220%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blurred" />
          <feColorMatrix
            in="blurred" type="matrix"
            values="1 0.3 0 0 0.15   0.1 0.1 0 0 0   0 0 0 0 0   0 0 0 1.8 0"
            result="colorBurned"
          />
          <feMerge>
            <feMergeNode in="colorBurned" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ── Crisp inner-core glow ── */}
        <filter id={coreGlow} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/*
        ── Glow halo (blurred duplicate, animates opacity) ─────────────
        Rendered BELOW the main paths so it creates an aura effect.
      */}
      <path
        ref={glowRef}
        d="M20,3 C22.5,8 31,15 31,25 C31,36.5 26,45 20,48 C14,45 9,36.5 9,25 C9,15 17.5,8 20,3 Z"
        fill={`url(#${outerGrad})`}
        filter={`url(#${outerGlow})`}
        opacity="0.18"
      />

      {/* ── Outer flame body ────────────────────────────────────────── */}
      <path
        ref={outerRef}
        d="M20,3 C22.5,8 31,15 31,25 C31,36.5 26,45 20,48 C14,45 9,36.5 9,25 C9,15 17.5,8 20,3 Z"
        fill={`url(#${outerGrad})`}
      />

      {/* ── Inner lighter flame ─────────────────────────────────────── */}
      <path
        ref={innerRef}
        d="M20,15 C21.5,19.5 25.5,23 25.5,29.5 C25.5,35.5 23,40 20,42 C17,40 14.5,35.5 14.5,29.5 C14.5,23 18.5,19.5 20,15 Z"
        fill={`url(#${innerGrad})`}
        opacity="0.8"
      />

      {/* ── Hot core — white dot, filter gives it a radiant halo ─────── */}
      <circle
        ref={coreRef}
        cx="20"
        cy="33"
        r="3"
        fill="white"
        opacity="0.75"
        filter={`url(#${coreGlow})`}
      />
    </svg>
  );
}
