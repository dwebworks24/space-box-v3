import SEO from '@/components/SEO';
import { useState, useCallback, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, CheckCircle2, Sparkles, Palette, Lightbulb, ChevronDown, ArrowLeft, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { services } from '@/components/ServicesSection';
import SubBanner from '@/components/SubBanner';
import useEmblaCarousel from 'embla-carousel-react';
import { isValidPhone, getPhoneError } from '@/lib/phoneValidation';

const RECAPTCHA_SITE_KEY = '6LfT-YYsAAAAANH5sGA7t-a8BuWMt_F4FMhkTRBh';

// Service-specific hero images
import residentialHero from '@/assets/services/residential-hero.jpg';
import commercialHero from '@/assets/services/commercial-hero.jpg';
import spacePlanningHero from '@/assets/services/space-planning-hero.jpg';
import materialColorHero from '@/assets/services/material-color-hero.jpg';
import projectExecutionHero from '@/assets/services/project-execution-hero.jpg';

// Detail images
import detailBedroom from '@/assets/services/detail-bedroom.jpg';
import detailKitchen from '@/assets/services/detail-kitchen.jpg';
import detailDining from '@/assets/services/detail-dining.jpg';
import detailReception from '@/assets/services/detail-reception.jpg';
import detailConference from '@/assets/services/detail-conference.jpg';

// Service hero image map
const serviceHeroImages: Record<string, string> = {
  "residential-interior-design": residentialHero,
  "commercial-interior-design": commercialHero,
  "space-planning-concept-development": spacePlanningHero,
  "material-color-consultation": materialColorHero,
  "end-to-end-project-execution": projectExecutionHero,
};

// Service detail (second) image map
const serviceDetailImages: Record<string, string> = {
  "residential-interior-design": detailBedroom,
  "commercial-interior-design": detailReception,
  "space-planning-concept-development": detailKitchen,
  "material-color-consultation": detailDining,
  "end-to-end-project-execution": detailConference,
};

// Portfolio images (unique per service, no repeats)
import portfolio1 from '@/assets/services/portfolio-1.jpg';
import portfolio2 from '@/assets/services/portfolio-2.jpg';
import portfolio3 from '@/assets/services/portfolio-3.jpg';
import portfolio4 from '@/assets/services/portfolio-4.jpg';
import portfolio5 from '@/assets/services/portfolio-5.jpg';
import portfolio6 from '@/assets/services/portfolio-6.jpg';
import portfolio7 from '@/assets/services/portfolio-7.jpg';
import portfolio8 from '@/assets/services/portfolio-8.jpg';
import portfolio9 from '@/assets/services/portfolio-9.jpg';
import portfolio10 from '@/assets/services/portfolio-10.jpg';
import darkshellBg from '@/assets/services/darkshell-bg.jpg';
import darkshellBg2 from '@/assets/services/darkshell-bg-2.jpg';
import darkshellBg3 from '@/assets/services/darkshell-bg-3.jpg';
import darkshellBg4 from '@/assets/services/darkshell-bg-4.jpg';
import darkshellBg5 from '@/assets/services/darkshell-bg-5.jpg';

const serviceDarkshellBg: Record<string, string> = {
  "residential-interior-design": darkshellBg,
  "commercial-interior-design": darkshellBg2,
  "space-planning-concept-development": darkshellBg3,
  "material-color-consultation": darkshellBg4,
  "end-to-end-project-execution": darkshellBg5,
};

// Each service gets a unique set of portfolio images — no repeats across services
const servicePortfolioImages: Record<string, string[]> = {
  "residential-interior-design": [portfolio1, portfolio2, portfolio5, portfolio6, portfolio8, portfolio10],
  "commercial-interior-design": [portfolio3, portfolio4, portfolio7, portfolio9, detailReception, detailConference],
  "space-planning-concept-development": [portfolio1, portfolio3, portfolio5, portfolio9, spacePlanningHero, detailKitchen],
  "material-color-consultation": [portfolio2, portfolio4, portfolio6, portfolio10, materialColorHero, detailDining],
  "end-to-end-project-execution": [portfolio7, portfolio8, portfolio9, portfolio3, projectExecutionHero, detailConference],
};

function getGalleryForService(slug: string) {
  return servicePortfolioImages[slug] || [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6];
}

// ── Service Highlights (3 per service) ──
const serviceHighlights: Record<string, { icon: 'sparkles' | 'palette' | 'lightbulb'; title: string; desc: string }[]> = {
  "residential-interior-design": [
    { icon: 'sparkles', title: "Personalized Spaces", desc: "We understand your lifestyle and design a space that's uniquely yours — no cookie-cutter templates." },
    { icon: 'palette', title: "Timeless Designs", desc: "Concepts that look beautiful for years, not just a season, blending classic elegance with modern comfort." },
    { icon: 'lightbulb', title: "Aesthetic & Functional", desc: "Craft living spaces with both stunning design and everyday usability for families and individuals." },
  ],
  "commercial-interior-design": [
    { icon: 'sparkles', title: "Brand-Aligned Interiors", desc: "Spaces that embody your brand identity and create memorable experiences for clients and employees." },
    { icon: 'palette', title: "Productivity-Driven Design", desc: "Layouts optimised for workflow efficiency, collaboration, and employee well-being." },
    { icon: 'lightbulb', title: "Scalable Solutions", desc: "Flexible commercial designs that grow with your business and adapt to changing needs." },
  ],
  "space-planning-concept-development": [
    { icon: 'sparkles', title: "Precision Layouts", desc: "Every square foot is mapped for maximum utility with intuitive traffic flow and smart zoning." },
    { icon: 'palette', title: "Creative Concepts", desc: "Mood boards, theme development, and visual storytelling that bring your vision to life." },
    { icon: 'lightbulb', title: "Future-Ready Plans", desc: "Designs that adapt to your evolving needs with flexible furniture arrangements and modular elements." },
  ],
  "material-color-consultation": [
    { icon: 'sparkles', title: "Mood-Based Palettes", desc: "Colors chosen based on psychology and your personal style for the perfect ambiance." },
    { icon: 'palette', title: "Material Harmony", desc: "Perfect pairing of textures, finishes, and colors for a cohesive visual story." },
    { icon: 'lightbulb', title: "Trend-Proof Choices", desc: "Palettes designed to stay elegant through changing seasons and evolving tastes." },
  ],
  "end-to-end-project-execution": [
    { icon: 'sparkles', title: "On-Time Delivery", desc: "Strict timeline management with weekly updates to keep everything on schedule." },
    { icon: 'palette', title: "Budget Control", desc: "Real-time budget tracking with alerts to prevent any cost overruns." },
    { icon: 'lightbulb', title: "Single Point of Contact", desc: "Dedicated project manager for seamless coordination and communication." },
  ],
  "quality-of-service": [
    { icon: 'sparkles', title: "Zero-Defect Delivery", desc: "Multi-stage quality checks ensure every detail meets our exacting standards." },
    { icon: 'palette', title: "Premium Materials", desc: "Only the finest materials sourced from trusted suppliers for lasting beauty." },
    { icon: 'lightbulb', title: "Artisan Craftsmanship", desc: "Skilled craftsmen who bring precision and artistry to every element." },
  ],
};

// ── Detailed description content per service ──
const serviceDetailedContent: Record<string, { title: string; desc: string }[]> = {
  "residential-interior-design": [
    { title: "Lifestyle Assessment", desc: "Understanding your daily routines, preferences, and functional needs to create a personalised design brief for your home." },
    { title: "Space Planning & Layout", desc: "Detailed floor plans with functional zoning, optimal furniture placement, and smooth circulation for every room." },
    { title: "Material & Finish Selection", desc: "Curating premium materials, textures, and finishes that align with your aesthetic vision and budget." },
    { title: "Furniture & Decor Curation", desc: "Hand-picking furniture, lighting, and decor elements that bring warmth, character, and comfort to your home." },
    { title: "Styling & Final Touches", desc: "Layering art, textiles, greenery, and accessories to create a polished, move-in ready living space." },
  ],
  "commercial-interior-design": [
    { title: "Brand & Spatial Analysis", desc: "Understanding your brand identity, business goals, and spatial requirements to create a tailored design strategy." },
    { title: "Workplace Efficiency Planning", desc: "Designing layouts that maximise productivity, collaboration, and employee satisfaction across all zones." },
    { title: "Client Experience Design", desc: "Creating reception areas, meeting rooms, and customer-facing spaces that leave lasting impressions." },
    { title: "Compliance & Safety Integration", desc: "Ensuring all designs meet commercial building codes, fire safety, and accessibility requirements." },
    { title: "Fitout Coordination", desc: "Managing all trades — electrical, HVAC, civil, and furnishing — for seamless commercial execution." },
  ],
  "space-planning-concept-development": [
    { title: "Site Survey & Measurement", desc: "Thorough evaluation of your existing space, including measurements, structural analysis, and design possibilities." },
    { title: "Functional Zoning", desc: "Strategically dividing spaces into activity zones — work, leisure, dining — for optimal flow and usability." },
    { title: "Concept & Mood Board Creation", desc: "Developing visual mood boards combining colour palettes, textures, and inspirations tailored to your vision." },
    { title: "3D Visualisation", desc: "Photorealistic 3D renders and walkthroughs so you can experience and refine the design before execution." },
    { title: "Design Revisions & Approval", desc: "Iterative refinement based on your feedback to ensure the final concept perfectly meets your expectations." },
  ],
  "material-color-consultation": [
    { title: "Colour Psychology Consultation", desc: "Expert guidance on how colours influence mood, productivity, and well-being within different room types." },
    { title: "Curated Mood Boards", desc: "Visual mood boards combining colour palettes, textures, and inspirations tailored to your personality and space." },
    { title: "Material & Texture Pairing", desc: "Coordinating complementary materials — wood, stone, fabric — with selected colour schemes for a cohesive look." },
    { title: "Paint & Finish Selection", desc: "Choosing the perfect paint brands, sheens, and specialty finishes for walls, ceilings, and accents." },
    { title: "Physical Samples & Approval", desc: "Providing physical swatches, paint samples, and material boards so you can see and feel the selections in your space." },
  ],
  "end-to-end-project-execution": [
    { title: "Vendor & Contractor Coordination", desc: "Managing all third-party relationships to ensure seamless execution and accountability across trades." },
    { title: "Timeline & Milestone Tracking", desc: "Setting clear deadlines and tracking progress with weekly updates to keep the project on schedule." },
    { title: "Budget Monitoring & Reporting", desc: "Real-time budget tracking with detailed breakdowns and alerts to prevent cost overruns." },
    { title: "On-Site Supervision", desc: "Dedicated project managers present on-site to oversee quality, safety, and adherence to design plans." },
    { title: "Handover & Move-In Readiness", desc: "Final inspection, snag correction, and everything placed perfectly before you step in." },
  ],
  "quality-of-service": [
    { title: "Multi-Stage Quality Inspections", desc: "Rigorous checks at every construction phase — from raw materials to final finishes — ensuring zero compromises." },
    { title: "Snag List Management", desc: "Systematic identification and resolution of defects or inconsistencies before final handover." },
    { title: "Premium Material Sourcing", desc: "Partnering with trusted suppliers to source only the finest materials that meet our exacting standards." },
    { title: "Artisan Craftsmanship", desc: "Engaging skilled craftsmen who bring precision, artistry, and attention to detail to every element." },
    { title: "Final Walk-Through & Sign-Off", desc: "Comprehensive inspection with the client to ensure every detail meets expectations before project closure." },
  ],
};

// ── Service taglines ──
const serviceTaglines: Record<string, string> = {
  "residential-interior-design": "Turning houses into homes that tell your story.",
  "commercial-interior-design": "Professional spaces designed for performance and impression.",
  "space-planning-concept-development": "Precision planning that transforms visions into livable reality.",
  "material-color-consultation": "Colors and materials that speak your style and set the perfect mood.",
  "end-to-end-project-execution": "Seamless execution from concept to completion.",
  "quality-of-service": "Uncompromising quality at every stage of your project.",
};

// ── FAQ per service ──
const serviceFAQs: Record<string, { q: string; a: string }[]> = {
  "residential-interior-design": [
    { q: "What does residential interior design include?", a: "It covers everything from space planning, material selection, and furniture curation to styling and final move-in readiness for your home." },
    { q: "Can you work with my existing furniture?", a: "Absolutely! We assess your existing pieces and incorporate them into the new design where they complement the vision." },
    { q: "How long does a residential project take?", a: "Depending on scope, residential projects typically take 6-12 weeks from design to handover." },
    { q: "Do you handle both apartments and villas?", a: "Yes, we design for all residential formats — from compact apartments to expansive villas and independent homes." },
  ],
  "commercial-interior-design": [
    { q: "What types of commercial spaces do you design?", a: "We design offices, retail stores, restaurants, cafés, hotels, co-working spaces, and healthcare facilities." },
    { q: "Can you incorporate our brand identity?", a: "Yes, we seamlessly integrate brand guidelines, colours, and identity into the interior design for a cohesive experience." },
    { q: "Do you handle commercial compliance?", a: "Absolutely. All our commercial designs meet building codes, fire safety regulations, and accessibility standards." },
    { q: "How do you minimise business disruption?", a: "We plan phased execution and off-hours work to minimise impact on your ongoing business operations." },
  ],
  "space-planning-concept-development": [
    { q: "What is space planning?", a: "Space planning is the strategic arrangement of rooms, furniture, and circulation paths to maximise functionality and aesthetics." },
    { q: "Do you provide 3D visualisations?", a: "Yes, we create photorealistic 3D renders and virtual walkthroughs so you can experience the design before execution." },
    { q: "How many concept revisions are included?", a: "We typically include 2-3 rounds of revisions to ensure the final concept perfectly aligns with your vision." },
    { q: "Can you work with unusual or challenging layouts?", a: "Absolutely! We specialise in creative solutions for irregular spaces, ensuring every corner is beautifully utilised." },
  ],
  "material-color-consultation": [
    { q: "How do you choose colours for a space?", a: "We consider room function, natural light, existing elements, your preferences, and colour psychology to create the perfect palette." },
    { q: "Do you provide physical material samples?", a: "Yes! We provide physical swatches, paint samples, and material boards so you can see and feel the selections in your space." },
    { q: "Can you match brand colours for commercial spaces?", a: "Yes, we seamlessly integrate brand guidelines into commercial interiors while maintaining a cohesive environment." },
    { q: "How often should I update my colour scheme?", a: "Our schemes are designed for longevity. We recommend a soft refresh of accents and textiles every 3-5 years." },
  ],
  "end-to-end-project-execution": [
    { q: "What does end-to-end execution include?", a: "It covers vendor coordination, timeline tracking, budget monitoring, on-site supervision, quality checks, and final handover." },
    { q: "How often do you provide updates?", a: "We provide weekly progress reports with photos, along with milestone updates and immediate alerts for any decisions needed." },
    { q: "What if the project goes over budget?", a: "We maintain strict budget controls with real-time tracking and alerts. Any potential overruns are flagged early with alternatives." },
    { q: "Can you manage renovations and new construction?", a: "Yes, we manage both renovation projects and fresh construction with equal expertise, coordinating all trades seamlessly." },
  ],
  "quality-of-service": [
    { q: "What quality standards do you follow?", a: "We follow strict multi-stage quality protocols with documented checklists at every phase — from material inspection to final finishing." },
    { q: "How do you handle defects or issues?", a: "We maintain a comprehensive snag list and address every issue before handover. Post-handover, our warranty covers quality concerns." },
    { q: "Do you use branded/certified materials?", a: "Yes, we source only from certified, reputable brands and suppliers. Every material is verified for quality and durability." },
    { q: "What warranty do you provide?", a: "We provide a comprehensive warranty on workmanship and materials, with specifics documented in your contract." },
  ],
};

// ── Extended description per service ──
const serviceExtendedDesc: Record<string, string> = {
  "residential-interior-design": "Your home is a reflection of who you are. Our residential interior design service creates living spaces that are deeply personal, beautifully crafted, and built for the way you live.\n\nFrom the initial consultation to the final styling, we handle every aspect — space planning, material selection, furniture curation, and decor layering — ensuring a seamless journey from vision to reality.",
  "commercial-interior-design": "A well-designed commercial space drives productivity, impresses clients, and strengthens brand identity. We create environments that work as hard as you do.\n\nOur commercial design service covers offices, retail, hospitality, and healthcare — delivering spaces that balance aesthetics with operational efficiency and regulatory compliance.",
  "space-planning-concept-development": "Great interiors begin with great planning. Our space planning and concept development service transforms your requirements into a comprehensive spatial strategy.\n\nThrough detailed floor plans, mood boards, and 3D visualisations, we map every square foot to ensure your space is both beautiful and brilliantly functional, adapting to your evolving needs.",
  "material-color-consultation": "Color is the soul of interior design. The right palette and materials can transform a room from ordinary to extraordinary, influencing mood, perception, and the overall feel.\n\nOur consultants combine artistic sensibility with colour psychology to develop schemes that reflect your personality. Every shade and texture is carefully selected to work harmoniously with your space.",
  "end-to-end-project-execution": "Flawless execution requires expert management. Our end-to-end service ensures your interior design project is delivered on time, within budget, and to the highest standards.\n\nFrom coordinating multiple vendors to managing timelines and conducting quality inspections, our dedicated project managers oversee every detail so you can enjoy a stress-free experience.",
  "quality-of-service": "Quality is not just a promise — it's our standard. From the first sketch to the final handover, every phase of your project undergoes rigorous quality control to ensure flawless execution.\n\nWe partner with trusted suppliers, engage skilled craftsmen, and conduct multi-stage inspections to deliver interiors that stand the test of time.",
};

const HighlightIcon = ({ type }: { type: 'sparkles' | 'palette' | 'lightbulb' }) => {
  const cls = "w-8 h-8 text-white";
  if (type === 'sparkles') return <Sparkles className={cls} />;
  if (type === 'palette') return <Palette className={cls} />;
  return <Lightbulb className={cls} />;
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];

  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const highlightsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: highlightsRef, offset: ['start end', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link to="/services" className="text-secondary hover:text-secondary/80 hover:underline">Back to Services</Link>
      </div>
    );
  }

  const prev = index > 0 ? services[index - 1] : null;
  const next = index < services.length - 1 ? services[index + 1] : null;
  const gallery = getGalleryForService(service.slug);
  const highlights = serviceHighlights[service.slug] || serviceHighlights["interior-consultation"];
  const detailedContent = serviceDetailedContent[service.slug] || serviceDetailedContent["interior-consultation"];
  const extendedDesc = serviceExtendedDesc[service.slug] || serviceExtendedDesc["interior-consultation"];
  const faqs = serviceFAQs[service.slug] || serviceFAQs["interior-consultation"];
  const tagline = serviceTaglines[service.slug] || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pErr = getPhoneError(form.phone);
    if (pErr) { setPhoneError(pErr); return; }
    if (!captchaToken) { setSendError(true); setTimeout(() => setSendError(false), 3000); return; }
    setSending(true);
    setSendError(false);

    try {
      await emailjs.send(
        'service_yy5td3a',
        'template_mhqv7a3',
        {
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          email: form.email,
          message: form.message,
        },
        'fvEpos_G5k7KO9CLG'
      );
      setSubmitted(true);
      setForm({ first_name: '', last_name: '', phone: '', email: '', message: '' });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setSendError(true);
      setTimeout(() => setSendError(false), 3000);
    } finally {
      setSending(false);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div>
      <SEO
        title={`${service.title} - Interior Design Services`}
        description={service.desc}
        keywords={`${service.title}, interior design, SpaceBox Concepts, Hyderabad, Telangana, ${service.slug.replace(/-/g, ' ')}`}
      />
      {/* SubBanner */}
      <SubBanner
        image={service.image}
        title={service.title}
        highlight=""
        subtitle="SpaceBox Concepts"
        height={330}
      />

      {/* ═══════════ SECTION 1: Editorial Overview ═══════════ */}
      <section className="py-10 lg:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          {/* Row 1: Text left, Image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
            <motion.div {...fadeUp}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[42px] text-foreground leading-tight mb-6 font-semibold">
                {service.title}
              </h2>
              {extendedDesc.split('\n\n').map((p, i) => (
                <p key={i} className="text-muted-foreground text-[15px] md:text-base leading-relaxed font-body mb-5">
                  {p}
                </p>
              ))}
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <img
                src={serviceHeroImages[service.slug] || service.image}
                alt={service.title}
                className="w-full h-[300px] lg:h-[420px] object-cover rounded-xl"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* Row 2: Image left, Text right (detailed content) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div {...fadeUp} className="order-2 lg:order-1">
              <img
                src={serviceDetailImages[service.slug] || gallery[0]}
                alt={`${service.title} detail`}
                className="w-full h-[300px] lg:h-[420px] object-cover rounded-xl"
                loading="lazy"
              />
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="order-1 lg:order-2">
              <div className="space-y-5">
                {detailedContent.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 font-display text-[15px]">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 2: Service Highlights (3 cards) ═══════════ */}
      <section ref={highlightsRef} className="relative py-10 lg:py-16 overflow-hidden">
        {/* Parallax bg image */}
        <motion.div
          className="absolute inset-[-20%]"
          style={{ y: heroY, scale: heroScale }}
        >
          <img src={serviceHeroImages[service.slug] || service.image} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <motion.div className="text-center mb-14" {...fadeUp}>
            <p className="text-secondary text-[13px] uppercase tracking-[3px] mb-3 font-display font-semibold">Signature Elements</p>
            <h2 className="font-display text-3xl md:text-4xl text-white font-semibold">Curated Hallmarks</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border border-white/20 shadow-sm hover:shadow-lg hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-secondary/80 flex items-center justify-center">
                  <HighlightIcon type={h.icon} />
                </div>
                <h3 className="font-display text-xl mb-3 text-white font-semibold">{h.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed font-body">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 3: Consultation / Booking Form ═══════════ */}
      <section className="py-10 lg:py-16 bg-warm-bg">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <motion.div
            className="max-w-3xl mx-auto bg-warm-bg border border-border rounded-2xl p-5 sm:p-8 md:p-12 shadow-sm"
            {...fadeUp}
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3 font-semibold">
                  Appointment Successfully Booked!
                </h3>
                <p className="text-muted-foreground text-sm md:text-base font-body max-w-md mx-auto">
                  Thank you for reaching out. Our team will contact you within <strong className="text-foreground">24 hours</strong> to discuss your requirements.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2 font-semibold">
                    Begin Your Design Journey
                  </h2>
                  <p className="text-muted-foreground text-sm font-body">Let us conceptualize your vision into a living masterpiece.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium mb-1.5 block text-foreground font-body">First Name *</label>
                      <input
                        required
                        value={form.first_name}
                        onChange={(e) => { const v = e.target.value; if (/\d/.test(v)) return; setForm({ ...form, first_name: v }); }}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all font-body"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block text-foreground font-body">Last Name *</label>
                      <input
                        required
                        value={form.last_name}
                        onChange={(e) => { const v = e.target.value; if (/\d/.test(v)) return; setForm({ ...form, last_name: v }); }}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all font-body"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium mb-1.5 block text-foreground font-body">Phone Number *</label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => { const v = e.target.value.replace(/[a-zA-Z]/g, ''); setForm({ ...form, phone: v }); if (phoneError) { const err = getPhoneError(v); setPhoneError(err || ''); } }}
                        onBlur={() => { const err = getPhoneError(form.phone); setPhoneError(err || ''); }}
                        className={`w-full bg-background border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 outline-none transition-all font-body ${phoneError ? 'border-destructive focus:border-destructive focus:ring-destructive' : 'border-border focus:border-gold focus:ring-gold'}`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {phoneError && <p className="text-destructive text-xs mt-1">{phoneError}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block text-foreground font-body">Your Email Address *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all font-body"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block text-foreground font-body">Write Your Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none font-body"
                      placeholder={`Describe your ${service.title.toLowerCase()} requirements...`}
                    />
                  </div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl font-body disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Sending...' : submitted ? '✓ Request Sent!' : sendError ? '✕ Failed, Try Again' : <><Send className="w-4 h-4" /> Book Appointment</>}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SECTION 4: Sample Works Carousel ═══════════ */}
      <SampleWorksCarousel gallery={gallery} serviceTitle={service.title} fadeUp={fadeUp} slug={service.slug} />

      {/* ═══════════ SECTION 5: FAQ ═══════════ */}
      <section className="py-10 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <motion.div className="text-center mb-14" {...fadeUp}>
            <h2 className="font-display text-3xl md:text-4xl text-foreground font-semibold">Curated Inquiries</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="bg-background border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-secondary text-lg">✦</span>
                    <span className="text-foreground font-display font-semibold text-sm md:text-[15px]">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openFAQ === i ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-40 pb-4' : 'max-h-0'}`}
                >
                  <p className="px-6 pl-[52px] text-muted-foreground text-sm leading-relaxed font-body">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 6: Prev / Next Navigation ═══════════ */}
      <section className="border-t border-border bg-warm-bg">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-2">
          {prev ? (
            <Link
              to={`/services/${prev.slug}`}
              className="py-8 pr-6 group hover:bg-warm-bg transition-colors border-r border-border flex items-center gap-3"
            >
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1 font-body">Previous</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors font-display">{prev.title}</p>
              </div>
            </Link>
          ) : <div className="border-r border-border" />}
          {next ? (
            <Link
              to={`/services/${next.slug}`}
              className="py-8 pl-6 text-right group hover:bg-warm-bg transition-colors flex items-center justify-end gap-3"
            >
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1 font-body">Next</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors font-display">{next.title}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
            </Link>
          ) : <div />}
        </div>
      </section>
    </div>
  );
}

/* ═══════════ Sample Works Carousel Component ═══════════ */
function SampleWorksCarousel({ gallery, serviceTitle, fadeUp, slug }: { gallery: string[]; serviceTitle: string; fadeUp: any; slug: string }) {
  const allImages = gallery; // unique images, no duplication
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const labels = ['Living Interiors', 'Workspace Interiors', 'Reception Interiors', 'Modern Interiors', 'Classic Interiors', 'Contemporary Interiors'];

  return (
    <section className="py-10 lg:py-16 relative overflow-hidden bg-[#050505]">
      {/* Darkshell background */}
      <div className="absolute inset-0">
        <img
          src={serviceDarkshellBg[slug] || darkshellBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
        {/* Subtle top/bottom edge highlights */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <motion.div className="text-center mb-14" {...fadeUp}>
          <p className="text-secondary text-[13px] uppercase tracking-[3px] mb-3 font-display font-semibold">CURATED ARCHIVES</p>
          <h2 className="font-display text-3xl md:text-4xl text-white font-semibold">Featured Masterpieces</h2>
          <p className="text-white/50 text-sm mt-3 max-w-2xl mx-auto font-body">
            Creating a well-designed space requires a full range of design services including furniture selection, colour coordination, and project management.
          </p>
        </motion.div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex -ml-4">
              {allImages.map((img, i) => (
                <div key={i} className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="group">
                    <div className="relative rounded-xl overflow-hidden h-[220px] md:h-[260px] ring-1 ring-white/10">
                      <img
                        src={img}
                        alt={`${serviceTitle} project ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    </div>
                    <p className="text-center text-white/80 font-display font-semibold mt-4 text-sm">{labels[i % labels.length]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-3 md:-left-5 top-[130px] md:top-[130px] w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 shadow-md flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all text-white/70"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-3 md:-right-5 top-[130px] md:top-[130px] w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 shadow-md flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all text-white/70"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
