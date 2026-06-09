/**
 * PageTransition — transicion de ruta suave estilo "brasas".
 *
 * v7: se elimino el velo oscuro que barria la pantalla (causaba un
 * destello brusco en cada navegacion). Ahora el contenido entra con
 * un fundido calido: opacidad + leve desenfoque que se enfoca, sin
 * flashes ni saltos. Compatible con Wouter via `useLocation`.
 */

import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const childRef = useRef<HTMLDivElement>(null);
  const prevLoc = useRef<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      prevLoc.current = location;
      return;
    }

    const child = childRef.current;
    if (!child) return;

    const isFirstMount = prevLoc.current === null;
    prevLoc.current = location;

    // Fundido de brasas: el contenido emerge enfocandose suavemente.
    const tween = gsap.fromTo(
      child,
      {
        opacity: 0,
        y: isFirstMount ? 18 : 12,
        filter: "blur(10px) brightness(1.15)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px) brightness(1)",
        duration: isFirstMount ? 0.6 : 0.45,
        ease: "power2.out",
        clearProps: "filter,transform",
      }
    );

    return () => {
      tween.kill();
    };
  }, [location]);

  return <div ref={childRef}>{children}</div>;
}
