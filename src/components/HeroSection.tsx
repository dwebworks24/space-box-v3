import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// Scene 1: Sofa/Living Room
import bgImage from "@/assets/hero/sofa-main-bg.webp";
import pillarImage from "@/assets/hero/sofa-pillar.webp";
import rackImage from "@/assets/hero/sofa-rack.webp";
import lightImage from "@/assets/hero/sofa-light.webp";
import sofaImage from "@/assets/hero/sofa-main.webp";
import table1Image from "@/assets/hero/sofa-table1.webp";
import table2Image from "@/assets/hero/sofa-table2.webp";
import chairImage from "@/assets/hero/sofa-chair.webp";

// Scene 2: Modern Living Room
import livingBg from "@/assets/hero/living-bg.webp";
import livingSofa from "@/assets/hero/living-sofa.png";
import livingTable from "@/assets/hero/living-table.png";
import livingLamp from "@/assets/hero/living-lamp.png";
import livingPlant from "@/assets/hero/living-plant.png";
import livingChair from "@/assets/hero/living-chair.png";
import livingArt from "@/assets/hero/living-art.png";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface HeroPart {
  src: string;
  alt: string;
  className: string;
  initial: Record<string, number>;
  animate: Record<string, number>;
  transition: { duration: number; delay?: number; ease: [number, number, number, number] };
}

const scene1Parts: HeroPart[] = [
  {
    src: bgImage,
    alt: "Night sky background",
    className: "absolute inset-0 w-full h-full object-cover",
    initial: { opacity: 0, scale: 1.3 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.8, ease: easeOut },
  },
  {
    src: pillarImage,
    alt: "Architectural pillars",
    className: "absolute inset-0 w-full h-full object-cover object-center",
    initial: { opacity: 0, y: -120 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.4, delay: 0.3, ease: easeOut },
  },
  {
    src: rackImage,
    alt: "Bookshelf rack",
    className: "absolute left-0 top-[8%] h-[75%] w-auto max-w-[35%] object-contain object-left",
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.3, delay: 0.6, ease: easeOut },
  },
  {
    src: lightImage,
    alt: "Pendant lights",
    className: "absolute top-0 left-[30%] right-[10%] h-[45%] object-contain object-top",
    initial: { opacity: 0, y: -180 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5, delay: 0.5, ease: easeOut },
  },
  {
    src: sofaImage,
    alt: "Green sofa",
    className: "absolute bottom-[2%] left-[15%] right-[10%] h-[38%] object-contain object-bottom",
    initial: { opacity: 0, y: 150 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.4, delay: 0.8, ease: easeOut },
  },
  {
    src: table1Image,
    alt: "Coffee tables",
    className: "absolute bottom-[5%] right-[8%] h-[25%] w-auto object-contain",
    initial: { opacity: 0, x: 180 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.3, delay: 1.0, ease: easeOut },
  },
  {
    src: table2Image,
    alt: "Side table",
    className: "absolute bottom-[10%] left-[2%] h-[30%] w-auto object-contain",
    initial: { opacity: 0, x: -150 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.2, delay: 1.1, ease: easeOut },
  },
  {
    src: chairImage,
    alt: "Accent chair",
    className: "absolute bottom-[5%] right-[0%] h-[35%] w-auto object-contain",
    initial: { opacity: 0, x: 200 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.3, delay: 0.9, ease: easeOut },
  },
];

const scene2Parts: HeroPart[] = [
  {
    src: livingBg,
    alt: "Modern living room",
    className: "absolute inset-0 w-full h-full object-cover",
    initial: { opacity: 0, scale: 1.3 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.8, ease: easeOut },
  },
  {
    src: livingArt,
    alt: "Wall art",
    className: "absolute top-[5%] right-[15%] h-[32%] w-auto object-contain",
    initial: { opacity: 0, y: -150 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.4, delay: 0.3, ease: easeOut },
  },
  {
    src: livingLamp,
    alt: "Floor lamp",
    className: "absolute bottom-[5%] left-[3%] h-[55%] w-auto object-contain",
    initial: { opacity: 0, x: -180 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.5, delay: 0.5, ease: easeOut },
  },
  {
    src: livingSofa,
    alt: "Sectional sofa",
    className: "absolute bottom-[3%] left-[18%] right-[10%] h-[35%] object-contain object-bottom",
    initial: { opacity: 0, y: 160 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.4, delay: 0.7, ease: easeOut },
  },
  {
    src: livingTable,
    alt: "Coffee table",
    className: "absolute bottom-[8%] left-[35%] h-[20%] w-auto object-contain",
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.3, delay: 0.9, ease: easeOut },
  },
  {
    src: livingPlant,
    alt: "Monstera plant",
    className: "absolute bottom-[5%] right-[2%] h-[38%] w-auto object-contain",
    initial: { opacity: 0, x: 180 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.2, delay: 1.0, ease: easeOut },
  },
  {
    src: livingChair,
    alt: "Accent chair",
    className: "absolute bottom-[8%] right-[12%] h-[28%] w-auto object-contain",
    initial: { opacity: 0, x: 150 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.3, delay: 0.8, ease: easeOut },
  },
];

const scenes = [scene1Parts, scene2Parts];
const SLIDE_DURATION = 8000; // ms per slide

const textContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 1.6 } },
};

const fadeBlurUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOut },
  },
};

const SceneLayer = ({ parts, sceneKey }: { parts: HeroPart[]; sceneKey: number }) => (
  <motion.div
    key={sceneKey}
    className="absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.2, ease: easeOut }}
  >
    {parts.map((part, i) => (
      <motion.img
        key={`${sceneKey}-${i}`}
        src={part.src}
        alt={part.alt}
        className={part.className}
        initial={part.initial}
        animate={part.animate}
        transition={part.transition}
      />
    ))}
  </motion.div>
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const nextScene = useCallback(() => {
    setActiveScene((prev) => (prev + 1) % scenes.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextScene, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextScene]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[75vh] sm:min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Composite image layers with slider */}
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        <AnimatePresence mode="wait">
          <SceneLayer parts={scenes[activeScene]} sceneKey={activeScene} />
        </AnimatePresence>
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {scenes.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveScene(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === activeScene ? "w-8 bg-primary-foreground" : "w-4 bg-primary-foreground/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Text content */}
      <div className="relative z-10 flex items-center min-h-[75vh] sm:min-h-screen container mx-auto px-4 sm:px-8 md:px-16">
        <motion.div
          className="max-w-2xl pt-20 sm:pt-24 pb-16 sm:pb-0"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeBlurUp}
              className="text-primary-foreground/70 text-sm sm:text-base tracking-[0.3em] uppercase font-body mb-3"
            >
              Make your home
            </motion.p>

            <motion.h1
              variants={fadeBlurUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-primary-foreground"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A Reflection Of{" "}
              <span className="text-secondary">YOU</span>
            </motion.h1>

            <motion.div variants={fadeBlurUp} className="mt-8">
              <Link
                to="/start-project"
                className="inline-flex px-8 py-3.5 rounded-sm border border-primary-foreground/60 text-primary-foreground font-semibold tracking-widest uppercase text-sm hover:bg-primary-foreground hover:text-primary transition-all duration-500 ease-out"
              >
                Start Your Journey
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-primary-foreground/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
