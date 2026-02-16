// ============================================================
// Edge Function: generate-questions
// Generates structured question paper JSON via LLM
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

        const {
            subject,
            class_name,
            chapters,
            topics,
            sections,
            cognitive_levels,
            total_marks,
            existing_hashes,
        } = await req.json();

        // Build Bloom taxonomy instruction
        const bloomMapping: Record<string, string> = {
            remember: "recall facts, definitions, and basic concepts",
            understand: "explain ideas or concepts in own words",
            apply: "use information in new situations, solve problems",
            analyze: "draw connections among ideas, compare and contrast",
            evaluate: "justify a decision or course of action, critique",
            create: "produce new or original work, design solutions",
        };

        const cognitiveLevelInstructions = cognitive_levels
            .map((level: string) => `- ${level}: ${bloomMapping[level] || level}`)
            .join("\n");

        const sectionsSpec = sections
            .map(
                (s: { name: string; type: string; count: number; marks_per_question: number }) =>
                    `Section "${s.name}": ${s.count} questions of type "${s.type}", ${s.marks_per_question} marks each`
            )
            .join("\n");

        const systemPrompt = `You are an expert exam paper generator for school education. You MUST return ONLY valid JSON (no markdown, no explanation, no extra text).

Your output MUST strictly follow this schema:
{
  "sections": [
    {
      "name": "Section A",
      "type": "mcq",
      "marks_per_question": 1,
      "questions": [
        {
          "question": "...",
          "options": ["A", "B", "C", "D"],
          "correct_answer": "B",
          "topic": "Topic Name",
          "cognitive_level": "apply"
        }
      ]
    }
  ]
}

Rules:
1. Questions MUST test the specified cognitive levels (Bloom's Taxonomy)
2. Questions MUST be original, clear, and unambiguous
3. For MCQ: always provide exactly 4 options
4. For short_answer: no options needed
5. For long_answer: no options needed, correct_answer should be a model answer outline
6. For true_false: no options needed, correct_answer must be "True" or "False"
7. For fill_blank: question should have "___" where the blank is
8. Each question MUST have the topic and cognitive_level fields
9. Do NOT repeat questions that are semantically similar
10. Vary the phrasing and difficulty across questions`;

        const userPrompt = `Generate an exam paper for:
Subject: ${subject}
Class: ${class_name}
Chapters: ${chapters.join(", ")}
${topics && topics.length > 0 ? `Topics: ${topics.join(", ")}` : ""}
Total Marks: ${total_marks}

Required Sections:
${sectionsSpec}

Cognitive levels to target (Bloom's Taxonomy):
${cognitiveLevelInstructions}

Generate diverse questions that test different aspects of the chapters. Ensure questions are grade-appropriate and academically sound.`;

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
                temperature: 0.7,
                max_tokens: 4000,
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
        if (!parsed.sections || !Array.isArray(parsed.sections)) {
            throw new Error("Invalid AI response: missing sections array");
        }

        for (const section of parsed.sections) {
            if (!section.questions || !Array.isArray(section.questions)) {
                throw new Error(`Invalid section "${section.name}": missing questions array`);
            }
            for (const q of section.questions) {
                if (!q.question || !q.correct_answer || !q.cognitive_level) {
                    throw new Error("Invalid question: missing required fields");
                }
            }
        }

        return new Response(JSON.stringify(parsed), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in generate-questions:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
