import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  scaleAmount?: number;
  sticky?: boolean;
  fadeOut?: boolean;
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
    <div ref={ref} className={`sticky top-0 ${className}`} style={{ zIndex }}>
      <motion.div
        style={{
          scale,
          opacity,
          borderRadius,
          transformOrigin: "center center",
          overflow: "hidden",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}