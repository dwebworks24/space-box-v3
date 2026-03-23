import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Phone, Mail } from "lucide-react";

// Slide images — use full scene backgrounds
import slideImg1 from "@/assets/hero/sofa-main-bg.webp";
import slideImg2 from "@/assets/hero/scene3-bg.png";
import slideImg3 from "@/assets/hero/bedroom-bg.webp";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SLIDE_DURATION = 6000;

const slides = [
  {
    image: slideImg1,
    watermarkTop: "INTERIOR",
    headline: "Stunning Interior\nDesign",
    watermarkBottom: "DESIGN",
  },
  {
    image: slideImg2,
    watermarkTop: "SPACEBOX",
    headline: "Design Make\nDream",
    watermarkBottom: "CONCEPTS",
  },
  {
    image: slideImg3,
    watermarkTop: "INTERIOR",
    headline: "Living Room\nDesign",
    watermarkBottom: "DESIGN",
  },
];

/* ── Animation variants ── */
const watermarkVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: easeOut },
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const headlineWordVariants = {
  hidden: { opacity: 0, y: 80, skewY: 4 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.7, delay: 0.3 + i * 0.1, ease: easeOut },
  }),
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.4, ease: easeOut },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 1.0, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: easeOut },
  },
};

const HeroSection = () => {
  const [active, setActive] = useState(0);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [goNext]);

  const current = slides[active];

  return (
    <section
      id="home"
      className="relative min-h-[75vh] sm:min-h-screen overflow-hidden bg-primary"
    >
      {/* ── Left sidebar — social icons & contact ── */}
      <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-14 z-30 flex-col items-center justify-center gap-5 border-r border-primary-foreground/10">
        <a href="#" aria-label="Instagram" className="text-primary-foreground/40 hover:text-secondary transition-colors duration-300">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="#" aria-label="Facebook" className="text-primary-foreground/40 hover:text-secondary transition-colors duration-300">
          <Facebook className="w-4 h-4" />
        </a>
        <a href="#" aria-label="Twitter" className="text-primary-foreground/40 hover:text-secondary transition-colors duration-300">
          <Twitter className="w-4 h-4" />
        </a>

        <div className="w-px h-10 bg-primary-foreground/15" />

        <a
          href="tel:+919876543210"
          className="flex items-center gap-1.5 text-primary-foreground/40 hover:text-secondary transition-colors"
          style={{ writingMode: "vertical-lr" }}
        >
          <Phone className="w-3 h-3 rotate-90" />
          <span className="text-[10px] tracking-wider font-body">+91 98765 43210</span>
        </a>

        <div className="w-px h-10 bg-primary-foreground/15" />

        <a
          href="mailto:info@spaceboxconcepts.com"
          className="flex items-center gap-1.5 text-primary-foreground/40 hover:text-secondary transition-colors"
          style={{ writingMode: "vertical-lr" }}
        >
          <Mail className="w-3 h-3 rotate-90" />
          <span className="text-[10px] tracking-wider font-body">info@spaceboxconcepts.com</span>
        </a>
      </div>

      {/* ── Main content area ── */}
      <div className="relative min-h-[75vh] sm:min-h-screen flex">
        {/* Left half — text content */}
        <div className="relative z-20 w-full lg:w-[42%] flex items-center px-6 sm:px-10 lg:pl-24 lg:pr-12">
          <div className="w-full max-w-lg py-24 sm:py-32">
            <AnimatePresence mode="wait">
              <motion.div key={active} className="relative">
                {/* Watermark top */}
                <motion.span
                  variants={watermarkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="block text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold leading-none uppercase select-none pointer-events-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    WebkitTextStroke: "1px hsl(var(--primary-foreground) / 0.07)",
                    color: "transparent",
                    lineHeight: 0.9,
                  }}
                  aria-hidden="true"
                >
                  {current.watermarkTop}
                </motion.span>

                {/* Main headline */}
                <motion.h1
                  className="relative -mt-4 sm:-mt-8 md:-mt-10 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground leading-[1.15] tracking-tight z-10 uppercase"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {current.headline.split(/(\s+)/).filter(Boolean).map((word, i) => (
                    <motion.span
                      key={`${active}-${i}`}
                      custom={i}
                      variants={headlineWordVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="inline-block"
                    >
                      {word === "\n" ? <br /> : word === " " ? "\u00A0" : word}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Watermark bottom */}
                <motion.span
                  variants={watermarkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="block text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold leading-none uppercase select-none pointer-events-none mt-1 sm:-mt-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    WebkitTextStroke: "1px hsl(var(--primary-foreground) / 0.05)",
                    color: "transparent",
                    lineHeight: 0.9,
                  }}
                  aria-hidden="true"
                >
                  {current.watermarkBottom}
                </motion.span>

                {/* CTA Button */}
                <motion.div
                  variants={ctaVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-8 sm:mt-10"
                >
                  <Link
                    to="/start-project"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary/90 text-secondary-foreground font-semibold tracking-widest uppercase text-xs sm:text-sm hover:bg-secondary transition-all duration-500 ease-out active:scale-[0.97]"
                  >
                    Get In Touch
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right half — image with rounded clip */}
        <div className="hidden lg:block absolute top-0 right-0 w-[62%] h-full z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
              style={{
                clipPath: "ellipse(85% 100% at 70% 50%)",
              }}
            >
              <img
                src={current.image}
                alt="Interior design showcase"
                className="w-full h-full object-cover"
              />
              {/* Subtle dark edge blend */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: full background image */}
        <div className="lg:hidden absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt="Interior design showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/70" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Navigation arrows — bottom left ── */}
      <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 lg:left-24 z-30 flex gap-2">
        <button
          onClick={goPrev}
          className="w-11 h-11 rounded-full border border-primary-foreground/25 flex items-center justify-center text-primary-foreground/50 hover:border-secondary hover:text-secondary transition-all duration-300 active:scale-95"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goNext}
          className="w-11 h-11 rounded-full border border-primary-foreground/25 flex items-center justify-center text-primary-foreground/50 hover:border-secondary hover:text-secondary transition-all duration-300 active:scale-95"
          aria-label="Next slide"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
