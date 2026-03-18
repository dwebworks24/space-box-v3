import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import footerBg from "@/assets/footer-bg-new.jpg";
import footerLamps from "@/assets/footer-lamps.png";

const Footer = () => {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Lamps hanging from the top edge of the footer */}
      <img
        src={footerLamps}
        alt=""
        className="absolute top-0 left-2 md:left-10 w-[80px] md:w-[140px] z-20 pointer-events-none select-none"
      />
      <img
        src={footerLamps}
        alt=""
        className="absolute top-0 right-2 md:right-10 w-[80px] md:w-[140px] z-20 pointer-events-none select-none scale-x-[-1]"
      />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${footerBg})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          {/* Logo */}
          <img
            src={logo}
            alt="SpaceBox Concepts"
            className="h-36 md:h-48 w-auto brightness-0 invert mb-6"
          />

          {/* Contact Details Row */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 w-full max-w-4xl mb-12 items-start text-left">
            {/* Location */}
            <a
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
            </a>
            {/* Email */}
            <a
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
            </a>
            {/* Phone */}
            <div className="flex items-center gap-3">
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
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
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
          </nav>

          {/* Divider */}
          <div className="w-full max-w-5xl h-px bg-white/20 mb-6" />

          {/* Bottom row */}
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/spaceboxconcepts/",
                },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:text-secondary hover:border-secondary transition-colors"
                >
                  <Icon size={16} />
                </a>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
