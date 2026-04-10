import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

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
        {navItems.map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="text-base font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
          >
            {item}
          </motion.a>
        ))}
      </nav>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-foreground"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-[100dvh] w-[80%] max-w-sm bg-background/95 backdrop-blur-xl border-l border-border z-50 md:hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="font-semibold text-sm tracking-wide uppercase text-muted-foreground">
                  Menu
                </span>

                <button onClick={() => setOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    className="block text-base font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              {/* Optional Footer (nice touch) */}
              <div className="p-5 border-t border-border text-xs text-muted-foreground">
                © {new Date().getFullYear()} Spacebox Concepts
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
