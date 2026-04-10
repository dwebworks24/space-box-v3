import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTAStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="bg-primary py-5 relative overflow-hidden"
    >
      {/* Animated shimmer sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/15 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        style={{ width: "40%" }}
      />

      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <motion.div
          className="text-center sm:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        >
          <h3 className="text-lg md:text-xl font-bold text-primary-foreground">
            Ready to Transform <span className="text-secondary">Your Space?</span>
          </h3>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Let's discuss your vision and create something extraordinary together.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
        >
          <Link
            to="/client-brief"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg font-semibold uppercase tracking-wider text-xs hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl whitespace-nowrap"
          >
            Get a Quote
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
