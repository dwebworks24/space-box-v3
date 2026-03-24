import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const faqs = [
  {
    question: "How long does a typical interior design project take?",
    answer:
      "Project timelines vary based on scope. A single room redesign typically takes 4–6 weeks, while a complete home or commercial space can take 8–16 weeks from concept to completion.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "Yes! We offer a complimentary initial consultation to understand your vision, discuss requirements, and provide a preliminary estimate. Book yours through our Start Project page.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We primarily serve Hyderabad and all of Telangana. For larger projects, we also take on work across Andhra Pradesh and other metro cities in India.",
  },
  {
    question: "Can you work within my budget?",
    answer:
      "Absolutely. We design solutions across various budget ranges. During our consultation, we'll discuss your budget and create a plan that maximises value without compromising on quality.",
  },
  {
    question: "Do you handle both residential and commercial projects?",
    answer:
      "Yes, SpaceBox Concepts specialises in both residential interiors (homes, apartments, villas) and commercial spaces (offices, retail stores, restaurants, and cafeterias).",
  },
  {
    question: "What is your design process?",
    answer:
      "Our process includes five stages: Consultation & Briefing → Concept Development → 3D Visualisation & Approval → Execution & Project Management → Handover & Support.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          {/* Left – heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <span className="text-secondary font-semibold uppercase tracking-widest text-xs">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Frequently Asked{" "}
              <span className="text-secondary">Questions</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md font-body">
              Everything you need to know before starting your interior design
              journey with SpaceBox Concepts.
            </p>
          </motion.div>

          {/* Right – accordion */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border/60 rounded-lg px-5 data-[state=open]:border-secondary/40 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left text-foreground font-medium hover:text-secondary transition-colors py-5 text-sm md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
