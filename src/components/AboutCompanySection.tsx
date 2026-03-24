import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import logo from "@/assets/space-box-logo.png";
import aboutImg from "@/assets/about-us-img.png";

import circleShape1 from "@/assets/site-footer-two-shape-1.png";
import circleShape2 from "@/assets/site-footer-two-shape-2.png";
import sectionShape from "@/assets/section-shape-1.png";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80, skewX: 3 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

const revealLine = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: easeOut, delay: 0.3 },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1, ease: easeOut },
  },
};

const AboutCompanySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const circle1Y = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const sectionShapeX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-16 lg:py-24 overflow-hidden bg-foreground">
      {/* Full-width background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={sectionShape}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.10]"
        />
      </div>

      {/* Geometric wireframe shape - top left — now larger & more visible with parallax */}
      <motion.img
        src={shapeImg}
        alt=""
        className="absolute -top-10 -left-10 w-[400px] lg:w-[550px] pointer-events-none"
        style={{ y: shapeY, rotate: shapeRotate, opacity: 0.45 }}
      />

      {/* Circle shapes - decorative — larger, brighter, parallax */}
      <motion.img
        src={circleShape1}
        alt=""
        className="absolute -bottom-10 -left-10 w-[300px] lg:w-[420px] pointer-events-none"
        style={{ y: circle1Y, opacity: 0.45 }}
      />
      <motion.img
        src={circleShape2}
        alt=""
        className="absolute -top-10 -right-10 w-[300px] lg:w-[420px] pointer-events-none"
        style={{ y: circle2Y, opacity: 0.45 }}
      />

      {/* Extra section shape - right side mid */}
      <motion.img
        src={sectionShape}
        alt=""
        className="absolute top-[30%] -right-20 w-[350px] lg:w-[500px] pointer-events-none opacity-[0.08] rotate-180"
        style={{ x: sectionShapeX }}
      />

      {/* Floating geometric accents */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-20 h-20 border-2 border-secondary/25 rotate-45 pointer-events-none hidden lg:block"
        animate={{ y: [0, -16, 0], rotate: [45, 52, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-14 h-14 border-2 border-secondary/30 rotate-45 pointer-events-none hidden lg:block"
        animate={{ y: [0, 12, 0], rotate: [45, 38, 45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[60%] right-[15%] w-8 h-8 bg-secondary/10 rotate-45 pointer-events-none hidden lg:block"
        animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--secondary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Section title */}
        <div className="mb-12 lg:mb-16">
          <motion.p
            className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            About Us
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={revealLine} className="h-[2px] w-16 bg-secondary origin-left mb-6" />

            <motion.img
              variants={slideInLeft}
              src={logo}
              alt="SpaceBox Concepts"
              className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
              loading="lazy"
              decoding="async"
            />

            <motion.p
              variants={slideUp}
              className="mt-6 text-white/70 font-body max-w-md leading-relaxed"
            >
              At SpaceBox Concepts, we believe interior design should improve how a space functions, feels, and performs. As a growing Interior Design Company in Telangana.
            </motion.p>

            <motion.p
              variants={slideUp}
              className="mt-4 text-white/70 font-body max-w-md leading-relaxed"
            >
              With 7+ years of industry experience and 75+ completed projects across Telangana, our team of 12+ in-house designers handles everything from space planning and 3D visualization to site supervision and final execution.
            </motion.p>

            <motion.p
              variants={slideUp}
              className="mt-4 text-white/70 font-body max-w-md leading-relaxed"
            >
              We specialize in residential interior design, office interior design, and commercial interior projects with a focus on clarity, material quality, and disciplined project management.
            </motion.p>
          </motion.div>

          {/* Image Column */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-center relative"
          >
            <motion.img
              src={aboutImg}
              alt="SpaceBox Concepts – Modern office interior"
              className="w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-xl relative z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;
