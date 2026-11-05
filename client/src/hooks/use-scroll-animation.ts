import { useEffect, useRef, useState, type RefObject } from "react";

interface UseScrollAnimationOptions {
  /** Umbral de visibilidad (0..1) para disparar la animacion. */
  threshold?: number;
  /** Margen extra en pixeles antes/despues del viewport (rootMargin). */
  rootMargin?: string;
  /** Si es true, una vez visible se queda visible (no vuelve a animar al salir). */
  once?: boolean;
}

/**
 * Hook que detecta cuando un elemento entra en el viewport usando IntersectionObserver.
 * Devuelve un ref para asignar al elemento y un booleano `isVisible`.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {},
): { ref: RefObject<T | null>; isVisible: boolean } {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

export default useScrollAnimation;
