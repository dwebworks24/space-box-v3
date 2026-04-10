import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X, ChevronDown, Download } from "lucide-react";
import { services } from "@/components/ServicesSection";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const alwaysSolid = !isHome;

  const handleDownloadBrochure = () => {
    window.open("/brochure.pdf", "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 90);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileServicesOpen(false);
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${alwaysSolid || scrolled
        ? "bg-background/95 backdrop-blur-sm border-b border-border"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8 md:px-16">
        <Link to="/">
          <img
            src={logo}
            alt="SpaceBox Concepts"
            className={`h-28 sm:h-40 transition-all duration-300 ${alwaysSolid || scrolled ? "" : "brightness-0 invert"}`}
          />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <li key={link.href} ref={dropdownRef} className="relative">
                <button
                  className={`text-sm font-medium transition-colors hover:text-secondary inline-flex items-center gap-1 ${location.pathname.startsWith("/services") ? "text-secondary" : alwaysSolid || scrolled ? "text-foreground" : "text-white"}`}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  onMouseEnter={() => setServicesOpen(true)}
                >
                  {link.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>

                {servicesOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[220px] bg-background border border-border rounded-xl shadow-xl z-50 py-2"
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted/60 hover:text-secondary transition-colors"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-secondary ${location.pathname === link.href ? "text-secondary" : alwaysSolid || scrolled ? "text-foreground" : "text-white"}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop Book Consultation - opens popup */}
        <button
          onClick={handleDownloadBrochure}
          className={`hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ease-out ${alwaysSolid || scrolled
            ? "bg-primary text-primary-foreground hover:bg-secondary"
            : "bg-white text-black hover:bg-secondary hover:text-white"
            }`}
        >
          <Download className="w-4 h-4" />
          Download Brochure
        </button>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors ${alwaysSolid || scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay (NO BLUR) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-[100dvh] w-[80%] max-w-sm 
              bg-background/85 backdrop-blur-xl 
              border-l border-white/10 
              z-50 md:hidden flex flex-col 
              shadow-[ -20px_0_60px_rgba(0,0,0,0.7) ]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                  Menu
                </span>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-7">
                {navLinks.map((link, i) =>
                  link.hasDropdown ? (
                    <div key={link.href}>
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className="w-full flex items-center justify-between text-base font-medium text-foreground hover:text-secondary transition-all duration-300"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-3 ml-2 border-l border-white/10 pl-4 space-y-3"
                          >
                            <Link
                              to="/services"
                              onClick={() => setOpen(false)}
                              className="block text-xs font-semibold uppercase tracking-wider text-secondary"
                            >
                              View All Services →
                            </Link>

                            {services.map((s) => (
                              <Link
                                key={s.slug}
                                to={`/services/${s.slug}`}
                                onClick={() => setOpen(false)}
                                className="block text-sm text-muted-foreground hover:text-secondary transition-all duration-300 hover:translate-x-1"
                              >
                                {s.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className={`block text-base font-medium transition-all duration-300 ${
                          location.pathname === link.href
                            ? "text-secondary translate-x-1"
                            : "text-foreground hover:text-secondary hover:translate-x-1"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}

                {/* CTA */}
                <div className="pt-4">
                  <button
                    onClick={handleDownloadBrochure}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl 
                    bg-primary text-primary-foreground 
                    hover:bg-secondary 
                    shadow-lg hover:shadow-2xl 
                    hover:-translate-y-0.5 
                    transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Download Brochure
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/5 text-xs text-muted-foreground/60">
                © {new Date().getFullYear()} Spacebox Concepts
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
