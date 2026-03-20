import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // As this section scrolls away, it scales down and fades
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - scaleAmount]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, fadeOut ? 0.6 : 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0px", "20px"]);

  if (!sticky) {
    return (
      <div className={`relative ${className}`} style={{ zIndex }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`sticky top-0 ${className}`} style={{ zIndex }}>
      <motion.div
        style={{
          scale,
          opacity,
          borderRadius,
          transformOrigin: "center center",
          overflow: "hidden",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
