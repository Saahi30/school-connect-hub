// ============================================================
// useReportComments — Comment generation workflow hook
// ============================================================

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
    generateClassComments,
    saveEditedComment,
    finalizeComments,
    getCommentHistory,
    regenerateSingleComment,
} from '@/services/reportCommentService';
import type {
    CommentTone,
    ReportComment,
    CommentGenerationStep,
    StudentMetrics,
} from '@/types/teacherAssistantTypes';

export function useReportComments(teacherId: string | undefined) {
    const { toast } = useToast();

    const [step, setStep] = useState<CommentGenerationStep>('select');
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<ReportComment[]>([]);
    const [tone, setTone] = useState<CommentTone>('encouraging');

    const generate = useCallback(async (
        classId: string,
        subjectId: string,
        selectedTone: CommentTone,
        academicYear?: string,
        term?: string
    ) => {
        if (!teacherId) {
            toast({ title: 'Error', description: 'Teacher ID not found', variant: 'destructive' });
            return;
        }

        setTone(selectedTone);
        setStep('generating');
        setLoading(true);

        try {
            const result = await generateClassComments(
                classId,
                subjectId,
                teacherId,
                selectedTone,
                academicYear,
                term
            );
            setComments(result);
            setStep('review');
            toast({
                title: 'Comments Generated',
                description: `${result.length} comments ready for review.`,
            });
        } catch (err) {
            setStep('select');
            toast({
                title: 'Generation Failed',
                description: err instanceof Error ? err.message : 'Failed to generate comments',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [teacherId, toast]);

    const editComment = useCallback(async (commentId: string, editedText: string) => {
        try {
            await saveEditedComment(commentId, editedText);
            setComments((prev) =>
                prev.map((c) =>
                    c.id === commentId
                        ? { ...c, teacher_edited_comment: editedText, final_comment: editedText }
                        : c
                )
            );
            toast({ title: 'Saved', description: 'Comment updated.' });
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to save edit', variant: 'destructive' });
        }
    }, [toast]);

    const regenerateOne = useCallback(async (
        commentId: string,
        studentId: string,
        studentName: string,
        metrics: StudentMetrics,
        subjectName: string,
        newTone?: CommentTone
    ) => {
        setLoading(true);
        try {
            const newComment = await regenerateSingleComment(
                studentId,
                studentName,
                metrics,
                subjectName,
                newTone ?? tone
            );

            setComments((prev) =>
                prev.map((c) =>
                    c.id === commentId
                        ? { ...c, ai_generated_comment: newComment, final_comment: newComment, teacher_edited_comment: undefined }
                        : c
                )
            );

            toast({ title: 'Regenerated', description: `Comment refreshed for ${studentName}.` });
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to regenerate comment', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }, [tone, toast]);

    const finalize = useCallback(async (
        classId: string,
        subjectId: string,
        academicYear?: string,
        term?: string
    ) => {
        setLoading(true);
        try {
            await finalizeComments(classId, subjectId, academicYear, term);
            setComments((prev) => prev.map((c) => ({ ...c, is_finalized: true })));
            setStep('saved');
            toast({ title: 'Finalized', description: 'All comments have been finalized.' });
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to finalize comments', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    const loadHistory = useCallback(async (
        classId: string,
        subjectId: string,
        academicYear?: string,
        term?: string
    ) => {
        try {
            const data = await getCommentHistory(classId, subjectId, academicYear, term);
            if (data.length > 0) {
                setComments(data);
                setStep('review');
            }
        } catch {
            // Silently fail
        }
    }, []);

    const reset = useCallback(() => {
        setStep('select');
        setComments([]);
    }, []);

    return {
        step,
        loading,
        comments,
        tone,
        generate,
        editComment,
        regenerateOne,
        finalize,
        loadHistory,
        reset,
    };
}
