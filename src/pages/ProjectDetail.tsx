import SEO from '@/components/SEO';
import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import CTAStrip from '@/components/CTAStrip';
import { useQuery } from '@tanstack/react-query';
import SubBanner from '@/components/SubBanner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { fetchProjectDetail, type ProjectGallery } from '@/services/projectService';
import { mediaUrl } from '@/config/api';
import projectsBanner from '@/assets/projects/projects_subpage_banner.jpg';

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
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full bg-black/60 rounded-xl overflow-hidden border border-white/10 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={image.id}
                src={mediaUrl(image.image)}
                alt={image.label}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>

          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
            <p className="text-white font-semibold text-lg">{image.label}</p>
            <p className="text-white/60 text-sm mt-1">
              {index + 1} of {images.length}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors z-10 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-white/20 text-white p-3 rounded-full transition-colors z-10 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="flex gap-2 justify-center p-4 bg-black/70 overflow-x-auto backdrop-blur-sm">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setIndex(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    i === index
                      ? 'border-secondary scale-110 shadow-lg shadow-secondary/30'
                      : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'
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

/* ── Gallery Section (grouped by label) ─────────────────────────── */
function GallerySection({
  label,
  images: rawImages,
  sectionIndex,
}: {
  label: string;
  images: ProjectGallery[];
  sectionIndex: number;
}) {
  // Filter out any items with missing image paths
  const images = rawImages.filter((img) => !!img.image);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  if (images.length === 0) return null;

  return (
    <motion.div
      className="mb-16 last:mb-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
    >
      {/* Section heading — centered */}
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">
          {label}
        </h3>
        <div className="mt-4 mx-auto w-16 h-[2px] bg-secondary rounded-full" />
      </div>

      {/* Image carousel — always visible */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          duration: 60,
        }}
        plugins={[plugin.current]}
        className="w-full relative"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent>
          {images.map((img, imgIndex) => (
            <CarouselItem 
              key={img.id} 
              className="md:basis-1/2 lg:basis-1/3"
            >
              <motion.button
                className="group relative w-full overflow-hidden rounded-xl cursor-pointer bg-muted shadow-md"
                style={{ aspectRatio: '4 / 3' }}
                onClick={() => setLightboxIndex(imgIndex)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: imgIndex * 0.08 }}
              >
                {/* Always-visible image */}
                <img
                  src={mediaUrl(img.image)}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Hover border accent */}
                <div className="absolute inset-0 border-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </motion.button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious 
              variant="default"
              className="absolute left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 bg-white hover:bg-white text-black hover:text-black border-0 shadow-lg transition-colors z-10" 
            />
            <CarouselNext 
              variant="default"
              className="absolute right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 bg-white hover:bg-white text-black hover:text-black border-0 shadow-lg transition-colors z-10" 
            />
          </>
        )}
      </Carousel>

      {/* Section-scoped Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </motion.div>
  );
}

/* ── Project Detail Page ─────────────────────────── */
export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['projectDetail', projectId],
    queryFn: () => fetchProjectDetail(projectId),
    enabled: !isNaN(projectId),
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // kept to silence unused-import warning — lightboxIndex used inside GallerySection now
  void lightboxIndex; void setLightboxIndex;

  // Group gallery images by label for display sections
  const groupedGallery = useMemo(() => {
    if (!project?.project_gallery) return [];

    const groups: { label: string; images: ProjectGallery[] }[] = [];
    const groupMap = new Map<string, ProjectGallery[]>();

    for (const img of project.project_gallery) {
      const label = img.label || 'Gallery';
      if (!groupMap.has(label)) {
        groupMap.set(label, []);
      }
      groupMap.get(label)!.push(img);
    }

    for (const [label, images] of groupMap) {
      groups.push({ label, images });
    }

    return groups;
  }, [project]);

  if (isLoading) {
    return (
      <div>
        <div
          className="relative w-full overflow-hidden bg-muted animate-pulse"
          style={{ height: '330px' }}
        />
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
            <div className="mb-12 space-y-4">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-10 bg-muted rounded w-2/3" />
              <div className="h-4 bg-muted rounded w-full max-w-xl" />
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2, 3].map((n) => (
                  <CarouselItem key={n} className="md:basis-1/2 lg:basis-1/3">
                    <div
                      className="bg-muted rounded-xl animate-pulse w-full"
                      style={{ aspectRatio: '4/3' }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-destructive text-lg font-medium">
          Failed to load project details. Please try again later.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={`${project.title} - SpaceBox Concepts`}
        description={project.description}
        keywords={`${project.title}, interior design, SpaceBox Concepts, ${project.area}`}
      />

      <SubBanner
        image={mediaUrl(project.hero_image) || projectsBanner}
        title={project.title}
        highlight=""
        subtitle="Project Details"
      />

      {/* Project Info Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          {/* Back link */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 text-muted-foreground hover:text-secondary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-sm font-medium uppercase tracking-widest">
                Back to Projects
              </span>
            </Link>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" />

          {/* Gallery sections grouped by label */}
          {groupedGallery.length > 0 ? (
            groupedGallery.map((group, sIdx) => (
              <GallerySection
                key={group.label}
                label={group.label}
                images={group.images}
                sectionIndex={sIdx}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No gallery images available for this project.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTAStrip />
    </div>
  );
}
