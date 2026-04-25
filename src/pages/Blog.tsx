import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { MarketingNav } from "@/components/landing/MarketingNav";
import { MarketingFooter } from "@/components/landing/MarketingFooter";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

const categoryColor: Record<BlogPost["category"], string> = {
  "Product Update": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Guide": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Case Study": "bg-orange-50 text-orange-700 border-orange-200",
  "Insights": "bg-sky-50 text-sky-700 border-sky-200",
};

const Blog = () => {
  const [hero, ...rest] = blogPosts;
  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative"
        style={{ background: "linear-gradient(160deg, #6366F1 0%, #7C6CF0 35%, #8B6FE8 65%, #A78BE0 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <MarketingNav variant="light" />

        <section className="relative z-10 m-auto max-w-5xl px-6 py-20 lg:py-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/40 bg-white/10 backdrop-blur-sm px-3.5 py-1 mb-6 text-[11px] font-medium tracking-[0.12em] uppercase text-white/90"
          >
            The KnctED Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-balance text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-white"
          >
            Stories, guides, and updates
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-pink-200 bg-clip-text text-transparent italic">
              from the KnctED team
            </span>
          </motion.h1>
        </section>
      </div>

      <section className="relative -mt-12 lg:-mt-16 m-auto max-w-6xl px-6 pb-20">
        <Link to={`/blog/${hero.slug}`} className="block group">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden bg-white shadow-xl shadow-indigo-900/10 border border-slate-100 grid lg:grid-cols-2"
          >
            <div
              className="h-56 lg:h-full min-h-[280px] flex items-end p-8"
              style={{ background: hero.cover }}
            >
              <span className={`px-3 py-1 rounded-full text-xs font-medium border bg-white/90 ${categoryColor[hero.category]}`}>
                {hero.category}
              </span>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
                  {hero.title}
                </h2>
                <p className="mt-3 text-slate-600 leading-relaxed">{hero.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-700">{hero.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {hero.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {hero.readTime}</span>
                </div>
                <span className="flex items-center gap-1 text-indigo-600 font-medium group-hover:gap-2 transition-all">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </motion.article>
        </Link>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {rest.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(idx * 0.05, 0.2), duration: 0.3 }}
              className="rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg hover:shadow-indigo-100/50 hover:border-indigo-200 transition"
            >
              <Link to={`/blog/${post.slug}`} className="block group">
                <div className="h-40 flex items-end p-5" style={{ background: post.cover }}>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border bg-white/90 ${categoryColor[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Blog;
