import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import consultationImg from "@/assets/services/consultation.jpg";
import designPlanningImg from "@/assets/services/design-planning.jpg";
import spaceOptImg from "@/assets/services/space-optimization.jpg";
import colourImg from "@/assets/services/colour-schemes.jpg";
import qualityImg from "@/assets/services/quality.jpg";
import projectMgmtImg from "@/assets/services/project-management.jpg";

export const services = [
  { slug: "residential-interior-design", title: "Residential Interior Design", image: consultationImg, desc: "Transforming homes into personalised, functional living spaces.", fullDesc: "We design homes that reflect your personality and lifestyle. From cosy bedrooms to elegant living rooms, our residential interior design service covers space planning, material selection, furniture curation, and styling — creating warm, inviting spaces that feel uniquely yours. Every detail is crafted to balance aesthetics with everyday comfort." },
  { slug: "commercial-interior-design", title: "Commercial Interior Design", image: designPlanningImg, desc: "Professional interiors for offices, retail & hospitality spaces.", fullDesc: "Our commercial design expertise transforms workplaces, retail outlets, restaurants, and hospitality venues into high-performing environments. We consider brand identity, employee well-being, customer experience, and operational efficiency to deliver interiors that elevate your business and leave lasting impressions." },
  { slug: "space-planning-concept-development", title: "Space Planning & Concept Development", image: spaceOptImg, desc: "Strategic layouts, zoning & creative concept ideation.", fullDesc: "Great interiors begin with great planning. We develop comprehensive spatial strategies with functional zoning, traffic flow analysis, and creative concept ideation. Through mood boards, 3D visualisations, and detailed floor plans, we map every square foot to ensure your space is both beautiful and brilliantly functional." },
  { slug: "material-color-consultation", title: "Material & Color Consultation", image: colourImg, desc: "Expert guidance on palettes, textures, finishes & materials.", fullDesc: "Choosing the right materials and colours is critical to achieving the desired look and feel. Our consultants combine colour psychology with hands-on material expertise to develop cohesive palettes and textures. From paint finishes and flooring to fabrics and fixtures, every selection is curated to create a harmonious, lasting interior." },
  { slug: "end-to-end-project-execution", title: "End-to-end Project Execution", image: projectMgmtImg, desc: "Complete project management from concept to move-in.", fullDesc: "We manage your entire project from initial concept through to final handover. Our end-to-end service includes vendor coordination, timeline management, on-site supervision, budget tracking, and quality inspections at every phase. With a single point of contact and regular progress updates, we deliver a stress-free experience and move-in ready spaces." },
  { slug: "quality-of-service", title: "Quality of Service", image: qualityImg, desc: "Snag correction, decor layering & meticulous finishing.", fullDesc: "Quality is at the heart of everything we do. Our meticulous approach includes thorough snag correction, precise decor layering, and attention to the finest finishing details. We conduct multiple quality checks throughout the project to ensure every element meets our exacting standards and your expectations." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl text-foreground">
            Our Services
          </h2>
        </motion.div>

        {/* Cards Grid — 3 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link to={`/services/${s.slug}`} className="group block">
                <div className="relative rounded-xl overflow-hidden border border-border bg-card h-[320px] transition-all duration-500 hover:shadow-[0_16px_48px_hsl(var(--secondary)/0.15)]">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-sm bg-black/20 border-t border-white/10">
                    <h3 className="text-white text-lg font-semibold leading-tight drop-shadow-md">
                      {s.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1 line-clamp-2">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-secondary text-sm font-semibold mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Know More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
