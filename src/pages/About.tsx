import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import {
  MessageSquare, Box, Maximize, Palette, Sofa, Lamp, Frame,
  ClipboardList, HeadphonesIcon,
  Compass, Layers, Shield, Wrench,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useRef } from 'react';
import aboutHeroSplit from '@/assets/about-hero-split.jpg';
import projectResidential from '@/assets/project-residential.jpg';
import AboutCompanySection from '@/components/AboutCompanySection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SubBanner from '@/components/SubBanner';
import FoundersSection from '@/components/FoundersSection';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Why Choose Us ── */
const whyChooseUs = [
  {
    title: 'Expertise & Innovation',
    icon: Compass,
    color: 'from-secondary/20 to-secondary/5',
    services: [
      { icon: MessageSquare, label: 'Interior Consultation' },
      { icon: ClipboardList, label: 'Design & Planning' },
      { icon: Box, label: '3D Modelling' },
    ],
  },
  {
    title: 'Space Mastery',
    icon: Layers,
    color: 'from-secondary/15 to-transparent',
    services: [
      { icon: Maximize, label: 'Space Optimisation' },
      { icon: Palette, label: 'Colour Schemes' },
    ],
  },
  {
    title: 'Complete Solutions',
    icon: Shield,
    color: 'from-secondary/20 to-secondary/5',
    services: [
      { icon: Sofa, label: 'Furniture Selection' },
      { icon: Lamp, label: 'Lighting & Accessories' },
      { icon: Frame, label: 'Decor Selection' },
    ],
  },
  {
    title: 'End-to-End Support',
    icon: Wrench,
    color: 'from-secondary/15 to-transparent',
    services: [
      { icon: ClipboardList, label: 'Project Management' },
      { icon: HeadphonesIcon, label: 'Post-design Support' },
    ],
  },
];

/* ── Timeline ── */
const timeline = [
  {
    year: '2018',
    title: 'Established SpaceBox Designs',
    details: ['3 Team Members', '4 Initial Projects Delivered'],
  },
  {
    year: '2020',
    title: 'First Major Milestone',
    details: ['1000 sq ft Office Setup', 'First 140,000 sq ft Large-Scale Project', 'Team Expanded to 4 Members', '10+ Projects Completed'],
  },
  {
    year: '2022',
    title: 'Recognition & Growth',
    details: [' Best Entrepreneur Recognition', ' 4 Core Team Members', ' 25+ Projects Delivered'],
  },
  {
    year: '2024',
    title: 'Expansion Phase',
    details: ['6 Team Members', '50+ Project Across Telangana'],
  },
  {
    year: '2026',
    title: 'Spacebox Concepts LLP',
    details: ['2000 sq ft Office', '12+ Team Members', ' 75+ Projects Completed', ' 400,000+ sq ft Executed'],
  },
];

/* ── Animation Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeOut } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardPop = (i: number) => ({
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: easeOut },
  },
});

export default function About() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <SEO
        title="About Us - Our Story & Team"
        description="Learn about SpaceBox Concepts — our passionate team of interior designers in Telangana dedicated to crafting custom residential and commercial spaces that inspire."
        keywords="about SpaceBox Concepts, interior design team, Telangana designers, Hyderabad interior designers, design philosophy, our story"
      />
      <SubBanner
        image={aboutHeroSplit}
        title="About"
        highlight="SpaceBox"
        subtitle="Design Your Space"
      />

      {/* ═══════ ABOUT US (reuse homepage) ═══════ */}
      <AboutCompanySection />

      {/* ═══════ WHY CHOOSE US ═══════ */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column — Title + Image */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p variants={fadeUp} className="text-secondary text-sm uppercase tracking-[0.3em] mb-3 font-body">
                Our Signature Approach
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-tight mb-5">
                The SpaceBox <br/> Distinction
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground font-body leading-relaxed mb-8 max-w-md">
                We believe every home deserves thoughtful design and meticulous detail. From the first sketch to final styling, our experienced team ensures your space reflects your personality.
              </motion.p>

              {/* Image with badge */}
              <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden">
                <img
                  src={projectResidential}
                  alt="Interior design showcase"
                  className="w-full h-[320px] md:h-[380px] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                {/* Years badge */}
                <div className="absolute bottom-6 right-6 bg-primary text-primary-foreground rounded-2xl px-6 py-4 text-center shadow-xl">
                  <span className="text-3xl font-bold block">7+</span>
                  <span className="text-xs uppercase tracking-wider font-body">Years Of Experience</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column — 6 feature cards in 2x3 grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {[
                { icon: Compass, title: 'Tailored Design Approach', desc: 'Every residential and commercial interior project is customized based on layout, usage patterns, budget, and aesthetic preference.' },
                { icon: Layers, title: 'Experienced Team Of Designers', desc: 'Our in-house design and project management team brings practical site experience and professional coordination to every project.'},
                { icon: Shield, title: 'Quality Craftsmanship', desc: 'We work with trusted vendors, skilled artisans, and verified material suppliers to maintain consistent quality standards.' },
                { icon: Wrench, title: 'End-To-End Service', desc: ' From space planning and 3D visualization to material sourcing and site supervision, we manage the complete execution process.' },
                { icon: ClipboardList, title: 'Transparent Pricing', desc: 'Clear scope documentation and structured quotations ensure no confusion in costing.' },
                { icon: HeadphonesIcon, title: 'On-Time Delivery', desc: 'We follow milestone-based planning and structured timelines to complete projects efficiently.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardPop(i)}
                  whileHover={{ y: -4 }}
                  className="bg-background rounded-2xl p-6 border border-border/50 hover:border-secondary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <StatsSection />

      {/* ═══════ HORIZONTAL TIMELINE ═══════ */}
      <section className="py-24 lg:py-32 bg-card overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-20"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
              A Legacy of Design
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl text-foreground">
              The Evolution of <span className="text-secondary">Elegance</span>
            </motion.h2>
          </motion.div>

          {/* Horizontal timeline — flex container for side-by-side arrows on mobile */}
          <div className="relative mt-8 md:mt-0 flex items-center mb-8 md:mb-0 w-full overflow-hidden md:overflow-visible">
            {/* Left Box Arrow */}
            <button 
              onClick={scrollLeft} 
              className="md:hidden flex-shrink-0 z-10 w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center bg-background text-foreground hover:bg-secondary hover:text-primary-foreground shadow-sm transition-all mr-2"
              aria-label="Previous timeline item"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slider Container */}
            <div className="flex-1 w-[calc(100%-96px)] md:w-full overflow-hidden relative">
              {/* Main connecting line */}
              <motion.div
                className="absolute top-[40px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent origin-left hidden md:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.4, ease: easeOut }}
              />

              {/* Timeline items */}
              <div 
                ref={sliderRef}
                className="flex md:grid md:grid-cols-5 gap-6 md:gap-0 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
              >
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative flex flex-col items-center text-center flex-shrink-0 w-[280px] md:w-auto snap-center"
                  initial={{ opacity: 0, y: 60, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.18, duration: 0.7, ease: easeOut }}
                >
                  {/* Animated dot on the line */}
                  <motion.div
                    className="relative z-10 mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.18 + 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-secondary/20"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full bg-primary flex items-center justify-center shadow-[0_0_25px_hsl(var(--secondary)/0.3)] border-4 border-background">
                      <span className="text-primary-foreground text-sm sm:text-lg font-bold">{item.year}</span>
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="bg-background border border-border/60 rounded-2xl p-5 w-full max-w-[220px] hover:border-secondary/40 transition-all duration-500 hover:shadow-[0_8px_30px_hsl(var(--secondary)/0.1)]"
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">{item.title}</h3>
                    <motion.div
                      className="h-[2px] w-8 bg-secondary mx-auto mb-3 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.18 + 0.5, duration: 0.5, ease: easeOut }}
                    />
                    <ul className="space-y-1">
                      {item.details.map((d, di) => (
                        <motion.li
                          key={d}
                          className="text-muted-foreground text-xs font-body"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.18 + 0.5 + di * 0.08, duration: 0.4 }}
                        >
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
              </div>
            </div>

            {/* Right Box Arrow */}
            <button 
              onClick={scrollRight} 
              className="md:hidden flex-shrink-0 z-10 w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center bg-background text-foreground hover:bg-secondary hover:text-primary-foreground shadow-sm transition-all ml-2"
              aria-label="Next timeline item"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ MEET THE FOUNDERS ═══════ */}
      <FoundersSection />
      {/* ═══════ TESTIMONIALS (reuse homepage) ═══════ */}
      <TestimonialsSection />
    </div>
  );
}
