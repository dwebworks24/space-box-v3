import { motion } from 'framer-motion';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const founders = [
  {
    name: 'Prathyusha Ravula',
    role: 'Principal Designer & Founder',
    bio: 'Prathyusha Ravula is a passionate interior designer with 8 years of professional experience delivering refined, functional, and timeless interiors. Known for a detail-driven approach and client-focused design philosophy, she specializes in creating spaces that balance aesthetics, comfort, and individuality.',
  },
  {
    name: 'Mini Khapekar',
    role: 'Managing Director, Operations & Execution',
    bio: 'Mini Khapekar is a seasoned technology and operations leader with 19 years of experience in the IT industry and over a decade in management. She drives operations, administration, and execution at Spacebox Concepts with a structured, process-driven approach. She also serves as Director of Engineering at a fast-growing startup, blending operational excellence with innovation-driven thinking.',
  },
  {
    name: 'Amruta Desai',
    role: 'Managing Director, Finance & Strategy',
    bio: 'Amruta Desai is a strategic finance and business operations leader with extensive experience in corporate planning, budgeting, and organizational growth. As Managing Director at Spacebox Concepts, she oversees financial strategy, resource allocation, and long-term business development. Her analytical mindset and structured approach to decision-making ensure sustainable growth and operational efficiency across all verticals.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeOut } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export default function FoundersSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Smooth Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--secondary)/0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.1),transparent_50%)]" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeUp} className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
            The Minds Behind Spacebox
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl text-primary-foreground">
            Meet the <span className="text-secondary">Founders</span>
          </motion.h2>
        </motion.div>

        {/* Content Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              className="relative p-8 lg:p-10 rounded-2xl border border-primary-foreground/10 bg-primary/40 backdrop-blur-md group hover:border-secondary/40 transition-colors duration-500 h-full flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: easeOut }}
            >
              <div className="h-px w-12 bg-secondary mb-6 transition-all duration-500 group-hover:w-16" />
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">{f.name}</h3>
              <p className="text-secondary text-sm font-body mb-6">{f.role}</p>
              <p className="text-primary-foreground/70 text-sm lg:text-base font-body leading-relaxed text-justify flex-grow">
                {f.bio}
              </p>
              
              {/* Subtle corner accents for a premium feel */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-secondary/0 group-hover:border-secondary/40 rounded-tr-lg transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-secondary/0 group-hover:border-secondary/40 rounded-bl-lg transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-primary-foreground/40 font-body mt-20 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          12+ In-house Designers, Design Managers, Execution Managers & Sales Managers driving innovation.
        </motion.p>
      </div>
    </section>
  );
}
