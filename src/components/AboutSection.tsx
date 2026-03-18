import { motion } from "framer-motion";
import aboutBg from "@/assets/about-us-3.webp";
import ctaBg from "@/assets/cta-bg.jpg";
import { Paintbrush, Lightbulb, Layers } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about">
      {/* Dark CTA block */}
      <div className="relative overflow-hidden">
        <img src={ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative container mx-auto px-20 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl text-primary-foreground leading-tight">
              Redefine Your
              <br />
              Work Experience
            </h2>
            <p className="mt-4 text-primary-foreground/80 font-body">
              Elevate Your Productivity
            </p>
            <p className="mt-2 text-primary-foreground/70 font-body max-w-md">
              Unlock the full potential of your workspace with our transformative modular interior solutions.
            </p>
            <a
              href="#projects"
              className="mt-8 inline-flex px-8 py-3 border border-primary-foreground text-primary-foreground font-medium hover:bg-secondary hover:border-secondary transition-colors font-body"
            >
              Learn More
            </a>
          </motion.div>
          <div />
        </div>
      </div>

      {/* "Unleash Your Potential" with background image */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <img
          src={aboutBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-white/60" />

        <div className="relative container mx-auto px-20 py-24">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl text-foreground leading-tight">
              Unleash Your Potential
            </h2>
            <p className="mt-4 text-muted-foreground font-body max-w-md">
              At SpaceBox Concepts, we believe great design goes beyond aesthetics — it transforms the way you live, work, and feel.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Paintbrush, label: "Customizable Finishes", color: "text-secondary" },
                { icon: Lightbulb, label: "Intelligent Design", color: "text-foreground" },
                { icon: Layers, label: "Adaptable Layouts", color: "text-secondary" },
              ].map(({ icon: Icon, label, color }, i) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-foreground font-body font-medium">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
