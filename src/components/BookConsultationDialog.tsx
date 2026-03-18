import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidPhone, getPhoneError } from "@/lib/phoneValidation";

const RECAPTCHA_SITE_KEY = '6LfT-YYsAAAAANH5sGA7t-a8BuWMt_F4FMhkTRBh';

interface BookConsultationDialogProps {
  children: React.ReactNode;
}

export default function BookConsultationDialog({ children }: BookConsultationDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pErr = getPhoneError(form.phone);
    if (pErr) { setPhoneError(pErr); return; }
    if (!captchaToken) { setCaptchaError("Please complete the reCAPTCHA."); return; }
    setCaptchaError("");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setForm({ name: "", email: "", phone: "", type: "", message: "" });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Book a <span className="text-secondary">Consultation</span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Fill in your details and we'll get back to you within 24 hours.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium mb-1 block">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => { const v = e.target.value; if (/\d/.test(v)) return; setForm({ ...form, name: v }); }}
                className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">Phone * <span className="text-muted-foreground">(10 digits)</span></label>
              <input
                required
                value={form.phone}
                onChange={(e) => { const v = e.target.value.replace(/[a-zA-Z]/g, ''); setForm({ ...form, phone: v }); if (phoneError) { const err = getPhoneError(v); setPhoneError(err || ''); } }}
                onBlur={() => { const err = getPhoneError(form.phone); setPhoneError(err || ''); }}
                className={`w-full bg-card border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 outline-none transition-all ${phoneError ? 'border-destructive focus:border-destructive focus:ring-destructive' : 'border-border focus:border-primary focus:ring-primary'}`}
                placeholder="+91 XXXXX XXXXX"
              />
              {phoneError && <p className="text-destructive text-xs mt-1">{phoneError}</p>}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Project Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            >
              <option value="">Select type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">Message</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={(token) => { setCaptchaToken(token); setCaptchaError(""); }}
            onExpired={() => setCaptchaToken(null)}
          />
          {captchaError && <p className="text-destructive text-xs">{captchaError}</p>}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl"
          >
            {submitted ? "Request Sent!" : <><Send className="w-4 h-4" /> Book Now</>}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
