import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard, MessageSquare, Phone, Mail, Calendar, Video, Cloud, BarChart3,
  FileSpreadsheet, Building2, Webhook, Smartphone, ShieldCheck, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/landing/MarketingNav";
import { MarketingFooter } from "@/components/landing/MarketingFooter";

type Status = "Native" | "Available" | "Coming soon";

interface Integration {
  name: string;
  category: string;
  blurb: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  status: Status;
}

const integrations: Integration[] = [
  { name: "Razorpay", category: "Payments", blurb: "Online fee collection, receipts, and reconciliation in INR.", Icon: CreditCard, color: "from-blue-500 to-indigo-600", status: "Native" },
  { name: "WhatsApp Business", category: "Communication", blurb: "Send fee reminders, attendance alerts, and PTM invites to parents.", Icon: MessageSquare, color: "from-green-500 to-emerald-600", status: "Native" },
  { name: "SMS Gateway", category: "Communication", blurb: "Bulk SMS for absentee notifications and announcements.", Icon: Phone, color: "from-orange-500 to-red-500", status: "Native" },
  { name: "Email (SMTP)", category: "Communication", blurb: "Transactional emails for admissions, receipts, and report cards.", Icon: Mail, color: "from-rose-500 to-pink-600", status: "Native" },
  { name: "Google Workspace", category: "Productivity", blurb: "SSO, Drive for documents, Calendar for events.", Icon: Cloud, color: "from-amber-500 to-orange-500", status: "Available" },
  { name: "Google Calendar", category: "Productivity", blurb: "Sync exam schedules and PTM slots to teachers' calendars.", Icon: Calendar, color: "from-sky-500 to-blue-600", status: "Available" },
  { name: "Zoom", category: "Online classes", blurb: "Launch classes and PTMs directly from KnctED.", Icon: Video, color: "from-blue-500 to-cyan-500", status: "Available" },
  { name: "BigBlueButton", category: "Online classes", blurb: "Open-source virtual classrooms with whiteboarding.", Icon: Video, color: "from-slate-500 to-slate-700", status: "Coming soon" },
  { name: "Tally", category: "Accounting", blurb: "Export fee collections and ledgers to your existing books.", Icon: FileSpreadsheet, color: "from-yellow-500 to-amber-600", status: "Coming soon" },
  { name: "Power BI", category: "Analytics", blurb: "Stream metrics into your school's BI dashboards.", Icon: BarChart3, color: "from-fuchsia-500 to-purple-600", status: "Coming soon" },
  { name: "Single Sign-On (SAML)", category: "Identity", blurb: "Centralised login for staff via Okta, Azure AD, etc.", Icon: ShieldCheck, color: "from-teal-500 to-emerald-600", status: "Available" },
  { name: "REST API & Webhooks", category: "Developer", blurb: "Build custom workflows on top of KnctED data.", Icon: Webhook, color: "from-violet-500 to-purple-600", status: "Available" },
  { name: "Mobile push (FCM)", category: "Communication", blurb: "Push notifications to the parent and student apps.", Icon: Smartphone, color: "from-indigo-500 to-purple-600", status: "Native" },
  { name: "Government MIS", category: "Compliance", blurb: "Export data in formats expected by state education boards.", Icon: Building2, color: "from-slate-600 to-zinc-700", status: "Coming soon" },
];

const statusBadge: Record<Status, string> = {
  "Native": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Available": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Coming soon": "bg-slate-50 text-slate-500 border-slate-200",
};

const categories = Array.from(new Set(integrations.map((i) => i.category)));

const Integrations = () => {
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
            Integrations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-balance text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-white"
          >
            Plug into the tools your school
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-pink-200 bg-clip-text text-transparent italic">
              already trusts
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl text-base md:text-lg text-white/85 leading-relaxed"
          >
            From payments to parent communication, KnctED connects with the systems schools use every day —
            no IT team required.
          </motion.p>
        </section>
      </div>

      <section className="relative -mt-12 lg:-mt-16 m-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-white shadow-xl shadow-indigo-900/10 border border-slate-100 p-6 lg:p-10">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((i, idx) => (
              <motion.div
                key={i.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: Math.min(idx * 0.03, 0.3), duration: 0.3 }}
                className="group relative rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${i.color}`}>
                    <i.Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusBadge[i.status]}`}>
                    {i.status}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{i.name}</h3>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider mb-2">{i.category}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{i.blurb}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative m-auto max-w-4xl px-6 pb-24 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 px-8 py-12 text-white">
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">
            Don't see your tool?
          </h2>
          <p className="text-white/85 max-w-md mx-auto mb-6">
            Tell us what you'd like KnctED to integrate with. Most requests ship within a quarter.
          </p>
          <Button asChild size="lg" className="rounded-full bg-white text-indigo-600 hover:bg-white/95 hover:text-indigo-700">
            <Link to="/book-demo">
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default Integrations;
