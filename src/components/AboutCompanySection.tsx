import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import logo from "@/assets/space-box-logo.png";
import aboutImg from "@/assets/about-us-img.png";
import shapeImg from "@/assets/about-v1-shape1.png";
import circleShape1 from "@/assets/site-footer-two-shape-1.png";
import circleShape2 from "@/assets/site-footer-two-shape-2.png";

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
  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-foreground">
      {/* Geometric wireframe shape - top left */}
      <motion.img
        src={shapeImg}
        alt=""
        className="absolute top-0 left-0 w-[300px] lg:w-[400px] opacity-[0.06] pointer-events-none"
        initial={{ opacity: 0, rotate: -10 }}
        whileInView={{ opacity: 0.06, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: easeOut }}
      />

      {/* Circle shapes - decorative */}
      <motion.img
        src={circleShape1}
        alt=""
        className="absolute bottom-0 left-0 w-[200px] lg:w-[280px] opacity-[0.08] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <motion.img
        src={circleShape2}
        alt=""
        className="absolute top-0 right-0 w-[200px] lg:w-[280px] opacity-[0.08] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      {/* Floating geometric accents */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-16 h-16 border border-secondary/15 rotate-45 pointer-events-none hidden lg:block"
        animate={{ y: [0, -12, 0], rotate: [45, 50, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-10 h-10 border border-secondary/20 rotate-45 pointer-events-none hidden lg:block"
        animate={{ y: [0, 10, 0], rotate: [45, 40, 45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Section title */}
        <div className="text-center mb-12 lg:mb-16">
          <AnimatedTitle
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-[0.2em] sm:tracking-[0.3em]"
          >
            Welcome To About Us
          </AnimatedTitle>
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
            {/* Decorative border frame behind image */}
            <div className="absolute -top-3 -right-3 w-[85%] h-[85%] border-2 border-secondary/30 rounded-2xl pointer-events-none hidden lg:block" />

            <motion.img
              src={aboutImg}
              alt="SpaceBox Concepts – Modern office interior"
              className="w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-xl relative z-10"
            />

            {/* Fun facts badge overlay */}
            <motion.div
              className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8 bg-secondary text-secondary-foreground rounded-2xl px-6 py-5 shadow-2xl z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, ease: easeOut }}
            >
              <p className="text-xs uppercase tracking-widest text-secondary-foreground/70 font-body mb-1">Funfacts In Great</p>
              <p className="text-xs uppercase tracking-widest text-secondary-foreground/70 font-body mb-2">Numbers</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">7+</span>
                <span className="text-sm text-secondary-foreground/80 font-body">Years Of<br />Experience</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;
