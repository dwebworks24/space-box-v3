import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Unseen Studio–style text reveal.
 * Each word (or line) slides up from behind a clipping mask with stagger.
 */

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]; // power4.inOut
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]; // power4.out

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Split by "word" (default) or "char" */
  splitBy?: "word" | "char";
  /** Seconds between each piece */
  stagger?: number;
  /** Base delay before animation starts */
  delay?: number;
  /** Duration per piece */
  duration?: number;
  /** Only animate once */
  once?: boolean;
  /** Additional children to render inline (e.g., <span> highlights) */
  inlineChildren?: ReactNode;
}

export default function SplitText({
  children,
  as: Tag = "h2",
  className = "",
  splitBy = "word",
  stagger = 0.04,
  delay = 0,
  duration = 0.9,
  once = true,
}: SplitTextProps) {
  const pieces = splitBy === "char" ? children.split("") : children.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3 }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {pieces.map((piece, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", rotate: 3, opacity: 0 },
                visible: {
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                  transition: { duration, ease: EASE_OUT },
                },
              }}
            >
              {piece}
              {splitBy === "word" && i < pieces.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
