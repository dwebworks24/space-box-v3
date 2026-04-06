import { useState, useCallback, useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import { Link } from "react-router-dom";
import { ArrowUpRight, Home, Building2, LayoutGrid, Palette, FolderKanban, ChevronLeft, ChevronRight } from "lucide-react";
import sectionBg from "@/assets/section-shape-1-2.png";
import consultationImg from "@/assets/services/consultation.jpg";
import designPlanningImg from "@/assets/services/design-planning.jpg";
import spaceOptImg from "@/assets/services/space-optimization.jpg";
import colourImg from "@/assets/services/colour-schemes.jpg";
import projectMgmtImg from "@/assets/services/project-management.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

const serviceIcons = [Home, Building2, LayoutGrid, Palette, FolderKanban];

export const services = [
  { slug: "residential-interior-design", title: "Residential Interior Design", image: consultationImg, desc: "Transforming homes into personalised, functional living spaces.", fullDesc: "We design homes that reflect your personality and lifestyle. From cosy bedrooms to elegant living rooms, our residential interior design service covers space planning, material selection, furniture curation, and styling — creating warm, inviting spaces that feel uniquely yours. Every detail is crafted to balance aesthetics with everyday comfort." },
  { slug: "commercial-interior-design", title: "Commercial Interior Design", image: designPlanningImg, desc: "Professional interiors for offices, retail & hospitality spaces.", fullDesc: "Our commercial design expertise transforms workplaces, retail outlets, restaurants, and hospitality venues into high-performing environments. We consider brand identity, employee well-being, customer experience, and operational efficiency to deliver interiors that elevate your business and leave lasting impressions." },
  { slug: "space-planning-concept-development", title: "Space Planning & Concept Development", image: spaceOptImg, desc: "Strategic layouts, zoning & creative concept ideation.", fullDesc: "Great interiors begin with great planning. We develop comprehensive spatial strategies with functional zoning, traffic flow analysis, and creative concept ideation. Through mood boards, 3D visualisations, and detailed floor plans, we map every square foot to ensure your space is both beautiful and brilliantly functional." },
  { slug: "material-color-consultation", title: "Material & Color Consultation", image: colourImg, desc: "Expert guidance on palettes, textures, finishes & materials.", fullDesc: "Choosing the right materials and colours is critical to achieving the desired look and feel. Our consultants combine colour psychology with hands-on material expertise to develop cohesive palettes and textures. From paint finishes and flooring to fabrics and fixtures, every selection is curated to create a harmonious, lasting interior." },
  { slug: "end-to-end-project-execution", title: "End-to-end Project Execution", image: projectMgmtImg, desc: "Complete project management from concept to move-in.", fullDesc: "We manage your entire project from initial concept through to final handover. Our end-to-end service includes vendor coordination, timeline management, on-site supervision, budget tracking, and quality inspections at every phase. With a single point of contact and regular progress updates, we deliver a stress-free experience and move-in ready spaces." },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariant = (i: number) => ({
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.7, ease: easeOut },
  },
});

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const ServiceCard = forwardRef<HTMLDivElement, { s: typeof services[0]; i: number; isLast: boolean; showBorder?: boolean }>(({ s, i, isLast, showBorder = true }, ref) => {
  const Icon = serviceIcons[i];
  return (
    <div ref={ref}>
      <Link to={`/services/${s.slug}`} className="group block h-full">
        <div
          className={`relative h-full p-5 flex flex-col transition-all duration-500 hover:bg-white/[0.04] ${
            showBorder && !isLast ? "border-r border-white/10" : ""
          }`}
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:border-secondary/50 transition-colors duration-500">
            <Icon className="w-5 h-5 text-secondary/70 group-hover:text-secondary transition-colors duration-300" strokeWidth={1.5} />
          </div>
          <h3 className="text-white text-xs md:text-xs text-sm font-bold uppercase tracking-wider leading-snug mb-4 min-h-[2rem]">
            {s.title}
          </h3>
          <div className="relative rounded-lg overflow-hidden mb-4 aspect-[4/3]">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <p className="text-white/45 text-xs md:text-xs text-sm font-body leading-relaxed flex-1 mb-4">
            {s.desc}
          </p>
          <div className="mt-auto">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 group-hover:border-secondary group-hover:bg-secondary/10 transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-secondary transition-colors duration-300" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
});

const ServicesSection = () => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + services.length) % services.length);
  }, []);

  // Auto-slide on mobile
  useEffect(() => {
    if (!isMobile) return;
    autoSlideRef.current = setInterval(() => paginate(1), 3000);
    return () => { if (autoSlideRef.current) clearInterval(autoSlideRef.current); };
  }, [isMobile, paginate]);

  return (
    <section id="services" className="py-24 md:py-28 relative overflow-hidden bg-foreground">
      <div className="absolute inset-0 z-0">
        <img src="/images/site-footer-shape-1-2.jpg" alt="" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-foreground/55 z-0" />

      <div className="container mx-auto px-4 md:px-0 relative z-10">
        <div className="mb-16">
          <motion.p
            className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            What We Offer
          </motion.p>
          <AnimatedTitle className="text-4xl md:text-5xl text-white leading-tight">
        The Work We Love
          </AnimatedTitle>
        </div>

        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <ServiceCard s={services[current]} i={current} isLast={true} showBorder={false} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-secondary hover:text-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === current ? "bg-secondary w-6" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-secondary hover:text-secondary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                variants={cardVariant(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <ServiceCard s={s} i={i} isLast={i === services.length - 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
