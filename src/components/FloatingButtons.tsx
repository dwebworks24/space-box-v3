import { useState, useEffect } from "react";
import { ArrowUp, Phone, CalendarCheck } from "lucide-react";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";


const socialLinks = [
  // { icon: Facebook, href: "https://www.facebook.com/spaceboxconcepts", label: "Facebook", bg: "bg-destructive" },
  // { icon: Youtube, href: "https://www.youtube.com/@spaceboxconcepts", label: "YouTube", bg: "bg-destructive" },
  // { icon: Instagram, href: "https://www.instagram.com/spaceboxconcepts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram", bg: "bg-destructive" },
  // { icon: Linkedin, href: "https://www.linkedin.com/company/spacebox-concepts", label: "LinkedIn", bg: "bg-destructive" },
];

const ICON_SIZE = "w-10 h-10";
const ICON_INNER = "w-4 h-4";

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
        {/* Back to top - above dock */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-[4.5rem] right-4 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>


        {/* Bottom dock */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md safe-area-pb">
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
              <span className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-[0_4px_20px_rgba(220,38,38,0.4)] flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </span>
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
        </div>
      </>
    );
  }

  /* ── Desktop: social icons on LEFT, action icons on RIGHT ── */
  return (
    <>
      {/* Left side - Social media icons */}
      <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-2.5">
        {socialLinks.map(({ icon: Icon, href, label, bg }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ICON_SIZE} rounded-full ${bg} text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300`}
            aria-label={label}
          >
            <Icon className={ICON_INNER} />
          </a>
        ))}
      </div>

      {/* Right side - Action icons (WhatsApp → Book Consultation → Back to top) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp */}
        <a
          href="https://wa.me/917799101433"
          target="_blank"
          rel="noopener noreferrer"
          className={`${ICON_SIZE} rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)]`}
          aria-label="Chat on WhatsApp"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Book Consultation */}
        <a
          href="https://calendly.com/spaceboxconcepts/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={`${ICON_SIZE} rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 hover:scale-110 transition-all duration-300`}
          aria-label="Book Consultation"
        >
          <CalendarCheck className={ICON_INNER} />
        </a>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${ICON_SIZE} rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 hover:scale-110 transition-all duration-300 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          aria-label="Back to top"
        >
          <ArrowUp className={ICON_INNER} />
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
