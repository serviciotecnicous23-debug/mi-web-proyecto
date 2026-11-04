import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  offset?: number;
  once?: boolean;
}

/**
 * Wrapper que aplica un fade-in + slide-up suave cuando entra en el viewport.
 * Usa IntersectionObserver via useScrollAnimation. Pensado para envolver
 * secciones grandes (hero, cards, bloques de contenido).
 */
export default function AnimatedSection({
  children,
  delay = 0,
  duration = 0.7,
  offset = 24,
  once = true,
  className,
  ...rest
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
