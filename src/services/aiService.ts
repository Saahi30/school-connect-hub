// ============================================================
// AI Service — Centralized LLM Caller via Supabase Edge Functions
// ============================================================

import { supabase } from '@/integrations/supabase/client';
import type {
    QuestionGenerationRequest,
    QuestionGenerationResponse,
    CommentGenerationRequest,
    CommentGenerationResponse,
} from '@/types/teacherAssistantTypes';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

async function callEdgeFunction<TReq, TRes>(
    functionName: string,
    payload: TReq,
    retries = MAX_RETRIES
): Promise<TRes> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const { data, error } = await supabase.functions.invoke(functionName, {
                body: payload,
            });

            if (error) {
                throw new Error(`Edge function "${functionName}" error: ${error.message}`);
            }

            if (!data) {
                throw new Error(`Edge function "${functionName}" returned no data`);
            }

            return data as TRes;
        } catch (err) {
            if (attempt === retries) throw err;
            await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * (attempt + 1)));
        }
    }

    throw new Error(`Edge function "${functionName}" failed after ${retries + 1} attempts`);
}

export async function generateQuestions(
    request: QuestionGenerationRequest
): Promise<QuestionGenerationResponse> {
    return callEdgeFunction<QuestionGenerationRequest, QuestionGenerationResponse>(
        'generate-questions',
        request
    );
}

export async function generateReportComments(
    request: CommentGenerationRequest
): Promise<CommentGenerationResponse> {
    return callEdgeFunction<CommentGenerationRequest, CommentGenerationResponse>(
        'generate-report-comments',
        request
    );
}
