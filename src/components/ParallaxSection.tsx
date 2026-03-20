import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** How much the section scales down as the next section covers it */
  scaleAmount?: number;
  /** Whether this section sticks and gets covered by the next */
  sticky?: boolean;
  /** Fade out as it gets covered */
  fadeOut?: boolean;
  /** z-index layer order (higher = on top) */
  zIndex?: number;
}

export default function ParallaxSection({
  children,
  className = "",
  scaleAmount = 0.05,
  sticky = true,
  fadeOut = true,
  zIndex = 1,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Reduce effect intensity on mobile for performance
  const mobileScale = isMobile ? scaleAmount * 0.4 : scaleAmount;
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - mobileScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, fadeOut ? (isMobile ? 0.8 : 0.6) : 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0px", isMobile ? "12px" : "20px"]);

  if (!sticky) {
    return (
      <div className={`relative ${className}`} style={{ zIndex }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={{ zIndex }}>
      {/* Sticky inner container that stays in view while parent scrolls */}
      <div className="sticky top-0">
        <motion.div
          style={{
            scale,
            opacity,
            borderRadius,
            transformOrigin: "center center",
            overflow: "hidden",
            willChange: "transform, opacity",
            boxShadow: "0 -8px 30px -5px rgba(0,0,0,0.12), 0 -2px 6px -2px rgba(0,0,0,0.06)",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
