import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import slide1 from "@/assets/homepage-banner1.png";
import slide2 from "@/assets/hero-slide2.png";
import slide3 from "@/assets/hero-slide3.jpg";
import slide4 from "@/assets/hero-slide4.jpg";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const slides = [
  { src: slide1, alt: "Modern cafeteria interior design" },
  { src: slide2, alt: "Elegant drawing room interior" },
  { src: slide3, alt: "Luxury living room with golden accents" },
  { src: slide4, alt: "Contemporary living room with designer lighting" },
];

const SLIDE_DURATION = 8000;

const slideContent = [
  { watermarkTop: "INTERIOR", headline: "From Concept to Execution Precision in Every Detail", watermarkBottom: "DESIGN" },
  { watermarkTop: "SPACEBOX", headline: "Crafting Spaces That Inspire Elegance in Every Corner", watermarkBottom: "CONCEPTS" },
];

const watermarkVariants = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: 40,
    filter: "blur(8px)",
    transition: { duration: 0.5, ease: easeOut },
  },
};

/* Smooth word-by-word headline animation */
const headlineContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.6 },
  },
  exit: {
    transition: { staggerChildren: 0.03 },
  },
};

const headlineWordVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: easeOut },
  },
};

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

  const goNext = useCallback(() => {
    setActiveScene((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveScene((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [goNext]);

  const current = slideContent[activeScene];
  const words = current.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Background image with Ken Burns */}
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: easeOut }}
          >
            <motion.img
              src={slides[activeScene].src}
              alt={slides[activeScene].alt}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Left sidebar */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6">
        {["instagram", "facebook", "twitter"].map((social) => (
          <a
            key={social}
            href="#"
            className="w-7 h-7 flex items-center justify-center text-primary-foreground/50 hover:text-secondary transition-colors duration-300"
            aria-label={social}
          >
            <span className="text-xs uppercase tracking-widest" style={{ writingMode: "vertical-lr" }}>
              {social === "instagram" ? "IG" : social === "facebook" ? "FB" : "TW"}
            </span>
          </a>
        ))}
        <div className="w-px h-12 bg-primary-foreground/20" />
        <a
          href="tel:+919876543210"
          className="text-primary-foreground/50 hover:text-secondary transition-colors"
          style={{ writingMode: "vertical-lr" }}
        >
          <span className="text-xs tracking-wider">+91 98765 43210</span>
        </a>
        <div className="w-px h-12 bg-primary-foreground/20" />
        <a
          href="mailto:info@spaceboxconcepts.com"
          className="text-primary-foreground/50 hover:text-secondary transition-colors"
          style={{ writingMode: "vertical-lr" }}
        >
          <span className="text-xs tracking-wider">info@spaceboxconcepts.com</span>
        </a>
      </div>

      {/* Text content */}
      <div className="relative z-10 flex items-center min-h-[75vh] sm:min-h-screen container mx-auto px-4 sm:px-8 md:px-16 lg:pl-24">
        <motion.div
          className="max-w-2xl pt-20 sm:pt-24 pb-16 sm:pb-0 relative"
          style={{ y: textY, opacity: textOpacity }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={activeScene} className="relative">
              {/* Watermark top */}
              <motion.span
                variants={watermarkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="block text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none uppercase select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  WebkitTextStroke: "1px hsl(var(--primary-foreground) / 0.08)",
                  color: "transparent",
                  lineHeight: 0.85,
                }}
              >
                {current.watermarkTop}
              </motion.span>

              {/* Main headline — smooth word-by-word */}
              <motion.h1
                className="relative -mt-6 sm:-mt-10 md:-mt-14 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] tracking-tight z-10 flex flex-wrap gap-x-[0.3em]"
                style={{ fontFamily: "var(--font-serif)", lineHeight: 1.1 }}
                variants={headlineContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {words.map((word, i) => (
                  <motion.span
                    key={`${activeScene}-${i}`}
                    variants={headlineWordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Watermark bottom */}
              <motion.span
                variants={watermarkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="block text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none uppercase select-none pointer-events-none -mt-2 sm:-mt-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  WebkitTextStroke: "1px hsl(var(--primary-foreground) / 0.06)",
                  color: "transparent",
                  lineHeight: 0.85,
                }}
              >
                {current.watermarkBottom}
              </motion.span>

              {/* CTA Button */}
              <motion.div
                className="mt-8 sm:mt-10"
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 1.2, ease: easeOut }}
              >
                <Link
                  to="/start-project"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground font-semibold tracking-widest uppercase text-sm hover:bg-secondary/90 transition-all duration-500 ease-out active:scale-[0.97]"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 sm:bottom-12 left-4 sm:left-8 md:left-16 lg:left-24 z-20 flex gap-3">
        <button
          onClick={goPrev}
          className="w-12 h-12 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/60 hover:border-secondary hover:text-secondary transition-all duration-300 active:scale-95"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          className="w-12 h-12 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/60 hover:border-secondary hover:text-secondary transition-all duration-300 active:scale-95"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
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
