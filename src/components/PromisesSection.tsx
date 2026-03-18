import { motion } from "framer-motion";
import { Shield, Clock, Gem, Handshake, Leaf, HeartHandshake } from "lucide-react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const promises = [
  {
    icon: Shield,
    title: "Quality Assurance",
    desc: " Carefully selected materials, experienced workmanship, and site-level supervision ensure consistent quality in every residential and office interior project.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Defined project timelines and milestone tracking help us complete projects as committed.",
  },
  {
    icon: Gem,
    title: "Transparent Pricing",
    desc: " Clear scope of work, structured costing, and detailed quotations with no hidden charges.",
  },
  {
    icon: Handshake,
    title: "Client-First Approach",
    desc: "Every design is developed around your lifestyle, operational needs, and long-term usability.",
  },
  {
    icon: Leaf,
    title: "Sustainable Design",
    desc: "Thoughtful material selection and energy-efficient planning are integrated into modern interior design concepts.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Project Support",
    desc: " We remain available for assistance and support even after project handover.",
  },
];

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeBlurUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

const cardVariant = (i: number) => ({
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.92,
    filter: "blur(6px)",
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: easeOut,
    },
  },
});

const iconPulse = {
  hidden: { scale: 0, rotate: -30 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 12, delay: 0.2 },
  },
};

const PromisesSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        <motion.div
          className="text-center mb-16"
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeBlurUp} className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
            Our Commitment
          </motion.p>
          <motion.h2 variants={fadeBlurUp} className="text-4xl md:text-5xl text-foreground">
            Our Promises
          </motion.h2>
          <motion.p variants={fadeBlurUp} className="mt-4 text-muted-foreground max-w-2xl mx-auto font-body">
            We deliver reliable interior design services across Telangana with accountability at every stage.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1200px" }}>
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              variants={cardVariant(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 50px -12px hsl(var(--secondary) / 0.2)",
                borderColor: "hsl(var(--secondary) / 0.5)",
              }}
              className="group p-8 border border-border transition-all duration-500"
              style={{ transformOrigin: "center bottom" }}
            >
              <motion.div variants={iconPulse} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p.icon className="w-10 h-10 text-secondary mb-5 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-xl text-foreground mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromisesSection;
