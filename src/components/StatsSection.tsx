import { motion, useInView, useSpring, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import ctaBg from "@/assets/cta-bg.jpg";

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
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: easeOut, delay: 0.3 },
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
          src={ctaBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

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
            whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
            className="group cursor-default"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full border-[3px] border-white/80 outline outline-[3px] outline-offset-4 outline-white/40 flex items-center justify-center">
              <span className="text-3xl md:text-5xl font-display text-secondary drop-shadow-lg">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </span>
            </div>
            <motion.div
              variants={lineReveal}
              className="h-[2px] w-12 bg-secondary/50 mx-auto my-4 origin-center group-hover:w-20 transition-all duration-500"
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
