import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ClipboardList, Palette, LayoutGrid, Box, ShoppingBag, HardHat, CheckCircle, HandshakeIcon } from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";
import ctaBg from "@/assets/cta-bg.jpg";

const stages = [
  { num: "01", title: "Requirement Gathering & Site Analysis", desc: "Understanding client needs, lifestyle, theme preferences, and measuring the space.", icon: ClipboardList },
  { num: "02", title: "Concept Development & Mood Boards", desc: "Creating a visual direction through themes, colors, materials, and inspiration boards.", icon: Palette },
  { num: "03", title: "Space Planning & Layout Finalization", desc: "Functional zoning, furniture placement, circulation flow, and utility planning.", icon: LayoutGrid },
  { num: "04", title: "3D Design & Visualization", desc: "Realistic renders and walkthroughs to help visualize the final outcome.", icon: Box },
  { num: "05", title: "Material Selection & Costing", desc: "Finalizing finishes, fixtures, fabrics and budget alignment.", icon: ShoppingBag },
  { num: "06", title: "Execution & Site Supervision", desc: "Carpentry, civil, electrical, furnishing, and on-site coordination.", icon: HardHat },
  { num: "07", title: "Quality Check & Final Styling", desc: "Snag correction, decor layering, and final touches.", icon: CheckCircle },
  { num: "08", title: "Handover & After-Support", desc: "Delivering the space in move-in ready condition with post-handover assistance.", icon: HandshakeIcon },
];

const CARD_W_MOBILE = 260;
const CARD_W = 380;
const CARD_GAP = 24;

const WorkProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cardW = isMobile ? CARD_W_MOBILE : CARD_W;

  const totalCardsWidth = stages.length * cardW + (stages.length - 1) * CARD_GAP;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Translate cards from right to left as user scrolls
  const maxTranslate = totalCardsWidth - (typeof window !== "undefined" ? window.innerWidth * 0.55 : 800);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [100, -maxTranslate]);

  // Progress bar
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressNum = useTransform(scrollYProgress, [0, 1], [1, stages.length]);

  // Parallax bg
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${stages.length * 55}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-16 sm:top-20 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Background */}
        <motion.div className="absolute inset-0 -top-[10%] -bottom-[10%]" style={{ y: bgY }}>
          <img src={ctaBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-6 md:px-10 lg:px-20 pt-8 md:pt-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-shrink-0 mb-8 md:mb-12"
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
                  Our Process
                </p>
                <AnimatedTitle className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  Project Stages
                </AnimatedTitle>
              </div>

              {/* Progress indicator */}
              <div className="hidden md:block w-40 lg:w-52">
                <div className="flex justify-between text-xs font-body text-white/60 mb-1.5">
                  <span>Progress</span>
                  <ProgressCounter value={progressNum} total={stages.length} />
                </div>
                <div className="h-[2px] bg-white/20 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-secondary origin-left" style={{ scaleX }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Horizontal scrolling cards */}
          <HorizontalCards x={x} scrollYProgress={scrollYProgress} />

          {/* Bottom dots (mobile progress) */}
          <div className="flex-shrink-0 pb-8 pt-4 flex justify-center gap-2 md:hidden">
            {stages.map((_, i) => (
              <ProgressDot key={i} index={i} scrollYProgress={scrollYProgress} total={stages.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Horizontal Cards with active tracking ────────────────── */
function HorizontalCards({
  x,
  scrollYProgress,
}: {
  x: ReturnType<typeof useTransform>;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * stages.length), stages.length - 1);
    setActiveIndex(idx);
  });

  return (
    <div className="flex-1 min-h-0 flex items-center overflow-hidden">
      <motion.div style={{ x }} className="flex gap-6">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <StageCard
              key={stage.num}
              stage={stage}
              index={i}
              Icon={Icon}
              isActive={i === activeIndex}
              scrollYProgress={scrollYProgress}
              total={stages.length}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── Card ─────────────────────────────────────────────────── */
function StageCard({
  stage,
  index,
  Icon,
  isActive,
  scrollYProgress,
  total,
}: {
  stage: typeof stages[0];
  index: number;
  Icon: typeof stages[0]["icon"];
  isActive: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const [isHovered, setIsHovered] = useState(false);

  // Each card slides in from right, scales up and glows when "active"
  const cardTranslateX = useTransform(
    scrollYProgress,
    [segStart, segStart + 0.04, segEnd - 0.04, segEnd],
    [80, 0, 0, 80]
  );
  const cardRotateY = useTransform(
    scrollYProgress,
    [segStart, segStart + 0.04, segEnd - 0.04, segEnd],
    [6, 0, 0, 6]
  );
  const cardScale = useTransform(
    scrollYProgress,
    [segStart, segStart + 0.04, segEnd - 0.04, segEnd],
    [0.85, 1, 1, 0.85]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [segStart, segStart + 0.04, segEnd - 0.04, segEnd],
    [0.3, 1, 1, 0.3]
  );
  const borderOpacity = useTransform(
    scrollYProgress,
    [segStart, segStart + 0.02, segEnd - 0.02, segEnd],
    [0.1, 0.5, 0.5, 0.1]
  );

  const showWhite = isActive || isHovered;

  return (
    <motion.div
      style={{
        x: isHovered ? 0 : cardTranslateX,
        rotateY: isHovered ? 0 : cardRotateY,
        scale: isHovered ? 1 : cardScale,
        opacity: isHovered ? 1 : cardOpacity,
        perspective: 800,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="w-[260px] md:w-[380px] min-w-[260px] md:min-w-[380px] h-[280px] md:h-[360px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full rounded-xl backdrop-blur-md p-6 flex flex-col overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.05)",
          borderWidth: 1.5,
          borderStyle: "solid",
          borderColor: useTransform(borderOpacity, (v) => `rgba(255,255,255,${Math.min(v * 1.6, 0.8)})`),
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
          style={{
            background: "hsl(var(--primary) / 0.12)",
            opacity: useTransform(scrollYProgress, [segStart, segStart + 0.02, segEnd - 0.02, segEnd], [0, 1, 1, 0]),
          }}
        />

        {/* Number - filled white when active/hovered, outlined when inactive */}
        <span
          className="text-5xl md:text-7xl font-black leading-none mb-2 select-none transition-all duration-300"
          style={showWhite ? {
            color: "#ffffff",
            WebkitTextStroke: "2px #ffffff",
          } : {
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.9)",
            textShadow: "0 0 0 transparent",
            paintOrder: "stroke fill",
          }}
        >
          {stage.num}
        </span>

        {/* Icon - white when active/hovered, secondary when inactive */}
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${showWhite ? "bg-white/15" : "bg-secondary/15"
            }`}
        >
          <Icon className={`w-5 h-5 transition-colors duration-300 ${showWhite ? "text-white" : "text-secondary"
            }`} />
        </div>

        {/* Text - white when active/hovered, muted when inactive */}
        <div className="mt-auto">
          <h3 className={`font-bold text-sm uppercase tracking-wider leading-tight mb-2 transition-colors duration-300 ${showWhite ? "text-white" : "text-white/80"
            }`}>
            {stage.title}
          </h3>
          <p className={`text-xs leading-relaxed transition-colors duration-300 ${showWhite ? "text-white" : "text-white/60"
            }`}>
            {stage.desc}
          </p>
        </div>

        {/* Active indicator line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary"
          style={{
            scaleX: useTransform(scrollYProgress, [segStart, segStart + 0.02, segEnd - 0.02, segEnd], [0, 1, 1, 0]),
            transformOrigin: "left",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Progress counter ────────────────────────────────────── */
function ProgressCounter({ value, total }: { value: ReturnType<typeof useTransform>; total: number }) {
  return (
    <motion.span>
      {useTransform(value, (v: number) => `${String(Math.round(v)).padStart(2, "0")} / ${String(total).padStart(2, "0")}`)}
    </motion.span>
  );
}

/* ── Mobile progress dot ─────────────────────────────────── */
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
  const scale = useTransform(scrollYProgress, [start, start + 0.01, end - 0.01, end], [1, 1.5, 1.5, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-2 h-2 rounded-full bg-secondary"
    />
  );
}

export default WorkProcessSection;
