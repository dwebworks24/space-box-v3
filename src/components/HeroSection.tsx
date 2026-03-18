import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";
import heroImg from "@/assets/hero-office.jpg";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const fadeBlurUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOut },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: easeOut },
  },
};

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[75vh] sm:min-h-screen flex items-center overflow-hidden"
    >
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={heroImg}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: easeOut }}
      >
        <source src={heroVideo} type="video/mp4" />
      </motion.video>

      <motion.div
        className="absolute inset-0 bg-primary/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative z-10 flex items-center min-h-[75vh] sm:min-h-screen container mx-auto px-4 sm:px-8 md:px-16">
        <motion.div
          className="max-w-2xl pt-20 sm:pt-24 pb-16 sm:pb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeBlurUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-primary-foreground"
          >
            Introducing Custom Interior Solutions in Telangana
          </motion.h1>
          <motion.p
            variants={slideInLeft}
            className="mt-6 text-primary-foreground/80 max-w-md text-sm sm:text-lg leading-relaxed font-body text-justify"
          >
            Not out of the box. We think within your space.
          </motion.p>
          <motion.div variants={fadeBlurUp}>
            <Link
              to="/projects"
              className="mt-8 inline-flex px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ease-out"
            >
              Explore Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
