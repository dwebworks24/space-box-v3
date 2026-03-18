import SEO from '@/components/SEO';
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, User, Briefcase, Palette, Home, Send, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import SubBanner from "@/components/SubBanner";
import { apiUrl, ENDPOINTS } from "@/config/api";
import { isValidPhone, getPhoneError } from '@/lib/phoneValidation';

const RECAPTCHA_SITE_KEY = '6LfT-YYsAAAAANH5sGA7t-a8BuWMt_F4FMhkTRBh';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SERVICES = [
  "Residential Interior Design",
  "Commercial Interior Design",
  "Space Planning & Concept Development",
  "Material & Color Consultation",
  "End-to-end Project Execution",
  "Quality of Service",
];

const BUDGET_RANGES = [
  "₹5 – 10 Lakhs",
  "₹10 – 25 Lakhs",
  "₹25 – 50 Lakhs",
  "₹50 Lakhs – 1 Crore",
  "₹1 Crore+",
  "Not sure yet",
];

const STYLES = [
  "Modern Minimalist",
  "Contemporary",
  "Traditional / Classic",
  "Industrial",
  "Scandinavian",
  "Luxury / High-end",
  "Eclectic / Mixed",
  "Not sure – need guidance",
];

const TIMELINES = [
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
  "Flexible",
];

const PROPERTY_TYPES: { label: string; subTypes: string[] }[] = [
  { label: "Apartment / Flat", subTypes: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK", "Studio"] },
  { label: "Independent House / Villa", subTypes: ["2 BHK", "3 BHK", "4 BHK", "5+ BHK", "Duplex", "Penthouse"] },
  { label: "Office Space", subTypes: ["Small (up to 500 sq ft)", "Medium (500–2000 sq ft)", "Large (2000+ sq ft)", "Co-working Space"] },
  { label: "Retail / Showroom", subTypes: ["Boutique Store", "Large Showroom", "Mall Outlet"] },
  { label: "Restaurant / Café", subTypes: ["Small Café", "Fine Dining", "Quick Service", "Bar / Lounge"] },
  { label: "Other", subTypes: [] },
];

const TOTAL_STEPS = 5;

const stepInfo = [
  { icon: User, label: "Contact Info" },
  { icon: Home, label: "Project Scope" },
  { icon: Briefcase, label: "Budget & Timeline" },
  { icon: Palette, label: "Style Preferences" },
  { icon: Send, label: "Review & Submit" },
];

const StartProject = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    services: [] as string[],
    propertyType: "",
    propertySubType: "",
    area: "",
    rooms: "",
    budget: "",
    timeline: "",
    styles: [] as string[],
    existingFurniture: "",
    specialRequirements: "",
    referral: "",
  });

  const update = (field: string, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const updatePropertyType = (value: string) => {
    setForm((prev) => ({ ...prev, propertyType: value, propertySubType: "" }));
  };

  const toggleArrayItem = (field: "services" | "styles", item: string) => {
    const arr = form[field];
    update(field, arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return form.name.trim() && form.email.trim() && form.phone.trim() && isValidPhone(form.phone);
      case 2: return form.services.length > 0 && form.propertyType;
      case 3: return form.budget && form.timeline;
      case 4: return form.styles.length > 0;
      case 5: return !!captchaToken;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(apiUrl(ENDPOINTS.PROJECT_INQUIRY), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail || data?.message || `Submission failed (${response.status})`);
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => { if (step < TOTAL_STEPS && canProceed()) setStep(step + 1); };
  const prev = () => { if (step > 1) setStep(step - 1); };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SubBanner title="Start Your" highlight="Project" image="" />
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank You, {form.name}!</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
              We've received your project details. Our team will reach out within 24 hours to discuss your vision.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-secondary transition-all duration-300"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Start Your Project - Get a Free Quote"
        description="Start your interior design project with SpaceBox Concepts. Tell us about your space, style preferences, and budget to get a personalized design proposal."
        keywords="start interior design project, free design quote, interior design inquiry, SpaceBox Concepts project, home renovation, office design project"
      />
      <SubBanner title="Start Your" highlight="Project" image="" />

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-secondary transition-all duration-500"
            style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
          {stepInfo.map((s, i) => {
            const StepIcon = s.icon;
            const isActive = step === i + 1;
            const isDone = step > i + 1;
            return (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${isDone
                    ? "bg-secondary border-secondary text-secondary-foreground"
                    : isActive
                      ? "bg-background border-secondary text-secondary"
                      : "bg-background border-border text-muted-foreground"
                    }`}
                >
                  {isDone ? <Check className="w-5 h-5" /> : <StepIcon className="w-4 h-4" />}
                </div>
                <span className={`text-[10px] mt-2 font-medium hidden sm:block ${isActive || isDone ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm"
          >
            {/* Step 1: Contact Info */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Contact Information</h2>
                <p className="text-muted-foreground text-sm mb-8">Let us know how to reach you.</p>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone Number * <span className="text-xs text-muted-foreground">(10 digits)</span></label>
                      <input
                        value={form.phone}
                        onChange={(e) => { update("phone", e.target.value); if (phoneError) { const err = getPhoneError(e.target.value); setPhoneError(err || ''); } }}
                        onBlur={() => { const err = getPhoneError(form.phone); setPhoneError(err || ''); }}
                        className={`w-full bg-background border rounded-lg px-4 py-3 text-sm focus:ring-1 outline-none transition-all ${phoneError ? 'border-destructive focus:border-destructive focus:ring-destructive' : 'border-border focus:border-secondary focus:ring-secondary'}`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {phoneError && <p className="text-destructive text-xs mt-1">{phoneError}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">City</label>
                    <input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                      placeholder="e.g. Hyderabad"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Scope */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Project Scope</h2>
                <p className="text-muted-foreground text-sm mb-8">Tell us about your space and what you need.</p>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Services You're Interested In *</label>
                    <Select
                      value=""
                      onValueChange={(val) => {
                        if (!form.services.includes(val)) {
                          update("services", [...form.services, val]);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full bg-background border-border rounded-lg px-4 py-3 text-sm">
                        <SelectValue placeholder="Select services..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {form.services.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1.5 bg-secondary/10 border border-secondary/30 text-foreground text-xs font-medium px-3 py-1.5 rounded-full"
                          >
                            {s}
                            <button
                              type="button"
                              onClick={() => update("services", form.services.filter((x) => x !== s))}
                              className="hover:text-destructive transition-colors"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-3 block">Property Type *</label>
                    <Select value={form.propertyType} onValueChange={updatePropertyType}>
                      <SelectTrigger className="w-full bg-background border-border rounded-lg px-4 py-3 text-sm">
                        <SelectValue placeholder="Select property type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map((p) => (
                          <SelectItem key={p.label} value={p.label}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Sub-type based on property */}
                  {(() => {
                    const selected = PROPERTY_TYPES.find((p) => p.label === form.propertyType);
                    if (!selected || selected.subTypes.length === 0) return null;
                    return (
                      <div>
                        <label className="text-sm font-medium mb-3 block">
                          {form.propertyType.includes("Office") ? "Office Size" :
                            form.propertyType.includes("Apartment") || form.propertyType.includes("House") ? "Configuration" :
                              "Sub Type"} *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {selected.subTypes.map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => update("propertySubType", st)}
                              className={`px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${form.propertySubType === st
                                ? "border-secondary bg-secondary/10 text-foreground font-medium"
                                : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                                }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Approx. Area (sq ft)</label>
                      <input
                        value={form.area}
                        onChange={(e) => update("area", e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                        placeholder="e.g. 1500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Number of Rooms</label>
                      <input
                        value={form.rooms}
                        onChange={(e) => update("rooms", e.target.value)}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                        placeholder="e.g. 3 BHK"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Budget & Timeline</h2>
                <p className="text-muted-foreground text-sm mb-8">Help us understand your investment range and schedule.</p>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Estimated Budget *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => update("budget", b)}
                          className={`px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${form.budget === b
                            ? "border-secondary bg-secondary/10 text-foreground font-medium"
                            : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                            }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-3 block">Desired Timeline *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {TIMELINES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update("timeline", t)}
                          className={`px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${form.timeline === t
                            ? "border-secondary bg-secondary/10 text-foreground font-medium"
                            : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Style Preferences */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Style & Preferences</h2>
                <p className="text-muted-foreground text-sm mb-8">What aesthetic speaks to you?</p>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Preferred Style(s) *</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {STYLES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleArrayItem("styles", s)}
                          className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${form.styles.includes(s)
                            ? "border-secondary bg-secondary/10 text-foreground font-medium"
                            : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Existing Furniture to Keep?</label>
                    <input
                      value={form.existingFurniture}
                      onChange={(e) => update("existingFurniture", e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                      placeholder="e.g. Sofa set, dining table..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Special Requirements</label>
                    <textarea
                      rows={3}
                      value={form.specialRequirements}
                      onChange={(e) => update("specialRequirements", e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all resize-none"
                      placeholder="Pet-friendly materials, kid-safe edges, vastu compliance..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Review & Submit</h2>
                <p className="text-muted-foreground text-sm mb-8">Please verify your details before submitting.</p>
                <div className="space-y-5 text-sm">
                  <ReviewBlock label="Name" value={form.name} />
                  <ReviewBlock label="Email" value={form.email} />
                  <ReviewBlock label="Phone" value={form.phone} />
                  {form.city && <ReviewBlock label="City" value={form.city} />}
                  <ReviewBlock label="Services" value={form.services.join(", ")} />
                  <ReviewBlock label="Property Type" value={form.propertySubType ? `${form.propertyType} — ${form.propertySubType}` : form.propertyType} />
                  {form.area && <ReviewBlock label="Area" value={`${form.area} sq ft`} />}
                  {form.rooms && <ReviewBlock label="Rooms" value={form.rooms} />}
                  <ReviewBlock label="Budget" value={form.budget} />
                  <ReviewBlock label="Timeline" value={form.timeline} />
                  <ReviewBlock label="Style" value={form.styles.join(", ")} />
                  {form.existingFurniture && <ReviewBlock label="Keep Furniture" value={form.existingFurniture} />}
                  {form.specialRequirements && <ReviewBlock label="Special Needs" value={form.specialRequirements} />}
                </div>
                <div className="mt-6">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                  />
                </div>
                <div className="mt-6">
                  <label className="text-sm font-medium mb-1.5 block">How did you hear about us?</label>
                  <input
                    value={form.referral}
                    onChange={(e) => update("referral", e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
                    placeholder="Google, Instagram, Friend..."
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 mt-6 text-sm"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prev}
            disabled={step === 1 || submitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < TOTAL_STEPS ? (
            <button
              onClick={next}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary transition-all duration-300"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
              ) : (
                <><Send className="w-4 h-4" /> Submit Project</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 border-b border-border pb-3">
    <span className="font-medium text-muted-foreground min-w-[120px]">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

export default StartProject;
