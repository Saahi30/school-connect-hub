// ============================================================
// Edge Function: generate-report-comments
// Generates personalized student report comments via LLM
// ============================================================

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not configured");
        }

        const { students, subject, tone } = await req.json();

        const toneInstructions: Record<string, string> = {
            encouraging:
                "Write in a warm, supportive tone. Highlight strengths first, then gently suggest areas for growth. Use phrases like 'shows great potential', 'is making wonderful progress'.",
            constructive:
                "Write in a balanced, professional tone. Acknowledge achievements while clearly identifying specific areas for improvement with actionable suggestions.",
            strict:
                "Write in a direct, no-nonsense tone. Be factual about performance. Clearly state what needs to change and set expectations. Avoid sugar-coating.",
            appreciative:
                "Write in a celebratory, positive tone. Focus heavily on achievements and growth. Use phrases like 'exceptional effort', 'outstanding performance', 'truly impressive'.",
            ptm_friendly:
                "Write for parent-teacher meeting context. Be diplomatic but honest. Use language parents can understand. Suggest how parents can support learning at home.",
        };

        const studentsData = students
            .map(
                (s: {
                    student_id: string;
                    student_name: string;
                    metrics: {
                        consistency: number;
                        effort: number;
                        conceptual: number;
                        timeliness: number;
                        trend: string;
                        participation: number;
                    };
                }) => `
Student ID: ${s.student_id}
Name: ${s.student_name}
Subject: ${subject}
Metrics:
  - Consistency Score: ${s.metrics.consistency}/100
  - Effort Score: ${s.metrics.effort}/100
  - Conceptual Understanding: ${s.metrics.conceptual}/100
  - Submission Timeliness: ${s.metrics.timeliness}/100
  - Improvement Trend: ${s.metrics.trend}
  - Participation Index: ${s.metrics.participation}/100`
            )
            .join("\n---\n");

        const systemPrompt = `You are an experienced school teacher writing personalized report card comments. You MUST return ONLY valid JSON (no markdown, no extra text).

Your output MUST follow this exact schema:
{
  "comments": [
    {
      "student_id": "uuid-here",
      "comment": "2-4 sentence comment..."
    }
  ]
}

Rules:
1. Each comment MUST be 2-4 sentences, between 50-150 words
2. Comments MUST reference specific performance patterns from the metrics
3. NEVER use generic phrases like "good student" or "needs improvement"
4. NEVER repeat the exact same phrasing across students
5. Reference the subject by name naturally
6. If consistency is low but effort is high, acknowledge the effort
7. If trend is "improving", mention the positive trajectory
8. If trend is "declining", address it constructively
9. Comments must sound naturally teacher-written, not AI-generated
10. ${toneInstructions[tone] || toneInstructions.constructive}`;

        const userPrompt = `Generate personalized report comments for the following students:

${studentsData}

Remember: return ONLY the JSON with the "comments" array. Each comment must be specific to the student's metrics and sound like a real teacher wrote it.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.8,
                max_tokens: Math.max(2000, students.length * 200),
                response_format: { type: "json_object" },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);

        // Validate structure
        if (!parsed.comments || !Array.isArray(parsed.comments)) {
            throw new Error("Invalid AI response: missing comments array");
        }

        for (const c of parsed.comments) {
            if (!c.student_id || !c.comment) {
                throw new Error("Invalid comment entry: missing student_id or comment");
            }
            // Quality check: minimum length
            if (c.comment.length < 30) {
                throw new Error(`Comment for ${c.student_id} is too short (${c.comment.length} chars)`);
            }
        }

        return new Response(JSON.stringify(parsed), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in generate-report-comments:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
