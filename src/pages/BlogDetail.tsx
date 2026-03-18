import SEO from '@/components/SEO';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Tag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import SubBanner from '@/components/SubBanner';
import { fetchBlogDetail, fetchBlogList } from '@/services/blogService';
import { mediaUrl } from '@/config/api';
import r1DrawingRoom from '@/assets/projects/r1-drawing-room.jpg';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['blogDetail', slug],
    queryFn: () => fetchBlogDetail(slug!),
    enabled: !!slug,
  });

  const { data: allPosts = [] } = useQuery({
    queryKey: ['blogList'],
    queryFn: fetchBlogList,
  });

  if (isLoading) {
    return (
      <div>
        <SubBanner image={r1DrawingRoom} title="Loading..." highlight="" subtitle="Blog" />
        <section className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="aspect-[16/9] bg-muted rounded-2xl" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
          </div>
        </section>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
      </div>
    );
  }

  // Determine prev/next from the list
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.short_description}
        keywords={post.meta_keywords || post.tags || 'interior design blog'}
      />
      <SubBanner
        image={mediaUrl(post.image)}
        title={post.title}
        highlight=""
        subtitle={tags[0] || 'Blog'}
      />

      {/* Article content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-5 mb-12 pb-8 border-b border-border"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-4 py-1.5 rounded-full font-body"
              >
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-muted-foreground text-sm font-body">
              <Calendar className="w-4 h-4" />{' '}
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden mb-14"
          >
            <img
              src={mediaUrl(post.image)}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Short description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed mb-14 font-body"
          >
            {post.short_description}
          </motion.p>

          {/* Body content (HTML from backend) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="prose prose-base dark:prose-invert max-w-none font-body text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-8 md:p-12 bg-card border border-border rounded-2xl text-center"
          >
            <h3 className="text-2xl font-semibold mb-3">Ready to Transform Your Space?</h3>
            <p className="text-muted-foreground font-body mb-6">
              Let our experts bring these ideas to life in your home or office.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold uppercase tracking-wider hover:scale-105 transition-all duration-300"
            >
              Get In Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="py-10 pr-6 group hover:bg-card transition-colors border-r border-border"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Previous
              </p>
              <p className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div className="border-r border-border" />
          )}
          {next ? (
            <Link
              to={`/blog/${next.slug}`}
              className="py-10 pl-6 text-right group hover:bg-card transition-colors"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center justify-end gap-1">
                Next <ArrowRight className="w-3 h-3" />
              </p>
              <p className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}
