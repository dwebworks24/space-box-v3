import { motion } from "framer-motion";

/**
 * A horizontal line that reveals from left to right (or right to left).
 * Used as editorial section dividers.
 */

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface LineRevealProps {
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "left" | "right";
  once?: boolean;
}

export default function LineReveal({
  className = "h-px w-full bg-border",
  delay = 0.3,
  duration = 1,
  direction = "left",
  once = true,
}: LineRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once, amount: 0.5 }}
      transition={{ duration, ease: EASE, delay }}
      style={{ originX: direction === "left" ? 0 : 1 }}
    />
  );
}
