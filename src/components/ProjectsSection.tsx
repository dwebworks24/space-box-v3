import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import projectResidential from "@/assets/project-residential.jpg";
import projectMeeting from "@/assets/project-meeting.jpg";
import projectBedroom from "@/assets/project-bedroom.jpg";

const cards = [
  {
    num: "01",
    title: "Designed\nfor You",
    description:
      "Crafting with your unique needs in mind. Unlock the full potential of your workspace with our bespoke modular interior solutions.",
    image: projectResidential,
  },
  {
    num: "02",
    title: "Transformative\nWorkspace",
    description:
      "Elevate your work experience with our cutting-edge modular interior pods. Discover how innovative setups enhance productivity and comfort.",
    image: projectMeeting,
  },
  {
    num: "03",
    title: "Serene\nLiving Spaces",
    description:
      "Create calm, refined bedrooms that blend modern aesthetics with everyday comfort. Thoughtful design for restful living.",
    image: projectBedroom,
  },
];

const CARD_W = 420; // px per card
const GAP = 24;

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Total horizontal travel: all cards width minus viewport
  const totalScroll = (CARD_W + GAP) * cards.length;

  const x = useTransform(scrollYProgress, [0.15, 0.85], [totalScroll, -totalScroll * 0.15]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 bg-foreground overflow-hidden"
    >
      {/* Section header */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 mb-14">
        <motion.p
          className="text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What We Do
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl text-background leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our <span className="text-secondary">Expertise</span>
        </motion.h2>
      </div>

      {/* Horizontal scroll strip */}
      <motion.div
        className="flex gap-6 pl-4 sm:pl-8 md:pl-16 lg:pl-20"
        style={{ x }}
      >
        {cards.map((card, i) => (
          <div
            key={card.num}
            className="flex-shrink-0 w-[340px] sm:w-[400px] lg:w-[420px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden group"
          >
            {/* Image */}
            <div className="relative w-full h-[240px] sm:h-[280px] overflow-hidden">
              <img
                src={card.image}
                alt={card.title.replace("\n", " ")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Number badge */}
              <span className="absolute top-4 left-4 text-5xl lg:text-6xl font-bold text-secondary leading-none drop-shadow-lg">
                {card.num}
              </span>
            </div>

            {/* Text content */}
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-semibold text-background whitespace-pre-line leading-tight mb-3">
                {card.title}
              </h3>
              <p className="text-background/60 text-sm sm:text-base leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
