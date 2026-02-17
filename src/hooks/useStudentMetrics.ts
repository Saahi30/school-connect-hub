// ============================================================
// useStudentMetrics — Fetch/cache student analytics
// ============================================================

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getClassMetrics } from '@/services/studentMetricsService';
import type { StudentMetrics } from '@/types/teacherAssistantTypes';

interface StudentWithMetrics {
    student_id: string;
    student_name: string;
    metrics: StudentMetrics;
}

export function useStudentMetrics() {
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState<StudentWithMetrics[]>([]);

    const fetchMetrics = useCallback(async (
        classId: string,
        subjectId: string,
        academicYear?: string,
        term?: string
    ) => {
        setLoading(true);
        try {
            const data = await getClassMetrics(classId, subjectId, academicYear, term);
            setStudents(data);
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Failed to compute student metrics',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    const reset = useCallback(() => {
        setStudents([]);
    }, []);

    return {
        loading,
        students,
        fetchMetrics,
        reset,
    };
}
