import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTAStrip from '@/components/CTAStrip';
import { useQuery } from '@tanstack/react-query';
import SubBanner from '@/components/SubBanner';
import { fetchProjectList, type Project as ApiProject } from '@/services/projectService';
import { mediaUrl } from '@/config/api';
import projectsBanner from '@/assets/projects/projects_subpage_banner.jpg';

/* ── Single Project Tile ─────────────────────────── */
function ProjectTile({ project, index }: { project: ApiProject; index: number }) {
  const heroSrc = mediaUrl(project.hero_image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group relative block w-full overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
          <img
            src={heroSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Index badge */}
          <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-secondary/90 text-white backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground leading-tight mb-3 transition-colors duration-300 group-hover:text-secondary">
            {project.title}
          </h2>

          {/* Arrow CTA */}
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-secondary transition-colors duration-400">
            <span className="text-xs font-medium uppercase tracking-widest">
              View Project
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-secondary via-secondary/60 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
      </Link>
    </motion.div>
  );
}

/* ── Loading Skeleton ─────────────────────────── */
function ProjectTileSkeleton() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-muted animate-pulse"
      style={{ aspectRatio: '16 / 7' }}
    >
      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20">
        <div className="h-3 bg-muted-foreground/10 rounded w-24 mb-4" />
        <div className="h-10 bg-muted-foreground/10 rounded w-2/3 mb-3" />
        <div className="h-4 bg-muted-foreground/10 rounded w-32" />
      </div>
    </div>
  );
}

/* ── Projects Page ─────────────────────────── */
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

      {/* Project Tiles */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          {/* Section intro */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Explore Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
              Featured <span className="text-secondary">Projects</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isLoading && (
              <>
                {[1, 2, 3].map((n) => (
                  <ProjectTileSkeleton key={n} />
                ))}
              </>
            )}

            {isError && (
              <div className="text-center py-20">
                <p className="text-destructive text-lg">
                  Failed to load projects. Please try again later.
                </p>
              </div>
            )}

            {!isLoading &&
              !isError &&
              projects.map((project, i) => (
                <ProjectTile key={project.id} project={project} index={i} />
              ))}
          </div>
        </div>
      </section>

      <CTAStrip />
    </div>
  );
}
