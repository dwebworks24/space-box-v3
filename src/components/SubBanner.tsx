import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SubBannerProps {
  image: string;
  title: string;
  highlight: string;
  subtitle?: string;
  height?: number;
}

export default function SubBanner({ image, title, highlight, subtitle, height = 330 }: SubBannerProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative overflow-hidden" style={{ height: `${height}px` }}>
      <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4 }}
        style={{ width: '20%' }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16"
        style={{ opacity: heroOpacity }}
      >
        <motion.p
          className="text-white/80 text-xs uppercase tracking-[0.3em] mb-2 font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {subtitle || 'SpaceBox Concepts'}
        </motion.p>
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl text-white leading-[0.95]"
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: easeOut }}
        >
          {title} <span className="text-white font-semibold">{highlight}</span>
        </motion.h1>
      </motion.div>
    </section>
  );
}
