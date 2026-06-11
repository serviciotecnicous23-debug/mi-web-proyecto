/**
 * PageTransition — ASCUA flame warp.
 *
 * En cada cambio de ruta, una esfera de fuego nace en el punto exacto
 * del ultimo clic del usuario, envuelve la pantalla y se desvanece
 * revelando la nueva pagina (alusion directa al logo del ministerio).
 * Cero cambios necesarios en botones o links: escuchamos pointerdown
 * a nivel de window. Respeta prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";

const lastClick = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  lastClick.x = window.innerWidth / 2;
  lastClick.y = window.innerHeight / 2;
  window.addEventListener(
    "pointerdown",
    (e: PointerEvent) => {
      lastClick.x = e.clientX;
      lastClick.y = e.clientY;
    },
    { capture: true, passive: true }
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const childRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const prevLoc = useRef<string | null>(null);

  useEffect(() => {
    const child = childRef.current;
    const orb = orbRef.current;
    if (!child || !orb) return;

    const isFirstMount = prevLoc.current === null;
    prevLoc.current = location;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (isFirstMount) {
      const intro = gsap.fromTo(
        child,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", clearProps: "transform" }
      );
      return () => { intro.kill(); };
    }

    orb.style.left = lastClick.x + "px";
    orb.style.top = lastClick.y + "px";

    const tl = gsap.timeline();
    tl.set(child, { opacity: 0 })
      .set(orb, { display: "block", xPercent: -50, yPercent: -50, scale: 0, opacity: 1 })
      .to(orb, { scale: 60, duration: 0.5, ease: "power3.in" })
      .fromTo(
        child,
        { opacity: 0, y: 14, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out", clearProps: "filter,transform" },
        ">-0.08"
      )
      .to(orb, { opacity: 0, duration: 0.45, ease: "power2.out" }, "<+0.05")
      .set(orb, { display: "none", scale: 0 });

    return () => { tl.kill(); };
  }, [location]);

  return (
    <>
      <div
        ref={orbRef}
        aria-hidden="true"
        style={{
          display: "none",
          position: "fixed",
          left: 0,
          top: 0,
          width: 60,
          height: 60,
          borderRadius: "50%",
          zIndex: 9998,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 38% 32%, #FFD66B 0%, #FFB000 22%, #FF5A1F 55%, #FF2D55 78%, #6E0D1F 100%)",
          boxShadow: "0 0 90px 36px rgba(255,90,31,0.45)",
          willChange: "transform",
        }}
      />
      <div ref={childRef}>{children}</div>
    </>
  );
}
