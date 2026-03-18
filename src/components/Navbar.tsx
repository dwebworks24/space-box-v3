import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X, ChevronDown, Download } from "lucide-react";
import { services } from "@/components/ServicesSection";

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
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <li key={link.href}>
                  <button
                    className="text-sm font-medium text-foreground hover:text-secondary transition-colors inline-flex items-center gap-1 w-full"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <ul className="mt-2 ml-3 flex flex-col gap-2 border-l-2 border-secondary/30 pl-3">
                      <li>
                        <Link to="/services" onClick={() => setOpen(false)} className="text-xs font-semibold uppercase tracking-wider text-secondary">
                          View All Services →
                        </Link>
                      </li>
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services/${s.slug}`}
                            className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-secondary ${location.pathname === link.href ? "text-secondary" : "text-foreground"}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
            <li>
              <button
                onClick={handleDownloadBrochure}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-secondary shadow-md hover:shadow-xl transition-all duration-300 ease-out"
              >
                <Download className="w-4 h-4" />
                Download Brochure
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
