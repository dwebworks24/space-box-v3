import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogList } from "@/services/blogService";
import { mediaUrl } from "@/config/api";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeBlurUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

const imageReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 1, ease: easeOut },
  },
};

const textSlideUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const BlogSection = () => {
  const { data: allPosts = [], isLoading } = useQuery({
    queryKey: ["blogList"],
    queryFn: fetchBlogList,
  });

  const posts = allPosts.slice(0, 3);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        <motion.div
          className="flex items-end justify-between mb-16"
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div>
            <motion.p variants={fadeBlurUp} className="text-secondary text-sm uppercase tracking-[0.3em] mb-4 font-body">
              Insights
            </motion.p>
            <motion.h2 variants={fadeBlurUp} className="text-4xl md:text-5xl text-foreground">
              Latest Blogs
            </motion.h2>
          </div>
          <motion.a
            variants={fadeBlurUp}
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-primary font-body font-medium hover:text-secondary transition-colors"
            whileHover={{ x: 4 }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-56 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-[0_12px_40px_hsl(var(--secondary)/0.12)] hover:border-secondary/30 transition-all duration-500"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ staggerChildren: 0.1, delayChildren: i * 0.18 }}
                whileHover={{ y: -6 }}
              >
                <motion.div variants={imageReveal} className="overflow-hidden">
                  <img
                    src={mediaUrl(post.image)}
                    alt={post.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </motion.div>
                <div className="p-6">
                  <motion.div variants={textSlideUp} className="flex items-center gap-3 mb-3">
                    {post.tags && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full font-body">
                        {post.tags.split(",")[0]?.trim()}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-muted-foreground text-xs font-body">
                      <Calendar className="w-3 h-3" />{" "}
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </motion.div>
                  <motion.h3 variants={textSlideUp} className="text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {post.title}
                  </motion.h3>
                  <motion.p variants={textSlideUp} className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                    {post.short_description}
                  </motion.p>
                  <motion.div variants={textSlideUp}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-secondary font-body group-hover:gap-3 transition-all duration-300"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-xl"
          >
            View More <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
