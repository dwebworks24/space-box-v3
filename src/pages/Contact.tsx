import SEO from '@/components/SEO';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import SubBanner from '@/components/SubBanner';
import projectWorkspace from '@/assets/project-workspace.jpg';
import { isValidPhone, getPhoneError } from '@/lib/phoneValidation';

const RECAPTCHA_SITE_KEY = '6LfT-YYsAAAAANH5sGA7t-a8BuWMt_F4FMhkTRBh';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', size: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [streetView, setStreetView] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phone: value });
    if (phoneError) {
      const err = getPhoneError(value);
      setPhoneError(err || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pErr = getPhoneError(form.phone);
    if (pErr) { setPhoneError(pErr); return; }
    if (!captchaToken) { setError('Please complete the reCAPTCHA.'); return; }

    setLoading(true);
    setError('');
    try {
      await emailjs.send(
        'service_t0mi6tv',
        'template_4hbbfnc',
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: form.type || 'Not specified',
          size: form.size || 'Not specified',
          message: form.message,
        },
        'fvEpos_G5k7KO9CLG'
      );
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', type: '', size: '', message: '' });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEO
        title="Contact Us - Get In Touch"
        description="Contact SpaceBox Concepts for interior design consultations in Telangana. Reach us by phone, email, or visit our office in Hyderabad."
        keywords="contact SpaceBox Concepts, interior design consultation, Hyderabad office, Telangana interior designers, get in touch, free consultation"
      />
      <SubBanner
        image={projectWorkspace}
        title="Let's Create Something"
        highlight="Beautiful"
        subtitle="Get In Touch"
      />
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-10 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-2xl p-12 space-y-6 min-h-[400px]"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Appointment Booked!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. We've received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-secondary transition-all duration-300 mt-4"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => { const v = e.target.value; if (/\d/.test(v)) return; setForm({ ...form, name: v }); }}
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => handlePhoneChange(e.target.value.replace(/[a-zA-Z]/g, ''))}
                      onBlur={() => { const err = getPhoneError(form.phone); setPhoneError(err || ''); }}
                      className={`w-full bg-card border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-1 outline-none transition-all ${phoneError ? 'border-destructive focus:border-destructive focus:ring-destructive' : 'border-border focus:border-primary focus:ring-primary'}`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {phoneError && <p className="text-destructive text-xs mt-1">{phoneError}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Project Type</label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      >
                        <option value="">Select type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Project Size</label>
                      <select
                        value={form.size}
                        onChange={(e) => setForm({ ...form, size: e.target.value })}
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      >
                        <option value="">Select size</option>
                        <option value="small">&lt; 1,000 sq ft</option>
                        <option value="medium">1,000 - 5,000 sq ft</option>
                        <option value="large">5,000+ sq ft</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                  />
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <a href="mailto:spaceboxconcepts@gmail.com" className="flex items-start gap-4 group">
                  <Mail className="w-6 h-6 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium group-hover:text-primary transition-colors">spaceboxconcepts@gmail.com</p>
                  </div>
                </a>
                <a href="tel:+917799101433" className="flex items-start gap-4 group">
                  <Phone className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium group-hover:text-primary transition-colors">+91 7799101433</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Plot no.147, V-Pride building,</p>
                    <p className="font-medium">Spring valley road, Kondapur,</p>
                    <p className="font-medium">Serilingampally - 500084</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Business Hours</p>
                    <p className="font-medium">Mon - Sat: 10:00 AM - 7:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Find Us</h3>

              {/* Toggle Button */}
              <button
                onClick={() => setStreetView(!streetView)}
                className="text-sm px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-all"
              >
                {streetView ? "Map View" : "Street View"}
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border h-[400px] relative">

              {/* Map View */}
              {!streetView && (
                <iframe
                  key="map"
                  title="Spacebox Designs Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3805.506688235522!2d78.3340557!3d17.4833099!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93b2d1a0b0e9%3A0x4c1bb4fd77b5c530!2sspacebox%20concepts%20%7C%20Interior%20Designer!5e0!3m2!1sen!2sin!4v1772433072922!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              )}

              {/* Street View */}
              {streetView && (
                <iframe
                  key="street"
                  title="Spacebox Designs Street View"
                  src="https://www.google.com/maps/embed?pb=!4v1775806016824!6m8!1m7!1sYmap96k16MpNVz4NnO1NdQ!2m2!1d17.48324790914321!2d78.33662949782403!3f47.28600131069135!4f22.353866753119334!5f0.7820865974627469"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
