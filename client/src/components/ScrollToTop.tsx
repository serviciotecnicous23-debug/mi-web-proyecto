import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Scrolls to top on route change
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

/**
 * Floating "back to top" button that appears after scrolling down.
 * Includes a progress ring showing scroll position.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setVisible(scrollTop > 400);
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <Button
      variant="outline"
      size="icon"
      className="back-to-top fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur-xs border-2 hover:scale-110 transition-all duration-200 group"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90 h-12 w-12"
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted/30"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-150"
        />
      </svg>
      <ArrowUp className="h-5 w-5 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
    </Button>
  );
}
