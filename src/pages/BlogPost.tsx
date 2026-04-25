import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { MarketingNav } from "@/components/landing/MarketingNav";
import { MarketingFooter } from "@/components/landing/MarketingFooter";
import { Button } from "@/components/ui/button";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const currentIdx = blogPosts.findIndex((p) => p.slug === post.slug);
  const next = blogPosts[currentIdx + 1] ?? blogPosts[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative" style={{ background: post.cover }}>
        <MarketingNav variant="light" />
        <div className="relative z-10 m-auto max-w-3xl px-6 py-16 lg:py-24">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-white/85 hover:text-white text-sm mb-6">
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/15 text-white border border-white/30 backdrop-blur-sm mb-4">
            {post.category}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-white"
          >
            {post.title}
          </motion.h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-white/85">
            <div>
              <p className="font-medium text-white">{post.author}</p>
              <p className="text-xs">{post.authorRole}</p>
            </div>
            <span className="text-white/40">·</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
          </div>
        </div>
      </div>

      <article className="m-auto max-w-3xl px-6 py-16">
        <div className="prose prose-slate max-w-none">
          {post.content.map((block, i) => (
            <div key={i} className="mb-6">
              {block.heading && (
                <h2 className="font-display text-2xl font-medium tracking-tight text-slate-900 mt-10 mb-3">
                  {block.heading}
                </h2>
              )}
              <p className="text-base text-slate-700 leading-[1.8]">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-6 text-center">
            <h3 className="font-display text-xl font-medium tracking-tight text-slate-900 mb-2">
              See KnctED for your school
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              A 30-minute demo, tailored to your size and stack.
            </p>
            <Button asChild className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
              <Link to="/book-demo">Book a Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Up next</p>
          <Link
            to={`/blog/${next.slug}`}
            className="group block rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition overflow-hidden"
          >
            <div className="grid sm:grid-cols-3">
              <div className="h-32 sm:h-auto" style={{ background: next.cover }} />
              <div className="sm:col-span-2 p-5">
                <h4 className="font-display text-lg font-medium tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
                  {next.title}
                </h4>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1">{next.excerpt}</p>
              </div>
            </div>
          </Link>
        </div>
      </article>

      <MarketingFooter />
    </div>
  );
};

export default BlogPost;
