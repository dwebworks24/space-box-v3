import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '@/components/ServicesSection';
import SubBanner from '@/components/SubBanner';
import WorkProcessSection from '@/components/WorkProcessSection';
import consultation from "@/assets/services/consultation.jpg";

export default function Services() {
  return (
    <div>
      <SEO
        title="Interior Design Services"
        description="Explore our comprehensive interior design services including space planning, 3D modelling, furniture selection, lighting design, colour schemes, and project management in Telangana."
        keywords="interior design services, space planning, 3D modelling, furniture selection, lighting design, colour schemes, project management, Hyderabad, Telangana"
      />
      <SubBanner
        image={consultation}
        title="Comprehensive Interior"
        highlight="Solutions"
        subtitle="What We Offer"
      />

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group"
              >
                <Link to={`/services/${service.slug}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-background border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_hsl(2_66%_52%/0.1)] h-full">
                    <div className="overflow-hidden aspect-[4/3]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — reuse shared component */}
      <WorkProcessSection />
    </div>
  );
}
