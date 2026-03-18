import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTAStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-primary py-5"
    >
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-lg md:text-xl font-bold text-primary-foreground">
            Ready to Transform <span className="text-secondary">Your Space?</span>
          </h3>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Let's discuss your vision and create something extraordinary together.
          </p>
        </div>
        <Link
          to="/start-project"
          className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg font-semibold uppercase tracking-wider text-xs hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl whitespace-nowrap"
        >
          Start Your Project
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.section>
  );
}
