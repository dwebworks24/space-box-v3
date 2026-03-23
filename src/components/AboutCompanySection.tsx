import { motion } from "framer-motion";
import logo from "@/assets/space-box-logo.png";
import aboutImg from "@/assets/about-us-img.png";

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

/* ── Geometric diamond pattern SVG (like Tecture reference) ── */
const DiamondPattern = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Diamond grid pattern */}
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => {
        const cx = col * 50 + 25;
        const cy = row * 50 + 25;
        return (
          <path
            key={`${row}-${col}`}
            d={`M${cx} ${cy - 18} L${cx + 18} ${cy} L${cx} ${cy + 18} L${cx - 18} ${cy} Z`}
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
          />
        );
      })
    )}
  </svg>
);

const AboutCompanySection = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-[hsl(35,45%,93%)]">
      {/* Geometric background shapes */}
      <motion.div
        className="absolute top-0 left-0 w-[350px] h-[350px] text-foreground/[0.04] pointer-events-none"
        initial={{ opacity: 0, rotate: -15 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: easeOut }}
      >
        <DiamondPattern className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] text-foreground/[0.03] pointer-events-none"
        initial={{ opacity: 0, rotate: 15 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: easeOut }}
      >
        <DiamondPattern className="w-full h-full" />
      </motion.div>

      {/* Floating geometric accents */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-16 h-16 border border-secondary/10 rotate-45 pointer-events-none hidden lg:block"
        animate={{ y: [0, -12, 0], rotate: [45, 50, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-10 h-10 border border-secondary/15 rotate-45 pointer-events-none hidden lg:block"
        animate={{ y: [0, 10, 0], rotate: [45, 40, 45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Section title — spaced-letter style like reference */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            <span className="text-foreground">Welcome To </span>
            <span className="text-secondary">About Us</span>
          </h2>
        </motion.div>

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

          {/* Image Column */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-center relative"
          >
            {/* Decorative border frame behind image */}
            <div className="absolute -top-3 -right-3 w-[85%] h-[85%] border-2 border-secondary/20 rounded-2xl pointer-events-none hidden lg:block" />

            <motion.img
              src={aboutImg}
              alt="SpaceBox Concepts – Modern office interior"
              className="w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-xl relative z-10"
            />

            {/* Fun facts badge overlay */}
            <motion.div
              className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8 bg-primary text-primary-foreground rounded-2xl px-6 py-5 shadow-2xl z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, ease: easeOut }}
            >
              <p className="text-xs uppercase tracking-widest text-primary-foreground/60 font-body mb-1">Funfacts In Great</p>
              <p className="text-xs uppercase tracking-widest text-primary-foreground/60 font-body mb-2">Numbers</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-secondary">7+</span>
                <span className="text-sm text-primary-foreground/70 font-body">Years Of<br />Experience</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;
