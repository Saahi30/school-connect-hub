// deno-lint-ignore-file no-explicit-any
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const LEAD_NOTIFICATION_EMAIL = Deno.env.get("LEAD_NOTIFICATION_EMAIL") ?? "saahi.dubey77@gmail.com";
const FROM_EMAIL = Deno.env.get("LEAD_FROM_EMAIL") ?? "KnctED Leads <onboarding@resend.dev>";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface DemoRequest {
  school_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  role?: string;
  student_count?: string;
  use_case?: string;
  preferred_time?: string;
  message?: string;
}

function escapeHtml(s: string) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c] as string));
}

async function sendEmail(payload: DemoRequest, leadId: string) {
  if (!RESEND_API_KEY) return;
  const fields = Object.entries(payload)
    .map(([k, v]) => `<tr><td style="padding:4px 12px;color:#666"><b>${k}</b></td><td style="padding:4px 12px">${escapeHtml(v || "—")}</td></tr>`)
    .join("");
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:640px">
      <h2 style="color:#4f46e5">New demo request</h2>
      <p style="color:#666">Lead ID: <code>${leadId}</code></p>
      <table style="border-collapse:collapse">${fields}</table>
      <p style="margin-top:24px;color:#666;font-size:12px">Reply to this lead in the Supabase dashboard or directly at ${escapeHtml(payload.email)}.</p>
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
        reply_to: payload.email,
        subject: `Demo request: ${payload.school_name || payload.contact_name || payload.email}`,
        html,
      }),
    });
  } catch (e) {
    console.error("resend error", e);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json() as DemoRequest;

    if (!body.email || !body.contact_name || !body.school_name) {
      return new Response(JSON.stringify({ error: "school_name, contact_name and email are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data, error } = await supabase
      .from("leads")
      .insert({
        school_name: body.school_name,
        contact_name: body.contact_name,
        email: body.email,
        phone: body.phone || null,
        role: body.role || null,
        student_count: body.student_count || null,
        use_case: body.use_case || null,
        notes: [body.preferred_time && `Preferred time: ${body.preferred_time}`, body.message]
          .filter(Boolean).join("\n\n") || null,
        chat_transcript: [],
        source: "book_demo",
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("insert error", error);
      return new Response(JSON.stringify({ error: "Could not save your request. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // @ts-ignore Supabase Edge Runtime
    EdgeRuntime.waitUntil(sendEmail(body, data.id));

    return new Response(JSON.stringify({ ok: true, lead_id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-demo-request error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
