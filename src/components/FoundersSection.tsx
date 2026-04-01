import { useState } from 'react';
import { motion } from 'framer-motion';
import teamMockup from '@/assets/team-mockup.jpg';


const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const founders = [
  {
    name: 'Prathyusha Ravula',
    role: 'Interior Design Lead & Founder',
    bio: 'Prathyusha Ravula is a passionate interior designer with 8 years of professional experience delivering refined, functional, and timeless interiors. Known for a detail-driven approach and client-focused design philosophy, she specializes in creating spaces that balance aesthetics, comfort, and individuality.',
    image: teamMockup,
  },
  {
    name: 'Mini Khapekar',
    role: 'Managing Partner, Spacebox Concepts',
    bio: 'Mini Khapekar is a seasoned technology and operations leader with 19 years of experience in the IT industry and over a decade in management. She drives operations, administration, and execution at Spacebox Concepts with a structured, process-driven approach. She also serves as Director of Engineering at a fast-growing startup, blending operational excellence with innovation-driven thinking.',
    image: teamMockup,
  },
  {
    name: 'Amruta Desai',
    role: 'Managing Director, Finance & Strategy',
    bio: 'Amruta Desai is a strategic finance and business operations leader with extensive experience in corporate planning, budgeting, and organizational growth. As Managing Director at Spacebox Concepts, she oversees financial strategy, resource allocation, and long-term business development. Her analytical mindset and structured approach to decision-making ensure sustainable growth and operational efficiency across all verticals.',
    image: teamMockup,
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

        {/* Accordion Cards — Desktop */}
        <div
          className="hidden md:flex gap-3 h-[420px] lg:h-[480px]"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {founders.map((f, i) => {
            const isActive = activeIndex === i;
            const hasActive = activeIndex !== null;

            return (
              <motion.div
                key={f.name}
                className="relative rounded-2xl overflow-hidden cursor-pointer border border-primary-foreground/10 hover:border-secondary/40"
                style={{
                  flex: isActive ? 3 : hasActive ? 0.5 : 1,
                  transition: 'flex 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: easeOut }}
              >
                {/* Image section — takes left side when expanded, full when collapsed */}
                <div
                  className="absolute top-0 left-0 h-full transition-all duration-[600ms]"
                  style={{ width: isActive ? '40%' : '100%', transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
                >
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700"
                    style={{ transform: isActive ? 'scale(1.03)' : 'scale(1)' }}
                  />
                  {/* Gradient only in collapsed state */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent transition-opacity duration-500"
                    style={{ opacity: isActive ? 0 : 1 }}
                  />
                </div>

                {/* Collapsed state — name & title at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-opacity duration-400"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <h3 className="text-lg font-bold text-primary-foreground leading-tight">{f.name}</h3>
                  <p className="text-secondary text-xs font-body mt-1">{f.role}</p>
                </div>

                {/* Expanded state — bio panel on right */}
                <div
                  className="absolute top-0 right-0 h-full flex flex-col justify-center px-8 lg:px-10 py-8 bg-primary/95 transition-all duration-[600ms]"
                  style={{
                    width: isActive ? '60%' : '0%',
                    opacity: isActive ? 1 : 0,
                    transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                  }}
                >
                  <div
                    style={{
                      transform: isActive ? 'translateX(0)' : 'translateX(30px)',
                      opacity: isActive ? 1 : 0,
                      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, opacity 0.4s ease 0.2s',
                    }}
                  >
                    <div className="h-px w-12 bg-secondary mb-4" />
                    <h3 className="text-xl lg:text-2xl font-bold text-primary-foreground mb-1.5 whitespace-nowrap">{f.name}</h3>
                    <p className="text-secondary text-xs lg:text-sm font-body mb-4 whitespace-nowrap">{f.role}</p>
                    <p className="text-primary-foreground/70 text-xs lg:text-sm font-body leading-relaxed">
                      {f.bio}
                    </p>
                  </div>
                </div>

                {/* Corner accents */}
                <div
                  className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-secondary/40 rounded-tr-lg z-20 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                />
                <div
                  className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-secondary/40 rounded-bl-lg z-20 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile — stacked cards */}
        <div className="md:hidden space-y-6">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              className="rounded-2xl overflow-hidden border border-primary-foreground/10 bg-primary/60 backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: easeOut }}
            >
              <div className="overflow-hidden">
                <img src={f.image} alt={f.name} className="w-full h-auto object-cover object-top" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary-foreground mb-1">{f.name}</h3>
                <p className="text-secondary text-xs font-body mb-3">{f.role}</p>
                <div className="h-px w-10 bg-secondary/40 mb-3" />
                <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">{f.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-primary-foreground/40 font-body mt-16 text-sm"
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
