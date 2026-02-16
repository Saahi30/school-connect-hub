// ============================================================
// Student Metrics Service — Compute analytics from existing data
// ============================================================

import { supabase } from '@/integrations/supabase/client';
import type { StudentMetrics, StudentMetricsCache, ImprovementTrend } from '@/types/teacherAssistantTypes';

const CACHE_TTL_HOURS = 24;

interface StudentWithProfile {
    student_id: string;
    student_name: string;
    metrics: StudentMetrics;
}

/**
 * Get metrics for all students in a class/subject, using cache when fresh.
 */
export async function getClassMetrics(
    classId: string,
    subjectId: string,
    academicYear = '2025-2026',
    term = 'Term 1'
): Promise<StudentWithProfile[]> {
    // 1. Check cache
    const cutoff = new Date(Date.now() - CACHE_TTL_HOURS * 60 * 60 * 1000).toISOString();

    const { data: cached } = await supabase
        .from('student_metrics_cache')
        .select('*')
        .eq('class_id', classId)
        .eq('subject_id', subjectId)
        .eq('academic_year', academicYear)
        .eq('term', term)
        .gte('computed_at', cutoff);

    // 2. Get student list for this class
    const { data: students } = await supabase
        .from('students')
        .select('id, user_id, roll_number')
        .eq('class_id', classId);

    if (!students || students.length === 0) return [];

    // Get profile names
    const userIds = students.map((s) => s.user_id);
    const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name')
        .in('user_id', userIds);

    const nameMap = new Map(profiles?.map((p) => [p.user_id, p.full_name]) ?? []);

    // 3. If cache is fresh for all students, return cached
    const cachedMap = new Map(
        (cached as StudentMetricsCache[] | null)?.map((c) => [c.student_id, c]) ?? []
    );

    const studentIds = students.map((s) => s.id);
    const allCached = studentIds.every((id) => cachedMap.has(id));

    if (allCached && cached && cached.length > 0) {
        return students.map((s) => ({
            student_id: s.id,
            student_name: nameMap.get(s.user_id) ?? 'Unknown',
            metrics: {
                consistency: cachedMap.get(s.id)?.consistency_score ?? 0,
                effort: cachedMap.get(s.id)?.effort_score ?? 0,
                conceptual: cachedMap.get(s.id)?.conceptual_understanding ?? 0,
                timeliness: cachedMap.get(s.id)?.submission_timeliness ?? 0,
                trend: (cachedMap.get(s.id)?.improvement_trend as ImprovementTrend) ?? 'stable',
                participation: cachedMap.get(s.id)?.participation_index ?? 0,
            },
        }));
    }

    // 4. Compute fresh metrics
    const results: StudentWithProfile[] = [];

    for (const student of students) {
        const metrics = await computeStudentMetrics(student.id, classId, subjectId);

        // Upsert to cache
        await supabase.from('student_metrics_cache').upsert(
            {
                student_id: student.id,
                subject_id: subjectId,
                class_id: classId,
                academic_year: academicYear,
                term: term,
                consistency_score: metrics.consistency,
                effort_score: metrics.effort,
                conceptual_understanding: metrics.conceptual,
                submission_timeliness: metrics.timeliness,
                improvement_trend: metrics.trend,
                participation_index: metrics.participation,
                computed_at: new Date().toISOString(),
            },
            { onConflict: 'student_id,subject_id,class_id,academic_year,term' }
        );

        results.push({
            student_id: student.id,
            student_name: nameMap.get(student.user_id) ?? 'Unknown',
            metrics,
        });
    }

    return results;
}

/**
 * Compute metrics for a single student from raw data.
 */
async function computeStudentMetrics(
    studentId: string,
    classId: string,
    subjectId: string
): Promise<StudentMetrics> {
    // Fetch marks history
    const { data: marks } = await supabase
        .from('marks')
        .select('marks_obtained, max_marks, created_at')
        .eq('student_id', studentId)
        .eq('class_id', classId)
        .eq('subject_id', subjectId)
        .order('created_at', { ascending: true });

    // Fetch homework submissions
    const { data: homeworkList } = await supabase
        .from('homework')
        .select('id, due_date')
        .eq('class_id', classId)
        .eq('subject_id', subjectId);

    const homeworkIds = homeworkList?.map((h) => h.id) ?? [];
    const dueDateMap = new Map(homeworkList?.map((h) => [h.id, h.due_date]) ?? []);

    let submissions: { homework_id: string; status: string; submitted_at: string | null }[] = [];
    if (homeworkIds.length > 0) {
        const { data } = await supabase
            .from('homework_submissions')
            .select('homework_id, status, submitted_at')
            .eq('student_id', studentId)
            .in('homework_id', homeworkIds);
        submissions = data ?? [];
    }

    // Fetch attendance
    const { data: attendance } = await supabase
        .from('attendance')
        .select('status')
        .eq('student_id', studentId)
        .eq('class_id', classId);

    // --- Compute Scores ---

    // 1. Consistency Score: inverse of coefficient of variation of marks percentages
    const percentages = (marks ?? []).map((m) => (m.marks_obtained / m.max_marks) * 100);
    const consistency = computeConsistency(percentages);

    // 2. Effort Score: homework completion rate
    const totalHomework = homeworkIds.length;
    const submitted = submissions.filter((s) => s.status !== 'pending').length;
    const effort = totalHomework > 0 ? Math.round((submitted / totalHomework) * 100) : 50;

    // 3. Conceptual Understanding: average marks percentage
    const avgPct = percentages.length > 0
        ? Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length)
        : 50;
    const conceptual = Math.min(100, avgPct);

    // 4. Submission Timeliness: % of submissions on time
    let onTime = 0;
    let totalSubs = 0;
    for (const sub of submissions) {
        if (sub.submitted_at && dueDateMap.has(sub.homework_id)) {
            totalSubs++;
            if (new Date(sub.submitted_at) <= new Date(dueDateMap.get(sub.homework_id)!)) {
                onTime++;
            }
        }
    }
    const timeliness = totalSubs > 0 ? Math.round((onTime / totalSubs) * 100) : 50;

    // 5. Improvement Trend: linear trend of marks
    const trend = computeTrend(percentages);

    // 6. Participation Index: attendance rate
    const totalDays = (attendance ?? []).length;
    const presentDays = (attendance ?? []).filter((a) => a.status === 'present').length;
    const participation = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 50;

    return { consistency, effort, conceptual, timeliness, trend, participation };
}

function computeConsistency(values: number[]): number {
    if (values.length < 2) return 50;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    if (mean === 0) return 0;
    const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
    const cv = Math.sqrt(variance) / mean; // coefficient of variation
    // Lower CV = more consistent. Map CV 0-1 to score 100-0
    return Math.max(0, Math.min(100, Math.round((1 - cv) * 100)));
}

function computeTrend(values: number[]): ImprovementTrend {
    if (values.length < 3) return 'stable';

    // Simple linear regression slope
    const n = values.length;
    const xMean = (n - 1) / 2;
    const yMean = values.reduce((a, b) => a + b, 0) / n;

    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
        num += (i - xMean) * (values[i] - yMean);
        den += (i - xMean) ** 2;
    }

    const slope = den === 0 ? 0 : num / den;

    // Threshold: slope > 2 = improving, < -2 = declining
    if (slope > 2) return 'improving';
    if (slope < -2) return 'declining';
    return 'stable';
}
