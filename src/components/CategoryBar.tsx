import { motion } from "framer-motion";
import { Building2, Home, Monitor, Hotel, UtensilsCrossed, TreePine, Coffee } from "lucide-react";

const categories = [
  { label: "Commercial", icon: Building2 },
  { label: "Residential", icon: Home },
  { label: "Office Design", icon: Monitor },
  { label: "Hospitality", icon: Hotel },
  { label: "Restaurant", icon: UtensilsCrossed },
  { label: "Play Area", icon: TreePine },
  { label: "Cafe", icon: Coffee },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOut },
  },
};

const CategoryBar = () => {
  return (
    <section className="bg-gradient-to-r from-[hsl(25,40%,95%)] via-[hsl(35,45%,93%)] to-[hsl(15,60%,94%)] border-b border-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-16">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12 lg:gap-16 py-6 md:py-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.08,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <cat.icon
                  className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-secondary-foreground transition-colors duration-300"
                />
              </motion.div>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground group-hover:text-secondary transition-colors duration-300 font-body text-center">
                {cat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryBar;
