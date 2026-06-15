import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";
import sectionShape from "@/assets/section-shape-1.png";
import circleShape1 from "@/assets/site-footer-two-shape-1.png";

import work1 from "@/assets/projects/work-1.png";
import work2 from "@/assets/projects/work-2.png";
import work3 from "@/assets/projects/work-3.png";
import work4 from "@/assets/projects/work-4.png";
import work5 from "@/assets/projects/work-5.png";
import work6 from "@/assets/projects/work-6.png";
import work7 from "@/assets/projects/work-7.png";
import work8 from "@/assets/projects/work-8.png";
import work9 from "@/assets/projects/work-9.png";

const projects = [
  { img: work1, title: "Fly Hyderabad", category: "Commercial" },
  { img: work2, title: "Sunset Stories", category: "Commercial" },
  { img: work3, title: "Cozone Coworking Space", category: "Commercial" },
  { img: work4, title: "Mehbubnagar Play Area", category: "Commercial" },
  { img: work5, title: "Lodha Play Area", category: "Commercial" },
];

const PROJECT_HEIGHT = 420;
const GAP = 24;
const VISIBLE_CARDS = 2; // how many cards visible at once in the viewport

const OurWorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    observer.observe(scrollContainerRef.current);
    return () => observer.disconnect();
  }, []);

  const cardHeight = isMobile ? 300 : PROJECT_HEIGHT;
  const totalCardsHeight = projects.length * cardHeight + (projects.length - 1) * GAP;

  // Use dynamic container height if available, otherwise fallback
  const maxTranslate = containerHeight > 0 
    ? Math.max(0, totalCardsHeight - containerHeight + 80) // Added 80px buffer to guarantee visibility of the last card
    : (projects.length - 2) * (cardHeight + GAP) + 80;

  // Scroll height: one viewport + enough to scroll through remaining cards
  const extraScroll = maxTranslate;
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate the transform directly so it always responds to state changes
  const translateY = useTransform(scrollYProgress, (pos) => -pos * maxTranslate);

  return (
    <section
      ref={sectionRef}
      className="relative bg-foreground"
      style={{ height: `calc(100vh + ${extraScroll}px)` }}
    >
      {/* Background texture */}
      <img src={sectionShape} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none" />
      <img src="/images/about-v1-shape1-2.png" alt="" className="absolute top-0 left-0 w-[350px] md:w-[450px] opacity-50 pointer-events-none" />
      <img src={circleShape1} alt="" className="absolute bottom-0 right-0 w-[250px] opacity-30 pointer-events-none" />

      {/* Background watermark text */}
      <div className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2 pointer-events-none select-none z-0 hidden sm:block">
        <span
          className="block text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[14rem] font-bold uppercase leading-none whitespace-nowrap"
          style={{
            fontFamily: "var(--font-serif)",
            WebkitTextStroke: "2px hsl(var(--primary-foreground) / 0.30)",
            color: "transparent",
            writingMode: "vertical-lr",
            lineHeight: 0.85,
          }}
        >
          OUR WORKS
        </span>
      </div>

      {/* Sticky container that stays in view */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center pt-32 lg:pt-0">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-center">
            {/* Left: Sticky text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className=""
            >
              <p className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 mt-8 sm:mt-0 font-body">
                Our Works
              </p>
              <AnimatedTitle className="text-4xl md:text-5xl text-white leading-tight mt-4 sm:mt-0 py-3">
                Spaces We Designed
              </AnimatedTitle>
              <p className="mt-6 text-white/60 font-body max-w-sm leading-relaxed">
                Explore our completed projects in the form of Residential, Commercial, and Office Interior Designers in Telangana.
              </p>

              <a
                href="/projects"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl"
              >
                View All Projects <ArrowRight className="w-4 h-4" />
              </a>

              {/* Progress dots */}
              <div className="mt-10 hidden lg:flex gap-2">
                {projects.map((_, i) => (
                  <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} total={projects.length} />
                ))}
              </div>
            </motion.div>

            {/* Right: Scrolling projects */}
            <div ref={scrollContainerRef} className="relative h-[80vh] sm:h-[65vh] lg:h-[calc(100vh-120px)] overflow-hidden pt-4 pb-4 sm:pt-6 sm:pb-10">
              <motion.div
                style={{ y: translateY }}
                className="flex flex-col"
                transition={{ type: "tween", ease: "linear" }}
              >
                {projects.map((p, i) => (
                  <div
                    key={p.title}
                    className="group relative overflow-hidden rounded-sm"
                    style={{
                      height: `${cardHeight}px`,
                      marginBottom: i < projects.length - 1 ? `${GAP}px` : 0,
                    }}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500 flex items-end">
                      <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-xs text-secondary uppercase tracking-widest font-body">
                          {p.category}
                        </p>
                        <h3 className="text-lg text-background mt-1">{p.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Small progress dot component
function ProgressDot({
  index,
  scrollYProgress,
  total,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.01, end - 0.01, end], [0.25, 1, 1, 0.25]);
  const scale = useTransform(scrollYProgress, [start, start + 0.01, end - 0.01, end], [1, 1.4, 1.4, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-2 h-2 rounded-full bg-secondary"
    />
  );
}

export default OurWorkSection;
