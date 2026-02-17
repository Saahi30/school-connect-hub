// ============================================================
// Report Comment Service — AI-driven student feedback
// ============================================================

import { supabase } from '@/integrations/supabase/client';
import { generateReportComments } from './aiService';
import { getClassMetrics } from './studentMetricsService';
import type {
    CommentTone,
    CommentGenerationRequest,
    ReportComment,
    StudentMetrics,
} from '@/types/teacherAssistantTypes';

/**
 * Generate comments for an entire class in one batch.
 */
export async function generateClassComments(
    classId: string,
    subjectId: string,
    teacherId: string,
    tone: CommentTone,
    academicYear = '2025-2026',
    term = 'Term 1'
): Promise<ReportComment[]> {
    // 1. Get student metrics (cached or fresh)
    const studentsWithMetrics = await getClassMetrics(classId, subjectId, academicYear, term);

    if (studentsWithMetrics.length === 0) return [];

    // 2. Get subject name for AI prompt
    const { data: subject } = await supabase
        .from('subjects')
        .select('name')
        .eq('id', subjectId)
        .single();

    // 3. Build AI request
    const request: CommentGenerationRequest = {
        students: studentsWithMetrics.map((s) => ({
            student_id: s.student_id,
            student_name: s.student_name,
            metrics: s.metrics,
        })),
        subject: subject?.name ?? 'Unknown',
        tone,
    };

    // 4. Call AI
    const response = await generateReportComments(request);

    // 5. Save/update comments to DB
    const savedComments: ReportComment[] = [];

    for (const generated of response.comments) {
        const studentData = studentsWithMetrics.find((s) => s.student_id === generated.student_id);

        const commentRecord = {
            student_id: generated.student_id,
            subject_id: subjectId,
            class_id: classId,
            teacher_id: teacherId,
            academic_year: academicYear,
            term,
            tone,
            ai_generated_comment: generated.comment,
            final_comment: generated.comment,
            metrics_snapshot: studentData?.metrics as unknown as Record<string, unknown>,
            is_finalized: false,
        };

        const { data } = await supabase
            .from('report_comments')
            .upsert(commentRecord, {
                onConflict: 'student_id,subject_id,class_id,academic_year,term',
            })
            .select()
            .single();

        if (data) savedComments.push(data as ReportComment);
    }

    return savedComments;
}

/**
 * Save teacher's edited comment.
 */
export async function saveEditedComment(
    commentId: string,
    editedComment: string
): Promise<void> {
    await supabase
        .from('report_comments')
        .update({
            teacher_edited_comment: editedComment,
            final_comment: editedComment,
            updated_at: new Date().toISOString(),
        })
        .eq('id', commentId);
}

/**
 * Finalize all comments for a class/subject/term.
 */
export async function finalizeComments(
    classId: string,
    subjectId: string,
    academicYear = '2025-2026',
    term = 'Term 1'
): Promise<void> {
    await supabase
        .from('report_comments')
        .update({ is_finalized: true, updated_at: new Date().toISOString() })
        .eq('class_id', classId)
        .eq('subject_id', subjectId)
        .eq('academic_year', academicYear)
        .eq('term', term);
}

/**
 * Fetch comment history for a class.
 */
export async function getCommentHistory(
    classId: string,
    subjectId: string,
    academicYear = '2025-2026',
    term = 'Term 1'
): Promise<ReportComment[]> {
    const { data } = await supabase
        .from('report_comments')
        .select('*')
        .eq('class_id', classId)
        .eq('subject_id', subjectId)
        .eq('academic_year', academicYear)
        .eq('term', term)
        .order('created_at', { ascending: true });

    return (data as ReportComment[]) ?? [];
}

/**
 * Regenerate a single student's comment with a potentially different tone.
 */
export async function regenerateSingleComment(
    studentId: string,
    studentName: string,
    metrics: StudentMetrics,
    subjectName: string,
    tone: CommentTone
): Promise<string> {
    const request: CommentGenerationRequest = {
        students: [{ student_id: studentId, student_name: studentName, metrics }],
        subject: subjectName,
        tone,
    };

    const response = await generateReportComments(request);
    return response.comments[0]?.comment ?? '';
}
