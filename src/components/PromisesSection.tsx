import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Clock, Gem, Handshake, Leaf, HeartHandshake } from "lucide-react";
import shapeImg from "@/assets/about-v1-shape1.png";
import circleShape2 from "@/assets/site-footer-two-shape-2.png";
import AnimatedTitle from "./AnimatedTitle";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const promises = [
  {
    icon: Shield,
    title: "Quality Assurance",
    desc: "Carefully selected materials, experienced workmanship, and site-level supervision ensure consistent quality.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Defined project timelines and milestone tracking help us complete projects as committed.",
  },
  {
    icon: Gem,
    title: "Transparent Pricing",
    desc: "Clear scope of work, structured costing, and detailed quotations with no hidden charges.",
  },
  {
    icon: Handshake,
    title: "Client-First Approach",
    desc: "Every design is developed around your lifestyle, operational needs, and long-term usability.",
  },
  {
    icon: Leaf,
    title: "Sustainable Design",
    desc: "Thoughtful material selection and energy-efficient planning integrated into every project.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Project Support",
    desc: "We remain available for assistance and support even after project handover.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

const PromisesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const shapeY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const circleY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 border-t border-white/10 relative overflow-hidden" style={{ background: "linear-gradient(160deg, hsl(260 8% 22%) 0%, hsl(320 18% 38%) 50%, hsl(330 22% 45%) 100%)" }}>
      {/* Background decorative shapes */}
      <motion.img src={shapeImg} alt="" className="absolute -top-16 -right-16 w-[400px] lg:w-[500px] pointer-events-none opacity-50 rotate-180" style={{ y: shapeY }} />
      <motion.img src={circleShape2} alt="" className="absolute -bottom-16 -left-10 w-[280px] lg:w-[380px] pointer-events-none opacity-50" style={{ y: circleY }} />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, hsl(var(--secondary)) 1px, transparent 1px)", backgroundSize: "50px 50px" }}
      />
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="text-secondary text-xs uppercase tracking-[0.4em] mb-4 font-body" style={{color: 'hsl(var(--secondary))'}}>
            Our Commitment
          </p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <AnimatedTitle className="text-4xl md:text-5xl text-white leading-tight max-w-md">
              Promises We Stand By
            </AnimatedTitle>
            <p className="text-white/60 font-body max-w-sm text-sm leading-relaxed pb-1">
              We deliver reliable interior design services across Telangana with accountability at every stage.
            </p>
          </div>
          <motion.div
            className="h-px w-full bg-white/15 mt-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {promises.map((p) => (
            <motion.div
              key={p.title}
              variants={cardVariant}
              whileHover={{
                y: -6,
                x: 4,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="group"
            >
              <div className="flex items-start gap-5">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-white/20 group-hover:border-secondary group-hover:bg-secondary/10 transition-all duration-500"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <p.icon
                    className="w-5 h-5 text-secondary transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <div>
                  <h3 className="text-base text-white mb-2 tracking-wide group-hover:text-secondary transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/55 font-body leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PromisesSection;
