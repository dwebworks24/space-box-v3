import { forwardRef } from "react";
import { motion } from "framer-motion";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AnimatedTitleProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  /** "word" splits by word, "char" splits by character */
  splitBy?: "word" | "char";
  once?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.05,
      delayChildren: delay,
    },
  }),
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

const charVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const AnimatedTitle = forwardRef<HTMLElement, AnimatedTitleProps>(function AnimatedTitle({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  splitBy = "word",
  once = true,
}, _ref) {
  const items =
    splitBy === "word"
      ? children.split(" ")
      : children.split("");

  const variants = splitBy === "word" ? wordVariants : charVariants;

  return (
    <Tag className={className} style={{ overflow: "hidden" }}>
      <motion.span
        className="inline-flex flex-wrap pb-2"
        variants={containerVariants}
        custom={delay}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.3 }}
      >
        {items.map((item, i) => (
          <motion.span
            key={`${item}-${i}`}
            variants={variants}
            className="inline-block"
          >
            {item}
            {splitBy === "word" && i < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
});

export default AnimatedTitle;
