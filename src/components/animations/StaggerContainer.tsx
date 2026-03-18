import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Container that staggers its children's animations.
 * Children should use variants with "hidden" and "visible" keys.
 */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}

export default function StaggerContainer({
  children,
  className = "",
  stagger = 0.08,
  delay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}
