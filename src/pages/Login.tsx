import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Users, BookOpen, Shield, ArrowRight, Play, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/landing/MarketingNav";
import { MarketingFooter } from "@/components/landing/MarketingFooter";

interface RolePortal {
  type: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accent: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  loginPath: string;
  demoPath: string;
  features: string[];
}

const userTypes: RolePortal[] = [
  {
    type: "student",
    title: "Student",
    description: "Attendance, marks, timetable, and homework — all in one place.",
    Icon: GraduationCap,
    accent: "from-orange-500 to-amber-500",
    accentText: "text-orange-600",
    accentBorder: "hover:border-orange-300 hover:shadow-orange-100/60",
    accentBg: "bg-orange-50",
    loginPath: "/login/student",
    demoPath: "/demo/student",
    features: ["View attendance", "Check marks", "Submit homework"],
  },
  {
    type: "parent",
    title: "Parent",
    description: "Track your child's progress, fees, and school updates.",
    Icon: Users,
    accent: "from-emerald-500 to-teal-600",
    accentText: "text-emerald-700",
    accentBorder: "hover:border-emerald-300 hover:shadow-emerald-100/60",
    accentBg: "bg-emerald-50",
    loginPath: "/login/parent",
    demoPath: "/demo/parent",
    features: ["Daily progress", "Pay fees", "Message teachers"],
  },
  {
    type: "teacher",
    title: "Teacher",
    description: "Mark attendance, post homework, and run your classroom.",
    Icon: BookOpen,
    accent: "from-purple-500 to-indigo-600",
    accentText: "text-purple-700",
    accentBorder: "hover:border-purple-300 hover:shadow-purple-100/60",
    accentBg: "bg-purple-50",
    loginPath: "/login/teacher",
    demoPath: "/demo/teacher",
    features: ["Class attendance", "Upload marks", "Lesson plans"],
  },
  {
    type: "admin",
    title: "Admin",
    description: "Run the entire school — users, fees, reports, and beyond.",
    Icon: Shield,
    accent: "from-blue-500 to-cyan-600",
    accentText: "text-blue-700",
    accentBorder: "hover:border-blue-300 hover:shadow-blue-100/60",
    accentBg: "bg-blue-50",
    loginPath: "/login/admin",
    demoPath: "/demo/admin",
    features: ["User management", "Reports & analytics", "System settings"],
  },
];

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
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

        <section className="relative z-10 m-auto max-w-4xl px-6 py-14 lg:py-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/40 bg-white/10 backdrop-blur-sm px-3.5 py-1 mb-6 text-[11px] font-medium tracking-[0.12em] uppercase text-white/90"
          >
            <Sparkles className="h-3 w-3" /> Welcome back
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-balance text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-white"
          >
            Pick the portal that's
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-pink-200 bg-clip-text text-transparent italic">
              built for you
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-lg text-base md:text-lg text-white/85 leading-relaxed"
          >
            Sign in to your role-specific dashboard, or take a no-login demo for a tour.
          </motion.p>
        </section>
      </div>

      <main className="relative -mt-12 lg:-mt-16 m-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {userTypes.map((u, i) => (
            <motion.div
              key={u.type}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: "easeOut" }}
              className={`group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${u.accentBorder}`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${u.accent} opacity-0 group-hover:opacity-100 transition`} />

              <div className="flex items-start justify-between mb-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${u.accent} shadow-md`}>
                  <u.Icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${u.accentBg} ${u.accentText}`}>
                  Portal
                </span>
              </div>

              <h3 className="font-display text-xl font-medium tracking-tight text-slate-900 mb-1.5">
                {u.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {u.description}
              </p>

              <ul className="space-y-1.5 mb-6 flex-1">
                {u.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className={`h-1 w-1 rounded-full bg-gradient-to-br ${u.accent}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="space-y-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => navigate(u.loginPath)}
                  className={`w-full rounded-full bg-gradient-to-r ${u.accent} text-white hover:brightness-110 shadow-md`}
                >
                  Sign in
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(u.demoPath)}
                  className="w-full rounded-full border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Play className="h-3.5 w-3.5 mr-1.5" />
                  Try demo
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-900 text-sm">First time at KnctED?</p>
              <p className="text-xs text-slate-500 mt-0.5">Schools join through a guided demo with our team.</p>
            </div>
            <Button asChild size="sm" className="rounded-full shrink-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
              <Link to="/book-demo">
                Book a demo <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-900 text-sm">Forgot your portal?</p>
              <p className="text-xs text-slate-500 mt-0.5">Your school administrator can resend access details.</p>
            </div>
            <Button asChild size="sm" variant="outline" className="rounded-full shrink-0">
              <a href="mailto:info@knctED.app?subject=Login%20help">
                Email support
              </a>
            </Button>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
