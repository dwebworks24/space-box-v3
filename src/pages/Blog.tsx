import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SubBanner from '@/components/SubBanner';
import { fetchBlogList } from '@/services/blogService';
import { mediaUrl } from '@/config/api';
import r1DrawingRoom from '@/assets/projects/r1-drawing-room.jpg';
import blogsBanner from '@/assets/blog/blogs_subpage_banner.jpg'

export default function Blog() {
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ['blogList'],
    queryFn: fetchBlogList,
  });

  return (
    <div>
      <SEO
        title="Interior Design Blog - Tips & Trends"
        description="Read the latest interior design tips, trends, and inspiration from SpaceBox Concepts. Expert insights on colour psychology, small spaces, and more."
        keywords="interior design blog, design tips, design trends 2025, colour psychology, small space design, home decor ideas, SpaceBox Concepts blog"
      />
      <SubBanner
        image={blogsBanner}
        title="Design"
        highlight="Blog"
        subtitle="Insights"
      />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-[16/9] bg-muted" />
                  <div className="p-6 lg:p-8 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-6 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-20">
              <p className="text-destructive text-lg">Failed to load blog posts. Please try again later.</p>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-secondary/40 transition-all duration-500 hover:shadow-[0_16px_48px_hsl(var(--secondary)/0.08)]"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={mediaUrl(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      {post.tags && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full font-body">
                          {post.tags.split(',')[0]?.trim()}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                        <Calendar className="w-3 h-3" />{' '}
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-5 font-body">
                      {post.short_description}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-secondary text-sm font-semibold font-body group-hover:gap-3 transition-all duration-300"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
