import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = ["About", "Services", "Work", "Contact"];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <a href="/" className="font-heading text-xl font-bold tracking-tight">
        <span className="text-gradient">SPACEBOX</span>
        <span className="text-foreground"> CONCEPTS</span>
      </a>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
          >
            {item}
          </a>
        ))}
      </nav>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-foreground"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
