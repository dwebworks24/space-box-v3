import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  life: number;
  maxLife: number;
  opacity: number;
  wingPhase: number;
  wingSpeed: number;
  drift: number;
  hue: number;
}

function SplashCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const idCounter = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const spawnParticles = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
      const speed = 0.5 + Math.random() * 1.5;
      const size = 6 + Math.random() * 10;
      const maxLife = 50 + Math.random() * 60;
      particlesRef.current.push({
        id: idCounter.current++,
        x, y, angle, speed, size,
        life: 0,
        maxLife,
        opacity: 0.7 + Math.random() * 0.3,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 0.15 + Math.random() * 0.1,
        drift: (Math.random() - 0.5) * 0.5,
        hue: Math.random() > 0.5 ? 3 : (15 + Math.random() * 25),
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 30) {
        spawnParticles(e.clientX, e.clientY, 1);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onClick = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY, 4);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const drawButterfly = (ctx: CanvasRenderingContext2D, p: Particle) => {
      const progress = p.life / p.maxLife;
      const alpha = p.opacity * (1 - progress);
      const s = p.size * (0.3 + 0.7 * Math.min(p.life / 10, 1)) * (1 - progress * 0.3);
      const wingFlap = Math.sin(p.wingPhase + p.life * p.wingSpeed) * 0.8;
      const hue = p.hue ?? 3;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.sin(p.life * 0.02 + p.drift) * 0.15);

      // Left wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-s * 0.8 * (1 + wingFlap * 0.3), -s * 0.6, -s * (1 + wingFlap * 0.5), -s * 0.1, -s * 0.3, s * 0.3);
      ctx.bezierCurveTo(-s * 0.6, s * 0.5, -s * 0.2, s * 0.4, 0, 0);
      ctx.fillStyle = `hsla(${hue}, 76%, 53%, ${alpha})`;
      ctx.fill();

      // Right wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.8 * (1 + wingFlap * 0.3), -s * 0.6, s * (1 + wingFlap * 0.5), -s * 0.1, s * 0.3, s * 0.3);
      ctx.bezierCurveTo(s * 0.6, s * 0.5, s * 0.2, s * 0.4, 0, 0);
      ctx.fillStyle = `hsla(${p.hue}, 76%, 58%, ${alpha * 0.9})`;
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.06, s * 0.3, 0, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 50%, 30%, ${alpha})`;
      ctx.fill();

      // Wing glow
      const grad = ctx.createRadialGradient(0, -s * 0.2, 0, 0, -s * 0.2, s);
      grad.addColorStop(0, `hsla(${p.hue}, 76%, 53%, ${alpha * 0.15})`);
      grad.addColorStop(1, `hsla(${p.hue}, 76%, 53%, 0)`);
      ctx.beginPath();
      ctx.arc(0, -s * 0.2, s, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += Math.cos(p.angle) * p.speed + p.drift;
        p.y += Math.sin(p.angle) * p.speed - 0.3;
        p.speed *= 0.99;
        p.angle += Math.sin(p.life * 0.05) * 0.02;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        drawButterfly(ctx, p);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(animRef.current);
    };
  }, [spawnParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 18, stiffness: 120, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setIsHovering(true);
      }
    };
    const handleOut = () => setIsHovering(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      <SplashCanvas />
      {/* Outer glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--secondary) / 0.25) 0%, transparent 70%)",
          transition: "width 0.3s, height 0.3s",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 12 : 6,
          height: isHovering ? 12 : 6,
          borderRadius: "50%",
          backgroundColor: "hsl(var(--secondary))",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
          borderRadius: "50%",
          border: `1.5px solid hsl(var(--secondary) / ${isHovering ? 0.6 : 0.3})`,
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
    </>
  );
}
