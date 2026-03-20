import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/space-box-logo.png";
import aboutImg from "@/assets/about-us-img.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  return (

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-[hsl(35,45%,93%)]">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          {/* Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={slideUp}
              className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body"
            >
              About Us
            </motion.p>

            <motion.div variants={revealLine} className="h-[2px] w-16 bg-secondary origin-left mb-6" />

            <motion.img
              variants={slideInLeft}
              src={logo}
              alt="SpaceBox Concepts"
              className="h-16 md:h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />

            <motion.p
              variants={slideUp}
              className="mt-6 text-muted-foreground font-body max-w-md leading-relaxed"
            >
              At SpaceBox Concepts, we believe interior design should improve how a space functions, feels, and performs. As a growing Interior Design Company in Telangana.
            </motion.p>

            <motion.p
              variants={slideUp}
              className="mt-4 text-muted-foreground font-body max-w-md leading-relaxed"
            >
              With 7+ years of industry experience and 75+ completed projects across Telangana, our team of 12+ in-house designers handles everything from space planning and 3D visualization to site supervision and final execution.
            </motion.p>

            <motion.p
              variants={slideUp}
              className="mt-4 text-muted-foreground font-body max-w-md leading-relaxed"
            >
              We specialize in residential interior design, office interior design, and commercial interior projects with a focus on clarity, material quality, and disciplined project management.
            </motion.p>
          </motion.div>

          {/* Image Column - parallax + clip-path reveal */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-center"
          >
            <motion.img
              src={aboutImg}
              alt="SpaceBox Concepts – Modern office interior"
              className="w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-xl"
              loading="lazy"
              style={{ y: imgY }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;
