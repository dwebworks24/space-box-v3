import SEO from '@/components/SEO';
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Home, Palette, Clock, CreditCard, Send, Loader2, AlertCircle, CalendarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import SubBanner from "@/components/SubBanner";
import { apiUrl, ENDPOINTS } from "@/config/api";
import { isValidPhone, getPhoneError } from '@/lib/phoneValidation';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const RECAPTCHA_SITE_KEY = '6LfT-YYsAAAAANH5sGA7t-a8BuWMt_F4FMhkTRBh';

const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Commercial Space",
  "Other",
];

const SITE_READINESS = [
  "Ready for Interior work",
  "Not yet Ready",
];

const DESIGN_AESTHETICS = [
  { value: "classical", label: "Classical", desc: "Detailed moldings, ornate furniture, symmetry, and rich textures." },
  { value: "contemporary", label: "Contemporary", desc: "Sleek lines, neutral palettes, and current 'of-the-moment' trends." },
  { value: "modern", label: "Modern / Minimalist", desc: "Functional, 'less is more,' clean geometric shapes." },
  { value: "industrial", label: "Industrial", desc: "Raw materials like wood, metal, and exposed brick." },
];

const VISUALIZATION_OPTIONS = [
  { value: "3d", label: "Yes, I want full 3D visuals", desc: "3D 360° Realistic Renders — walk through your home virtually." },
  { value: "2d", label: "No, 2D layouts & mood boards are sufficient", desc: "Standard 2D layouts and mood boards." },
];

const PAYMENT_MODES = [
  "Bank Transfer (NEFT/RTGS)",
  "Cheque",
  "Digital Wallets / UPI",
  "Credit Card (Subject to processing fees)",
];

const TOTAL_STEPS = 5;

const stepInfo = [
  { icon: Home, label: "Property" },
  { icon: Palette, label: "Design" },
  { icon: Clock, label: "Timeline & Budget" },
  { icon: Send, label: "Review" },
  { icon: CreditCard, label: "Payment" },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ClientBrief = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [siteReadyDateOpen, setSiteReadyDateOpen] = useState(false);
  const [completionDateOpen, setCompletionDateOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyTypeOther: "",
    locationDetails: "",
    propertyArea: "",
    siteReadiness: "",
    siteReadyDate: undefined as Date | undefined,
    designAesthetic: "",
    designAestheticOther: "",
    visualization: "",
    completionDate: undefined as Date | undefined,
    budget: "",
    paymentMode: "",
    paymentModeOther: "",
    professionalCommitment: "" as "" | "proceed" | "consult",
  });

  const update = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canProceed = () => {
    switch (step) {
      case 1:
        return form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.phone.trim() && isValidPhone(form.phone) &&
          (form.propertyType ? (form.propertyType !== "Other" || form.propertyTypeOther.trim()) : false) &&
          form.locationDetails.trim() && form.propertyArea.trim() &&
          form.siteReadiness &&
          (form.siteReadiness === "Ready for Interior work" || form.siteReadyDate);
      case 2:
        return (form.designAesthetic || form.designAestheticOther.trim()) && form.visualization;
      case 3:
        return form.completionDate && form.budget.trim() &&
          (form.paymentMode ? (form.paymentMode !== "Other" || form.paymentModeOther.trim()) : false);
      case 4:
        return true;
      case 5:
        return !!form.professionalCommitment;
      default: return false;
    }
  };

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const buildPayload = () => ({
    ...form,
    siteReadyDate: form.siteReadyDate ? format(form.siteReadyDate, "yyyy-MM-dd") : null,
    completionDate: form.completionDate ? format(form.completionDate, "yyyy-MM-dd") : null,
  });

  const handleSubmitWithoutPayment = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      const res = await fetch(apiUrl(ENDPOINTS.PROJECT_INQUIRY), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...buildPayload(),
          registrationFee: 0,
          paymentId: null,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || `Submission failed (${res.status})`);
      }
      setSubmitted(true);
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please check your connection and try again.");
      } else {
        setError(err.message || "Submission failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = async () => {
    setSubmitting(true);
    setError(null);

    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Failed to load Razorpay. Please check your internet connection.");
      setSubmitting(false);
      return;
    }

    // Step 1: Create order on the backend
    let orderData: any;
    try {
      const orderRes = await fetch(apiUrl(ENDPOINTS.CREATE_ORDER), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 5000 }),
      });
      if (!orderRes.ok) {
        const errData = await orderRes.json().catch(() => null);
        throw new Error(errData?.detail || `Failed to create order (${orderRes.status})`);
      }
      orderData = await orderRes.json();
    } catch (err: any) {
      setError(err.message || "Failed to initiate payment. Please try again.");
      setSubmitting(false);
      return;
    }

    // Validate that the backend returned a Razorpay key
    if (!orderData.razorpay_key) {
      setError("Payment gateway configuration error: Authentication key is missing. Please contact support.");
      setSubmitting(false);
      return;
    }

    // Step 2: Open Razorpay checkout with the order
    const options = {
      key: orderData.razorpay_key,
      amount: orderData.amount || 500000,
      currency: orderData.currency || "INR",
      name: "SpaceBox Concepts",
      description: "Project Registration Fee (₹5,000) — 100% refundable/adjustable",
      order_id: orderData.order_id,
      handler: async (response: any) => {
        try {
          const res = await fetch(apiUrl(ENDPOINTS.PROJECT_INQUIRY), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...buildPayload(),
              paymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              registrationFee: 5000,
            }),
          });
          if (!res.ok) {
            const data = await res.json().catch(() => null);
            throw new Error(data?.detail || `Submission failed (${res.status})`);
          }
          setSubmitted(true);
        } catch (err: any) {
          setError(err.message || "Payment succeeded but form submission failed. Please contact us with your payment ID: " + response.razorpay_payment_id);
        } finally {
          setSubmitting(false);
        }
      },
      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#D4AF37",
      },
      modal: {
        ondismiss: () => {
          setSubmitting(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: any) => {
      setError(`Payment failed: ${response.error?.description || "Unknown error"}. Please try again.`);
      setSubmitting(false);
    });
    rzp.open();
  };

  const next = () => { if (step < TOTAL_STEPS && canProceed()) setStep(step + 1); };
  const prev = () => { if (step > 1) setStep(step - 1); };

  const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all";
  const radioClass = (active: boolean) =>
    `w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${active
      ? "border-secondary bg-secondary/10 text-foreground font-medium"
      : "border-border bg-background text-muted-foreground hover:border-secondary/50"
    }`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SubBanner title="Client Project" highlight="Brief" image="" />
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {form.professionalCommitment === "proceed" ? "Thank You for the Payment!" : "Brief Submitted!"}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
              {form.professionalCommitment === "proceed"
                ? "We have received your payment and project brief. Our team will get in touch with you shortly to begin your design journey."
                : "Your project brief has been submitted successfully. A consultant will reach out to you within 24 hours to discuss your project."}
            </p>
            {form.professionalCommitment === "proceed" && (
              <p className="text-sm text-muted-foreground mb-8">
                The ₹5,000 registration fee is 100% refundable/adjustable against your final project invoice.
              </p>
            )}
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
        title="Client Project Brief | SpaceBox Concepts"
        description="Fill out the Client Project Brief to help us understand your vision and property requirements. Register with a ₹5,000 refundable fee."
        keywords="client project brief, interior design survey, SpaceBox Concepts, project registration, design consultation"
      />
      <SubBanner title="Client Project" highlight="Brief" image="" />

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <p className="text-center text-muted-foreground mb-10 text-sm">
          Please fill out this initial survey to help us understand your vision and property requirements.
        </p>

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
            {/* Step 1: Property Overview */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Property Overview</h2>
                <p className="text-muted-foreground text-sm mb-8">Tell us about your property and contact details.</p>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">First Name *</label>
                      <input
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className={inputClass}
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Last Name *</label>
                      <input
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className={inputClass}
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Contact Number * <span className="text-xs text-muted-foreground">(10 digits)</span></label>
                      <input
                        value={form.phone}
                        onChange={(e) => { update("phone", e.target.value.replace(/[a-zA-Z]/g, '')); if (phoneError) { const err = getPhoneError(e.target.value); setPhoneError(err || ''); } }}
                        onBlur={() => { const err = getPhoneError(form.phone); setPhoneError(err || ''); }}
                        className={`w-full bg-background border rounded-lg px-4 py-3 text-sm focus:ring-1 outline-none transition-all ${phoneError ? 'border-destructive focus:border-destructive focus:ring-destructive' : 'border-border focus:border-secondary focus:ring-secondary'}`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {phoneError && <p className="text-destructive text-xs mt-1">{phoneError}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Type of Property *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {PROPERTY_TYPES.map((p) => (
                        <button key={p} type="button" onClick={() => update("propertyType", p)} className={radioClass(form.propertyType === p)}>
                          <span className="inline-flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${form.propertyType === p ? 'border-secondary' : 'border-muted-foreground/40'}`}>
                              {form.propertyType === p && <span className="w-2 h-2 rounded-full bg-secondary" />}
                            </span>
                            {p}
                          </span>
                        </button>
                      ))}
                    </div>
                    {form.propertyType === "Other" && (
                      <input
                        value={form.propertyTypeOther}
                        onChange={(e) => update("propertyTypeOther", e.target.value)}
                        className={cn(inputClass, "mt-3")}
                        placeholder="Please specify property type"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Property / Location Details *</label>
                    <p className="text-xs text-muted-foreground mb-2">Please mention Community/Project Name and Area.</p>
                    <input
                      value={form.locationDetails}
                      onChange={(e) => update("locationDetails", e.target.value)}
                      className={inputClass}
                      placeholder="e.g. My Home Bhooja, Madhapur"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Property Area (Total Square Footage) *</label>
                    <input
                      value={form.propertyArea}
                      onChange={(e) => update("propertyArea", e.target.value)}
                      className={inputClass}
                      placeholder="e.g. 2500 sq ft"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Site Readiness *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SITE_READINESS.map((s) => (
                        <button key={s} type="button" onClick={() => update("siteReadiness", s)} className={radioClass(form.siteReadiness === s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.siteReadiness === "Not yet Ready" && (
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">When will it be ready for Interior? *</label>
                      <Popover open={siteReadyDateOpen} onOpenChange={setSiteReadyDateOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left font-normal", !form.siteReadyDate && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.siteReadyDate ? format(form.siteReadyDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={form.siteReadyDate}
                            onSelect={(d) => { update("siteReadyDate", d); setSiteReadyDateOpen(false); }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Design & Vision */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Design & Vision</h2>
                <p className="text-muted-foreground text-sm mb-8">Help us understand your aesthetic preferences.</p>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Which design aesthetic resonates with you most? *</label>
                    <div className="space-y-2.5">
                      {DESIGN_AESTHETICS.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => { update("designAesthetic", d.value); update("designAestheticOther", ""); }}
                          className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${form.designAesthetic === d.value
                            ? "border-secondary bg-secondary/10 text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                            }`}
                        >
                          <span className="font-medium">{d.label}</span>
                          <span className="block text-xs mt-0.5 opacity-70">{d.desc}</span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => update("designAesthetic", "other")}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${form.designAesthetic === "other"
                          ? "border-secondary bg-secondary/10 text-foreground font-medium"
                          : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                          }`}
                      >
                        Other
                      </button>
                      {form.designAesthetic === "other" && (
                        <input
                          value={form.designAestheticOther}
                          onChange={(e) => update("designAestheticOther", e.target.value)}
                          className={cn(inputClass, "mt-2")}
                          placeholder="Describe your preferred style"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Design Visualization *</label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Would you like to include 3D 360° Realistic Renders in your design package?
                    </p>
                    <div className="space-y-2.5">
                      {VISUALIZATION_OPTIONS.map((v) => (
                        <button
                          key={v.value}
                          type="button"
                          onClick={() => update("visualization", v.value)}
                          className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${form.visualization === v.value
                            ? "border-secondary bg-secondary/10 text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                            }`}
                        >
                          <span className="font-medium">{v.label}</span>
                          <span className="block text-xs mt-0.5 opacity-70">{v.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Timeline & Budget */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Timeline & Budget</h2>
                <p className="text-muted-foreground text-sm mb-8">Help us plan for your project scope.</p>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Ideal Completion / Move-in Date *</label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Quality custom interiors typically take 45–90 days depending on the scope.
                    </p>
                    <Popover open={completionDateOpen} onOpenChange={setCompletionDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !form.completionDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.completionDate ? format(form.completionDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={form.completionDate}
                          onSelect={(d) => { update("completionDate", d); setCompletionDateOpen(false); }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Total Investment Budget for Interiors *</label>
                    <p className="text-xs text-muted-foreground mb-2">
                      This helps us select the right grade of materials — e.g., laminates vs. veneers vs. lacquered glass.
                    </p>
                    <input
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className={inputClass}
                      placeholder="e.g. ₹15 Lakhs"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Preferred Mode of Payment *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PAYMENT_MODES.map((p) => (
                        <button key={p} type="button" onClick={() => { update("paymentMode", p); update("paymentModeOther", ""); }} className={radioClass(form.paymentMode === p)}>
                          <span className="inline-flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${form.paymentMode === p ? 'border-secondary' : 'border-muted-foreground/40'}`}>
                              {form.paymentMode === p && <span className="w-2 h-2 rounded-full bg-secondary" />}
                            </span>
                            {p}
                          </span>
                        </button>
                      ))}
                      <button type="button" onClick={() => update("paymentMode", "Other")} className={radioClass(form.paymentMode === "Other")}>
                        <span className="inline-flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${form.paymentMode === "Other" ? 'border-secondary' : 'border-muted-foreground/40'}`}>
                            {form.paymentMode === "Other" && <span className="w-2 h-2 rounded-full bg-secondary" />}
                          </span>
                          Other
                        </span>
                      </button>
                    </div>
                    {form.paymentMode === "Other" && (
                      <input
                        value={form.paymentModeOther}
                        onChange={(e) => update("paymentModeOther", e.target.value)}
                        className={cn(inputClass, "mt-3")}
                        placeholder="Specify payment mode"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-1">Review Your Brief</h2>
                <p className="text-muted-foreground text-sm mb-8">Please verify your details before proceeding to payment.</p>
                <div className="space-y-4 text-sm">
                  <ReviewBlock label="Email" value={form.email} />
                  <ReviewBlock label="Phone" value={form.phone} />
                  <ReviewBlock label="Property Type" value={form.propertyType === "Other" ? form.propertyTypeOther : form.propertyType} />
                  <ReviewBlock label="Location" value={form.locationDetails} />
                  <ReviewBlock label="Area" value={form.propertyArea} />
                  <ReviewBlock label="Site Readiness" value={form.siteReadiness} />
                  {form.siteReadyDate && <ReviewBlock label="Ready Date" value={format(form.siteReadyDate, "PPP")} />}
                  <ReviewBlock
                    label="Design Style"
                    value={
                      form.designAesthetic === "other"
                        ? form.designAestheticOther
                        : DESIGN_AESTHETICS.find(d => d.value === form.designAesthetic)?.label || form.designAesthetic
                    }
                  />
                  <ReviewBlock
                    label="3D Visualization"
                    value={form.visualization === "3d" ? "Yes, full 3D visuals" : "2D layouts & mood boards"}
                  />
                  {form.completionDate && <ReviewBlock label="Completion Date" value={format(form.completionDate, "PPP")} />}
                  <ReviewBlock label="Budget" value={form.budget} />
                  <ReviewBlock label="Payment Mode" value={form.paymentMode === "Other" ? form.paymentModeOther : form.paymentMode} />
                </div>
                {/* <div className="mt-6">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                  />
                </div> */}
              </div>
            )}

            {/* Step 5: Professional Commitment */}
            {step === 5 && (
              <div>
                <div className="bg-muted/50 rounded-xl p-6 md:p-8 mb-6">
                  <h2 className="text-xl font-bold mb-2">Professional Engagement</h2>
                  <h3 className="text-lg font-semibold mb-2">9. Professional Commitment:</h3>

                  {/* Summary of key details */}
                  <div className="bg-background rounded-lg p-4 mb-5 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium text-foreground">{form.firstName} {form.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mobile</span>
                      <span className="font-medium text-foreground">{form.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium text-foreground">{form.email}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    To provide dedicated designer hours and personalized site measurements, we require a <strong className="text-foreground">Project Registration Fee of ₹5,000</strong>.
                  </p>
                  <div className="bg-background border border-border rounded-lg p-3 mb-6">
                    <p className="text-xs text-muted-foreground">
                      💡 <strong>Note:</strong> This fee is <strong>100% refundable/adjustable</strong> against your final project invoice upon completion.
                    </p>
                  </div>

                  <div className="space-y-3 text-left">
                    <button
                      type="button"
                      onClick={() => update("professionalCommitment", "proceed")}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${
                        form.professionalCommitment === "proceed"
                          ? "border-secondary bg-secondary/10 text-foreground font-medium"
                          : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${form.professionalCommitment === "proceed" ? 'border-secondary' : 'border-muted-foreground/40'}`}>
                          {form.professionalCommitment === "proceed" && <span className="w-2 h-2 rounded-full bg-secondary" />}
                        </span>
                        I understand and am ready to proceed with the registration.
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => update("professionalCommitment", "consult")}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${
                        form.professionalCommitment === "consult"
                          ? "border-secondary bg-secondary/10 text-foreground font-medium"
                          : "border-border bg-background text-muted-foreground hover:border-secondary/50"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${form.professionalCommitment === "consult" ? 'border-secondary' : 'border-muted-foreground/40'}`}>
                          {form.professionalCommitment === "consult" && <span className="w-2 h-2 rounded-full bg-secondary" />}
                        </span>
                        I would like to discuss this with a consultant first.
                      </span>
                    </button>
                  </div>
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
          ) : form.professionalCommitment === "proceed" ? (
            <button
              onClick={handlePayment}
              disabled={submitting || !canProceed()}
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
              ) : (
                <><CreditCard className="w-4 h-4" /> Pay ₹5,000 & Register</>
              )}
            </button>
          ) : (
            <button
              onClick={handleSubmitWithoutPayment}
              disabled={submitting || !canProceed()}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
              ) : (
                <><Send className="w-4 h-4" /> Submit Brief</>
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
    <span className="font-medium text-muted-foreground min-w-[140px]">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

export default ClientBrief;
