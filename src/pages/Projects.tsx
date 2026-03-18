import SEO from '@/components/SEO';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTAStrip from '@/components/CTAStrip';
import { useQuery } from '@tanstack/react-query';
import SubBanner from '@/components/SubBanner';
import { fetchProjectList, type Project as ApiProject, type ProjectGallery } from '@/services/projectService';
import { mediaUrl } from '@/config/api';
import c1Reception from '@/assets/projects/c1-reception-1.jpg';
import projectsBanner from '@/assets/projects/projects_subpage_banner.jpg'

/* ── Lightbox Component ─────────────────────────── */
function Lightbox({
  images,
  currentIndex,
  onClose,
}: {
  images: ProjectGallery[];
  currentIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(currentIndex);
  const image = images[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full bg-black rounded-lg overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <img
              src={mediaUrl(image.image)}
              alt={image.label}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <p className="text-white font-semibold">{image.label}</p>
            <p className="text-white/70 text-sm">
              {index + 1} of {images.length}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="flex gap-2 justify-center p-4 bg-black/50 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setIndex(i)}
                  className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                    i === index ? 'border-white scale-110' : 'border-white/40 hover:border-white/60'
                  }`}
                >
                  <img
                    src={mediaUrl(img.image)}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Project Card ─────────────────────────── */
function ProjectCard({ project, index }: { project: ApiProject; index: number }) {
  const isEven = index % 2 === 0;
  const heroSrc = mediaUrl(project.hero_image);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const allImages = project.project_gallery ? [
    { id: 0, image: project.hero_image, label: 'Hero Image', order: 0 },
    ...project.project_gallery,
  ] : [];

  return (
    <motion.div
      className="bg-card border border-border rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Image */}
        <div
          className="relative w-full lg:w-[55%] flex-shrink-0 group overflow-hidden cursor-pointer"
          onClick={() => setLightboxIndex(0)}
          style={{ aspectRatio: '1080 / 800' }}
        >
          <img
            src={heroSrc}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
              Click to View Gallery
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 w-full lg:w-[45%]">
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
              {project.is_active ? 'Active' : 'Completed'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-3">
              {project.title}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Meta */}
            <div className="flex gap-6 sm:gap-8 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Area</p>
                <p className="text-base font-semibold text-foreground">{project.area}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Year</p>
                <p className="text-base font-semibold text-foreground">{project.year}</p>
              </div>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {project.project_gallery && project.project_gallery.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {project.project_gallery.map((gallery, galleryIndex) => (
                <button
                  key={gallery.id}
                  onClick={() => setLightboxIndex(galleryIndex + 1)}
                  className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2 border-primary group cursor-pointer transition-transform hover:scale-110"
                  title={gallery.label}
                >
                  <img
                    src={mediaUrl(gallery.image)}
                    alt={gallery.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          )}

          {/* Lightbox */}
          {lightboxIndex !== null && allImages.length > 0 && (
            <Lightbox
              images={allImages}
              currentIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ['projectList'],
    queryFn: fetchProjectList,
  });

  return (
    <div>
      <SEO
        title="Our Projects - Interior Design Portfolio"
        description="Browse our portfolio of residential and commercial interior design projects in Telangana. See how SpaceBox Concepts transforms spaces with custom designs."
        keywords="interior design portfolio, residential projects, commercial projects, Hyderabad interiors, SpaceBox projects, before after interiors, office design"
      />
      <SubBanner
        image={projectsBanner}
        title="Portfolio of"
        highlight="Excellence"
        subtitle="Our Portfolio"
      />

      {/* Project Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20 flex flex-col gap-16">
          {isLoading && (
            <>
              {[1, 2].map((n) => (
                <div key={n} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[55%] bg-muted" style={{ aspectRatio: '1080 / 800' }} />
                    <div className="p-6 sm:p-8 lg:p-10 w-full lg:w-[45%] space-y-4">
                      <div className="h-4 bg-muted rounded w-1/4" />
                      <div className="h-8 bg-muted rounded w-2/3" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="flex gap-6">
                        <div className="h-10 bg-muted rounded w-20" />
                        <div className="h-10 bg-muted rounded w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {isError && (
            <div className="text-center py-20">
              <p className="text-destructive text-lg">Failed to load projects. Please try again later.</p>
            </div>
          )}

          {!isLoading && !isError && projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      <CTAStrip />
    </div>
  );
}
