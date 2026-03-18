import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Phone, CalendarCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const socialLinks: { icon: any; href: string; label: string; bg: string }[] = [];

const ICON_SIZE = "w-10 h-10";
const ICON_INNER = "w-4 h-4";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Mobile: bottom dock bar ── */
  if (isMobile) {
    return (
      <>
        {/* Back to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-[4.5rem] right-4 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90"
              aria-label="Back to top"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom dock */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md safe-area-pb"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.5 }}
        >
          <div className="flex items-center justify-around py-2 relative">
            <a
              href="https://calendly.com/spaceboxconcepts/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-background/80 hover:text-background transition-colors px-3 py-1"
            >
              <CalendarCheck className="w-5 h-5" />
              <span className="text-[10px] leading-tight font-medium">Book 1:1<br />Consultation</span>
            </a>

            <a href="tel:+917799101433" className="flex flex-col items-center -mt-6">
              <motion.span
                className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-[0_4px_20px_rgba(220,38,38,0.4)] flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
                animate={{ boxShadow: ["0 4px 20px rgba(220,38,38,0.4)", "0 4px 30px rgba(220,38,38,0.6)", "0 4px 20px rgba(220,38,38,0.4)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Phone className="w-6 h-6" />
              </motion.span>
              <span className="text-[10px] text-background/80 mt-1 font-medium">Talk to an Expert</span>
            </a>

            <a
              href="https://wa.me/917799101433"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-background/80 hover:text-background transition-colors px-3 py-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-[10px] leading-tight font-medium">Chat On<br />WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </>
    );
  }

  /* ── Desktop: social icons on LEFT, action icons on RIGHT ── */
  return (
    <>
      {/* Left side - Social media icons */}
      <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-2.5">
        {socialLinks.map(({ icon: Icon, href, label, bg }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ICON_SIZE} rounded-full ${bg} text-white shadow-lg flex items-center justify-center`}
            aria-label={label}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.5, ease: easeOut }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className={ICON_INNER} />
          </motion.a>
        ))}
      </div>

      {/* Right side - Action icons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/917799101433"
          target="_blank"
          rel="noopener noreferrer"
          className={`${ICON_SIZE} rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)]`}
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: easeOut }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>

        {/* Book Consultation */}
        <motion.a
          href="https://calendly.com/spaceboxconcepts/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={`${ICON_SIZE} rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90`}
          aria-label="Book Consultation"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.5, ease: easeOut }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <CalendarCheck className={ICON_INNER} />
        </motion.a>

        {/* Back to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`${ICON_SIZE} rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90`}
              aria-label="Back to top"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3, ease: easeOut }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className={ICON_INNER} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingButtons;
