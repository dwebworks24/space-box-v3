import { motion, useInView, useSpring, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import statsBg from "@/assets/stats-bg.png";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stats = [
  { value: 75, suffix: "+", label: "Projects Completed" },
  { value: 400, suffix: "K", label: "Sq Ft Designed" },
  { value: 12, suffix: "+", label: "Team Members" },
  { value: 7, suffix: "+", label: "Years of Experience" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 50, damping: 20 });
  const display = useTransform(springVal, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, motionVal, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const statVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.7, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

const ringReveal = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: easeOut },
  },
};

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[400px] flex items-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
        style={{ y: bgY }}
      >
        <img
          src={statsBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Left decorative shapes */}
      <div className="absolute left-0 top-0 bottom-0 z-[1] pointer-events-none hidden md:block">
        <motion.div
          className="absolute -left-8 top-1/4 w-40 h-40 border-2 border-white/10 rounded-full"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut }}
        />
        <motion.div
          className="absolute -left-4 top-[60%] w-24 h-24 border border-secondary/20 rotate-45"
          initial={{ opacity: 0, x: -30, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut, delay: 0.2 }}
        />
        <motion.div
          className="absolute left-6 top-[15%] w-3 h-3 rounded-full bg-secondary/30"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </div>

      {/* Right decorative shapes */}
      <div className="absolute right-0 top-0 bottom-0 z-[1] pointer-events-none hidden md:block">
        <motion.div
          className="absolute -right-8 bottom-1/4 w-40 h-40 border-2 border-white/10 rounded-full"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut }}
        />
        <motion.div
          className="absolute -right-4 top-[30%] w-24 h-24 border border-secondary/20 rotate-45"
          initial={{ opacity: 0, x: 30, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: 45 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut, delay: 0.2 }}
        />
        <motion.div
          className="absolute right-6 bottom-[15%] w-3 h-3 rounded-full bg-secondary/30"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={statVariant}
            whileHover={{ scale: 1.1, y: -4, transition: { type: "spring", stiffness: 300 } }}
            className="group cursor-default"
          >
            {/* SVG ring draw animation */}
            <div className="w-28 h-28 md:w-36 md:h-36 mx-auto relative flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  variants={ringReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </svg>
              <span className="text-3xl md:text-5xl font-display text-secondary drop-shadow-lg">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </span>
            </div>
            <motion.div
              className="h-[2px] w-12 bg-secondary/50 mx-auto my-4 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.5 }}
            />
            <div className="text-white/80 text-sm font-body uppercase tracking-widest">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsSection;
