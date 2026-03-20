import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** How much the section scales down as it scrolls away (0 = no scale, 0.08 = subtle) */
  scaleAmount?: number;
  /** How much the section translates up as next section covers it */
  translateAmount?: number;
  /** Whether this section sticks and gets covered by the next */
  sticky?: boolean;
  /** Fade out as it scrolls away */
  fadeOut?: boolean;
  /** Add a rounded reveal on the incoming section */
  roundedReveal?: boolean;
}

export default function ParallaxSection({
  children,
  className = "",
  scaleAmount = 0.06,
  translateAmount = -60,
  sticky = true,
  fadeOut = true,
  roundedReveal = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - scaleAmount]);
  const y = useTransform(scrollYProgress, [0, 1], [0, translateAmount]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, fadeOut ? 0.4 : 1]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.5],
    roundedReveal ? ["0px", "24px"] : ["0px", "0px"]
  );

  if (!sticky) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={{ zIndex: 1 }}>
      <motion.div
        style={{
          scale,
          y,
          opacity,
          borderRadius,
          transformOrigin: "center top",
          overflow: "hidden",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
