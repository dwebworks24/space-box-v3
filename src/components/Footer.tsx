import { motion } from "framer-motion";
import { Instagram, MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import footerBg from "@/assets/footer-bg-new.jpg";
import footerLamps from "@/assets/footer-lamps.png";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const Footer = () => {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Lamps */}
      <motion.img
        src={footerLamps}
        alt=""
        className="absolute top-0 left-2 md:left-10 w-[80px] md:w-[140px] z-20 pointer-events-none select-none"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
      />
      <motion.img
        src={footerLamps}
        alt=""
        className="absolute top-0 right-2 md:right-10 w-[80px] md:w-[140px] z-20 pointer-events-none select-none scale-x-[-1]"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.5 }}
      />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${footerBg})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-8">
        <motion.div
          className="container mx-auto px-6 flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Logo */}
          <motion.img
            variants={fadeUp}
            src={logo}
            alt="SpaceBox Concepts"
            className="h-36 md:h-48 w-auto brightness-0 invert mb-6"
          />

          {/* Contact Details Row */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 w-full max-w-4xl mb-12 items-start text-left"
          >
            {/* Location */}
            <motion.a
              variants={fadeUp}
              href="https://maps.google.com/?q=spacebox+concepts+Interior+Designer+Kondapur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-white/60 font-body text-xs uppercase tracking-wider mb-0.5">
                  Visit our office
                </p>
                <p className="text-white/80 font-body text-sm leading-snug group-hover:text-secondary transition-colors">
                  Plot no.147, V-Pride building,
                  <br />
                  Spring valley road, Kondapur,
                  <br />
                  Serilingampally - 500084
                </p>
              </div>
            </motion.a>
            {/* Email */}
            <motion.a
              variants={fadeUp}
              href="mailto:spaceboxconcepts@gmail.com"
              className="flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                <Mail size={20} className="text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-white/60 font-body text-xs uppercase tracking-wider mb-0.5">
                  Mail us everyday
                </p>
                <p className="text-white font-body text-sm group-hover:text-secondary transition-colors">
                  spaceboxconcepts@gmail.com
                </p>
              </div>
            </motion.a>
            {/* Phone */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-white/60 font-body text-xs uppercase tracking-wider mb-0.5">
                  Call us Anytime
                </p>
                <div className="flex flex-col">
                  <a
                    href="tel:+917799101433"
                    className="text-white font-body text-sm hover:text-secondary transition-colors"
                  >
                    +91 77991 01433
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Nav links */}
          <motion.nav variants={fadeUp} className="flex flex-wrap justify-center gap-6 md:gap-10 mb-4">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Projects", href: "/projects" },
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white font-body text-sm uppercase tracking-widest hover:text-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
          <motion.nav variants={fadeUp} className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms-and-conditions" },
              { label: "Refund Policy", href: "/refund-policy" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/60 font-body text-xs uppercase tracking-widest hover:text-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Divider */}
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.8, ease: easeOut } },
            }}
            className="w-full max-w-5xl h-px bg-white/20 mb-6 origin-left"
          />

          {/* Bottom row */}
          <motion.div variants={fadeUp} className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/spaceboxconcepts/",
                },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:text-secondary hover:border-secondary transition-colors"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-white/50 text-xs font-body">
              Copyright © 2026 All rights reserved by{" "}
              <span className="font-semibold text-white/70">
                SpaceBox Concepts
              </span>
              . Crafted with ❤️{" "}
              <a
                href="https://www.dt7.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white/70 hover:underline"
              >
                DT7.Agency
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
