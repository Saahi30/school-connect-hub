import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, Loader2, Mail, Phone as PhoneIcon, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { MarketingNav } from "@/components/landing/MarketingNav";
import { MarketingFooter } from "@/components/landing/MarketingFooter";
import { supabase } from "@/integrations/supabase/client";

interface FormState {
  school_name: string;
  contact_name: string;
  email: string;
  phone: string;
  role: string;
  student_count: string;
  use_case: string;
  preferred_time: string;
  message: string;
}

const empty: FormState = {
  school_name: "",
  contact_name: "",
  email: "",
  phone: "",
  role: "",
  student_count: "",
  use_case: "",
  preferred_time: "",
  message: "",
};

const BookDemo = () => {
  const [form, setForm] = React.useState<FormState>(empty);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.school_name || !form.contact_name || !form.email) {
      setError("Please fill in school name, your name, and email.");
      return;
    }
    setSubmitting(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("submit-demo-request", {
        body: form,
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setSubmitted(true);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

        <section className="relative z-10 m-auto max-w-5xl px-6 py-16 lg:py-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/40 bg-white/10 backdrop-blur-sm px-3.5 py-1 mb-6 text-[11px] font-medium tracking-[0.12em] uppercase text-white/90"
          >
            <Sparkles className="h-3 w-3" /> Book a Demo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-balance text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] text-white"
          >
            See KnctED running for
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-pink-200 bg-clip-text text-transparent italic">
              your school
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base md:text-lg text-white/85 leading-relaxed"
          >
            A 30-minute walkthrough tailored to your size and stack. Our team will reach out within one business day.
          </motion.p>
        </section>
      </div>

      <section className="relative -mt-12 lg:-mt-16 m-auto max-w-5xl px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 rounded-3xl bg-white shadow-xl shadow-indigo-900/10 border border-slate-100 p-6 lg:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-slate-900 mb-2">
                  Request received
                </h2>
                <p className="text-slate-600 max-w-md mx-auto mb-6">
                  Thanks {form.contact_name?.split(" ")[0] || ""} — someone from our team will reach out within one business day at <b>{form.email}</b>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                    <Link to="/">Back to home</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/blog">Read the blog</Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-slate-900">
                    Tell us about your school
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Takes under 60 seconds.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="school_name">School / Institution name<span className="text-rose-500">*</span></Label>
                    <Input
                      id="school_name"
                      value={form.school_name}
                      onChange={(e) => update("school_name", e.target.value)}
                      placeholder="e.g. Vidyalaya Public School"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact_name">Your name<span className="text-rose-500">*</span></Label>
                    <Input
                      id="contact_name"
                      value={form.contact_name}
                      onChange={(e) => update("contact_name", e.target.value)}
                      placeholder="Full name"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Work email<span className="text-rose-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@school.edu"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone (with country code)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label>Your role</Label>
                    <Select value={form.role} onValueChange={(v) => update("role", v)}>
                      <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner / Founder">Owner / Founder</SelectItem>
                        <SelectItem value="Principal">Principal</SelectItem>
                        <SelectItem value="Administrator">Administrator</SelectItem>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="IT / Operations">IT / Operations</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>School size</Label>
                    <Select value={form.student_count} onValueChange={(v) => update("student_count", v)}>
                      <SelectTrigger><SelectValue placeholder="Students" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<100">Under 100</SelectItem>
                        <SelectItem value="100-500">100 – 500</SelectItem>
                        <SelectItem value="500-2000">500 – 2,000</SelectItem>
                        <SelectItem value="2000+">2,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Most important area</Label>
                    <Select value={form.use_case} onValueChange={(v) => update("use_case", v)}>
                      <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fees & Payments">Fees & Payments</SelectItem>
                        <SelectItem value="Attendance">Attendance</SelectItem>
                        <SelectItem value="Exams & Reports">Exams & Reports</SelectItem>
                        <SelectItem value="Admissions">Admissions</SelectItem>
                        <SelectItem value="Communication">Communication</SelectItem>
                        <SelectItem value="Transport">Transport</SelectItem>
                        <SelectItem value="Everything">Everything</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="preferred_time">Preferred demo slot (optional)</Label>
                  <Input
                    id="preferred_time"
                    value={form.preferred_time}
                    onChange={(e) => update("preferred_time", e.target.value)}
                    placeholder="e.g. Weekday mornings, IST"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Anything else? (optional)</Label>
                  <Textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="What problem are you trying to solve, or what tools are you currently using?"
                  />
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-[11px] text-slate-400 max-w-xs">
                    By submitting, you agree to be contacted by the KnctED team about a demo. We will not share your details.
                  </p>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-6 shadow-md shadow-indigo-500/30"
                  >
                    {submitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
                    ) : (
                      <>Request demo <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">What happens next</p>
              <ol className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-indigo-600 font-semibold">1.</span> We review your request within one business day.</li>
                <li className="flex gap-2"><span className="text-indigo-600 font-semibold">2.</span> A specialist emails you to schedule a 30-min demo.</li>
                <li className="flex gap-2"><span className="text-indigo-600 font-semibold">3.</span> You see KnctED in action with your school's setup.</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Calendar className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">30-minute walkthrough</p>
                  <p className="text-slate-500 text-xs">Tailored to your school size and stack.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <ShieldCheck className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">No commitment</p>
                  <p className="text-slate-500 text-xs">Just a conversation — no contract pressure.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Or email us</p>
                  <a href="mailto:info@knctED.app" className="text-indigo-600 text-xs hover:underline">info@knctED.app</a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <PhoneIcon className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-slate-900">Prefer a chat?</p>
                  <p className="text-slate-500 text-xs">Use Ask KnctED in the nav.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default BookDemo;
