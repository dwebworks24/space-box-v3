import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Cinematic image reveal — a solid mask slides away to unveil the image.
 * Inspired by Unseen Studio's editorial reveals.
 */

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the mask slides away: right, left, up, down */
  direction?: "right" | "left" | "up" | "down";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const maskMap = {
  right: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
  left: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
  up: { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" },
  down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
};

export default function ImageReveal({
  children,
  className = "",
  direction = "right",
  delay = 0,
  duration = 1.2,
  once = true,
}: ImageRevealProps) {
  const clip = maskMap[direction];

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: clip.hidden }}
      whileInView={{ clipPath: clip.visible }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, ease: EASE, delay }}
    >
      <motion.div
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        viewport={{ once, amount: 0.2 }}
        transition={{ duration: duration + 0.6, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
