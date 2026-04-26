import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Users, BookOpen, School, Heart, Compass, Shield,
  Sparkles, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/landing/MarketingNav";
import { MarketingFooter } from "@/components/landing/MarketingFooter";

const values = [
  {
    Icon: Heart,
    title: "Schools first, software second",
    body: "Every feature ships only after a real school has run on it. We sit in admissions offices and at the back of classrooms — that's where our roadmap is written.",
    accent: "from-rose-500 to-pink-600",
  },
  {
    Icon: Compass,
    title: "Clarity over completeness",
    body: "A platform that does ten things well beats one that does forty halfway. We say no often so the product stays sharp where it matters most.",
    accent: "from-indigo-500 to-purple-600",
  },
  {
    Icon: Shield,
    title: "Trust is non-negotiable",
    body: "Schools handle some of the most sensitive data anywhere. We treat security, uptime, and privacy as core product features — not afterthoughts.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    Icon: Sparkles,
    title: "Delight is a discipline",
    body: "Software for schools is famously joyless. We disagree. A clean interface and a smooth flow respect the time of busy educators and parents.",
    accent: "from-amber-500 to-orange-500",
  },
];

const stats = [
  { Icon: GraduationCap, value: "10K+", label: "Students" },
  { Icon: Users, value: "8K+", label: "Parents" },
  { Icon: BookOpen, value: "500+", label: "Teachers" },
  { Icon: School, value: "50+", label: "Schools" },
];

const About = () => {
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

        <section className="relative z-10 m-auto max-w-5xl px-6 py-20 lg:py-28 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/40 bg-white/10 backdrop-blur-sm px-3.5 py-1 mb-6 text-[11px] font-medium tracking-[0.12em] uppercase text-white/90"
          >
            About KnctED
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-balance text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-white"
          >
            Software that gives schools
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-pink-200 bg-clip-text text-transparent italic">
              their time back
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed"
          >
            We're a small team of educators, engineers, and product designers building one platform
            for the entire school day — from admissions to alumni.
          </motion.p>
        </section>
      </div>

      {/* Stats */}
      <section className="relative -mt-12 lg:-mt-16 m-auto max-w-5xl px-6">
        <div className="rounded-3xl bg-white shadow-xl shadow-indigo-900/10 border border-slate-100 p-8 lg:p-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 text-center">
                <s.Icon className="h-5 w-5 text-indigo-500" strokeWidth={1.5} />
                <div className="font-display text-3xl md:text-4xl font-medium tracking-tight text-slate-900">
                  {s.value}
                </div>
                <div className="text-[11px] text-slate-500 uppercase tracking-[0.18em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="m-auto max-w-3xl px-6 py-24">
        <p className="text-xs uppercase tracking-widest text-indigo-600 font-semibold mb-3">Our story</p>
        <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-slate-900">
          We started where schools actually struggle — the office.
        </h2>
        <div className="mt-8 space-y-5 text-slate-700 leading-[1.8] text-base">
          <p>
            KnctED began with a single observation: most schools run on a quiet stack of Excel sheets,
            WhatsApp groups, and weekend trips to the bank. Software was supposed to help — instead it
            arrived as bloated suites priced for enterprises and built for nobody in particular.
          </p>
          <p>
            We spent six months sitting in admissions offices, riding school buses, and watching a fee
            counter on a Saturday morning. Every line of KnctED was written against a real moment we had
            seen — a parent asking the same question for the third time, a teacher hand-totalling marks
            at midnight, an admin re-printing receipts because the printer ate the last batch.
          </p>
          <p>
            What we shipped is unglamorous on purpose. Attendance that takes thirty seconds. Fees that
            collect themselves. Communication that lands in the channels parents already use. And a
            single source of truth that the principal, the accountant, and the bus driver all share.
          </p>
          <p className="font-medium text-slate-900">
            Every school we onboard saves ~9 hours a week of office work. We measure that. It's the
            number we care about most.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 border-y border-slate-200 py-24">
        <div className="m-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-indigo-600 font-semibold mb-3">What we believe</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-slate-900">
              Four principles that shape every feature
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-lg hover:shadow-indigo-100/50 hover:border-indigo-200 transition"
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${v.accent} mb-4`}>
                  <v.Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight text-slate-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="m-auto max-w-5xl px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 lg:p-10 text-white">
            <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-2">
              See KnctED for your school
            </h3>
            <p className="text-white/85 mb-6">
              A 30-minute walkthrough tailored to your size and stack.
            </p>
            <Button asChild size="lg" className="rounded-full bg-white text-indigo-600 hover:bg-white/95 hover:text-indigo-700">
              <Link to="/book-demo">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-8 lg:p-10">
            <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-slate-900 mb-2">
              Want to build with us?
            </h3>
            <p className="text-slate-600 mb-6">
              We hire educators, engineers, and operators who care about schools. Drop us a line.
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href="mailto:info@knctED.app?subject=Joining%20KnctED">
                info@knctED.app <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default About;
