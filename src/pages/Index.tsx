import { motion } from "framer-motion";

const brandCurve = [0.16, 1, 0.3, 1] as const;

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [...brandCurve] }}
      className="h-svh w-full bg-background p-6 sm:p-12 grid grid-cols-12 grid-rows-12 gap-4 sm:gap-6 text-foreground"
    >
      {/* Grid rim-light lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [...brandCurve] }}
        className="col-span-12 row-start-5 h-px bg-border origin-left self-start"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [...brandCurve], delay: 0.1 }}
        className="col-span-12 row-start-9 h-px bg-border origin-left self-start"
      />

      {/* L1: Brand */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [...brandCurve] }}
        className="col-span-12 row-span-4 self-end leading-none tracking-[-0.05em] font-bold"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 15vw, 14rem)",
          lineHeight: 0.85,
        }}
      >
        CERTA<span className="text-accent">.</span>
      </motion.h1>

      {/* L2: Value Prop */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [...brandCurve] }}
        className="col-span-12 sm:col-span-7 lg:col-span-6 row-span-4 self-center border-l border-border pl-6"
      >
        <p className="text-base sm:text-xl lg:text-2xl max-w-[44ch] text-pretty text-foreground/80">
          Strategic risk architecture for high-stakes transitions. We provide the structural certainty required for terminal-phase execution.
        </p>
      </motion.div>

      {/* L2b: Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [...brandCurve] }}
        className="hidden lg:flex col-span-5 col-start-8 row-span-4 self-center justify-end items-end"
      >
        <p
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-right max-w-[28ch]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The final word.
          <br />
          No fluff. No decks.
          <br />
          Just the resolution.
        </p>
      </motion.div>

      {/* L3: Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: [...brandCurve] }}
        className="col-span-6 sm:col-span-5 lg:col-span-4 row-start-10 sm:row-start-11 self-end"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground tabular-nums">
          Available for Q4 Mandates — 84% Capacity
        </p>
        <div className="mt-3 flex gap-6">
          <a
            href="#"
            className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            [Twitter]
          </a>
          <a
            href="#"
            className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            [LinkedIn]
          </a>
        </div>
      </motion.div>

      {/* L3: Action */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2, ease: [...brandCurve] }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 50px rgba(255,92,0,0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        className="col-span-6 sm:col-span-4 lg:col-span-3 col-start-7 sm:col-start-9 lg:col-start-10 row-start-10 sm:row-start-11 row-span-2 sm:row-span-1 self-end h-14 sm:h-16 bg-accent text-accent-foreground font-bold uppercase tracking-[-0.02em] text-sm sm:text-base rounded-none cursor-pointer"
        style={{
          fontFamily: "var(--font-display)",
          transition: "box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        Initiate Contact
      </motion.button>
    </motion.div>
  );
};

export default Index;
