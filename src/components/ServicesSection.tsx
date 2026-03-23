import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import { Link } from "react-router-dom";
import { ArrowUpRight, Home, Building2, LayoutGrid, Palette, FolderKanban } from "lucide-react";
import sectionBg from "@/assets/section-shape-1-2.png";
import consultationImg from "@/assets/services/consultation.jpg";
import designPlanningImg from "@/assets/services/design-planning.jpg";
import spaceOptImg from "@/assets/services/space-optimization.jpg";
import colourImg from "@/assets/services/colour-schemes.jpg";
import projectMgmtImg from "@/assets/services/project-management.jpg";

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

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden bg-foreground">
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <img src="/images/section-shape-1-4.png" alt="" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-foreground/80 z-0" />

      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        {/* Header */}
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
            Our Services
          </AnimatedTitle>
        </div>

        {/* Cards Grid — 5 columns side by side with right border dividers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((s, i) => {
            const Icon = serviceIcons[i];
            const isLast = i === services.length - 1;
            return (
              <motion.div
                key={s.slug}
                variants={cardVariant(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link to={`/services/${s.slug}`} className="group block h-full">
                  <div
                    className={`relative h-full p-5 flex flex-col transition-all duration-500 hover:bg-white/[0.04] ${
                      !isLast ? "border-r border-white/10" : ""
                    }`}
                  >
                    {/* Icon circle */}
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:border-secondary/50 transition-colors duration-500">
                      <Icon className="w-5 h-5 text-secondary/70 group-hover:text-secondary transition-colors duration-300" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="text-white text-xs font-bold uppercase tracking-wider leading-snug mb-4 min-h-[2rem]">
                      {s.title}
                    </h3>

                    {/* Image */}
                    <div className="relative rounded-lg overflow-hidden mb-4 aspect-[4/3]">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-white/45 text-xs font-body leading-relaxed flex-1 mb-4">
                      {s.desc}
                    </p>

                    {/* Arrow link */}
                    <div className="mt-auto">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 group-hover:border-secondary group-hover:bg-secondary/10 transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-secondary transition-colors duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
