import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef, useCallback } from "react";

/**
 * Magnetic hover effect — element subtly follows cursor.
 * Classic Unseen / award-winning studio interaction.
 */

interface MagneticWrapProps {
  children: ReactNode;
  className?: string;
  /** Strength of the pull (px of max displacement) */
  strength?: number;
}

export default function MagneticWrap({
  children,
  className = "",
  strength = 12,
}: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(((e.clientX - centerX) / (rect.width / 2)) * strength);
      y.set(((e.clientY - centerY) / (rect.height / 2)) * strength);
    },
    [strength, x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
