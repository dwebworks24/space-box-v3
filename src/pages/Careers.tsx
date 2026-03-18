import SEO from '@/components/SEO';
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Send, Upload, X, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import SubBanner from "@/components/SubBanner";
import projectWorkspace from "@/assets/project-workspace.jpg";
import { fetchJobList, applyJob, type Job } from "@/services/careerService";

/* ── Apply Form ─────────────────────────── */
function ApplyForm({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: applyJob,
    onSuccess: () => {
      toast.success("Application submitted successfully! We'll get back to you soon.");
      onClose();
    },
    onError: (error: any) => {
      if (error?.errors) {
        setFieldErrors(error.errors);
        toast.error(error.message || "Validation failed. Please check the form.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    if (!resume) {
      setFieldErrors({ resume: ["Please upload your resume."] });
      return;
    }

    mutation.mutate({
      full_name: fullName,
      email,
      message,
      resume,
      job_title: jobTitle,
    });
  };

  const inputClass =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all";

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 border-t border-border pt-6"
    >
      <h4 className="font-semibold text-lg mb-1">
        Apply for <span className="text-primary">{jobTitle}</span>
      </h4>

      {/* Full Name */}
      <div>
        <input
          type="text"
          placeholder="Full Name *"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
          required
        />
        {fieldErrors.full_name && (
          <p className="text-destructive text-xs mt-1">{fieldErrors.full_name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email Address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
        {fieldErrors.email && (
          <p className="text-destructive text-xs mt-1">{fieldErrors.email[0]}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <textarea
          placeholder="Cover Letter / Message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={inputClass}
          required
        />
        {fieldErrors.message && (
          <p className="text-destructive text-xs mt-1">{fieldErrors.message[0]}</p>
        )}
      </div>

      {/* Resume */}
      <div>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={`${inputClass} flex items-center gap-2 cursor-pointer text-left`}
        >
          <Upload className="w-4 h-4 text-muted-foreground" />
          {resume ? (
            <span className="flex items-center gap-2">
              {resume.name}
              <X
                className="w-4 h-4 text-destructive hover:text-destructive/80 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setResume(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
              />
            </span>
          ) : (
            <span className="text-muted-foreground">Upload Resume (PDF, DOC, DOCX) *</span>
          )}
        </button>
        {fieldErrors.resume && (
          <p className="text-destructive text-xs mt-1">{fieldErrors.resume[0]}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-60 disabled:pointer-events-none"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit Application
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 rounded-lg text-sm font-semibold border border-border hover:bg-muted transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

/* ── Main Careers Page ─────────────────────────── */
export default function Careers() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [applyingForId, setApplyingForId] = useState<number | null>(null);

  const { data: openings = [], isLoading, isError } = useQuery({
    queryKey: ["jobList"],
    queryFn: fetchJobList,
  });

  return (
    <div>
      <SEO
        title="Careers - Join Our Creative Team"
        description="Explore career opportunities at SpaceBox Concepts. Join our talented team of interior designers, project managers, and creative professionals in Hyderabad."
        keywords="interior design careers, jobs at SpaceBox Concepts, Hyderabad design jobs, interior designer vacancy, creative jobs Telangana"
      />
      <SubBanner
        image={projectWorkspace}
        title="Join Our"
        highlight="Creative Team"
        subtitle="Careers"
      />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Your Career with <span className="text-secondary">SpaceBox</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              We're always looking for passionate individuals who love design and want to create inspiring spaces. Explore our current openings below.
            </p>
          </motion.div>

          {/* Loading */}
          {isLoading && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-card border border-border rounded-2xl p-6 md:p-8 animate-pulse space-y-3">
                  <div className="h-6 bg-muted rounded w-1/3" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-muted rounded w-24" />
                    <div className="h-4 bg-muted rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="text-center py-20">
              <p className="text-destructive text-lg">Failed to load job openings. Please try again later.</p>
            </div>
          )}

          {/* Job listings */}
          {!isLoading && !isError && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {openings.map((job, i) => {
                const isOpen = expandedId === job.id;
                const isApplying = applyingForId === job.id;
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="bg-card border border-border rounded-2xl overflow-hidden"
                  >
                    {/* Header */}
                    <button
                      onClick={() => setExpandedId(isOpen ? null : job.id)}
                      className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div>
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> {job.job_type}
                          </span>
                          {job.deadline && (
                            <span className="inline-flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4" /> Deadline:{" "}
                              {new Date(job.deadline).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                    </button>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="px-6 md:px-8 pb-8 border-t border-border pt-6 space-y-6">
                        <p className="text-muted-foreground text-base leading-relaxed font-body">{job.description}</p>

                        {job.Requirements && (
                          <div>
                            <h4 className="font-semibold mb-3 text-foreground">Requirements</h4>
                            <p className="text-base text-muted-foreground whitespace-pre-line leading-relaxed font-body">{job.Requirements}</p>
                          </div>
                        )}

                        {job.Body && (
                          <div
                            className="prose prose-base dark:prose-invert max-w-none text-muted-foreground font-body"
                            dangerouslySetInnerHTML={{ __html: job.Body }}
                          />
                        )}

                        {!isApplying ? (
                          <button
                            onClick={() => setApplyingForId(job.id)}
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl"
                          >
                            <Send className="w-4 h-4" /> Apply Now
                          </button>
                        ) : (
                          <ApplyForm
                            jobTitle={job.title}
                            onClose={() => setApplyingForId(null)}
                          />
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* General application */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center bg-card border border-border rounded-2xl p-10 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-3">Don't see the right role?</h3>
            <p className="text-muted-foreground text-lg leading-relaxed font-body mb-6">
              We're always open to hearing from talented individuals. Send us your portfolio and resume, and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=spaceboxconcepts@gmail.com&su=General%20Application%20-%20SpaceBox%20Concepts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <MailIcon className="w-4 h-4" /> Send Your Resume
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  );
}
