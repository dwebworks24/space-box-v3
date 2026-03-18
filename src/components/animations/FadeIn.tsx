import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

/**
 * Cinematic fade-in with optional blur and y-offset.
 * Wraps children in a motion.div with whileInView trigger.
 */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  once?: boolean;
  as?: "div" | "p" | "span";
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 40,
  blur = 0,
  once = true,
}: FadeInProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      ...(blur > 0 ? { filter: `blur(${blur}px)` } : {}),
    },
    visible: {
      opacity: 1,
      y: 0,
      ...(blur > 0 ? { filter: "blur(0px)" } : {}),
      transition: { duration, ease: EASE_OUT, delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
