import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    name: "Sunny Rav",
    text: "Heartfelt Thanks to Spacebox Concepts, I wanted to take a moment to express my sincere gratitude for the incredible work you've done on my home. Even though I was in USA, I could already envision the beautiful transformations you've made. Your attention to detail and design expertise shine through in every corner, and I was surprised and overwhelmed to see everything in person. Thank you for bringing my vision to life and for making this process so enjoyable. Thanks again.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Ashwin Debbadi",
    text: "Spectacular designs and exceptional execution with ease and stress free … all the best for your future endeavours.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Shiva Krishna",
    text: "Excellent 👌👌 …",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
];

const circlePositions = [
  { top: '5%', left: '8%', size: 'w-16 h-16 md:w-20 md:h-20' },
  { top: '0%', left: '30%', size: 'w-14 h-14 md:w-16 md:h-16' },
  { top: '30%', left: '22%', size: 'w-20 h-20 md:w-28 md:h-28' },
  { top: '60%', left: '5%', size: 'w-16 h-16 md:w-20 md:h-20' },
  { top: '70%', left: '28%', size: 'w-14 h-14 md:w-18 md:h-18' },
];

const floatVariants = [
  { y: [0, -12, 0], x: [0, 6, 0] },
  { y: [0, 8, 0], x: [0, -4, 0] },
  { y: [0, -10, 0], x: [0, -8, 0] },
  { y: [0, 14, 0], x: [0, 5, 0] },
  { y: [0, -8, 0], x: [0, 10, 0] },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActive((i) => (i + 1) % testimonials.length);
  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, hsl(30, 30%, 94%), hsl(25, 35%, 90%))' }}>
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[500px]">
          {/* Left - Floating avatar circles with continuous float */}
          <div className="relative h-[400px] md:h-[500px] hidden md:block">
            {circlePositions.map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos.size} rounded-full bg-gradient-to-br from-muted to-border overflow-hidden border-[3px] border-background shadow-lg`}
                style={{ top: pos.top, left: pos.left }}
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                animate={floatVariants[i]}
                // @ts-ignore
                transition2={{ repeat: Infinity, duration: 4 + i * 0.5, ease: "easeInOut" }}
              >
                <motion.div
                  animate={floatVariants[i]}
                  transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <img
                    src={testimonials[i % testimonials.length].image}
                    alt={testimonials[i % testimonials.length].name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Vertical timeline dots */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
              <div className="w-[1px] h-16 bg-border" />
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    i === active
                      ? 'bg-secondary border-secondary scale-125'
                      : 'bg-transparent border-muted-foreground/30 hover:border-secondary'
                  }`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
              <div className="w-[1px] h-16 bg-border" />
            </div>
          </div>

          {/* Right - Testimonial content */}
          <div>
            <motion.h2
              className="text-4xl md:text-5xl text-foreground mb-8"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              People Love Us
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: easeOut }}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: j * 0.08, duration: 0.4, type: "spring" }}
                    >
                      <Star className="w-5 h-5 fill-secondary text-secondary" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-muted-foreground font-body leading-relaxed text-lg mb-8">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-foreground font-semibold text-lg">{t.name}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile nav dots + arrows */}
            <div className="flex items-center gap-4 mt-10">
              <motion.button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-secondary transition-colors"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </motion.button>
              <div className="flex gap-2 md:hidden">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? 'bg-secondary' : 'bg-border'}`}
                  />
                ))}
              </div>
              <motion.button
                onClick={next}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-secondary transition-colors"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
