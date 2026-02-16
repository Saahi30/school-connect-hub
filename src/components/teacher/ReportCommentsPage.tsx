// ============================================================
// ReportCommentsPage — AI student report comment generator
// ============================================================

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    MessageSquare,
    Wand2,
    Loader2,
    Save,
    ArrowLeft,
    Users,
    Download,
    CheckCircle,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useReportComments } from '@/hooks/useReportComments';
import { useStudentMetrics } from '@/hooks/useStudentMetrics';
import { useTeacherData } from '@/hooks/useTeacherData';
import { CommentEditor } from './CommentEditor';
import type { CommentTone, StudentMetrics } from '@/types/teacherAssistantTypes';

const TONES: { value: CommentTone; label: string; desc: string; emoji: string }[] = [
    { value: 'encouraging', label: 'Encouraging', desc: 'Warm & supportive', emoji: '💪' },
    { value: 'constructive', label: 'Constructive', desc: 'Balanced with suggestions', emoji: '🎯' },
    { value: 'strict', label: 'Strict', desc: 'Direct & factual', emoji: '📏' },
    { value: 'appreciative', label: 'Appreciative', desc: 'Celebratory & positive', emoji: '⭐' },
    { value: 'ptm_friendly', label: 'PTM Friendly', desc: 'Parent-ready language', emoji: '🤝' },
];

export function ReportCommentsPage() {
    const { teacherData } = useTeacherData();
    const teacherId = teacherData?.id;

    const {
        step,
        loading,
        comments,
        generate,
        editComment,
        regenerateOne,
        finalize,
        loadHistory,
        reset,
    } = useReportComments(teacherId);

    const { students: metricsStudents, fetchMetrics, loading: metricsLoading } = useStudentMetrics();

    // Form state
    const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
    const [classes, setClasses] = useState<{ id: string; name: string; section: string }[]>([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedTone, setSelectedTone] = useState<CommentTone>('encouraging');
    const [academicYear] = useState('2025-2026');
    const [term] = useState('Term 1');

    // Load subjects and classes
    useEffect(() => {
        const loadData = async () => {
            const { data: subjectsData } = await supabase.from('subjects').select('id, name').order('name');
            const { data: classesData } = await supabase.from('classes').select('id, name, section').order('name');
            setSubjects(subjectsData ?? []);
            setClasses(classesData ?? []);
        };
        loadData();
    }, []);

    // Load metrics when class/subject selected
    useEffect(() => {
        if (selectedClass && selectedSubject) {
            fetchMetrics(selectedClass, selectedSubject, academicYear, term);
            loadHistory(selectedClass, selectedSubject, academicYear, term);
        }
    }, [selectedClass, selectedSubject, academicYear, term, fetchMetrics, loadHistory]);

    const handleGenerate = () => {
        generate(selectedClass, selectedSubject, selectedTone, academicYear, term);
    };

    const handleFinalize = () => {
        finalize(selectedClass, selectedSubject, academicYear, term);
    };

    const subjectName = subjects.find((s) => s.id === selectedSubject)?.name ?? '';
    const className = classes.find((c) => c.id === selectedClass);
    const classLabel = className ? `${className.name} ${className.section}` : '';

    // Build name map from metrics students
    const nameMap = new Map(metricsStudents.map((s) => [s.student_id, s.student_name]));

    const canGenerate = selectedClass && selectedSubject;

    const exportCSV = () => {
        if (comments.length === 0) return;
        const rows = comments.map((c) => ({
            student: nameMap.get(c.student_id) ?? c.student_id,
            comment: c.final_comment.replace(/"/g, '""'),
            tone: c.tone,
            status: c.is_finalized ? 'Finalized' : 'Draft',
        }));

        const csv = [
            'Student,Comment,Tone,Status',
            ...rows.map((r) => `"${r.student}","${r.comment}","${r.tone}","${r.status}"`),
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_comments_${classLabel}_${subjectName}_${term}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Report Comment Generator</h1>
                        <p className="text-sm text-muted-foreground">
                            AI-powered personalized student feedback based on real metrics
                        </p>
                    </div>
                </div>
                {step !== 'select' && (
                    <Button variant="outline" onClick={reset}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Start Over
                    </Button>
                )}
            </div>

            {/* Step: Select Class & Tone */}
            {step === 'select' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Class & Subject Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Select Class & Subject</CardTitle>
                                <CardDescription>Choose the class and subject to generate comments for</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Class</Label>
                                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classes.map((c) => (
                                                    <SelectItem key={c.id} value={c.id}>
                                                        {c.name} {c.section}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Subject</Label>
                                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select subject" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subjects.map((s) => (
                                                    <SelectItem key={s.id} value={s.id}>
                                                        {s.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tone Selector */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Comment Tone</CardTitle>
                                <CardDescription>Select the tone for generated comments</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup
                                    value={selectedTone}
                                    onValueChange={(v) => setSelectedTone(v as CommentTone)}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                >
                                    {TONES.map((t) => (
                                        <label
                                            key={t.value}
                                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${selectedTone === t.value
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                                    : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <RadioGroupItem value={t.value} />
                                            <div>
                                                <span className="text-sm font-medium">
                                                    {t.emoji} {t.label}
                                                </span>
                                                <p className="text-xs text-muted-foreground">{t.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        {/* Metrics Preview */}
                        {metricsStudents.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Users className="h-4 w-4" /> Student Metrics Preview
                                    </CardTitle>
                                    <CardDescription>
                                        {metricsStudents.length} students — metrics computed from marks, attendance & homework
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-2 pr-4">Student</th>
                                                    <th className="text-center py-2 px-2">Consistency</th>
                                                    <th className="text-center py-2 px-2">Effort</th>
                                                    <th className="text-center py-2 px-2">Conceptual</th>
                                                    <th className="text-center py-2 px-2">Timeliness</th>
                                                    <th className="text-center py-2 px-2">Trend</th>
                                                    <th className="text-center py-2 px-2">Participation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {metricsStudents.slice(0, 10).map((s) => (
                                                    <tr key={s.student_id} className="border-b hover:bg-gray-50">
                                                        <td className="py-2 pr-4 font-medium">{s.student_name}</td>
                                                        <td className="text-center py-2 px-2">
                                                            <MetricBadge value={s.metrics.consistency} />
                                                        </td>
                                                        <td className="text-center py-2 px-2">
                                                            <MetricBadge value={s.metrics.effort} />
                                                        </td>
                                                        <td className="text-center py-2 px-2">
                                                            <MetricBadge value={s.metrics.conceptual} />
                                                        </td>
                                                        <td className="text-center py-2 px-2">
                                                            <MetricBadge value={s.metrics.timeliness} />
                                                        </td>
                                                        <td className="text-center py-2 px-2">
                                                            <TrendBadge trend={s.metrics.trend} />
                                                        </td>
                                                        <td className="text-center py-2 px-2">
                                                            <MetricBadge value={s.metrics.participation} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {metricsStudents.length > 10 && (
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Showing 10 of {metricsStudents.length} students
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Generate Button */}
                        <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                            onClick={handleGenerate}
                            disabled={!canGenerate || loading || metricsLoading}
                        >
                            <Wand2 className="h-5 w-5 mr-2" />
                            Generate Comments for {metricsStudents.length || 'All'} Students
                        </Button>
                    </div>

                    {/* Info Sidebar */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">How It Works</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-3 text-muted-foreground">
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs shrink-0">1</Badge>
                                    <span>Select class, subject, and comment tone</span>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs shrink-0">2</Badge>
                                    <span>System computes metrics from marks, attendance & homework data</span>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs shrink-0">3</Badge>
                                    <span>AI generates personalized comments based on real analytics</span>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs shrink-0">4</Badge>
                                    <span>Review, edit, and finalize before export</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Metrics Explained</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs space-y-2 text-muted-foreground">
                                <p><strong>Consistency:</strong> Score variation across exams</p>
                                <p><strong>Effort:</strong> Homework completion rate</p>
                                <p><strong>Conceptual:</strong> Average marks percentage</p>
                                <p><strong>Timeliness:</strong> On-time submission rate</p>
                                <p><strong>Trend:</strong> Performance trajectory over time</p>
                                <p><strong>Participation:</strong> Attendance rate</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Step: Generating */}
            {(step === 'generating' || step === 'metrics') && (
                <Card className="p-12 text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-orange-600" />
                    <h3 className="text-lg font-semibold mt-4">
                        {step === 'metrics' ? 'Computing Student Metrics...' : 'Generating Comments...'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        {step === 'metrics'
                            ? 'Analyzing marks, attendance, and homework data.'
                            : 'AI is crafting personalized comments for each student.'}
                        <br />
                        This may take 15-30 seconds for a full class.
                    </p>
                </Card>
            )}

            {/* Step: Review & Edit */}
            {step === 'review' && comments.length > 0 && (
                <div className="space-y-4">
                    {/* Action Bar */}
                    <Card>
                        <CardContent className="flex items-center gap-3 py-3">
                            <Badge variant="outline" className="text-sm">
                                {comments.length} comments
                            </Badge>
                            <Badge variant="outline" className="text-sm">
                                {classLabel} — {subjectName}
                            </Badge>
                            <div className="flex-1" />
                            <Button variant="outline" onClick={exportCSV}>
                                <Download className="h-4 w-4 mr-2" /> Export CSV
                            </Button>
                            <Button
                                onClick={handleFinalize}
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <CheckCircle className="h-4 w-4 mr-2" /> Finalize All
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Comment Cards */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <CommentEditor
                                key={comment.id}
                                comment={comment}
                                studentName={nameMap.get(comment.student_id) ?? 'Unknown Student'}
                                onSave={editComment}
                                onRegenerate={regenerateOne}
                                subjectName={subjectName}
                                loading={loading}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Step: Saved / Finalized */}
            {step === 'saved' && (
                <Card className="p-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mt-4">Comments Finalized!</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        All {comments.length} comments have been saved and finalized for {classLabel} — {subjectName}.
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <Button variant="outline" onClick={exportCSV}>
                            <Download className="h-4 w-4 mr-2" /> Export CSV
                        </Button>
                        <Button onClick={reset}>
                            Generate for Another Class
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}

// --- Helper Components ---

function MetricBadge({ value }: { value: number }) {
    const color =
        value >= 75
            ? 'bg-green-100 text-green-700'
            : value >= 50
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700';

    return (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
            {value}%
        </span>
    );
}

function TrendBadge({ trend }: { trend: string }) {
    const config: Record<string, { color: string; icon: string }> = {
        improving: { color: 'bg-green-100 text-green-700', icon: '↑' },
        stable: { color: 'bg-gray-100 text-gray-700', icon: '→' },
        declining: { color: 'bg-red-100 text-red-700', icon: '↓' },
    };
    const { color, icon } = config[trend] ?? config.stable;

    return (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
            {icon} {trend}
        </span>
    );
}
