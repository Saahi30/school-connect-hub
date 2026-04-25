// deno-lint-ignore-file no-explicit-any
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const LEAD_NOTIFICATION_EMAIL = Deno.env.get("LEAD_NOTIFICATION_EMAIL") ?? "saahi.dubey77@gmail.com";
const FROM_EMAIL = Deno.env.get("LEAD_FROM_EMAIL") ?? "KnctED Leads <onboarding@resend.dev>";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const SYSTEM_PROMPT = `You are "Ask KnctED" — the assistant on KnctED's website. KnctED is a school SaaS covering admissions, attendance, exams, fees/payments, communication, transport, and role-based dashboards.

Be FAST and BRIEF. Never write more than 2 short sentences per turn. No bullet lists, no markdown headings.

Flow (keep it tight — aim to finish in 5–6 turns total):
1. First reply: 1 sentence answering their question + 1 short qualifying question (what's the school size or biggest pain point).
2. As soon as they show interest, ask for fields in BATCHES, not one-by-one:
   - Turn A: "Quick — what's your name, school name, and role?"
   - Turn B: "Got it. What's the best email and phone to reach you?"
   - Turn C: "Last bit — how many students roughly, and which area matters most (fees / attendance / exams / transport / other)?"
3. Then submit and close out with a thank-you.

Required fields: school_name, contact_name, email (mandatory), phone, role, student_count, use_case.

Never invent pricing, integrations, or features outside the modules listed.

When email + at least 3 other fields are collected, output exactly ONCE at the very end of that message:
<<LEAD>>{"school_name":"...","contact_name":"...","email":"...","phone":"...","role":"...","student_count":"...","use_case":"..."}<<END>>
Empty string for unknown fields. Never mention the marker to the user.
After submitting, reply with: "Thanks! Our team will reach out within one business day." Nothing more.
`;

interface ChatMessage { role: "user" | "assistant"; content: string }

async function callGroq(messages: ChatMessage[]) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      max_tokens: 500,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Groq error ${res.status}: ${txt}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

function extractLead(reply: string): { cleaned: string; lead: Record<string, string> | null } {
  const match = reply.match(/<<LEAD>>([\s\S]*?)<<END>>/);
  if (!match) return { cleaned: reply, lead: null };
  let lead: Record<string, string> | null = null;
  try {
    lead = JSON.parse(match[1].trim());
  } catch {
    lead = null;
  }
  const cleaned = reply.replace(/<<LEAD>>[\s\S]*?<<END>>/, "").trim();
  return { cleaned, lead };
}

async function sendNotificationEmail(lead: Record<string, string>, transcript: ChatMessage[]) {
  if (!RESEND_API_KEY) return;
  const transcriptHtml = transcript
    .map((m) => `<p><b>${m.role === "user" ? "Visitor" : "Bot"}:</b> ${escapeHtml(m.content)}</p>`)
    .join("");
  const fields = Object.entries(lead)
    .map(([k, v]) => `<tr><td style="padding:4px 12px;color:#666"><b>${k}</b></td><td style="padding:4px 12px">${escapeHtml(v || "—")}</td></tr>`)
    .join("");
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:640px">
      <h2 style="color:#4f46e5">New KnctED lead from chatbot</h2>
      <table style="border-collapse:collapse">${fields}</table>
      <h3 style="margin-top:24px">Transcript</h3>
      <div style="background:#f5f5f7;padding:12px;border-radius:8px">${transcriptHtml}</div>
    </div>`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [LEAD_NOTIFICATION_EMAIL],
        subject: `New lead: ${lead.school_name || lead.contact_name || lead.email || "unknown"}`,
        html,
      }),
    });
  } catch (e) {
    console.error("resend error", e);
  }
}

function escapeHtml(s: string) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c] as string));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { messages } = await req.json() as { messages: ChatMessage[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const raw = await callGroq(messages);
    const { cleaned, lead } = extractLead(raw);

    let leadId: string | null = null;
    if (lead && lead.email) {
      const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
      const fullTranscript: ChatMessage[] = [
        ...messages,
        { role: "assistant", content: cleaned },
      ];
      const { data, error } = await supabase
        .from("leads")
        .insert({
          school_name: lead.school_name || null,
          contact_name: lead.contact_name || null,
          email: lead.email,
          phone: lead.phone || null,
          role: lead.role || null,
          student_count: lead.student_count || null,
          use_case: lead.use_case || null,
          chat_transcript: fullTranscript,
          source: "chatbot",
          status: "new",
        })
        .select("id")
        .single();
      if (error) console.error("insert lead error", error);
      else {
        leadId = data.id;
        await sendNotificationEmail(lead, fullTranscript);
      }
    }

    return new Response(JSON.stringify({
      reply: cleaned,
      lead_captured: !!leadId,
      lead_id: leadId,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ask-knctED error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
