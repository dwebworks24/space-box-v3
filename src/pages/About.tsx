import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import {
  MessageSquare, Box, Maximize, Palette, Sofa, Lamp, Frame,
  ClipboardList, HeadphonesIcon,
  Compass, Layers, Shield, Wrench, Facebook, Twitter, Linkedin, Instagram
} from 'lucide-react';
import teamAmruta from '@/assets/team-amruta.jpg';
import teamMini from '@/assets/team-mini.jpg';
import teamPratyusha from '@/assets/team-pratyusha.jpg';
import teamMockup from '@/assets/team-mockup.jpg';
import aboutHeroSplit from '@/assets/about-hero-split.jpg';
import projectResidential from '@/assets/project-residential.jpg';
import teamBg from '@/assets/team-bg.jpg';
import AboutCompanySection from '@/components/AboutCompanySection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SubBanner from '@/components/SubBanner';

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

/* ── Team ── */
const partners = [
  {
    name: 'Pratyusha Ravula',
    role: 'Principal Designer & Founder',
    bio: 'Visionary designer with 7+ years of creating transformative interior spaces.',
    image: teamMockup,
  },
  {
    name: 'Mini Khapekar',
    role: 'Managing Director, Operations & Execution',
    bio: 'Operations expert ensuring flawless project delivery every time.',
    image: teamMockup,
  },
  {
    name: 'Amruta Desai',
    role: 'Managing Director, Finance & Strategy',
    bio: 'Strategic leader driving financial excellence and sustainable growth.',
    image: teamMockup,
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

      {/* ═══════ STATS (reuse homepage) ═══════ */}
      <StatsSection />

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
                Why Choose Us
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-tight mb-5">
                Why  Choose <br/> SpaceBox Concepts
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
              Our Journey
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl text-foreground">
              From Vision to <span className="text-secondary">Reality</span>
            </motion.h2>
          </motion.div>

          {/* Horizontal timeline — no scroll */}
          <div className="relative">
            {/* Main connecting line */}
            <motion.div
              className="absolute top-[40px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent origin-left hidden md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.4, ease: easeOut }}
            />

            {/* Timeline items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative flex flex-col items-center text-center"
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
        </div>
      </section>

      {/* ═══════ TEAM SECTION ═══════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={teamBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
              Leadership
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl text-primary-foreground">
              Meet Our Professional <span className="text-secondary">Team</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                variants={cardPop(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative pb-12"
              >
                {/* Photo card */}
                <div className="relative overflow-hidden rounded-xl">
                  {/* Photo placeholder with gradient */}
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Decorative corner accents */}
                    <div className="absolute top-3 right-3 w-16 h-16 border-t-2 border-r-2 border-secondary/40 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 left-3 w-16 h-16 border-b-2 border-l-2 border-secondary/40 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Name banner - angled overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="relative">
                      <div className="bg-secondary/90 backdrop-blur-sm px-6 py-5 clip-diagonal">
                        <h3 className="text-primary-foreground font-bold text-lg tracking-wide uppercase font-body">
                          {p.name}
                        </h3>
                        <p className="text-primary-foreground/80 text-sm font-body mt-1">
                          {p.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social icons - hidden by default, float up on card hover */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out"
                >
                  {[
                    { icon: Facebook, href: '#' },
                    { icon: Twitter, href: '#' },
                    { icon: Linkedin, href: '#' },
                    { icon: Instagram, href: '#' },
                  ].map(({ icon: SIcon, href }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      className="w-9 h-9 rounded-full border border-primary-foreground/30 bg-primary/80 backdrop-blur-sm flex items-center justify-center hover:border-secondary hover:bg-secondary/20 transition-all duration-300"
                      style={{ transitionDelay: `${idx * 60}ms` }}
                    >
                      <SIcon className="w-4 h-4 text-primary-foreground/70 hover:text-secondary transition-colors" />
                    </a>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-primary-foreground/50 font-body mt-12 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            12+ In-house Designers, Design Managers, Execution Managers & Sales Managers
          </motion.p>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS (reuse homepage) ═══════ */}
      <TestimonialsSection />
    </div>
  );
}
