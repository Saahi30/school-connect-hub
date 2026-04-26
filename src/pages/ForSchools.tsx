import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, Globe2, Building2, Check, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/landing/MarketingNav";
import { MarketingFooter } from "@/components/landing/MarketingFooter";
import { cn } from "@/lib/utils";

interface Segment {
  id: string;
  name: string;
  short: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  pains: string[];
  modules: { name: string; blurb: string }[];
  testimonial: { quote: string; author: string; school: string };
}

const segments: Segment[] = [
  {
    id: "k12",
    name: "K-12 / CBSE & ICSE Schools",
    short: "K-12",
    Icon: GraduationCap,
    accent: "from-indigo-500 to-purple-600",
    pains: [
      "Manual fee collection drains the office team every month-end.",
      "Attendance, marks, and behaviour notes live in three separate registers.",
      "Parents drown in WhatsApp groups; important notices get lost.",
    ],
    modules: [
      { name: "Admissions", blurb: "Online forms, document upload, fee + offer letter in one flow." },
      { name: "Attendance", blurb: "Daily mark with auto-alerts to parents of absentees." },
      { name: "Fees", blurb: "Razorpay integration, term plans, automated reminders." },
      { name: "Communication", blurb: "Targeted announcements to a class, grade, or whole school." },
    ],
    testimonial: {
      quote: "We collected 38% more on-time fees the very first term and the office stopped working weekends.",
      author: "Anita Sharma",
      school: "Vidyalaya Public School, Pune",
    },
  },
  {
    id: "coaching",
    name: "Coaching & Edtech Centres",
    short: "Coaching",
    Icon: BookOpen,
    accent: "from-orange-500 to-red-500",
    pains: [
      "Batch-level attendance and fees don't fit class-based tools.",
      "Test scores and rank lists need to be published daily.",
      "Parents want progress updates without principal-level reports.",
    ],
    modules: [
      { name: "Exams & Ranks", blurb: "Term and online exams, instant ranks, percentile reports." },
      { name: "Online Exams", blurb: "MCQ, descriptive, anti-cheat options for entrance prep." },
      { name: "Attendance", blurb: "Per-batch, per-session marking with substitute support." },
      { name: "Parent App", blurb: "Daily snapshot — present today, latest score, fee status." },
    ],
    testimonial: {
      quote: "We run 14 batches across two cities — KnctED is the only place where I can see all of it in one screen.",
      author: "Karthik R.",
      school: "Ascent IIT Coaching, Hyderabad",
    },
  },
  {
    id: "international",
    name: "International & IB Schools",
    short: "International",
    Icon: Globe2,
    accent: "from-cyan-500 to-blue-600",
    pains: [
      "Multi-currency fees and global parent communication channels.",
      "Continuous assessment doesn't map to term-mark systems.",
      "Higher security and data-residency expectations from parents.",
    ],
    modules: [
      { name: "Admissions", blurb: "Stage-based pipeline: enquiry, tour, application, offer." },
      { name: "Continuous Assessment", blurb: "Rubric-based grading, learner portfolios, criterion reports." },
      { name: "Communication", blurb: "Email, WhatsApp, in-app — parents pick their channel." },
      { name: "Security & SSO", blurb: "SAML SSO, role-based access, region-pinned hosting." },
    ],
    testimonial: {
      quote: "The criterion-based gradebook saved us a third-party tool. Reports look IB-ready out of the box.",
      author: "Dr. Priya Menon",
      school: "Westwood International, Bengaluru",
    },
  },
  {
    id: "universities",
    name: "Colleges & Universities",
    short: "Higher Ed",
    Icon: Building2,
    accent: "from-emerald-500 to-teal-600",
    pains: [
      "Departments, programs, semesters, electives — single-school tools collapse.",
      "Hostel, transport, and library run on disconnected systems.",
      "Compliance reports for state and central regulators take weeks.",
    ],
    modules: [
      { name: "Programs & Electives", blurb: "Department, program, semester, course mapping with elective choice." },
      { name: "Examinations", blurb: "Internal + university exams, seat allocation, results publishing." },
      { name: "Transport & Hostel", blurb: "Live bus tracking and hostel allocation in one platform." },
      { name: "Compliance Exports", blurb: "Pre-built formats for AICTE, UGC, and state boards." },
    ],
    testimonial: {
      quote: "Cut our regulator submission time from 3 weeks to 2 days. That alone paid for the platform.",
      author: "Prof. Rajan Iyer",
      school: "Kiran Institute of Technology, Indore",
    },
  },
];

const ForSchools = () => {
  const [active, setActive] = React.useState<string>(segments[0].id);

  React.useEffect(() => {
    const handler = () => {
      const offsets = segments.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.getBoundingClientRect().top : Infinity };
      });
      const inView = offsets.find((o) => o.top > -100 && o.top < 240);
      if (inView) setActive(inView.id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative"
        style={{ background: "linear-gradient(160deg, #4F55F0 0%, #5A4FF0 40%, #6E4FEA 75%, #7E4FE6 100%)" }}
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
            For every kind of school
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-balance text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-white"
          >
            Built for the way
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-pink-200 bg-clip-text text-transparent italic">
              your institution actually runs
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl text-base md:text-lg text-white/85 leading-relaxed"
          >
            From CBSE day schools to multi-campus universities — KnctED adapts to your size, structure, and stack.
          </motion.p>
        </section>
      </div>

      {/* Sticky tabs */}
      <div className="sticky top-[57px] z-20 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="m-auto max-w-6xl px-6">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
            {segments.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2",
                  active === s.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <s.Icon className="h-3.5 w-3.5" />
                {s.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Segments */}
      <div className="m-auto max-w-6xl px-6 py-16 space-y-24">
        {segments.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-32">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} mb-5`}>
                  <s.Icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-slate-900">
                  {s.name}
                </h2>
                <div className="mt-6 space-y-3">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Common pain points</p>
                  {s.pains.map((p) => (
                    <div key={p} className="flex gap-2 text-slate-700">
                      <span className="text-rose-400 mt-1">•</span>
                      <span className="text-sm leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
                    Modules that matter most
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {s.modules.map((m) => (
                      <motion.div
                        key={m.name}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.25 }}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <Check className="h-4 w-4 text-emerald-500" />
                          <h3 className="font-semibold text-slate-900 text-sm">{m.name}</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{m.blurb}</p>
                      </motion.div>
                    ))}
                  </div>

                  <blockquote className="mt-6 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-slate-200 p-5">
                    <p className="text-sm text-slate-700 italic leading-relaxed">"{s.testimonial.quote}"</p>
                    <footer className="mt-3 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{s.testimonial.author}</span> · {s.testimonial.school}
                    </footer>
                  </blockquote>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button asChild className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                      <Link to="/book-demo">
                        Book a demo for {s.short}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full">
                      <Link to="/integrations">See integrations</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {i < segments.length - 1 && (
              <div className="mt-24 border-t border-dashed border-slate-200" />
            )}
          </section>
        ))}
      </div>

      <MarketingFooter />
    </div>
  );
};

export default ForSchools;
