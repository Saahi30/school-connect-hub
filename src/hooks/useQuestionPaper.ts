// ============================================================
// useQuestionPaper — Paper generation workflow hook
// ============================================================

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
    generatePaper,
    reshuffleQuestions,
    savePaperEdits,
    finalizePaper,
    getPaperHistory,
    getChapters,
} from '@/services/questionPaperService';
import { printPaper, printAnswerKey } from '@/services/pdfService';
import type {
    PaperConfig,
    PaperPreviewData,
    PaperGenerationStep,
    GeneratedPaper,
    QuestionBankItem,
} from '@/types/teacherAssistantTypes';

export function useQuestionPaper(teacherId: string | undefined) {
    const { toast } = useToast();

    const [step, setStep] = useState<PaperGenerationStep>('configure');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<PaperPreviewData | null>(null);
    const [history, setHistory] = useState<GeneratedPaper[]>([]);
    const [chapters, setChapters] = useState<Array<{ id: string; name: string; chapter_number: number; chapter_topics: Array<{ id: string; name: string }> }>>([]);

    const fetchChapters = useCallback(async (subjectId: string) => {
        try {
            const data = await getChapters(subjectId);
            setChapters(data as typeof chapters);
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to load chapters', variant: 'destructive' });
        }
    }, [toast]);

    const generate = useCallback(async (config: PaperConfig) => {
        if (!teacherId) {
            toast({ title: 'Error', description: 'Teacher ID not found', variant: 'destructive' });
            return;
        }

        setStep('generating');
        setLoading(true);

        try {
            const result = await generatePaper(config, teacherId);
            setPreview(result);
            setStep('preview');
            toast({ title: 'Success', description: 'Question paper generated! Review and edit below.' });
        } catch (err) {
            setStep('configure');
            toast({
                title: 'Generation Failed',
                description: err instanceof Error ? err.message : 'Failed to generate paper',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [teacherId, toast]);

    const reshuffle = useCallback(() => {
        if (!preview) return;
        const reshuffled = reshuffleQuestions(preview);
        setPreview(reshuffled);
        toast({ title: 'Reshuffled', description: 'Questions have been reordered within each section.' });
    }, [preview, toast]);

    const updateQuestion = useCallback((sectionIndex: number, questionIndex: number, updates: Partial<QuestionBankItem>) => {
        if (!preview) return;
        const newSections = [...preview.sections];
        newSections[sectionIndex] = {
            ...newSections[sectionIndex],
            questions: newSections[sectionIndex].questions.map((q, i) =>
                i === questionIndex ? { ...q, ...updates } : q
            ),
        };
        setPreview({ ...preview, sections: newSections });
    }, [preview]);

    const save = useCallback(async () => {
        if (!preview) return;
        setLoading(true);
        try {
            await savePaperEdits(preview.paper.id, preview.sections, preview.answerKey);
            await finalizePaper(preview.paper.id);
            setStep('saved');
            toast({ title: 'Saved', description: 'Question paper finalized and saved.' });
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to save paper', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }, [preview, toast]);

    const exportPDF = useCallback(() => {
        if (!preview) return;
        printPaper(preview);
    }, [preview]);

    const exportAnswerKey = useCallback(() => {
        if (!preview) return;
        printAnswerKey(preview);
    }, [preview]);

    const fetchHistory = useCallback(async () => {
        if (!teacherId) return;
        try {
            const data = await getPaperHistory(teacherId);
            setHistory(data);
        } catch (err) {
            // Silently fail for history
        }
    }, [teacherId]);

    const reset = useCallback(() => {
        setStep('configure');
        setPreview(null);
    }, []);

    return {
        step,
        loading,
        preview,
        history,
        chapters,
        fetchChapters,
        generate,
        reshuffle,
        updateQuestion,
        save,
        exportPDF,
        exportAnswerKey,
        fetchHistory,
        reset,
    };
}
