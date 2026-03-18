import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-heading text-sm uppercase tracking-[0.3em] mb-4">
              Get in Touch
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Let's create
              <br />
              <span className="text-gradient">together</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md leading-relaxed">
              Have a project in mind? We'd love to hear about it. Reach out and
              let's start shaping something remarkable.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, text: "hello@spaceboxconcepts.com" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: MapPin, text: "Studio 4B, Creative Quarter" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <Icon className="text-primary" size={20} />
                  <span className="text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-card border border-border rounded-md px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-card border border-border rounded-md px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
            />
            <textarea
              rows={5}
              placeholder="Tell us about your project..."
              className="w-full bg-card border border-border rounded-md px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 font-heading font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity rounded-md glow"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
